package com.eris.intelligence.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "project_name", nullable = false, length = 150)
    private String projectName;

    @Column(name = "client_name", nullable = false, length = 100)
    private String clientName;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('PLANNING', 'ACTIVE', 'COMPLETED') DEFAULT 'PLANNING'")
    private ProjectStatus status;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

