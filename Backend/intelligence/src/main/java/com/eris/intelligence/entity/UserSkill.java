package com.eris.intelligence.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_skills")
@Data
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign Key to User
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Foreign Key to Skill
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(name = "proficiency_level", nullable = false)
    private ProficiencyLevel proficiencyLevel;

    @Column(name = "projects_completed")
    private Integer projectsCompleted = 0;
}

