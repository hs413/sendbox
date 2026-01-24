package jira.jira.client;
import jira.jira.config.JiraProperties;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Component
public class JiraClient {

    private final RestTemplate rt = new RestTemplate();
    private final JiraProperties props;

    public JiraClient(JiraProperties props) {
        this.props = props;
    }

    private HttpHeaders headers() {
        String raw = props.getEmail() + ":" + props.getApiToken();
        String basic = Base64.getEncoder().encodeToString(raw.getBytes(StandardCharsets.UTF_8));

        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.APPLICATION_JSON);
        h.setAccept(List.of(MediaType.APPLICATION_JSON));
        h.set(HttpHeaders.AUTHORIZATION, "Basic " + basic);
        return h;
    }

    /** Jira 이슈 생성 (Task 기본) */
    public Map<String, Object> createIssue(String projectKey, String issueTypeName, String summary, Map<String, Object> descriptionAdfOrNull) {
        String url = props.getBaseUrl() + "/rest/api/3/issue";

        Map<String, Object> fields = new java.util.HashMap<>();
        fields.put("project", Map.of("key", projectKey));
        fields.put("summary", summary);
        fields.put("issuetype", Map.of("name", issueTypeName));

        // description은 Jira Cloud에서 ADF 형식 권장. 토이에서는 null/미포함도 가능.
        if (descriptionAdfOrNull != null) fields.put("description", descriptionAdfOrNull);

        Map<String, Object> body = Map.of("fields", fields);

        try {
            ResponseEntity<Map> res = rt.exchange(url, HttpMethod.POST, new HttpEntity<>(body, headers()), Map.class);
            return res.getBody();
        } catch (HttpStatusCodeException e) {
            // 실패 원인 확인용: e.getResponseBodyAsString()
            throw new IllegalStateException("Jira create issue failed: " + e.getStatusCode() + " body=" + e.getResponseBodyAsString(), e);
        }
    }
}