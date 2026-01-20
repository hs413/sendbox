import { useRef, useState } from 'react';
import {
    AssistiveText,
    Badge,
    BottomActionBar,
    Button,
    DatePicker,
    Flex,
    Form,
    IconButton,
    Layout,
    MessageBox,
    PageHeader,
    Radio,
    Select,
    Spacer,
    TextButton,
    TextInput,
    Tooltip,
    Typography,
} from '@atelier-mold/admin';
import { CircleHelpIcon, DeleteIcon, RefreshIcon } from '@atelier-mold/admin/icons';
import WFTextarea from '@components/textarea/WFTextarea';

const ReqGlobalDataEdit = () => {

    // Breadcrumb
    const pathItems = [
        { path: '', label: '데이터서비스 업무 신청' },
        { path: '', label: 'Global 데이터 연동 신청' },
    ];

    // datePicker
    const [startDate, setStartDate] = useState();
    const handleChangeStartDate = (date) => {
        setStartDate(date)
    }

    // 툴팁 커스텀 텍스트 영역
    const tooltipCustomText = (
        <div className="tooltipCustomBox">
            <ul className="dotList">
                <li>
                    <Typography className="txt" variant="body2" maxLines={0}>DataStreams 일 경우 Stream 종류</Typography>
                </li>
                <li>
                    <Typography className="txt" variant="body2" maxLines={0}>배치전송일 경우 DataHub 내 <br /> 프로젝트 | 스키마</Typography>
                </li>
                <li>
                    <Typography className="txt" variant="body2" maxLines={0}>논의 전일 경우 빈칸</Typography>
                </li>
            </ul>
        </div>
    );

    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
                                            </MessageBox>
                                        </div>
                                        {/* case 등록완료일 경우 노출 */}
                                        <div className="msgBox">
                                            <MessageBox variant='default' direction='horizontal'>
                                                <MessageBox.Icon />
                                                <MessageBox.Title>등록이 완료됐어요</MessageBox.Title>
                                                <MessageBox.Subtext>관리자 코멘트가 노출됩니다.</MessageBox.Subtext>
                                            </MessageBox>
                                        </div>
                                        {/* case 수정요청일 경우 노출 */}
                                        <div className="msgBox">
                                            <MessageBox variant='warning' direction='horizontal'>
                                                <MessageBox.Icon />
                                                <MessageBox.Title>내용을 수정하고 다시 신청해주세요</MessageBox.Title>
                                                <MessageBox.Subtext>수정요청 사유가 입력됩니다.</MessageBox.Subtext>
                                                <MessageBox.Action>
                                                    <TextButton size='small'>관리자메시지</TextButton>
                                                </MessageBox.Action>
                                            </MessageBox>
                                        </div>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 신청일시 */}
                            <Form.Field>
                                <Form.Label width={140}>신청일시</Form.Label>
                                <Form.Control>
                                    <div className="txtArea">
                                        <div className="txtBox">
                                            <Typography
                                                className="txt"
                                                as="p"
                                                variant="body1"
                                                weight="medium"
                                                maxLines={0}
                                            >
                                                2025.11.18(화) 12:38
                                            </Typography>
                                        </div>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 목적 */}
                            <Form.Field>
                                <Form.Label width={140} is="required">목적</Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="formBox w-md">
                                                    <TextInput width='100%' small placeholder='목적 입력' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form.Control>
                                <Form.Message>
                                    <div className="msgArea">
                                        <AssistiveText variant='invalid'>에러 메세지1</AssistiveText>
                                    </div>
                                </Form.Message>
                            </Form.Field>

                            {/* 논의채널 */}
                            <Form.Field>
                                <Form.Label width={140}>논의채널</Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="formBox w-md">
                                                    <TextInput width='100%' small placeholder='슬랙 채널 URL을 입력하세요.'></TextInput>
                                                </div>
                                                <IconButton color='ghost' label='되돌리기' shape='square' size='medium' type='button'>
                                                    <RefreshIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="formBlock">
                                            <div className="formArea w-md">
                                                <Typography className='shrink-0' as="p" variant='body2' maxLines={0}>하이퍼링크명</Typography>
                                                <div className="formBox">
                                                    <TextInput width='100%' small placeholder='#슬랙채널명을 입력하세요. 미입력 시 #논의채널 바로가기로 노출되요.'></TextInput>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="descBox">
                                            <Typography className='txt' as="p" variant='body2' color='fg_secondary' maxLines={0}>DH와 논의가 이뤄지는 채널이 있다면 알려주세요.</Typography>
                                        </div>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 보안검토 결과 */}
                            <Form.Field>
                                <Form.Label width={140}>보안검토 결과</Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="formBox w-md">
                                                    <TextInput width='100%' small placeholder='URL을 입력하세요.'></TextInput>
                                                </div>
                                                <IconButton color='ghost' label='되돌리기' shape='square' size='medium' type='button'>
                                                    <RefreshIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="formBlock">
                                            <div className="formArea w-md">
                                                <Typography className='shrink-0' as="p" variant='body2' maxLines={0}>하이퍼링크명</Typography>
                                                <div className="formBox">
                                                    <TextInput width='100%' small placeholder='바로가기 이름을 입력하세요. 미입력 시 #보안검토 결과  바로가기로 노출되요.'></TextInput>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="descBox">
                                            <Typography className='txt' as="p" variant='body2' color='fg_secondary' maxLines={0}>DH와 논의가 이뤄지는 채널이 있다면 알려주세요.</Typography>
                                        </div>
                                    </div>
                                </Form.Control>
                            </Form.Field>

                            {/* 희망일정 */}
                            <Form.Field>
                                <Form.Label width={140} is='required'>희망일정</Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="periodBox">
                                                    <div className="datePickerBox">
                                                        <DatePicker
                                                            width={400}
                                                            onDateChange={handleChangeStartDate}
                                                            value={startDate}
                                                            range={false}
                                                            weekStartsOn='월'
                                                        >
                                                            <DatePicker.Trigger width='100%' small placeholder='YYYY-MM-DD' invalid={true} />
                                                        </DatePicker>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="descBox">
                                            <Typography className='txt' as="p" variant='body2' color='fg_secondary' maxLines={0}>희망일정은 오늘 이후 입력 가능합니다.  DH와 주요 과제의 경우 Critical 한 일정을 알려주세요.</Typography>
                                        </div>
                                    </div>
                                </Form.Control>
                                <Form.Message>
                                    <div className="msgArea">
                                        <AssistiveText variant='invalid'>에러 메세지1</AssistiveText>
                                    </div>
                                </Form.Message>
                            </Form.Field>

                            {/* 요청내용 설명*/}
                            <Form.Field>
                                <Form.Label width={140} is='required'>요청내용 설명</Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="formBox">
                                                    <WFTextarea
                                                        ref={textareaRef}
                                                        headers={["● DH target(source) 위치 : ", "● 요청내용 설명 : "]}
                                                        rows={15}
                                                        //value={myStr}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="descBox flexList">
                                            <Tooltip content={tooltipCustomText}>
                                                <CircleHelpIcon size={16} color="fg_secondary" />
                                                <Typography as="span" variant="body2" weight="regular" color='fg_secondary' maxLines={0}>
                                                    targer(source) 위치
                                                </Typography>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </Form.Control>
                                <Form.Message>
                                    <div className="msgArea">
                                        <AssistiveText variant='invalid'>에러 메세지1</AssistiveText>
                                    </div>
                                </Form.Message>
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
                                <Form.Label width={140} is="required">
                                    우형
                                </Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="btnBox">
                                                    <Button variant="outline" color="secondary">
                                                        담당자 선택
                                                    </Button>
                                                </div>
                                                <div className="formBox w-md">
                                                    <TextInput
                                                        width="100%"
                                                        small
                                                        placeholder="담당자 선택 버튼을 통해 자동으로 입력됩니다."
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="btnBox">
                                                    <Button variant="outline" color="secondary">
                                                        조직장 선택
                                                    </Button>
                                                </div>
                                                <div className="formBox w-md">
                                                    <TextInput
                                                        width="100%"
                                                        small
                                                        placeholder="조직장 선택 버튼을 통해 자동으로 입력됩니다."
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form.Control>
                                <Form.Message>
                                    <div className="msgArea">
                                        <AssistiveText variant="invalid">담당자를 선택해 주세요.</AssistiveText>
                                    </div>
                                </Form.Message>
                            </Form.Field>

                            {/* DH */}
                            <Form.Field>
                                <Form.Label width={140} is='required'>DH</Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="formBox w-md">
                                                    <TextInput width='100%' small placeholder='DH를 입력하세요.'></TextInput>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form.Control>
                                <Form.Message>
                                    <div className="msgArea">
                                        <AssistiveText variant='invalid'>에러 메세지1</AssistiveText>
                                    </div>
                                </Form.Message>
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
                                <Form.Label width={140} is='required'>방향</Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="radioBox">
                                                    <Radio name='direction' id='direction-1' small value='1'>우형 → DH</Radio>
                                                    <Radio name='direction' id='direction-2' small value='2'>DH → 우형</Radio>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form.Control>
                                <Form.Message>
                                    <div className="msgArea">
                                        <AssistiveText variant='invalid'>에러 메세지1</AssistiveText>
                                    </div>
                                </Form.Message>

                            </Form.Field>

                            {/* 방식 */}
                            <Form.Field>
                                <Form.Label width={140} is='required'>방식</Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="formBox w-sm">
                                                    <Select placeholder='선택' small width='100%' name='select-1'>
                                                        <Select.Option value='1'>배치연계</Select.Option>
                                                        <Select.Option value='2'>실시간 연계(DataStreams)</Select.Option>
                                                        <Select.Option value='3'>실시간 연계(Perseus)</Select.Option>
                                                        <Select.Option value='4'>실시간 연계(기타)</Select.Option>
                                                    </Select>
                                                </div>

                                                <div className="flexList">
                                                    <Typography className='shrink-0' as="p" variant='body2' maxLines={0}>제플린 데이터 여부</Typography>

                                                    <div className="radioBox">
                                                        <Radio name='zpl' id='zpl-1' small value='1' disabled={true} >존재</Radio>
                                                        <Radio name='zpl' id='zpl-2' small value='2' disabled={true} >미존재</Radio>
                                                        <Radio name='zpl' id='zpl-3' small value='3' disabled={true} >해당없음</Radio>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form.Control>
                                <Form.Message>
                                    <div className="msgArea">
                                        <AssistiveText variant='invalid'>에러 메세지1</AssistiveText>
                                    </div>
                                </Form.Message>
                            </Form.Field>

                            {/* 양식 */}
                            <Form.Field>
                                <Form.Label width={140} is='required'>양식</Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">
                                        <div className="formBlock">
                                            <div className="formArea">
                                                <div className="formBox">
                                                    <WFTextarea
                                                        ref={textareaRef}
                                                        headers={["● 배치주기", "● 제플린 쿼리", "● DH Target 위치"]}
                                                        rows={15}
                                                        //value={myStr}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="descBox">
                                            <Typography className='txt' as="p" variant='body2' color='fg_secondary' maxLines={0}>
                                                양식에 기재된 항목 포함한 템플릿이 필요해요.
                                            </Typography>
                                        </div>
                                    </div>
                                </Form.Control>
                                <Form.Message>
                                    <div className="msgArea">
                                        <AssistiveText variant='invalid'>에러 메세지1</AssistiveText>
                                    </div>
                                </Form.Message>
                            </Form.Field>

                            {/* 참고 URL */}
                            <Form.Field>
                                <Form.Label width={140}>참고 URL</Form.Label>
                                <Form.Control>
                                    <div className="formCtrl">

                                        {/* formLoopBox 반복 생성 */}
                                        <div className="formLoopBox">
                                            <div className="formBlock">
                                                <div className="formArea">
                                                    <div className="formBox w-md">
                                                        <TextInput width='100%' small placeholder='URL을 입력하세요.'></TextInput>
                                                    </div>
                                                    <IconButton color='ghost' label='되돌리기' shape='square' size='medium' type='button'>
                                                        <RefreshIcon />
                                                    </IconButton>
                                                    {/*
                                                    <IconButton color='ghost' label='삭제' shape='square' size='medium' type='button'>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    */}
                                                </div>
                                            </div>
                                            <div className="formBlock">
                                                <div className="formArea w-md">
                                                    <Typography className='shrink-0' as="p" variant='body2' maxLines={0}>하이퍼링크명</Typography>
                                                    <div className="formBox">
                                                        <TextInput width='100%' small placeholder='바로가기 이름을 입력하세요. 미입력 시 #보안검토 결과  바로가기로 노출되요.'></TextInput>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* formLoopBox 반복 생성 */}
                                        <div className="formLoopBox">
                                            <div className="formBlock">
                                                <div className="formArea">
                                                    <div className="formBox w-md">
                                                        <TextInput width='100%' small placeholder='URL을 입력하세요.'></TextInput>
                                                    </div>
                                                    <IconButton color='ghost' label='되돌리기' shape='square' size='medium' type='button'>
                                                        <RefreshIcon />
                                                    </IconButton>
                                                    <IconButton color='ghost' label='삭제' shape='square' size='medium' type='button'>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <div className="formBlock">
                                                <div className="formArea w-md">
                                                    <Typography className='shrink-0' as="p" variant='body2' maxLines={0}>하이퍼링크명</Typography>
                                                    <div className="formBox">
                                                        <TextInput width='100%' small placeholder='바로가기 이름을 입력하세요. 미입력 시 #보안검토 결과  바로가기로 노출되요.'></TextInput>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="formBottom">
                                            <div className="formArea">
                                                <div className="btnBox">
                                                    <Button variant="outline" color="secondary">
                                                        참고 URL 추가
                                                    </Button>
                                                </div>
                                                <div className="descBox">
                                                    <Typography className='txt' as="p" variant='body2' color='fg_secondary' maxLines={0}>양식에 기재된 항목에 관련된  문서 링크 URL을 추가할 수 있어요.</Typography>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Form.Control>
                            </Form.Field>

                        </div>
                    </Form>
                </div>

            </div>

            <Layout.BottomBar>
                <BottomActionBar>
                    <BottomActionBar.Right>
                        <Flex gap="100">
                            <Button variant="outline">취소</Button>
                            <Button variant="outline">임시저장</Button>
                            <Button disabled={true}>신청</Button>
                        </Flex>
                    </BottomActionBar.Right>
                </BottomActionBar>
            </Layout.BottomBar>
        </>
    );
}

export default ReqGlobalDataEdit;

