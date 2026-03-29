package com.eris.intelligence.Controller;

import com.eris.intelligence.dto.AuthRequest;
import com.eris.intelligence.dto.AuthResponse;
import com.eris.intelligence.entity.User;
import com.eris.intelligence.repository.UserRepository;
import com.eris.intelligence.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) {
        try {
            // 1. Password Check Karo
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Email ya Password galat hai bhai!");
        }

        // 2. Agar password sahi hai, toh User ki details DB se nikalo
        User user = userRepository.findByEmail(authRequest.getEmail()).get();

        // 3. VIP Token (JWT) Generate karo
        final String jwt = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        // 4. Token aur user details React ko wapas bhej do
        return ResponseEntity.ok(new AuthResponse(jwt, user.getUserId(), user.getFullName(), user.getRole().name()));
    }
}