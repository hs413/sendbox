import StdStatusBadge from '@components/stdReq/StdStatusBadge';
import { Typography } from '@atelier-mold/admin';
import OrderIcon from '@components/stdCommonComponent/OrderIcon';
import { useTranslation } from 'react-i18next';
import useExcel, { ExcelColumn } from '@/hooks/useExcel';
import { getExcelDownloadGlobalList } from '@api/DpReqAPI';
import { GlobalDataModel } from '@models/model/GlobalDataModel';
import { JSONString } from '@utils/ObjectUtil';
import { getDateString } from '@utils/DateUtil';


interface useGlobalDataListProps {
    refetch: () => void;
    updateParams: (params: any) => void;
    params: any;
}

const useGlobalDataList = ({ refetch, updateParams, params }: useGlobalDataListProps) => {
    const { t } = useTranslation();
    const { download } = useExcel();

    const columns: any[] = [
        {
            title: t('globalData:column.status'),
            id: 'status',
            width: 95,
            cell: (data: any) => {
                return <StdStatusBadge status={data.status} />;
            },
        },
        {
            title: t('globalData:column.reqNo'), // 신청번호
            id: 'reqNo',
            width: 140,
            cell: (data: any) => {
                return (
                    <Typography className="txt" as="span" variant="body2" maxLines={2}>
                        {data.reqNo}
                    </Typography>
                );
            },
        },
        {
            title: '연계 방식',
            id: 'integrationMethod',
            width: 240,
            cell: (data: any) => {
                return (
                    <Typography className="txt" as="span" variant="body2" maxLines={2}>
                        {data.integrationMethod}
                    </Typography>
                );
            },
        },
        {
            title: '연계 방향',
            id: 'integrationDirection',
            width: 100,
            cell: (data: any) => {
                return (
                    <Typography className="txt" as="span" variant="body2" maxLines={2}>
                        {data.integrationDirection}
                    </Typography>
                );
            },
        },
        {
            title: t('globalData:column.userNm'),
            id: 'userNm',
            width: 85,
            cell: (data: any) => {
                return (
                    <Typography className="txt" as="span" variant="body2" maxLines={2}>
                        {data.userNm}
                    </Typography>
                );
            },
        },
        {
            title: t('globalData:column.deptNm'),
            id: 'applyGrp',
            width: 160,
            cell: (data: any) => {
                return (
                    <Typography className="txt" as="span" variant="body2" maxLines={2}>
                        {data.rgstDeptNm}
                    </Typography>
                );
            },
        },
        {
            title: t('globalData:column.dhManager'),
            id: 'dhManager',
            width: 100,
            cell: (data: any) => {
                return (
                    <Typography className="txt" as="span" variant="body2" maxLines={2}>
                        {data.dhManager}
                    </Typography>
                );
            },
        },
        {
            // 희망일정
            title: (
                <div className="titBox">
                    <span>{t('globalData:column.hopeDt')}</span>
                    <OrderIcon filterKey="orderByHopeDt" refetch={refetch} updateParams={updateParams} />
                </div>
            ),
            id: 'hopeDt',
            width: 120,
        },
        {
            // 신청일시
            title: (
                <div className="titBox">
                    <span>{t('globalData:column.rgstDt')}</span>
                    <OrderIcon filterKey="orderByRgstDt" refetch={refetch} updateParams={updateParams} />
                </div>
            ),
            id: 'rgstDt',
            width: 170,
        },
        {
            // 수정일시
            title: (
                <div className="titBox">
                    <span>{t('globalData:column.modiDt')}</span>
                    <OrderIcon filterKey="orderByModiDt" refetch={refetch} updateParams={updateParams} />
                </div>
            ),
            id: 'modiDt',
            width: 170,
        },
    ];

    const handleExcelDownload = async (fileName: string) => {
        const columns: Partial<ExcelColumn>[] = [
            { key: 'reqId', header: 'Contents ID', width: 10 },
            { key: 'statusNm', header: t('globalData:column.status') },
            { key: 'reqNo', header: t('globalData:column.reqNo') },
            { key: 'title', header: t('globalData:column.title') },
            { key: 'userNm', header: t('globalData:column.userNm') },
            { key: 'deptNm', header: t('globalData:column.deptNm') },
            { key: 'dhManager', header: t('globalData:column.dhManager') },
            { key: 'hopeDt', header: t('globalData:column.hopeDt') },
            { key: 'rgstDt', header: t('globalData:column.rgstDt') },
            { key: 'modiDt', header: t('globalData:column.modiDt') },
        ];
        const response = await getExcelDownloadGlobalList(params);

        const rowList = response.data.map((item: GlobalDataModel) => {
            const reqContent = JSON.parse(JSONString(item.reqContent));

            return {
                reqId: item.reqId,
                reqNo: item.reqNo,
                title: item.title,
                userNm: item.userNm,
                deptNm: item.deptNm,
                dhManager: reqContent.dhManager,
                hopeDt: item.hopeDt,
                rgstDt: item.rgstDt,
                modiDt: item.modiDt,
            };
        });

        download(`${fileName}_${getDateString(new Date().toDateString())}.xlsx`, fileName, columns, rowList);
    };


    return {
        columns,
        handleExcelDownload,
    };
};



export default useGlobalDataList;