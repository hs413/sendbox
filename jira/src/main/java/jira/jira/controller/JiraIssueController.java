package jira.jira.controller;

import jira.jira.dto.CreateJiraIssueRequest;
import jira.jira.dto.CreateJiraIssueResponse;
import jira.jira.service.JiraIssueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jira/issues")
public class JiraIssueController {

    private final JiraIssueService service;

    public JiraIssueController(JiraIssueService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CreateJiraIssueResponse> create(@RequestBody CreateJiraIssueRequest req) {
        return ResponseEntity.ok(service.create(req));
    }
}
