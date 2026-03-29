package com.eris.intelligence.Controller;

import com.eris.intelligence.entity.Skill;
import com.eris.intelligence.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:5173/")
public class SkillController {
    @Autowired
    private SkillRepository skillRepository;

    // Nayi technology master list mein add karne ke liye
    @PostMapping("/add")
    public ResponseEntity<Skill> addSkill(@RequestBody Skill skill) {
        Skill savedSkill = skillRepository.save(skill);
        return ResponseEntity.ok(savedSkill);
    }
}
