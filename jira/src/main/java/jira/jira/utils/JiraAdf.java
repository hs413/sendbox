package jira.jira.utils;

import java.util.List;
import java.util.Map;

public class JiraAdf {
    public static Map<String, Object> fromPlainText(String text) {
        if (text == null || text.isBlank()) return null;


// 매우 단순한 ADF: paragraph 1개
        return Map.of(
                "type", "doc",
                "version", 1,
                "content", List.of(
                        Map.of(
                                "type", "paragraph",
                                "content", List.of(
                                        Map.of("type", "text", "text", text)
                                )
                        )
                )
        );
    }
}
