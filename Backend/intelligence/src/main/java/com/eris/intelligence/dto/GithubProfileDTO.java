package com.eris.intelligence.dto;

import lombok.Data;

@Data
public class GithubProfileDTO {
    // Variable names exact GitHub API ke JSON keys se match hone chahiye
    private String login;
    private String name;
    private String avatar_url; // Profile picture ka link
    private int public_repos;
    private int followers;
    private String html_url;   // GitHub profile ka direct link
}