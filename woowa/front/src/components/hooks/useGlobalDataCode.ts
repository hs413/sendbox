import { useAppSelector } from '@/hooks/useRedux';
import { selectCodeList } from '@reducers/codeSlice';
import { GroupCodeType } from '@models/common/Constants';
import { useMemo } from 'react';
import { GlobalDataParams } from '@models/model/GlobalDataModel';

const useGlobalDataCode = ({ params }: { params: GlobalDataParams }) => {
    // 연계 방향
    const directionOptions = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_INTEGRATION_DIRECTION));

    // 연계 방식
    const methodCodes = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_INTEGRATION_METHOD));
    const methodOptions = useMemo(() => {
        const direction = params?.integrationDirection || 'WOOWA_TO_DH';

        return methodCodes.filter((r) => r.codeDsc.includes(direction));
    }, [params?.integrationDirection, methodCodes]);

    // 제플린 데이터 여부
    const zeppelinCodes = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_ZEPPELIN_STATUS));
    const zeppelinOptions = useMemo(() => {
        return zeppelinCodes.filter((r) =>
            params?.integrationDirection === 'WOOWA_TO_DH' ? r.codeId !== 'NA' : r.codeId === 'NA'
        );
    }, [params?.integrationDirection, params?.integrationMethod, zeppelinCodes]);

    // 요청내용 헤더
    const descHeaderCodes = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_DESC_HEADER));
    const descHeaders = useMemo(() => descHeaderCodes.map((r) => `● ${r.codeNm} : `), [descHeaderCodes]);

    // 양식 헤더
    const specHeaderCodes = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_INTEGRATION_TYPE));
    const specHeaders = useMemo(() => {
        return specHeaderCodes
            .filter((r) => {
                const filterValue = [params?.integrationMethod, params?.zeppelinStatus].filter(Boolean).join('_');

                return r.codeDsc.split(' | ').some((b) => b === filterValue);
            })
            .map((r) => `● ${r.codeNm} : `);
    }, [params?.integrationDirection, params?.integrationMethod, params?.zeppelinStatus]);

    const codeToName = (code: string, type: string)=> {
        switch (type) {
            case 'direction': return directionOptions.find((r) => r.codeId === code)?.codeNm;
            case 'method': return methodOptions.find((r) => r.codeId === code)?.codeNm;
            case 'zeppelin': return zeppelinOptions.find((r) => r.codeId === code)?.codeNm;
            default: return '';
        }
    }

    return {
        directionOptions,
        methodCodes,
        methodOptions,
        zeppelinOptions,
        descHeaders,
        specHeaders,
        codeToName,
    };
};

export default useGlobalDataCode;