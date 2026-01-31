import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext } from 'react-router';

// hooks
import { usePage } from '@/hooks/usePage';
import { useDpReqMngrReviewList } from '@/hooks/queries/useDpReqQueries';
import useDidMountEffect from '@/hooks/useDidMountEffect';
import { useAppSelector } from '@/hooks/useRedux';
import { selectCodeList } from '@reducers/codeSlice';

// models
import { RowsInfo } from '@models/components/Table';
import { DP_REQ_CATEGORY, DP_REQ_STATUS, GroupCodeType, View } from '@models/common/Constants';
import { DpReqModel } from '@models/model/DpReqModel';
import { pageSizeList } from '@models/model/PageModel';
import { GlobalDataModel, GlobalDataSearchParams } from '@models/model/GlobalDataModel';

// utils
import { showAlert } from '@utils/FuncUtil';
import { getDateString, getWDPDate } from '@utils/DateUtil';
import { formatNumberWithComma, getDpReqCategoryName, getDpReqStatusName, getDpReqTypeName } from '@utils/StringUtil';
import { JSONString } from '@utils/ObjectUtil';

// components
import { Button, Flex, Pagination, Select, Spacer, Table, TableHeader } from '@atelier-mold/admin';
import { FileExcelIcon } from '@atelier-mold/admin/icons';
import useGlobalDataList from '@components/globalData/hooks/useGlobalDataList';
import useGlobalDataCode from '@components/globalData/hooks/useGlobalDataCode';
import GlobalDataFilter, { defaultFilterParams, defaultOrderParams } from '@components/globalData/GlobalDataFilter';

const tableFilters = {
    key: 'statusFilter',
    defaultValue: 'all',
    options: [
        { key: 'all', label: '진행 상태 전체' },
        { key: DP_REQ_STATUS.READY, label: getDpReqStatusName(DP_REQ_STATUS.READY) }, //신청완료
        { key: DP_REQ_STATUS.REVIEW, label: getDpReqStatusName(DP_REQ_STATUS.REVIEW) }, //검토중
        { key: DP_REQ_STATUS.REQ_MODIFY, label: getDpReqStatusName(DP_REQ_STATUS.REQ_MODIFY) }, //수정필요
        { key: DP_REQ_STATUS.MODIFY_DONE, label: getDpReqStatusName(DP_REQ_STATUS.MODIFY_DONE) }, //수정완료
        { key: DP_REQ_STATUS.COMPLETE, label: getDpReqStatusName(DP_REQ_STATUS.COMPLETE) }, //작업완료
        { key: DP_REQ_STATUS.REJECT, label: getDpReqStatusName(DP_REQ_STATUS.REJECT) }, //반려
    ],
};

const ReqMngrGlobalDataList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { menuNm, history } = useOutletContext<any>();
    const reqTypes = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_TYPE));

    const initDpReqParams: GlobalDataSearchParams = {
        ...defaultFilterParams,
        ...defaultOrderParams,
        isAprv: false,
        category: DP_REQ_CATEGORY.GLOBAL_DATA,
        statusFilter: 'all',
        lstCategory: Array(DP_REQ_CATEGORY.GLOBAL_DATA),
        exceptLstStatus: Array(DP_REQ_STATUS.TEMP_SAVE), //조회 제외할 상태
    };

    const { page, setPage, params, handlePageChange, handlePageSizeChange, setParams, updateParams } =
        usePage(initDpReqParams);

    const [rows, setRows] = useState<Array<DpReqModel>>([]);
    const { data: response, isError, refetch } = useDpReqMngrReviewList(params, page);
    const { codeToName } = useGlobalDataCode({ params });

    const { columns, handleExcelDownload } =
        useGlobalDataList({ params, refetch, updateParams });

    console.log('params ~~ ', params);
    console.log('rowss  ~~~ ', rows);

    //상세페이지 이동
    const goToDetail = (row: RowsInfo) => {
        navigate(`/req-mngr/global-data/${View.DETAIL}?reqId=${row.reqId}`, {
            state: {
                params,
                page,
            },
        });
    };

    //테이블 로우 클릭 시
    const rowProps = (rowData: RowsInfo) => ({
        onClick: () => {
            goToDetail(rowData);
        },
    });

    // 첫 렌더링에 미호출 hook
    useDidMountEffect(() => {
        refetch();
    }, [page.page, page.pageSize]);

    useEffect(() => {
        if (page.page === 0) {
            refetch();
            return;
        }

        handlePageChange(0);
    }, [params]);

    // 리스트API 결과
    useEffect(() => {
        if (isError || response?.successOrNot === 'N') {
            showAlert(t('common.toast.error.list'));
        } else {
            if (response?.data) {
                response.data.contents.forEach((item: GlobalDataModel) => {
                    item.rgstDt = getWDPDate(item.rgstDt);
                    item.modiDt = item.modiDt ? getWDPDate(item.modiDt) : '-';
                    item.statusNm = getDpReqStatusName(item.status);
                    item.categoryNm = getDpReqCategoryName(item.category);
                    item.typeNm = getDpReqTypeName(item.type);

                    try {
                        if (item.reqContent) {
                            const reqContent = JSON.parse(JSONString(item.reqContent));
                            item.hopeDt = getDateString(reqContent.hopeDt, '.') || '-';
                            item.dhManager = reqContent.dhManager || '-';
                            item.rgstDeptNm = reqContent?.rgstUserInfo?.deptNm || '-';
                            item.integrationMethod = codeToName(reqContent.integrationMethod, 'method') || '-';
                            item.integrationDirection = codeToName(reqContent.integrationDirection, 'direction') || '-';
                            item.reqType = reqContent.reqType
                                ? reqTypes.find((r) => r.codeId === reqContent.reqType)?.codeNm
                                : '';
                        } else {
                            throw new Error('reqContent is undefined');
                        }
                    } catch (e) {
                        console.error('파싱 에러:', e);
                        item.hopeDt = '-';
                        item.dhManager = '-';
                        item.rgstDeptNm = '-';
                    }
                });

                setRows(response.data.contents);
                setPage(response.data.page);
                history.addHistory(location.pathname, menuNm, page, params);
            }
        }
    }, [response, isError]);

    return (
        <>
            <div className="contentsArea stdReview">
                <GlobalDataFilter params={params} setParams={setParams} />

                <div className="tableWrap">
                    {/* TableHeader */}
                    <div className="tableHeader">
                        <TableHeader>
                            <TableHeader.Left title={t('globalData:label.tblTitle')}>
                                <TableHeader.Total>{`${t('common.label.countingUnit.total')} ${formatNumberWithComma(
                                    page.totalCount
                                )} ${t('common.label.countingUnit.count')}`}</TableHeader.Total>
                                <TableHeader.SelectWrapper>
                                    <TableHeader.SizeSelector
                                        size={page.pageSize}
                                        onSizeChange={(e) => e && handlePageSizeChange(e)}
                                        sizeList={pageSizeList}
                                    />
                                </TableHeader.SelectWrapper>
                            </TableHeader.Left>
                            <TableHeader.Right>
                                <Flex className="rightBox" gap="100">
                                    <Flex className="selectBox" key={tableFilters.key}>
                                        <Select
                                            small
                                            defaultValue={params['statusFilter'] || tableFilters.defaultValue}
                                            width="100%"
                                            onChange={(e) => updateParams({ [tableFilters.key]: e.target.value })}
                                        >
                                            {tableFilters.options.map((option) => (
                                                <Select.Option
                                                    key={`${tableFilters.key}-${option.key}`}
                                                    value={option.key}
                                                >
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Flex>

                                    <Button
                                        color="secondary"
                                        size="medium"
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleExcelDownload('Global데이터연동신청현황목록')}
                                    >
                                        <Button.Left>
                                            <FileExcelIcon size={16} />
                                        </Button.Left>
                                        {t('common.button.download')}
                                    </Button>
                                </Flex>
                            </TableHeader.Right>
                        </TableHeader>
                    </div>

                    <div className="dataTableArea">
                        <Table
                            headerBackgroundColor="bg_secondary"
                            border={{ outer: true }}
                            columns={columns}
                            data={rows}
                            rowProps={rowProps}
                            emptyMessage={t('common.message.noData')}
                        />
                    </div>

                    <Spacer y="200" />

                    <Flex flexDirection="column">
                        <Pagination
                            page={page.page + 1}
                            total={page.totalPage}
                            onPageChange={(nextPage) => handlePageChange(nextPage)}
                        />
                    </Flex>
                </div>
            </div>
        </>
    );
};

export default ReqMngrGlobalDataList;
