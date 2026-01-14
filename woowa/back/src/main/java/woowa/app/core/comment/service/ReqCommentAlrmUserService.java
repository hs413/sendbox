package woowa.app.core.comment.service;

import in.woowa.data.portal.app.core.alrmuser.dto.AlrmUserDto;
import in.woowa.data.portal.app.core.reqcomment.mapper.ReqCommentMapper;
import in.woowa.data.portal.app.core.reqcomment.model.ReqCommentModel;
import in.woowa.data.portal.common.util.SessionScopeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReqCommentAlrmUserService {
    private final ReqCommentMapper reqCommentMapper;

    public List<AlrmUserDto> getReceivers(ReqCommentModel comment) {
        String userId = SessionScopeUtil.getUserId();

        return reqCommentMapper.selectCommentAlrmReceiver(comment).stream()
                .filter(r -> !r.getUserId().equals(userId))
                .collect(Collectors.toList());
    }
}
