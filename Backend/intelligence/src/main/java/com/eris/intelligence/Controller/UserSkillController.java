package com.eris.intelligence.Controller;

import com.eris.intelligence.entity.ProficiencyLevel;
import com.eris.intelligence.entity.UserSkill;
import com.eris.intelligence.repository.SkillRepository;
import com.eris.intelligence.repository.UserRepository;
import com.eris.intelligence.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/engine")
@CrossOrigin(origins = "http://localhost:5173/")
public class UserSkillController {

    @Autowired
    private UserSkillRepository userSkillRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SkillRepository skillRepository;


    // YEH TERI MAIN FILTERING API HAI
    // Example URL: http://localhost:8080/api/engine/filterTeam?skillName=React Native
    @GetMapping("/filterTeam")
    public ResponseEntity<List<UserSkill>> getBestTeamForProject(@RequestParam String skillName) {

        // Hum sirf unko dhoondhenge jo EXPERT ya INTERMEDIATE hain
        List<ProficiencyLevel> acceptableLevels = Arrays.asList(ProficiencyLevel.EXPERT, ProficiencyLevel.INTERMEDIATE);

        List<UserSkill> bestCandidates = userSkillRepository.findTopEmployeesForSkill(skillName, acceptableLevels);

        return ResponseEntity.ok(bestCandidates);
    }

    @PostMapping("/assign")
    public ResponseEntity<String> assignSkillToUser(
            @RequestParam Long userId,
            @RequestParam String skillName,
            @RequestParam ProficiencyLevel level,
            @RequestParam Integer projectsCompleted) {

        // 1. Employee ko database mein dhundho
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User nahi mila bhai!"));

        // 2. Skill ko database mein dhundho
        var skill = skillRepository.findBySkillName(skillName)
                .orElseThrow(() -> new RuntimeException("Yeh skill system mein nahi hai!"));

        // 3. Dono ko link karke UserSkill table mein save kar do
        UserSkill userSkill = new UserSkill();
        userSkill.setUser(user);
        userSkill.setSkill(skill);
        userSkill.setProficiencyLevel(level);
        userSkill.setProjectsCompleted(projectsCompleted);

        userSkillRepository.save(userSkill);

        return ResponseEntity.ok("Mast! " + user.getFullName() + " ko " + skillName + " assign ho gaya.");
    }
}