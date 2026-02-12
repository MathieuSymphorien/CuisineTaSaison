import { NotificationService } from './notification.service';

/**
 * Tests unitaires pour NotificationService.
 *
 * describe() = un groupe de tests pour un sujet
 * it()       = un test individuel
 * expect()   = la vérification (comme assertEquals en Java)
 *
 * Ici on n'a pas besoin de simuler quoi que ce soit :
 * le service est autonome (pas de HTTP, pas de dépendances).
 */
describe('NotificationService', () => {
  let service: NotificationService;

  // Avant chaque test, on crée une nouvelle instance propre
  beforeEach(() => {
    service = new NotificationService();
  });

  it('doit être créé', () => {
    expect(service).toBeTruthy();
  });

  // ==================== Ajout de notifications ====================

  it('doit ajouter une notification success', () => {
    // Act : on ajoute une notification
    service.success('Bravo !');

    // Assert : on vérifie qu'elle est dans la liste
    const notifications = service.notifications();
    expect(notifications.length).toBe(1);
    expect(notifications[0].message).toBe('Bravo !');
    expect(notifications[0].type).toBe('success');
  });

  it('doit ajouter une notification error', () => {
    service.error('Oups !');

    const notifications = service.notifications();
    expect(notifications.length).toBe(1);
    expect(notifications[0].type).toBe('error');
  });

  it('doit ajouter une notification info', () => {
    service.info('Info');

    expect(service.notifications().length).toBe(1);
    expect(service.notifications()[0].type).toBe('info');
  });

  it('doit ajouter une notification warning', () => {
    service.warning('Attention');

    expect(service.notifications().length).toBe(1);
    expect(service.notifications()[0].type).toBe('warning');
  });

  // ==================== Gestion de plusieurs notifications ====================

  it('doit gérer plusieurs notifications', () => {
    service.success('Un');
    service.error('Deux');
    service.info('Trois');

    expect(service.notifications().length).toBe(3);
  });

  it('chaque notification a un ID unique', () => {
    service.success('Un');
    service.success('Deux');

    const ids = service.notifications().map(n => n.id);
    expect(ids[0]).not.toBe(ids[1]);
  });

  // ==================== Suppression ====================

  it('doit supprimer une notification par ID', () => {
    service.success('À garder');
    service.error('À supprimer');

    const idToRemove = service.notifications()[1].id;
    service.dismiss(idToRemove);

    const remaining = service.notifications();
    expect(remaining.length).toBe(1);
    expect(remaining[0].message).toBe('À garder');
  });

  it('doit vider toutes les notifications', () => {
    service.success('Un');
    service.error('Deux');
    service.info('Trois');

    service.clear();

    expect(service.notifications().length).toBe(0);
  });

  // ==================== Auto-dismiss ====================

  it('doit auto-supprimer après le délai', (done) => {
    // On met un délai très court (100ms) pour que le test soit rapide
    service.success('Temporaire', 100);

    expect(service.notifications().length).toBe(1);

    // Après 150ms, la notification doit avoir disparu
    setTimeout(() => {
      expect(service.notifications().length).toBe(0);
      done(); // done() dit à Jasmine que le test async est terminé
    }, 150);
  });
});
