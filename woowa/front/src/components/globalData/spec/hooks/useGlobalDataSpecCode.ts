import { useAppSelector } from '@/hooks/useRedux';
import { selectCodeList } from '@reducers/codeSlice';
import { GroupCodeType } from '@models/common/Constants';

const useGlobalDataSpecCode = () => {
    // DH 규격 카테고리
    const dhSpecCategories = useAppSelector(selectCodeList(GroupCodeType.DH_SPEC_CATEGORY));

    // 우형 관리항목
    const wwSrcMappingInfos = useAppSelector(selectCodeList(GroupCodeType.WW_SRC_MAPPING_INFO));

    const codeToName = (code: string, type: string) => {
        switch (type) {
            case 'dh':
                return dhSpecCategories.find((r) => r.codeId === code)?.codeNm;
            case 'ww':
                return wwSrcMappingInfos.find((r) => r.codeId === code)?.codeNm;
            default:
                return '';
        }
    };

    return {
        dhSpecCategories,
        wwSrcMappingInfos,
        codeToName,
    };
};

export default useGlobalDataSpecCode;