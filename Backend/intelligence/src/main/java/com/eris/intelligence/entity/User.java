package com.eris.intelligence.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data // Lombok annotation jo automatically getters, setters, aur toString bana dega
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    // Enum ko database string format mein map karne ke liye
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('EMPLOYEE', 'HR', 'ADMIN', 'MANAGER') DEFAULT 'EMPLOYEE'")
    private Role role;

    @Column(name = "github_username", length = 50)
    private String githubUsername;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    private String designation;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

