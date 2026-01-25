package jira.jira.service;

import static org.junit.jupiter.api.Assertions.*;

import jira.jira.client.JiraClient;
import jira.jira.config.JiraProperties;
import jira.jira.dto.CreateJiraIssueRequest;
import jira.jira.dto.CreateJiraIssueResponse;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;


import java.util.Map;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class JiraIssueServiceTest {

    @Test
    void create_uses_default_projectKey_and_issueType_when_null() {
        // given
        JiraClient jiraClient = mock(JiraClient.class);

        JiraProperties props = new JiraProperties();
        props.setBaseUrl("https://site.atlassian.net");
        props.setEmail("bot@example.com");
        props.setApiToken("token");
        props.setProjectKey("TOY"); // default

        JiraIssueService service = new JiraIssueService(jiraClient, props);

        when(jiraClient.createIssue(anyString(), anyString(), anyString(), any()))
                .thenReturn(Map.of("key", "TOY-1", "self", "https://self"));

        var req = new CreateJiraIssueRequest(null, null, "요약", "설명");

        // when
        CreateJiraIssueResponse res = service.create(req);

        // then
        assertThat(res.key()).isEqualTo("TOY-1");

        ArgumentCaptor<String> projectKeyCap = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> issueTypeCap = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> summaryCap = ArgumentCaptor.forClass(String.class);

        verify(jiraClient, times(1))
                .createIssue(projectKeyCap.capture(), issueTypeCap.capture(), summaryCap.capture(), any());

        assertThat(projectKeyCap.getValue()).isEqualTo("TOY");
        assertThat(issueTypeCap.getValue()).isEqualTo("Task");
        assertThat(summaryCap.getValue()).isEqualTo("요약");
    }

    @Test
    void create_passes_custom_projectKey_and_issueType_when_provided() {
        JiraClient jiraClient = mock(JiraClient.class);

        JiraProperties props = new JiraProperties();
        props.setProjectKey("TOY");

        JiraIssueService service = new JiraIssueService(jiraClient, props);

        when(jiraClient.createIssue(anyString(), anyString(), anyString(), any()))
                .thenReturn(Map.of("key", "ABC-9", "self", "https://self"));

        var req = new CreateJiraIssueRequest("ABC", "Bug", "버그", null);

        CreateJiraIssueResponse res = service.create(req);

        assertThat(res.key()).isEqualTo("ABC-9");

        verify(jiraClient).createIssue(eq("ABC"), eq("Bug"), eq("버그"), any());
    }
}