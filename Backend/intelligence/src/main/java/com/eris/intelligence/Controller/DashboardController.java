package com.eris.intelligence.Controller;

import com.eris.intelligence.entity.UserSkill;
import com.eris.intelligence.repository.SkillRepository;
import com.eris.intelligence.repository.UserRepository;
import com.eris.intelligence.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    // 1. HR ke liye: Poori company ka Data
    @GetMapping("/admin")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalEmployees", userRepository.count());
        stats.put("skillsTracked", skillRepository.count());
        // Abhi projects ki table nahi banayi hai, toh isko ek dummy number de dete hain for now
        stats.put("activeProjects", 42);

        return ResponseEntity.ok(stats);
    }

    // 2. Employee ke liye: Sirf uska apna Data
    @GetMapping("/employee/{userId}")
    public ResponseEntity<Map<String, Object>> getEmployeeStats(@PathVariable Long userId) {
        Map<String, Object> stats = new HashMap<>();

        // Employee ke saare skills DB se nikalo
        List<UserSkill> mySkills = userSkillRepository.findAll().stream()
                .filter(us -> us.getUser().getUserId().equals(userId))
                .toList();

        // Data calculate karo
        int totalSkills = mySkills.size();
        int totalProjects = mySkills.stream().mapToInt(UserSkill::getProjectsCompleted).sum();

        // Agar uska best skill EXPERT hai, toh usko Expert level dikhao warna Intermediate
        boolean isExpert = mySkills.stream().anyMatch(us -> us.getProficiencyLevel().name().equals("EXPERT"));

        stats.put("skills", totalSkills);
        stats.put("projects", totalProjects);
        stats.put("level", isExpert ? "Senior Developer 👑" : "Software Engineer");

        return ResponseEntity.ok(stats);
    }


}