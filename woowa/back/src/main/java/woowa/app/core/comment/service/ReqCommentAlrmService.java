package woowa.app.core.comment.service;

import in.woowa.data.portal.app.core.reqcomment.alrm.resolver.ReqCommentArlmResolverRegistry;
import in.woowa.data.portal.app.core.reqcomment.dto.ReqCommentAlrmPayload;
import in.woowa.data.portal.app.core.reqcomment.enums.ReqCommentEvent;
import in.woowa.data.portal.app.core.reqcomment.enums.ReqCommentType;
import in.woowa.data.portal.app.core.reqcomment.model.ReqCommentModel;
import in.woowa.data.portal.common.service.AlrmService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReqCommentAlrmService {
    private final AlrmService alrmService;
    private final ReqCommentArlmResolverRegistry registry;

    private void send(ReqCommentEvent event, ReqCommentModel comment) {
        ReqCommentType type = ReqCommentType.fromCode(comment.getType());

        ReqCommentAlrmPayload payload = registry.resolve(type, event, comment);
        alrmService.sendDpAlarm(payload.getAlrmType(), null, payload.getAlarmParam(), payload.getReceivers());
    }

    public void sendCreateCommentAlrm(ReqCommentModel c) { send(ReqCommentEvent.CREATED, c); }
//    public void sendUpdateCommentAlrm(ReqCommentModel c) { send(ReqCommentEvent.UPDATED, c); }
//    public void sendDeleteCommentAlrm(ReqCommentModel c) { send(ReqCommentEvent.DELETED, c); }
}
