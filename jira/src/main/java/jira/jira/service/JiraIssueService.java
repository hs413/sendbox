package jira.jira.service;

import java.util.Map;

import jira.jira.client.JiraClient;
import jira.jira.config.JiraProperties;
import jira.jira.dto.CreateJiraIssueRequest;
import jira.jira.dto.CreateJiraIssueResponse;
import jira.jira.utils.JiraAdf;
import org.springframework.stereotype.Service;


@Service
public class JiraIssueService {
    private final JiraClient jiraClient;
    private final JiraProperties props;

    public JiraIssueService(JiraClient jiraClient, JiraProperties props) {
        this.jiraClient = jiraClient;
        this.props = props;
    }

    public CreateJiraIssueResponse create(CreateJiraIssueRequest req) {
        String projectKey = (req.projectKey() == null || req.projectKey().isBlank())
                ? props.getProjectKey()
                : req.projectKey();

        String issueType = (req.issueType() == null || req.issueType().isBlank())
                ? "Task"
                : req.issueType();

        Map<String, Object> adf = JiraAdf.fromPlainText(req.descriptionText());

        Map<String, Object> result = jiraClient.createIssue(projectKey, issueType, req.summary(), adf);

        String key = String.valueOf(result.get("key"));
        String self = String.valueOf(result.get("self"));
        return new CreateJiraIssueResponse(key, self);
    }
}