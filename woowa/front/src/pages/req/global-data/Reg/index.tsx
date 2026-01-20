import useGlobalDataForm from '@pages/user/req/global-data/hooks/useGlobalDataForm';
import { useTranslation } from 'react-i18next';
import { BasicInfoForm, ManagerInfoForm, ReqGlobalDataGuide } from '@/components/globalData';
import { IntegrationTypeForm } from '@components/globalData';
import { REQ_PAGE_MODE } from '@models/common/Constants';

const ReqGlobalDataReg = () => {
    const { t } = useTranslation();
    const pageType = REQ_PAGE_MODE.REG;

    const { updateParams, params, formRefs, errors } = useGlobalDataForm({ t, type: pageType });

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
                <ManagerInfoForm t={t} params={params} updateParams={updateParams} />

                {/* 연계방향 및 방식 */}
                <IntegrationTypeForm t={t} params={params} updateParams={updateParams} />
            </div>
        </>
    );
};

export default ReqGlobalDataReg;
