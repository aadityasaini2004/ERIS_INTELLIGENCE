package com.eris.intelligence.security;

import com.eris.intelligence.entity.User;
import com.eris.intelligence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. Database mein dekho kya yeh email hai?
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Bhai yeh email DB mein nahi mili: " + email));

        // 2. Agar mil gaya, toh usko Spring Security ke format mein return kardo
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(), // Database wala password (jo abhi "dummyPassword123" hai)
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}