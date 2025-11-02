package com.mathieu.cts.controllers;

import com.mathieu.cts.config.AuthException;
import com.mathieu.cts.config.JwtService;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${admin_pwd}")
    private String adminPassword;

    private final JwtService jwtService;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

   @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        if (!adminPassword.equals(loginRequest.getPassword())) {
            throw new AuthException("Identifiants invalides");
        }

        String token = jwtService.generateToken("admin", "ADMIN");
        return ResponseEntity.ok(token);
    }

    public static class LoginRequest {
        private String password;

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

}
