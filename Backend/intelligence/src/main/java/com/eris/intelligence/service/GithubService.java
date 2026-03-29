package com.eris.intelligence.service;

import com.eris.intelligence.dto.GithubProfileDTO;
import com.eris.intelligence.dto.GithubRepoDTO;
import com.eris.intelligence.entity.ProficiencyLevel;
import com.eris.intelligence.entity.Skill;
import com.eris.intelligence.entity.User;
import com.eris.intelligence.entity.UserSkill;
import com.eris.intelligence.repository.SkillRepository;
import com.eris.intelligence.repository.UserRepository;
import com.eris.intelligence.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class GithubService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private UserSkillRepository userSkillRepository;


    public GithubProfileDTO fetchGithubProfile(String username) {
        // GitHub ki public API ka URL
        String githubUrl = "https://api.github.com/users/" + username;

        RestTemplate restTemplate = new RestTemplate();

        try {
            // Yeh line directly GitHub ko GET request bhejegi aur JSON ko tere DTO mein convert kar degi
            return restTemplate.getForObject(githubUrl, GithubProfileDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("GitHub account nahi mila ya API limit cross ho gayi bhai! Error: " + e.getMessage());
        }
    }

    public List<GithubRepoDTO> fetchGithubRepos(String username) {
        // Yeh URL automatically uski 5 sabse recent updated repos fetch karega
        String repoUrl = "https://api.github.com/users/" + username + "/repos?sort=updated&per_page=5";

        RestTemplate restTemplate = new RestTemplate();

        try {
            // Kyunki data ek list (Array) format mein aayega, hum usko DTO Array mein map kar rahe hain
            GithubRepoDTO[] repos = restTemplate.getForObject(repoUrl, GithubRepoDTO[].class);
            return Arrays.asList(repos);
        } catch (Exception e) {
            throw new RuntimeException("Repos fetch karne mein error aagaya bhai! Error: " + e.getMessage());
        }
    }

    public String syncSkillsFromGithub(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User nahi mila bhai!"));

        if (user.getGithubUsername() == null || user.getGithubUsername().isEmpty()) {
            return "Is bande ka GitHub username hi nahi hai!";
        }

        // 1. GitHub se latest repos le aao
        List<GithubRepoDTO> repos = fetchGithubRepos(user.getGithubUsername());
        int skillsAddedOrUpdated = 0;

        for (GithubRepoDTO repo : repos) {
            String language = repo.getLanguage();

            // Agar repo mein koi language tag nahi hai (e.g. text file repo), toh skip karo
            if (language == null) continue;

            // 2. Check karo DB mein yeh skill hai kya? Nahi hai toh NAYI bana do!
            Skill skill = skillRepository.findBySkillName(language)
                    .orElseGet(() -> {
                        Skill newSkill = new Skill();
                        newSkill.setSkillName(language);
                        return skillRepository.save(newSkill);
                    });

            // 3. Employee aur Skill ka connection check karo
            Optional<UserSkill> existingLink = userSkillRepository.findByUserAndSkill(user, skill);

            if (existingLink.isPresent()) {
                // Agar pehle se aati hai, toh bas usne ek aur project bana liya! Count badha do.
                UserSkill us = existingLink.get();
                us.setProjectsCompleted(us.getProjectsCompleted() + 1);
                userSkillRepository.save(us);
            } else {
                // Nayi skill seekhi hai launde ne! Naya record daalo.
                UserSkill newUs = new UserSkill();
                newUs.setUser(user);
                newUs.setSkill(skill);
                newUs.setProficiencyLevel(ProficiencyLevel.INTERMEDIATE); // Default tag
                newUs.setProjectsCompleted(1);
                userSkillRepository.save(newUs);
            }
            skillsAddedOrUpdated++;
        }

        return "Bawaal! " + skillsAddedOrUpdated + " GitHub skills automatically ERIS DB mein sync ho gayi.";
    }
}