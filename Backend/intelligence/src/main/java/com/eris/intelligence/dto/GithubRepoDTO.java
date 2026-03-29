package com.eris.intelligence.dto;

import lombok.Data;

@Data
public class GithubRepoDTO {
    // Exact GitHub keys
    private String name;        // Project ka naam
    private String html_url;    // Repo ka link
    private String language;    // Konsi language use ki hai (e.g., Java, JavaScript)
    private String updated_at;  // Last kab kaam kiya tha ispe
}