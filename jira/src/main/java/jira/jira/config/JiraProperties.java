package jira.jira.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "jira")
public class JiraProperties {
    private String baseUrl;
    private String email;
    private String apiToken;
    private String projectKey;
}