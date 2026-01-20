import { useCallback, useEffect, useState } from 'react';
import {
    Badge,
    Button,
    DatePicker,
    Flex,
    IconButton,
    Pagination,
    Radio,
    SearchFilter,
    Select,
    Spacer,
    Table,
    TableHeader,
    TextInput,
    Typography,
} from '@atelier-mold/admin';
import { FileExcelIcon, SearchIcon, VertSwapIcon } from '@atelier-mold/admin/icons';
import { useNavigate, useOutletContext } from 'react-router';
import { PageType } from '@models/common/Constants';
import { usePage } from '@/hooks/usePage';
import { useTranslation } from 'react-i18next';

const ReqGlobalDataList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { menuNm, history, setButtonType, setRegButton } = useOutletContext<any>();
    const { page, setPage, params, setParams, updateParams } = usePage();

    // 신청 페이지 이동
    const goToReg = useCallback(() => {
        navigate(`/req/global-data/reg`, {
            state: {
                params: params,
                page: page,
            },
        });
    }, [navigate]);

    // 해더 버튼 설정
    useEffect(() => {
        setButtonType(PageType.REQ_GLOBAL_DATA);
        setRegButton(() => {
            return () => goToReg();
        });
    }, []);

    const [pageNav, setPageNav] = useState(1);

    const stdColumns = [
        {
            title: '상태',
            id: 'stat',
            width: 95,
            cell: (data: any) => {
                if (data.stat === 'temp') {
                    return (
                        <Badge size="medium" variant="lightBlue">
                            임시저장
                        </Badge>
                    );
                } else if (data.stat === 'wait') {
                    return (
                        <Badge size="medium" variant="lightOrange">
                            신청완료
                        </Badge>
                    );
                } else if (data.stat === 'apply') {
                    return (
                        <Badge size="medium" variant="orange">
                            수정필요
                        </Badge>
                    );
                } else if (data.stat === 'confirm') {
                    return (
                        <Badge size="medium" variant="overlay">
                            검토중
                        </Badge>
                    );
                } else if (data.stat === 'modifying') {
                    return (
                        <Badge size="medium" variant="overlay">
                            수정중
                        </Badge>
                    );
                } else if (data.stat === 'modifyComplete') {
                    return (
                        <Badge size="medium" variant="green">
                            수정완료
                        </Badge>
                    );
                } else if (data.stat === 'reject') {
                    return (
                        <Badge size="medium" variant="lightRed">
                            반려
                        </Badge>
                    );
                } else if (data.stat === 'complete') {
                    return (
                        <Badge size="medium" variant="green">
                            작업완료
                        </Badge>
                    );
                }
            },
        },
        {
            title: '신청구분',
            id: 'appClassify',
            width: 240,
            cell: (data: any) => {
                return (
                    <Typography className="txt" as="span" variant="body2" maxLines={2}>
                        {data.appClassify}
                    </Typography>
                );
            },
        },
        {
            title: '우형 담당자',
            id: 'wooMng',
            width: 100,
            cell: (data: any) => {
                return (
                    <Typography className="txt" as="span" variant="body2" maxLines={2}>
                        {data.wooMng}
                    </Typography>
                );
            },
        },
        {
            title: 'DH 담당자',
            id: 'dhMng',
            width: 100,
            cell: (data: any) => {
                return (
                    <Typography className="txt" as="span" variant="body2" maxLines={2}>
                        {data.dhMng}
                    </Typography>
                );
            },
        },
        {
            title: '신청조직',
            id: 'applyGrp',
            width: 160,
            cell: (data: any) => {
                return (
                    <Typography className="txt" as="span" variant="body2" maxLines={2}>
                        {data.applyGrp}
                    </Typography>
                );
            },
        },
        {
            title: (
                <div className='titBox'>
                    <span>희망일정</span>
                    <div className="icoBox">
                        <IconButton label='정렬' shape='square' size='small'><VertSwapIcon size={16} color='fg_secondary' /></IconButton>
                    </div>
                </div>
            ),
            id: 'hopeDt',
            width: 120,
        },
        {
            title: (
                <div className='titBox'>
                    <span>신청일시</span>
                    <div className="icoBox">
                        <IconButton label='정렬' shape='square' size='small'><VertSwapIcon size={16} color='fg_secondary' /></IconButton>
                    </div>
                </div>
            ),
            id: 'rgstDt',
            width: 170,
        },
        {
            title: (
                <div className='titBox'>
                    <span>수정일시</span>
                    <div className="icoBox">
                        <IconButton label='정렬' shape='square' size='small'><VertSwapIcon size={16} color='fg_secondary' /></IconButton>
                    </div>
                </div>
            ),
            id: 'updtDt',
            width: 170,
        },
    ];
    const stdDatas = [
        {
            stat: 'temp',
            appClassify:'우형-DH DataStream API 연동 신청',
            wooMng:'권지용',
            dhMng:'홍길동',
            applyGrp:'데이터서비스실',
            hopeDt:'2025.11.31',
            rgstDt:'2025.11.31 (월) 13:01',
            updtDt:'2025.11.31 (월) 13:01',
        },
        {
            stat: 'wait',
            appClassify:'우형-DH DataStream API 연동 신청',
            wooMng:'권지용',
            dhMng:'홍길동',
            applyGrp:'데이터서비스실',
            hopeDt:'2025.11.31',
            rgstDt:'2025.11.31 (월) 13:01',
            updtDt:'2025.11.31 (월) 13:01',
        },
        {
            stat: 'apply',
            appClassify:'우형-DH DataStream API 연동 신청',
            wooMng:'권지용',
            dhMng:'홍길동',
            applyGrp:'데이터서비스실',
            hopeDt:'2025.11.31',
            rgstDt:'2025.11.31 (월) 13:01',
            updtDt:'2025.11.31 (월) 13:01',
        },
        {
            stat: 'confirm',
            appClassify:'우형-DH DataStream API 연동 신청',
            wooMng:'권지용',
            dhMng:'홍길동',
            applyGrp:'데이터서비스실',
            hopeDt:'2025.11.31',
            rgstDt:'2025.11.31 (월) 13:01',
            updtDt:'2025.11.31 (월) 13:01',
        },
        {
            stat: 'modifying',
            appClassify:'우형-DH DataStream API 연동 신청',
            wooMng:'권지용',
            dhMng:'홍길동',
            applyGrp:'데이터서비스실',
            hopeDt:'2025.11.31',
            rgstDt:'2025.11.31 (월) 13:01',
            updtDt:'2025.11.31 (월) 13:01',
        },
        {
            stat: 'modifyComplete',
            appClassify:'우형-DH DataStream API 연동 신청',
            wooMng:'권지용',
            dhMng:'홍길동',
            applyGrp:'데이터서비스실',
            hopeDt:'2025.11.31',
            rgstDt:'2025.11.31 (월) 13:01',
            updtDt:'2025.11.31 (월) 13:01',
        },
        {
            stat: 'reject',
            appClassify:'우형-DH DataStream API 연동 신청',
            wooMng:'권지용',
            dhMng:'홍길동',
            applyGrp:'데이터서비스실',
            hopeDt:'2025.11.31',
            rgstDt:'2025.11.31 (월) 13:01',
            updtDt:'2025.11.31 (월) 13:01',
        },
        {
            stat: 'complete',
            appClassify:'우형-DH DataStream API 연동 신청',
            wooMng:'권지용',
            dhMng:'홍길동',
            applyGrp:'데이터서비스실',
            hopeDt:'2025.11.31',
            rgstDt:'2025.11.31 (월) 13:01',
            updtDt:'2025.11.31 (월) 13:01',
        },
    ];

    // SearchFilter
    const [selectedOption, setSelectedOption] = useState('1');
    const handleChange = (e) => setSelectedOption(e.target.value);

    // datePicker
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const handleChangeStartDate = (date) => {
        setStartDate(date);
    };
    const handleChangeEndDate = (date) => {
        setEndDate(date);
    };

    return (
        <>
            {/*<PageHeader>*/}

            {/*    <PageHeader.Right>*/}
            {/*        <Flex gap='100'>*/}
            {/*            <Button size='large'>Global 데이터 연동 신청</Button>*/}
            {/*        </Flex>*/}
            {/*    </PageHeader.Right>*/}
            {/*</PageHeader>*/}
            {/*<Spacer y="300" />*/}

            <div className="contentsArea stdReview">
                <div className="searchFilterArea">
                    <SearchFilter collapsible onSubmit={console.log}>
                        <SearchFilter.Contents>
                            {/* 검색어 */}
                            <SearchFilter.Field pin>
                                <SearchFilter.Label tooltip="툴팁">검색어</SearchFilter.Label>
                                <SearchFilter.Control>
                                    <Flex className="filterBox searchWord">
                                        <Flex justifyContent="space-between">
                                            <Flex gap="100">
                                                <Flex className="selectBox">
                                                    <Select
                                                        placeholder="선택"
                                                        small
                                                        width="100%"
                                                        defaultValue="search-keyword-1"
                                                    >
                                                        <Select.Option value="search-keyword-1">
                                                            부분 일치
                                                        </Select.Option>
                                                        <Select.Option value="search-keyword-2">선택2</Select.Option>
                                                        <Select.Option value="search-keyword-3">선택3</Select.Option>
                                                    </Select>
                                                </Flex>
                                                <Flex className="inputBox">
                                                    <TextInput small placeholder="검색어 입력 " width="100%" />
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </SearchFilter.Control>
                            </SearchFilter.Field>

                            {/* 기준 */}
                            <SearchFilter.Field pin>
                                <SearchFilter.Label>기준 </SearchFilter.Label>
                                <SearchFilter.Control>
                                    <Flex className="filterBox standard" gap="300">
                                        <Radio
                                            id="standard-1"
                                            name="standard"
                                            value="standard-1"
                                            small={true}
                                            checked={selectedOption === 'standard-1'}
                                            onChange={handleChange}
                                        >
                                            전체
                                        </Radio>
                                        <Radio
                                            id="standard-2"
                                            name="standard"
                                            value="standard-2"
                                            small={true}
                                            checked={selectedOption === 'standard-2'}
                                            onChange={handleChange}
                                        >
                                            우형 담당자
                                        </Radio>
                                        <Radio
                                            id="standard-3"
                                            name="standard"
                                            value="standard-3"
                                            small={true}
                                            checked={selectedOption === 'standard-3'}
                                            onChange={handleChange}
                                        >
                                            DH 담당자
                                        </Radio>
                                    </Flex>
                                </SearchFilter.Control>
                            </SearchFilter.Field>

                            {/* 부서 선택 */}
                            <SearchFilter.Field pin>
                                <SearchFilter.Label>부서</SearchFilter.Label>
                                <SearchFilter.Control>
                                    <Flex className="filterBox btnInputBox">
                                        <div className="btnBox">
                                            <Button variant='outline' color='secondary' >부서 선택</Button>
                                        </div>
                                        <div className="inputBox">
                                            <TextInput width='100%' small placeholder='부서 선택'/>
                                        </div>
                                    </Flex>
                                </SearchFilter.Control>
                            </SearchFilter.Field>

                            {/* 기간 */}
                            <SearchFilter.Field pin>
                                <SearchFilter.Label>기간</SearchFilter.Label>
                                <SearchFilter.Control>
                                    <Flex className="filterBox period">
                                        <Flex className="radioGroup" gap="300">
                                            <Radio
                                                name="period"
                                                id="period-1"
                                                value="period-1"
                                                small={true}
                                                checked={selectedOption === 'period-1'}
                                                onChange={handleChange}
                                            >
                                                신청일
                                            </Radio>
                                            <Radio
                                                name="period"
                                                id="period-2"
                                                value="period-2"
                                                small={true}
                                                checked={selectedOption === 'period-2'}
                                                onChange={handleChange}
                                            >
                                                수정일
                                            </Radio>
                                        </Flex>

                                        <div className="periodBox">
                                            <div className="datePickerBox">
                                                <DatePicker
                                                    width={400}
                                                    onDateChange={handleChangeStartDate}
                                                    value={startDate}
                                                    range={false}
                                                    weekStartsOn="월"
                                                >
                                                    <DatePicker.Trigger width="100%" small placeholder="YYYY-MM-DD" />
                                                </DatePicker>
                                            </div>

                                            <span className="unit">~</span>

                                            <div className="datePickerBox">
                                                <DatePicker
                                                    width={400}
                                                    onDateChange={handleChangeEndDate}
                                                    value={endDate}
                                                    range={false}
                                                    weekStartsOn="월"
                                                >
                                                    <DatePicker.Trigger width="100%" small placeholder="YYYY-MM-DD" />
                                                </DatePicker>
                                            </div>
                                        </div>
                                    </Flex>
                                </SearchFilter.Control>
                            </SearchFilter.Field>

                            {/* 추가필터 */}
                            <SearchFilter.Field>
                                <SearchFilter.Label tooltip="검색 결과 내에서 세부 필터를 조정하여 검색 결과를 좁힐 수 있습니다.">
                                    <Flex className="searchFormTopArea" alignItems="center" gap="100">
                                        <Typography as="span" variant="body2" weight="regular" maxLines={0}>
                                            추가 필터
                                        </Typography>
                                        <Typography
                                            as="span"
                                            variant="body2"
                                            color="fg_secondary"
                                            weight="regular"
                                            maxLines={0}
                                        >
                                            선택사항
                                        </Typography>
                                    </Flex>
                                </SearchFilter.Label>
                                <SearchFilter.Control>
                                    <Flex className="filterBox searchFormBottomArea" gap="400">
                                        <Flex className="formArea">
                                            <Flex className="labelBox" alignItems="center">
                                                <Typography
                                                    as="span"
                                                    variant="body2"
                                                    color="fg_primary"
                                                    weight="regular"
                                                    maxLines={0}
                                                >
                                                    포함
                                                </Typography>
                                            </Flex>

                                            <Flex className="formBox">
                                                <TextInput
                                                    small
                                                    width="100%"
                                                    placeholder="포함할 단어 입력 (쉼표로 복수 입력 가능)"
                                                />
                                            </Flex>
                                        </Flex>

                                        <Flex className="formArea">
                                            <Flex className="labelBox" alignItems="center">
                                                <Typography
                                                    as="span"
                                                    variant="body2"
                                                    color="fg_primary"
                                                    weight="regular"
                                                    maxLines={0}
                                                >
                                                    제외
                                                </Typography>
                                            </Flex>

                                            <Flex className="formBox">
                                                <TextInput
                                                    small
                                                    width="100%"
                                                    placeholder="제외할 단어 입력 (쉼표로 복수 입력 가능)"
                                                />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </SearchFilter.Control>
                            </SearchFilter.Field>
                        </SearchFilter.Contents>
                        <SearchFilter.Footer>
                            <Button variant="outline" color="secondary" size="medium">
                                초기화
                            </Button>

                            <Button type="submit" variant="fill" color="primary" size="medium">
                                <Button.Left>
                                    <SearchIcon />
                                </Button.Left>
                                검색
                            </Button>
                        </SearchFilter.Footer>
                    </SearchFilter>
                </div>

                <div className="tableWrap">
                    {/* TableHeader */}
                    <div className="tableHeader">
                        <TableHeader>
                            <TableHeader.Left title="Global 데이터 연동 신청 목록">
                                <TableHeader.Total>총 127개</TableHeader.Total>
                                <TableHeader.SelectWrapper>
                                    <TableHeader.SizeSelector
                                        size={20}
                                        onSizeChange={(e) => console.log('selected:', e)}
                                        sizeList={[10, 20, 30, 50, 100]}
                                    />
                                </TableHeader.SelectWrapper>
                            </TableHeader.Left>
                            <TableHeader.Right>
                                <Flex className="rightBox" gap="100">
                                    <Flex className='selectBox'>
                                        <Select
                                            small
                                            defaultValue="1"
                                            width="100%"
                                        >
                                            <Select.Option value="1">신청구분 전체</Select.Option>
                                            <Select.Option value="2">옵션</Select.Option>
                                        </Select>
                                    </Flex>

                                    <Button color="secondary" size="medium" type="button" variant="outline">
                                        <Button.Left>
                                            <FileExcelIcon size={16} />
                                        </Button.Left>
                                        다운로드
                                    </Button>
                                </Flex>
                            </TableHeader.Right>
                        </TableHeader>
                    </div>

                    <div className="dataTableArea">
                        <Table
                            headerBackgroundColor="bg_secondary"
                            border={{ outer: true }}
                            // emptyMessaged='아직 관련 데이터가 없어요.'
                            columns={stdColumns}
                            data={stdDatas}
                        />
                    </div>

                    <Spacer y="200" />

                    <Flex flexDirection="column">
                        <Pagination page={pageNav} total={15} onPageChange={(nextPage) => setPageNav(nextPage)} />
                    </Flex>
                </div>
            </div>
        </>
    );
}

export default ReqGlobalDataList;

