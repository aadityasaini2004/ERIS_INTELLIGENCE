package com.eris.intelligence.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_team")
@Data
public class ProjectTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign Key to Project
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    // Foreign Key to User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_role", nullable = false)
    private ProjectRole projectRole;

    @Column(name = "allocated_date", updatable = false)
    private LocalDateTime allocatedDate;

    @PrePersist
    protected void onCreate() {
        allocatedDate = LocalDateTime.now();
    }
}

