import { useTranslation } from 'react-i18next';

import { REQ_PAGE_MODE } from '@models/common/Constants';

import { BasicInfoForm, IntegrationTypeForm, ManagerInfoForm } from '@components/globalData';
import useGlobalDataForm from '@components/globalData/hooks/useGlobalDataForm';

const ReqGlobalDataEdit = () => {
    const { t } = useTranslation();
    const pageType = REQ_PAGE_MODE.EDIT;

    const { updateParams, params, formRefs, errors } = useGlobalDataForm({ t, type: pageType });

    return (
        <>
            <div className="contentsArea sstmap">
                {/* 기본 정보 */}
                <BasicInfoForm
                    t={t}
                    params={params}
                    updateParams={updateParams}
                    type={pageType}
                    formRefs={formRefs}
                    errors={errors}
                />

                {/* 담당자 정보 */}
                <ManagerInfoForm
                    t={t}
                    params={params}
                    updateParams={updateParams}
                    type={pageType}
                    formRefs={formRefs}
                    errors={errors}
                />

                {/* 연계방향 및 방식 */}
                <IntegrationTypeForm
                    t={t}
                    params={params}
                    updateParams={updateParams}
                    type={pageType}
                    formRefs={formRefs}
                    errors={errors}
                />
            </div>
        </>
    );
};

export default ReqGlobalDataEdit;

