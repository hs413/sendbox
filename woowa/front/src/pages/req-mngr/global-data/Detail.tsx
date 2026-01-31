import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// hooks
import { useAppSelector } from '@/hooks/useRedux';
import { usePage } from '@/hooks/usePage';
import { useMngrDpReqById } from '@/hooks/queries/useDpReqQueries';

// reducers
import { selectContextPath } from '@reducers/authSlice';

// models
import { DpReqReIdentParams } from '@models/model/ReIdentModel';
import { GlobalDataParams, initGlobalDataParams } from '@models/model/GlobalDataModel';
import { DP_REQ_STATUS, PageType } from '@models/common/Constants';

// utils
import { showAlert } from '@utils/FuncUtil';
import { JSONString } from '@utils/ObjectUtil';

// components
import BasicInfoDetail from '@components/globalData/details/BasicInfoDetail';
import ManagerInfoDetail from '@components/globalData/details/ManagerInfoDetail';
import IntegrationTypeDetail from '@components/globalData/details/IntegrationTypeDetail';
import StatusPopup from '@pages/popup/StatusPopup';
import { DpReqModel } from '@models/model/DpReqModel';
import ProcessHistory from '@components/globalData/details/ProcessHistory';

const ReqMngrGlobalDataDetail = ({}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const contextPath = useAppSelector(selectContextPath());
    const url = `${location.pathname}${location.search}`;

    const { page, params, setParams } = usePage<GlobalDataParams>(initGlobalDataParams);

    console.log('params ~~ ', params);
    const { menuNm, history, setButtonType, setSaveButton, setIsDisabled } = useOutletContext<any>();

    const [searchParams] = useSearchParams();
    const reqId: string = searchParams.get('reqId') || '';

    // 상세조회
    const { data: response, isSuccess, isError } = useMngrDpReqById(reqId);

    // 상태변경 Popup
    const [selectedReqData, setSelectedReqData] = useState<DpReqModel[]>([]);
    const [isStatusPopup, setIsStatusPopup] = useState(false);

    // history
    const [histList, setHistList] = useState<Array<object>>([]);

    console.log(' detail ~~s ', params);

    // ready
    useEffect(() => {
        setButtonType(PageType.REQ_GLOBAL_DATA_MNGR);
        setIsDisabled(false);
    }, []);

    useEffect(() => {
        let status = params?.status || '';

        // 대기중, 검토중, 수정완료
        if (status === DP_REQ_STATUS.READY || status === DP_REQ_STATUS.REVIEW || status === DP_REQ_STATUS.MODIFY_DONE) {
            setSaveButton(() => {
                return () => {
                    let paramObj = [
                        {
                            reqId: reqId,
                            category: params.category,
                            status: params.status,
                        },
                    ];

                    setSelectedReqData(paramObj);
                    setIsStatusPopup(true);
                };
            });
        }

        //히스토리 추가
        history.addHistory(url, `${menuNm}`, page, params);
    }, [params]);

    // 목록 이동
    const goToList = () => {
        history.removeHistory(url).then(() => navigate(`${contextPath}/req-mngr/global-data`));
    };

    useEffect(() => {
        if (isError || response?.successOrNot === 'N') {
            showAlert(t('common.toast.error.list'));
            return;
        }

        if (response?.data) {
            let reqData = response.data.detail;
            let newData: DpReqReIdentParams;

            const reqContent = JSON.parse(JSONString(reqData.reqContent));

            if (reqContent) {
                newData = { ...reqContent, ...reqData };
            }

            setHistList(response.data.hist);

            setParams((prevState) => ({ ...prevState, ...newData }));
        }
    }, [response, isSuccess, isError]);

    return (
        <>
            <div className="contentsArea apply">
                {/* 기본 정보 */}
                <BasicInfoDetail params={params} />

                {/* 담당자 정보 */}
                <ManagerInfoDetail params={params} />

                {/* 연계방향 및 방식 */}
                <IntegrationTypeDetail params={params} />

                <ProcessHistory history={histList}/>
            </div>

            {isStatusPopup && (
                <StatusPopup
                    selectedReqData={selectedReqData}
                    setSelectedReqData={setSelectedReqData}
                    open={isStatusPopup}
                    onClose={(reason) => {
                        setIsStatusPopup(false);
                        //변경 : 'confirm' 취소 : 'cancel'
                        if (reason === 'confirm') {
                            goToList();
                        }
                    }}
                    fieldFlags={2}
                    reset={false}
                />
            )}
        </>
    );
};

export default ReqMngrGlobalDataDetail;
