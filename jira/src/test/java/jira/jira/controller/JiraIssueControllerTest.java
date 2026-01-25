package jira.jira.controller;

import static org.junit.jupiter.api.Assertions.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import jira.jira.dto.CreateJiraIssueRequest;
import jira.jira.dto.CreateJiraIssueResponse;
import jira.jira.service.JiraIssueService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.MediaType;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(JiraIssueController.class)
class JiraIssueControllerTest {


    @Autowired
    MockMvc mvc;
    @Autowired
    ObjectMapper om;


    @MockBean
    JiraIssueService service;


    @Test
    void create_success() throws Exception {
        given(service.create(ArgumentMatchers.any()))
                .willReturn(new CreateJiraIssueResponse("TOY-1", "https://example/rest/api/3/issue/10001"));


        var req = new CreateJiraIssueRequest("TOY", "Task", "제목", "설명");


        mvc.perform(post("/api/jira/issues")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.key").value("TOY-1"))
                .andExpect(jsonPath("$.self").exists());
    }


    @Test
    void create_validation_fail_when_summary_blank() throws Exception {
// summary가 @NotBlank 이므로 400
        var req = new CreateJiraIssueRequest("TOY", "Task", " ", "설명");


        mvc.perform(post("/api/jira/issues")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(req)))
                .andExpect(status().isBadRequest());
    }
}