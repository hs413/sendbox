package woowa.app.core.comment.service;

import in.woowa.data.portal.app.core.reqcomment.model.ReqCommentModel;
import in.woowa.data.portal.common.util.StringUtils;
import org.json.JSONObject;

public class ReqCommentAlrmParamService {

    /**
     * 댓글 타입 req(신청서)외 ReqCommentInfo를 빌드하기 위한 메서드
     * */
    public static JSONObject buildParam(ReqCommentModel comment) {
        JSONObject alarmParam = new JSONObject();
        alarmParam.put("title", StringUtils.safeToString(comment.getRefKey()));
        alarmParam.put("content", StringUtils.safeToString(comment.getCn()));

        return alarmParam;
    }
}
