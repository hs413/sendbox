package jira.jira.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Configuration
public class JiraClientConfig {

    @Bean
    public RestTemplate jiraRestTemplate() {
        return new RestTemplate();
    }

    @Bean
    public HttpHeaders jiraHeaders(JiraProperties props) {
        String token = props.getEmail() + ":" + props.getApiToken();
        String basic = Base64.getEncoder()
                .encodeToString(token.getBytes(StandardCharsets.UTF_8));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(java.util.List.of(MediaType.APPLICATION_JSON));
        headers.set(HttpHeaders.AUTHORIZATION, "Basic " + basic);
        return headers;
    }
}

