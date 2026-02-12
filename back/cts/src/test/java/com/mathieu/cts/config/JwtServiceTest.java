package com.mathieu.cts.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests unitaires pour JwtService.
 *
 * Ici on teste la logique de génération et validation des tokens JWT.
 * Pas besoin de Spring ni de Mock : on teste la classe directement.
 */
class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() throws Exception {
        jwtService = new JwtService();

        // On injecte manuellement le secret (normalement fait par Spring via @Value)
        Field secretField = JwtService.class.getDeclaredField("secret");
        secretField.setAccessible(true);
        secretField.set(jwtService, "ceci-est-un-secret-de-test-assez-long-pour-hmac");
    }

    @Test
    @DisplayName("Générer un token et le valider")
    void generateAndValidateToken() {
        // Act : on génère un token
        String token = jwtService.generateToken("admin", "ADMIN");

        // Assert : le token est valide
        assertNotNull(token);
        assertTrue(jwtService.validateToken(token));
    }

    @Test
    @DisplayName("Extraire le username du token")
    void getUsernameFromToken() {
        String token = jwtService.generateToken("admin", "ADMIN");

        String username = jwtService.getUsernameFromToken(token);

        assertEquals("admin", username);
    }

    @Test
    @DisplayName("Extraire le rôle du token")
    void getRoleFromToken() {
        String token = jwtService.generateToken("admin", "ADMIN");

        String role = jwtService.getRoleFromToken(token);

        assertEquals("ADMIN", role);
    }

    @Test
    @DisplayName("Un token modifié est invalide")
    void validateToken_tamperedToken_returnsFalse() {
        String token = jwtService.generateToken("admin", "ADMIN");

        // On modifie le token (on ajoute un caractère)
        String tampered = token + "x";

        assertFalse(jwtService.validateToken(tampered));
    }

    @Test
    @DisplayName("Un token complètement faux est invalide")
    void validateToken_garbageToken_returnsFalse() {
        assertFalse(jwtService.validateToken("ceci.nest.pas.un.token"));
    }
}
