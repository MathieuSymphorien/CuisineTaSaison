// package com.mathieu.cts.config;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.filter.OncePerRequestFilter;
// import java.io.IOException;

// public class JwtAuthenticationFilter extends OncePerRequestFilter {

//     @Override
//     protected void doFilterInternal(
//         HttpServletRequest request,
//         HttpServletResponse response,
//         FilterChain filterChain
//     ) throws ServletException, IOException {
//         // Logique pour extraire et valider le token JWT
//         // Si valide, crée un Authentication et le place dans le SecurityContext
//         filterChain.doFilter(request, response);
//     }
// }
