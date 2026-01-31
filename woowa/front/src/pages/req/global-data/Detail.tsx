import { useEffect } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// hooks
import { useAppSelector } from '@/hooks/useRedux';
import { usePage } from '@/hooks/usePage';
import { useDeleteDpReq, useDpReqById, useUpdateDpReqStatus } from '@/hooks/queries/useDpReqQueries';

// reducers
import { selectContextPath } from '@reducers/authSlice';

// models
import { DpReqReIdentParams } from '@models/model/ReIdentModel';
import { GlobalDataParams, initGlobalDataParams } from '@models/model/GlobalDataModel';
import { DP_REQ_STATUS, PageType, ToastOption, View } from '@models/common/Constants';

// utils
import {
    openConfirm,
    openDeleteConfirm,
    openEditConfirm,
    openRequestConfirm,
    openRetryRequestConfirm,
    showAlert,
    showToast,
} from '@utils/FuncUtil';
import { JSONString } from '@utils/ObjectUtil';

// components
import BasicInfoDetail from '@components/globalData/details/BasicInfoDetail';
import IntegrationTypeDetail from '@components/globalData/details/IntegrationTypeDetail';
import ManagerInfoDetail from '@components/globalData/details/ManagerInfoDetail';
import { validChkWFTextarea } from '@utils/StringUtil';
import useGlobalDataCode from '@components/globalData/hooks/useGlobalDataCode';

const ReqGlobalDataDetail = ({}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const contextPath = useAppSelector(selectContextPath());
    const url = `${location.pathname}${location.search}`;

    const { page, params, setParams } = usePage<GlobalDataParams>(initGlobalDataParams);

    console.log('params ~~ ', params);
    const {
        menuNm,
        history,
        setButtonType,
        setDeleteButton,
        setRegButton,
        setRetryButton,
        setEditButton,
        setIsDisabled,
    } = useOutletContext<any>();

    const [searchParams] = useSearchParams();
    const reqId: string = searchParams.get('reqId') || '';

    // 상세조회
    const { data: response, isSuccess, isError } = useDpReqById(reqId);

    // 삭제
    const { data: dResponse, isSuccess: dIsSuccess, isError: dIsError, mutate } = useDeleteDpReq(reqId);

    // 상태변경
    const updateStatusMutation = useUpdateDpReqStatus();
    const { specHeaders, descHeaders } = useGlobalDataCode({ params });

    // ready
    useEffect(() => {
        setButtonType(PageType.REQ_GLOBAL_DATA);
        setIsDisabled(false);
    }, []);

    useEffect(() => {
        let status = params?.status || '';

        // 임시저장
        if (status === DP_REQ_STATUS.TEMP_SAVE) {
            //삭제
            setDeleteButton(() => {
                return () => handleDelete();
            });

            //수정
            setEditButton(() => {
                return () => handleEdit();
            });

            //신청
            setRegButton(() => {
                return () => handleRequest(status);
            });
            setRetryButton(undefined);
        }
        // 대기중
        else if (status === DP_REQ_STATUS.READY) {
            //삭제
            setDeleteButton(() => {
                return () => handleDelete();
            });
            setRegButton(undefined);
            setRetryButton(undefined);
            setEditButton(undefined);
        }
        // 수정요청(수정 전)
        else if (status === DP_REQ_STATUS.REQ_MODIFY) {
            //삭제
            setDeleteButton(() => {
                return () => handleDelete();
            });

            //수정
            setEditButton(() => {
                return () => handleEdit();
            });
            setRegButton(undefined);
            setRetryButton(undefined);
        }
        // 수정요청(수정 중)
        else if (status === DP_REQ_STATUS.MODIFYING) {
            //삭제
            setDeleteButton(() => {
                return () => handleDelete();
            });

            //수정
            setEditButton(() => {
                return () => handleEdit();
            });

            //신청
            setRegButton(() => {
                return () => handleRequest(status);
            });
            setRetryButton(undefined);
        }
        // 반려
        else if (status === DP_REQ_STATUS.REJECT) {
            // 재신청
            setRetryButton(() => {
                return () => handleRetryRequest();
            });
            setRegButton(undefined);
            setDeleteButton(undefined);
            setEditButton(undefined);
        } else {
            setRegButton(undefined);
            setRetryButton(undefined);
            setDeleteButton(undefined);
            setEditButton(undefined);
        }

        //히스토리 추가
        history.addHistory(url, `${menuNm}`, page, params);
    }, [params]);

    // 목록 이동
    const goToList = () => {
        history.removeHistory(url).then(() => navigate(`${contextPath}/req/global-data`));
    };

    //삭제 버튼 클릭
    const handleDelete = () => {
        openDeleteConfirm(
            t,
            mutate,
            t('reqIdent:message.confirm.deleteTitle'),
            t('reqIdent:message.confirm.deleteContent')
        );
    };

    //수정 버튼 클릭
    const handleEdit = () => {
        openEditConfirm(t, () => {
            navigate(`/req/global-data/${View.EDIT}?reqId=${reqId}`, {
                state: {
                    reqId: reqId,
                    params: params,
                    page: page,
                },
            });
        });
    };

    // 재신청 버튼 클릭
    const handleRetryRequest = () => {
        openRetryRequestConfirm(t, () => {
            navigate(`/req/global-data/${View.REG}?reqId=${reqId}`, {
                state: {
                    reqId: reqId,
                    params: params,
                    page: page,
                },
            });
        });
    };

    //신청 버튼 클릭
    const handleRequest = async (status: string) => {
        let valiChk = true;

        if (!params.purpose) {
            valiChk = false;
        }

        if (!validChkWFTextarea(descHeaders, params.description, 1)) {
            valiChk = false;
        }

        // dh 담당자
        if (!params.dhManager) {
            valiChk = false;
        }

        if (!validChkWFTextarea(specHeaders, params.integrationSpec, 1)) {
            valiChk = false;
        }

        //수정화면으로 이동
        if (!valiChk) {
            openConfirm(
                () => {
                    navigate(`/req/global-data/${View.EDIT}?reqId=${reqId}`, {
                        state: {
                            reqId: reqId,
                            params: params,
                            page: page,
                        },
                    });
                },
                t(`globalData:message.confirm.regReqFail`),
                t('globalData:message.confirm.reqFail'),
                () => {},
                '수정',
                '취소'
            );

            return;
        }

        openRequestConfirm(t, () => {
            let upStatus = status === DP_REQ_STATUS.TEMP_SAVE ? DP_REQ_STATUS.READY : DP_REQ_STATUS.MODIFY_DONE;

            // API 호출
            updateStatusMutation.mutate(
                {
                    reqId: reqId,
                    update: {
                        status: upStatus,
                    },
                },
                {
                    onSuccess: () => {
                        showToast('', t('common.message.status.request'), { type: ToastOption.SUCCESS });
                        goToList();
                    },
                    onError: () => {
                        showToast('', t('common.toast.error.request'), { type: ToastOption.DANGER });
                    },
                }
            );
        });
    };

    useEffect(() => {
        if (isError || response?.successOrNot === 'N') {
            showAlert(t('common.toast.error.list'));
            return;
        }

        if (response?.data) {
            let reqData = response.data;
            let newData: DpReqReIdentParams;

            const reqContent = JSON.parse(JSONString(reqData.reqContent));

            if (reqContent) {
                newData = { ...reqContent, ...reqData };
            }

            setParams(() => ({ ...initGlobalDataParams, ...newData }));
        }
    }, [response, isSuccess, isError]);

    //삭제 시
    useEffect(() => {
        if (dIsError || dResponse?.successOrNot === 'N') {
            showAlert(t('common.toast.error.delete'));
        } else if (dIsSuccess) {
            showAlert(t('common.toast.success.delete'), goToList);
        }
    }, [dResponse, dIsSuccess, dIsError]);

    return (
        <>
            <div className="contentsArea apply">
                {/* 기본 정보 */}
                <BasicInfoDetail params={params} />

                {/* 담당자 정보 */}
                <ManagerInfoDetail params={params} />

                {/* 연계방향 및 방식 */}
                <IntegrationTypeDetail params={params} />
            </div>
        </>
    );
};

export default ReqGlobalDataDetail;
