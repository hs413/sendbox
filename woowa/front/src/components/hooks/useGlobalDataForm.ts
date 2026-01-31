import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

// hook
import { usePage } from '@/hooks/usePage';
import { useAppSelector } from '@/hooks/useRedux';
import { useSessionInfo } from '@/hooks/session/SessionContext';
import { useCreateDpReq, useDpReqById, useUpdateDpReq } from '@/hooks/queries/useDpReqQueries';

// model
import { DP_REQ_STATUS, GroupCodeType, PageType, REQ_PAGE_MODE, ToastOption } from '@models/common/Constants';
import { GlobalDataFormProps, GlobalDataParams, initGlobalDataParams } from '@models/model/GlobalDataModel';

// reducer
import { selectContextPath } from '@reducers/authSlice';

// util
import { openConfirm, openRequestConfirm, openTempSaveConfirm, showAlert, showToast } from '@utils/FuncUtil';
import { JSONString, removeEmptyProperties } from '@utils/ObjectUtil';
import { validChkWFTextarea } from '@utils/StringUtil';

import useGlobalDataCode from '@components/globalData/hooks/useGlobalDataCode';

const useGlobalDataForm = ({ t, type }: Pick<GlobalDataFormProps, 't' | 'type'>) => {
    const { page, params, setParams, updateParams } = usePage<GlobalDataParams>(initGlobalDataParams);
    const navigate = useNavigate();
    const contextPath = useAppSelector(selectContextPath());
    const sessionInfo = useSessionInfo();
    const url = `${location.pathname}${location.search}`;
    const { menuNm, history, setButtonType, setCancelButton, setRegButton, setRegButton2 } = useOutletContext<any>();

    // 신청ID로 신청데이터를 조회, 재신청/수정일 경우 reqId 조회
    const [searchParams] = useSearchParams();
    const reqId = searchParams.get('reqId') || '';

    // 재신청/수정일 경우 신청정보 조회
    const { data: response, isSuccess, isError } = useDpReqById(reqId);

    // 에러메시지 처리용
    const {
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<GlobalDataParams>();

    const formRefs = useRef({} as any);

    // 프로세스 상태
    const [startRequest, setStartRequest] = useState(false);
    const [startTempSave, setStartTempSave] = useState(false);

    // 신청버튼 클릭
    const handleClickRequestBtn = () => {
        setStartRequest(true);
    };

    // 임시저장버튼 클릭
    const handleClickTempSaveBtn = () => {
        setStartTempSave(true);
    };

    // 목록 이동
    const goToList = () => {
        navigate(`${contextPath}/req/global-data`);
    };

    // 취소버튼 클릭
    const handleClickCancelBtn = () => {
        openConfirm(
            () => {
                history.removeHistory(url).then(() => {
                    goToList();
                    showToast('', t('common.toast.success.cancel'), { type: ToastOption.SUCCESS });
                });
            },
            ' ',
            t('reqIdent:message.confirm.cancleTitle')
        );
    };

    // 등록 히스토리탭에 올리기
    useEffect(() => {
        history.addHistory(url, `${menuNm}`, page, params);
    }, [page, params]);

    // 수정, 임시저장인 경우 데이터 조회 후 기본값 세팅
    useEffect(() => {
        if (isError || response?.successOrNot === 'N') {
            showAlert(t('dpReq:toast.error.reqFormCreate'));
            return;
        } else if (isSuccess) {
            if (response.data) {
                let reqData = response.data;
                let newData: GlobalDataParams;

                const reqContent = JSON.parse(JSONString(reqData.reqContent));

                if (reqContent) {
                    if (type === REQ_PAGE_MODE.EDIT) {
                        reqData['reqId'] = reqId;
                    }
                    newData = { ...reqContent, ...reqData };
                }

                updateParams(newData);
            } else {
                showAlert(t('common.toast.info.noData'));
            }
        }
    }, [response, isSuccess, isError]);

    // 레이아웃 버튼 이벤트 설정
    useEffect(() => {
        setButtonType(PageType.REQ_GLOBAL_DATA);

        setCancelButton(() => {
            return () => handleClickCancelBtn();
        });
        setRegButton2(() => {
            return () => handleClickTempSaveBtn();
        });
        setRegButton(() => {
            return () => handleClickRequestBtn();
        });
    }, []);

    const createDpReqMutation = useCreateDpReq();
    const updateDpReqMutation = useUpdateDpReq();

    const saveWithConfirm = (status: string, newParams: object) => {
        const openConfirm = status === DP_REQ_STATUS.TEMP_SAVE ? openTempSaveConfirm : openRequestConfirm;
        const successMsg =
            status === DP_REQ_STATUS.TEMP_SAVE
                ? t('common.message.status.tempSave')
                : t('common.message.status.request');
        const errorMsg =
            status === DP_REQ_STATUS.TEMP_SAVE ? t('common.toast.error.tempSave') : t('common.toast.error.request');
        const confirmTitle =
            status === DP_REQ_STATUS.TEMP_SAVE
                ? t('reqIdent:message.confirm.saveTempTitle')
                : t('reqIdent:message.confirm.reqTitle');
        const confirmContent =
            status === DP_REQ_STATUS.TEMP_SAVE
                ? t('reqIdent:message.confirm.saveTempContent')
                : t('reqIdent:message.confirm.reqContent');

        openConfirm(
            t,
            () => {
                if (type === REQ_PAGE_MODE.REG) {
                    history.removeHistory(url).then(() =>
                        createDpReqMutation.mutate(
                            { dpReq: newParams },
                            {
                                onSuccess: (res) => {
                                    if (res.statusCode.toUpperCase() === 'success'.toUpperCase()) {
                                        showToast('', successMsg, { type: ToastOption.SUCCESS });
                                        goToList();
                                    } else {
                                        history.addHistory(url, `${menuNm}`, page, newParams);
                                        showToast('', errorMsg, { type: ToastOption.DANGER });
                                    }
                                },
                                onError: () => {
                                    history.addHistory(url, `${menuNm}`, page, newParams);
                                    showToast('', errorMsg, { type: ToastOption.DANGER });
                                },
                            }
                        )
                    );
                } else {
                    history.removeHistory(url).then(() =>
                        updateDpReqMutation.mutate(
                            { reqId: reqId, dpReq: newParams },
                            {
                                onSuccess: (res) => {
                                    if (res.statusCode.toUpperCase() === 'success'.toUpperCase()) {
                                        showToast('', successMsg, { type: ToastOption.SUCCESS });
                                        goToList();
                                    } else {
                                        history.addHistory(url, `${menuNm}`, page, newParams);
                                        showToast('', errorMsg, { type: ToastOption.DANGER });
                                    }
                                },
                                onError: () => {
                                    history.addHistory(url, `${menuNm}`, page, newParams);
                                    showToast('', errorMsg, { type: ToastOption.DANGER });
                                },
                            }
                        )
                    );
                }
            },
            confirmTitle,
            confirmContent
        );
    };

    const { specHeaders, descHeaders } = useGlobalDataCode({ params });

    // 신청 시작
    useEffect(() => {
        if (startRequest || startTempSave) {
            const run = async () => {
                const nonEmptyObj = removeEmptyProperties(params);

                const { reqContent, apprLine, ...contentObj } = nonEmptyObj;

                // 등록 ( 대기중, 임시저장 상태로 )
                // 수정 ( 수정완료, 수정중 상태로 )
                contentObj.status = startRequest
                    ? type === REQ_PAGE_MODE.REG
                        ? /* 등록페이지에서 신청버튼 클릭 : 대기중 */
                          DP_REQ_STATUS.READY
                        : /* 수정페이지에서 신청버튼 클릭 */
                        params.status === DP_REQ_STATUS.TEMP_SAVE
                        ? /* 현재 임시저장 상태 */
                          DP_REQ_STATUS.READY
                        : /* 현재 수정요청 상태 */
                          DP_REQ_STATUS.MODIFY_DONE
                    : type === REQ_PAGE_MODE.REG
                    ? /* 등록페이지에서 임시저장버튼 클릭 : 임시저장 */
                      DP_REQ_STATUS.TEMP_SAVE
                    : /* 수정페이지에서 임시저장버튼 클릭 */
                    params.status === DP_REQ_STATUS.TEMP_SAVE
                    ? /* 현재 임시저장 상태 */
                      DP_REQ_STATUS.TEMP_SAVE
                    : /* 현재 수정요청 상태 */
                      DP_REQ_STATUS.MODIFYING;

                contentObj.rqstUserInfo = {
                    userId: sessionInfo.userId,
                    userNm: sessionInfo.userNm,
                    userEmail: sessionInfo.userEmail,
                    deptCode: sessionInfo.deptCode,
                    deptNm: sessionInfo.deptNm,
                    upDeptCode: sessionInfo.upDeptCode,
                    upDeptNm: sessionInfo.upDeptNm,
                    companyCode: sessionInfo.companyCode,
                    companyNm: sessionInfo.companyNm,
                };

                contentObj.integrationSpec = formRefs.current.integrationSpec.value;

                const reqContentStr = contentObj ? JSON.stringify(contentObj) : '';

                if (startRequest) {
                    clearErrors();

                    // 목적
                    if (!params.purpose) {
                        setStartRequest(false);
                        setError('purpose', { type: 'server', message: '목적을 입력해주세요' });
                        formRefs.current['purpose'].focus();
                        return;
                    }

                    if (!validChkWFTextarea(descHeaders, params.description, 1)) {
                        setStartRequest(false);
                        setError('description', { type: 'server', message: '요청내용을 입력해주세요' });
                        formRefs.current['description'].focus();
                        return;
                    }

                    // dh 담당자
                    if (!params.dhManager) {
                        setStartRequest(false);
                        setError('dhManager', { type: 'server', message: 'DH 담당자를 입력해주세요' });
                        formRefs.current['dhManager'].focus();
                        return;
                    }

                    if (!validChkWFTextarea(specHeaders, contentObj.integrationSpec || '', 1)) {
                        setStartRequest(false);
                        setError('integrationSpec', { type: 'server', message: '양식을 입력해주세요' });
                        formRefs.current['integrationSpec'].focus();
                        return;
                    }
                }

                setParams((prevParams) => {
                    const newParams = {
                        ...prevParams,
                        status: contentObj.status,
                        reqContent: reqContentStr,
                    };

                    saveWithConfirm(contentObj.status as string, newParams);
                    return newParams;
                });

                setStartRequest(false);
                setStartTempSave(false);
            };

            run();
        }
    }, [startRequest, startTempSave]);

    return {
        params,
        errors,
        updateParams,
        formRefs,
    };
};

export default useGlobalDataForm;
