package jira.jira.dto;

public record CreateJiraIssueRequest(
        String projectKey, // null이면 기본값 사용
        String issueType, // null이면 Task
        String summary,
        String descriptionText // plain text로 받으면 서버에서 ADF로 변환
) {}
