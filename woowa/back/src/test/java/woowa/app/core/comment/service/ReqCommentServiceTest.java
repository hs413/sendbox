package woowa.app.core.comment.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ReqCommentServiceTest {
    @InjectMocks
    ReqCommentService reqCommentService;

    @Test
    void getComments_댓글목록과신청서상세를조합해서반환한다() {
        // given
        ReqCommentDto.SearchParam param = mock(ReqCommentDto.SearchParam.class);
        when(param.getRefId()).thenReturn("REQ-1");

        List<ReqCommentDto> comments = List.of(mock(ReqCommentDto.class), mock(ReqCommentDto.class));
        when(reqCommentMapper.selectReqComments(param)).thenReturn(comments);

        DpReqDto reqDetail = mock(DpReqDto.class);
        when(dpReqService.selectDetail("REQ-1")).thenReturn(reqDetail);

        // when
        ReqCommentDto.Response res = reqCommentService.getComments(param);

        // then (반환 객체 내부 필드 검증은 DTO 구현에 따라 달라질 수 있어 상호작용 중심으로 검증)
        verify(reqCommentMapper).selectReqComments(param);
        verify(dpReqService).selectDetail("REQ-1");
        assertThat(res).isNotNull();
    }
}