package com.eris.intelligence.Controller;


import com.eris.intelligence.dto.GithubProfileDTO;
import com.eris.intelligence.dto.GithubRepoDTO;
import com.eris.intelligence.entity.User;
import com.eris.intelligence.repository.UserRepository;
import com.eris.intelligence.service.GithubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GithubService githubService;

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/{userId}/github-stats")
    public ResponseEntity<GithubProfileDTO> getEmployeeGithubStats(@PathVariable Long userId) {

        // 1. Pehle database se employee nikalo
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User nahi mila bhai!"));

        // 2. Check karo ki uska GitHub username database mein hai ya nahi
        if (user.getGithubUsername() == null || user.getGithubUsername().isEmpty()) {
            throw new RuntimeException("Is employee ka GitHub username update nahi hai!");
        }

        // 3. Service ko call karke data fetch karo
        GithubProfileDTO stats = githubService.fetchGithubProfile(user.getGithubUsername());

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{userId}/github-repos")
    public ResponseEntity<List<GithubRepoDTO>> getEmployeeGithubRepos(@PathVariable Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User nahi mila bhai!"));

        if (user.getGithubUsername() == null || user.getGithubUsername().isEmpty()) {
            throw new RuntimeException("Is employee ka GitHub username update nahi hai!");
        }

        // Service se Top 5 repos mangwa li
        List<GithubRepoDTO> repos = githubService.fetchGithubRepos(user.getGithubUsername());

        return ResponseEntity.ok(repos);
    }

    // NAYI API: Auto-Sync Button
    @PostMapping("/{userId}/sync-github")
    public ResponseEntity<String> autoSyncGithubSkills(@PathVariable Long userId) {
        String resultMessage = githubService.syncSkillsFromGithub(userId);
        return ResponseEntity.ok(resultMessage);
    }
}
