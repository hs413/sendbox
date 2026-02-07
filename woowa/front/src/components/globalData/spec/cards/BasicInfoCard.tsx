import { Flex, Table, Typography } from '@atelier-mold/admin';
import TinyEditor from '@components/editor/TinyEditor';

const BasicInfoCard = () => {
    const tableColumns11 = [
        {
            title: '시스템',
            id: 'sys',
            width: 100,
        },
        {
            title: '시스템 구분명',
            id: 'sysClsNm',
            width: 200,
        },
        {
            title: '관리항목',
            id: 'mngCategory',
            width: 200,
        },
        {
            title: '전송 Data Coverage',
            id: 'sysDesc',
            width: 280,
        },
    ];
    const tableDatas11 = [
        {
            sys: 'System1',
            sysClsNm: 'CBP(푸드, B마트, 배민스토어)',
            mngCategory: '필드설명, 변환로직 EVENT',
            sysDesc:
                '2018년 이후 데이터 전송 XX년 XX월 XX일 이전: Food에서 WW가 부담하는 쿠폰 데이터만 한정하여 전송 이후: B마트 WW 부담 쿠폰 데이터 포함 전송',
        },
    ];

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
                                    목적
                                </Typography>
                            </th>
                            <td>
                                <Typography as="span" variant="body1" weight="medium" maxLines={0}>
                                    DH 로 전송 중인 Customer Incentives, Customer Incentive Transactions Streams의 전송
                                    규격을 조사하여 향후 신규로 생성되는 Incentive 관련 Event 데이터 설계 및 Dependency
                                    파악 등에 활용하고자 함
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Typography as="span" variant="body2" weight="regular" maxLines={0}>
                                    설명
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
                                    레퍼런스
                                </Typography>
                            </th>
                            <td>
                                <div className="flexList">
                                    <div className="btnUnderlineBox">
                                        <a href="" target="_blank">
                                            #DH References(1)
                                        </a>
                                    </div>
                                    <div className="btnUnderlineBox">
                                        <a href="" target="_blank">
                                            #DH References(2)
                                        </a>
                                    </div>
                                    <div className="btnUnderlineBox">
                                        <a href="" target="_blank">
                                            #DH References(2)
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Typography as="span" variant="body2" weight="regular" maxLines={0}>
                                    우형 전송 시스템
                                </Typography>
                            </th>
                            <td>
                                <div className="dataTableArea">
                                    <Table
                                        headerBackgroundColor="bg_secondary"
                                        border={{ outer: true }}
                                        columns={tableColumns11}
                                        data={tableDatas11}
                                        emptyMessage="데이터가 없습니다."
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default BasicInfoCard;