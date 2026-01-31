import { useTranslation } from 'react-i18next';

import { REQ_PAGE_MODE } from '@models/common/Constants';

import { BasicInfoForm, ManagerInfoForm, ReqGlobalDataGuide } from '@components/globalData';
import { IntegrationTypeForm } from '@components/globalData';
import useGlobalDataForm from '@components/globalData/hooks/useGlobalDataForm';

const ReqGlobalDataReg = () => {
    const { t } = useTranslation();
    const pageType = REQ_PAGE_MODE.REG;

    const { updateParams, params, formRefs, errors } = useGlobalDataForm({ t, type: pageType });

    // console.log('params ~~~ ',params);
    // console.log('dsec ~~~ ',params.description);
    // console.log('spec ~~~ ',params.integrationSpec);
    // console.log('errors ~~~ ',errors);
    // console.log('formRefs ~~~ ',formRefs);

    return (
        <>
            <div className="contentsArea sstmap">
                {/* 불릿 */}
                <ReqGlobalDataGuide t={t} />

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

export default ReqGlobalDataReg;
