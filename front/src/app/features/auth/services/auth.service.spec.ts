import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

/**
 * Tests unitaires pour AuthService.
 *
 * Ici on utilise TestBed (l'outil de test Angular) car le service
 * a une dépendance sur HttpClient.
 *
 * HttpTestingController permet d'intercepter les requêtes HTTP
 * et de simuler les réponses du serveur (sans vrai serveur).
 */
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // On vide le localStorage avant chaque test
    localStorage.clear();

    // On configure le module de test avec les providers nécessaires
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // On vérifie qu'il n'y a pas de requêtes HTTP en attente
    httpMock.verify();
    localStorage.clear();
  });

  it('doit être créé', () => {
    expect(service).toBeTruthy();
  });

  // ==================== État initial ====================

  it('isLoggedIn doit être false au départ', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('isAdmin doit être false au départ', () => {
    expect(service.isAdmin()).toBeFalse();
  });

  it('getToken doit retourner null au départ', () => {
    expect(service.getToken()).toBeNull();
  });

  // ==================== Login ====================

  it('doit stocker le token après login', () => {
    // On crée un faux token JWT (header.payload.signature)
    // Le payload contient : { "sub": "admin", "role": "ADMIN", "exp": 9999999999 }
    const fakeToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImV4cCI6OTk5OTk5OTk5OX0.signature';

    // Act : on appelle login
    service.login('password123').subscribe();

    // On intercepte la requête HTTP et on répond avec le faux token
    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ password: 'password123' });
    req.flush(fakeToken, { headers: { 'Content-Type': 'text/plain' } });

    // Assert : le token est stocké
    expect(service.getToken()).toBe(fakeToken);
    expect(service.isLoggedIn()).toBeTrue();
    expect(localStorage.getItem('admin_token')).toBe(fakeToken);
  });

  // ==================== Logout ====================

  it('doit supprimer le token après logout', () => {
    // Arrange : on simule un état connecté
    localStorage.setItem('admin_token', 'un-token');

    // On recrée le service pour qu'il lise le localStorage
    service = TestBed.inject(AuthService);

    // Act
    service.logout();

    // Assert
    expect(service.getToken()).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
    expect(localStorage.getItem('admin_token')).toBeNull();
  });

  // ==================== isAdmin ====================

  it('isAdmin doit être true avec un token ADMIN', () => {
    // Payload : { "sub": "admin", "role": "ADMIN", "exp": 9999999999 }
    const adminToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImV4cCI6OTk5OTk5OTk5OX0.signature';

    service.login('password').subscribe();

    const req = httpMock.expectOne('/api/auth/login');
    req.flush(adminToken, { headers: { 'Content-Type': 'text/plain' } });

    expect(service.isAdmin()).toBeTrue();
  });

  it('isAdmin doit être false avec un token invalide', () => {
    const badToken = 'pas-un-vrai-jwt';

    service.login('password').subscribe();

    const req = httpMock.expectOne('/api/auth/login');
    req.flush(badToken, { headers: { 'Content-Type': 'text/plain' } });

    expect(service.isAdmin()).toBeFalse();
  });
});
