import { Flex, Typography } from '@atelier-mold/admin';
import TinyEditor from '@components/editor/TinyEditor';


const ExamCard = () => {
    return (
        <>
            <div className="tableArea">
                <table className="horizon">
                    <colgroup>
                        <col width="180px" />
                        <col width="auto" />
                    </colgroup>

                    <tbody>
                        <tr>
                            <th>
                                <Typography as="span" variant="body2" weight="regular" maxLines={0}>
                                    조건별 활용 필드 및 데이터 예시
                                </Typography>
                            </th>
                            <td>
                                {/* 에디터 영역 */}
                                <Flex className="editArea">
                                    <TinyEditor disabled={true} content={'내용'} />
                                </Flex>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Typography as="span" variant="body2" weight="regular" maxLines={0}>
                                    등록자
                                </Typography>
                            </th>
                            <td>
                                <Typography as="span" variant="body1" weight="medium" maxLines={0}>
                                    권지용 (Gdragon@woowafriends.com) /플랫폼부문.데이터서비스실
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Typography as="span" variant="body2" weight="regular" maxLines={0}>
                                    등록일시
                                </Typography>
                            </th>
                            <td>
                                <Typography as="span" variant="body1" weight="medium" maxLines={0}>
                                    2026. 1. 29 (목) 11:16
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Typography as="span" variant="body2" weight="regular" maxLines={0}>
                                    수정일시
                                </Typography>
                            </th>
                            <td>
                                <Typography as="span" variant="body1" weight="medium" maxLines={0}>
                                    2026. 1. 29 (목) 11:16
                                </Typography>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default ExamCard;
