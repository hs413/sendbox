import {
    Badge,
    BottomActionBar,
    Button,
    Flex,
    Form,
    Layout,
    MessageBox,
    PageHeader,
    Spacer,
    TextButton,
    Typography,
} from '@atelier-mold/admin';

const ReqGlobalDataDetail = () => {
    // Breadcrumb
    const pathItems = [
        { path: '', label: '데이터서비스 업무 신청' },
        { path: '', label: 'Global 데이터 연동 신청' },
    ];

    const txtSample='● DH target(source) 위치 : \n\n ● 요청내용 설명 : \n\n 1개의 Data Streams API 연동이 필요합니다. '

    return (
        <>
            <div className="contentsArea apply">
                {/* 기본 정보 */}
                <div className="formCardArea">
                    <Form vertical={false}>
                        <div className="formCardHeader">
                            <Flex className="titBox">
                                <Typography className="tit" as="h4" variant="body1" weight="bold" maxLines={0}>
                                    기본 정보
                                </Typography>
                            </Flex>
                        </div>

                        <div className="formCardBody">
                            {/* 상태 */}
                            <Form.Field>
                                <Form.Label width={140}>상태</Form.Label>
                                <Form.Control>
                                    <div className="statusBox">
                                        <div className="badgeBox">
                                            <Badge size="medium" variant="lightBlue">임시저장</Badge>
                                            <Badge size="medium" variant="lightOrange">신청완료</Badge>
                                            <Badge size="medium" variant="orange">수정필요</Badge>
                                            <Badge size="medium" variant="overlay">검토중</Badge>
                                            <Badge size="medium" variant="overlay">수정중</Badge>
                                            <Badge size="medium" variant="green">수정완료</Badge>
                                            <Badge size="medium" variant="lightRed">반려</Badge>
                                            <Badge size="medium" variant="lightRed">삭제</Badge>
                                            <Badge size="medium" variant="green">작업완료</Badge>
                                        </div>

                                        {/* case 반려일 경우 노출*/}
                                        <div className="msgBox">
                                            <MessageBox variant='danger' direction='horizontal'>
                                                <MessageBox.Icon />
                                                <MessageBox.Title>반려 사유</MessageBox.Title>
                                                <MessageBox.Subtext> 반려 사유가 노출됩니다.</MessageBox.Subtext>
                                                {/* <MessageBox.Action>
                                                    <TextButton size='small'>복사 후 재신청</TextButton>
                                                </MessageBox.Action> */}
                                            </MessageBox>
                                        </div>
                                        {/* case 등록완료일 경우 노출 */}
                                        <div className="msgBox">
                                            <MessageBox variant='default' direction='horizontal'>
                                                <MessageBox.Icon />
                                                <MessageBox.Title>등록이 완료됐어요</MessageBox.Title>
                                                <MessageBox.Subtext>관리자 코멘트가 노출됩니다.</MessageBox.Subtext>
                                                {/* <MessageBox.Action>
                                                    <TextButton size='small'>버튼</TextButton>
                                                </MessageBox.Action> */}
                                            </MessageBox>
                                        </div>
                                        {/* case 수정요청일 경우 노출 */}
                                        <div className="msgBox">
                                            <MessageBox variant='warning' direction='horizontal'>
                                                <MessageBox.Icon />
                                                <MessageBox.Title>내용을 수정하고 다시 신청해주세요</MessageBox.Title>
                                                <MessageBox.Subtext>수정요청 사유가 입력됩니다.</MessageBox.Subtext>
                                            </MessageBox>
                                        </div>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 신청 일시 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    신청 일시
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <Typography className="txt" as="p" variant="body1" weight="medium" maxLines={0}>
                                            2025. 3. 31 (월) 13:01
                                        </Typography>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 목적 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    목적
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <Typography className="txt" as="p" variant="body1" weight="medium" maxLines={0}>
                                            DH 라이더 정산 시 시간제보험료 공제를 위해 보험료 전달이 필요하며 이를 위해 DataStreams API 연동이 필요합니다.
                                        </Typography>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 논의채널 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    논의채널
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <span className="btnUnderlineBox">
                                            <TextButton size="xsmall">
                                                <Typography className="underline" as="span" variant="body1" weight="medium" maxLines={1}>
                                                    #dh-woowa-payments-incentives
                                                </Typography>
                                            </TextButton>
                                        </span>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 보안검토 결과 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    보안검토 결과
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <span className="btnUnderlineBox">
                                            <TextButton size="xsmall">
                                                <Typography className="underline" as="span" variant="body1" weight="medium" maxLines={1}>
                                                    #support-정보보안 보안검토 메시지
                                                </Typography>
                                            </TextButton>
                                        </span>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 희망일정 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    희망일정
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <Typography className="txt" as="p" variant="body1" weight="medium" maxLines={0}>
                                            2025. 3. 31
                                        </Typography>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 요청내용 설명 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    요청내용 설명
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <Typography className="txt preLine" as="p" variant="body1" weight="medium" maxLines={0}>
                                            {txtSample}
                                        </Typography>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                        </div>
                    </Form>
                </div>

                {/* 담당자 정보 */}
                <div className="formCardArea">
                    <Form vertical={false}>
                        <div className="formCardHeader">
                            <Flex className="titBox">
                                <Typography className="tit" as="h4" variant="body1" weight="bold" maxLines={0}>
                                    담당자 정보
                                </Typography>
                            </Flex>
                        </div>

                        <div className="formCardBody">
                            {/* 우형 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    우형
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtArea">
                                        <div className="txtBox">
                                            <Badge size="medium" variant="lightBlue">담당자</Badge>
                                            <Typography className="txt" as="p" variant="body1" weight="medium" maxLines={0}>
                                                권지용(gdragon@woowafriends.com) / 플랫폼부문.데이터서비스실
                                            </Typography>
                                        </div>
                                        <div className="txtBox">
                                            <Badge size="medium" variant="lightBlue">조직장</Badge>
                                            <Typography className="txt" as="p" variant="body1" weight="medium" maxLines={0}>
                                                홍길동(gdragon@woowafriends.com) / 플랫폼부문.데이터서비스실
                                            </Typography>
                                        </div>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* DH */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    DH
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <Typography className="txt" as="p" variant="body1" weight="medium" maxLines={0}>
                                            Lucas Ventura
                                        </Typography>
                                    </div>
                                </Form.Control>
                            </Form.Field>
                        </div>
                    </Form>
                </div>

                {/* 연계방향 및 방식 */}
                <div className="formCardArea">
                    <Form vertical={false}>
                        <div className="formCardHeader">
                            <Flex className="titBox">
                                <Typography className="tit" as="h4" variant="body1" weight="bold" maxLines={0}>
                                    연계방향 및 방식
                                </Typography>
                            </Flex>
                        </div>

                        <div className="formCardBody">
                            {/* 방향 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    방향
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <Typography className="txt" as="p" variant="body1" weight="medium" maxLines={0}>
                                            우형 → DH
                                        </Typography>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 방식 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    방식
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <Typography className="txt" as="p" variant="body1" weight="medium" maxLines={0}>
                                            실시간 연계(DataStreams)
                                        </Typography>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 제플린 데이터 여부 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    제플린 데이터 여부
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <Typography className="txt" as="p" variant="body1" weight="medium" maxLines={0}>
                                            존재
                                        </Typography>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 양식 */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    양식
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <Typography className="txt preLine" as="p" variant="body1" weight="medium" maxLines={0}>
                                            {txtSample}
                                        </Typography>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 참고 URL */}
                            <Form.Field>
                                <Form.Label width={140}>
                                    참고 URL
                                </Form.Label>
                                <Form.Control>
                                    <div className="txtBox">
                                        <span className="btnUnderlineBox">
                                            <TextButton size="xsmall">
                                                <Typography className="underline" as="span" variant="body1" weight="medium" maxLines={1}>
                                                    API Doc Link
                                                </Typography>
                                            </TextButton>
                                        </span>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                        </div>
                    </Form>
                </div>

            </div>

            <Layout.BottomBar>
                <BottomActionBar>
                    <BottomActionBar.Left>
                        <Flex gap="100">
                            <Button variant="outline" color="secondary">목록</Button>
                        </Flex>
                    </BottomActionBar.Left>
                    <BottomActionBar.Right>
                        <Flex gap="100">
                            <Button variant="outline" color="secondary">삭제</Button>
                            <Button variant="outline">수정</Button>
                        </Flex>
                    </BottomActionBar.Right>
                </BottomActionBar>
            </Layout.BottomBar>
        </>
    );
}

export default ReqGlobalDataDetail;

