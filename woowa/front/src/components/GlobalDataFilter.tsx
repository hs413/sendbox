import { Flex, Radio, RadioGroup, SearchFilter, Select, Typography } from '@atelier-mold/admin';
import SearchKeywordField from '@components/filter/fields/SearchKeywordField';
import SearchStandardField from '@components/filter/fields/SearchStandardField';
import SearchDept from '@components/filter/fields/SearchDept';
import SearchPeriod from '@components/filter/fields/SearchPeriod';
import SearchExtraField from '@components/filter/fields/SearchExtraField';
import SearchFilterButtons from '@components/filter/SearchFilterButtons';
import { useTranslation } from 'react-i18next';
import useGlobalDataCode from '@components/globalData/hooks/useGlobalDataCode';
import useFilter from '@components/filter/useFilter';
import dayjs from 'dayjs';
import { CodeModel } from '@models/model/CodeModel';
import { useMemo } from 'react';
import { GlobalDataSearchParams } from '@models/model/GlobalDataModel';

export const defaultFilterParams = {
    searchConditions: 'partialMatch',
    searchTable: '',

    searchStandard: 'all',
    includeWords: '',
    excludeWords: '',

    periodCondition: 'rgstDt',
    startDt: dayjs().add(-1, 'M').format('YYYY-MM-DD'),
    endDt: dayjs().format('YYYY-MM-DD'),

    integrationDirection: 'all',
    integrationMethod: 'all',

    deptCode: [],
    deptNms: [],
    deptInputValue: '',

    selectedTreeData: [],
};

export const defaultOrderParams = {
    orderByRgstDt: 'default',
    orderByModiDt: 'default',
    orderByHopeDt: 'default',
};

const searchPeriodCondition = [
    { key: 'rgstDt', value: 'dpReq:label.rgstDt' },
    { key: 'modiDt', value: 'dpReq:label.modiDt' },
];

const searchStandardOptions = [
    { key: 'all', value: 'common.label.all' },
    { key: 'reqNo', value: 'globalData:label.reqNo' },
    { key: 'dhManager', value: 'globalData:label.dhManager' },
];

const GlobalDataFilter = ({
    params,
    setParams,
}: {
    params: GlobalDataSearchParams;
    setParams: (params: GlobalDataSearchParams) => void;
}) => {
    const { t } = useTranslation();

    const { handleSubmit, handleResetForm, handleChangeFormField, formData } = useFilter({
        params,
        setParams,
        resetValue: defaultFilterParams,
    });

    const { directionOptions: directionCodes, methodCodes } = useGlobalDataCode({ params });

    const mappingOption = (r: CodeModel) => ({ key: r.codeId, value: r.codeNm });
    const directionOptions = [{ key: 'all', value: '전체' }, ...directionCodes.map(mappingOption)];

    // 연계 방향에 따라 연계 방식 필터링
    const methodOptions = useMemo(() => {
        const allOption = { key: 'all', value: '연계방식 전체' };
        const direction = formData.integrationDirection || 'all';

        if (direction === 'all') return [allOption, ...methodCodes.map(mappingOption)];

        return [allOption, ...methodCodes.filter((r) => r.codeDsc.includes(direction)).map(mappingOption)];
    }, [formData, methodCodes]);

    const handleDirectionChange = (direction: string) => {
        handleChangeFormField('integrationDirection', direction);

        if (direction !== 'all') {
            handleChangeFormField('integrationMethod', 'all');
        }
    };

    return (
        <>
            <div className="searchFilterArea">
                <SearchFilter collapsible>
                    <SearchFilter.Contents>
                        {/*검색어 필터*/}
                        <SearchFilter.Field pin>
                            {SearchKeywordField.render({
                                t,
                                formData,
                                onChange: handleChangeFormField,
                                onSubmit: handleSubmit,
                            })}
                        </SearchFilter.Field>
                        {/*기준 필터*/}
                        <SearchFilter.Field pin>
                            {SearchStandardField.render({
                                t,
                                formData,
                                onChange: handleChangeFormField,
                                options: searchStandardOptions,
                            })}
                        </SearchFilter.Field>

                        {/*연계정보*/}
                        <SearchFilter.Field pin>
                            <SearchFilter.Label>연계정보</SearchFilter.Label>
                            <SearchFilter.Control>
                                <Flex className="filterBox searchFormBottomArea gapWide" gap="1000">
                                    <Flex className="formArea">
                                        <Flex className="labelBox w-xxxsm" alignItems="center">
                                            <Typography
                                                as="span"
                                                variant="body2"
                                                color="fg_primary"
                                                weight="regular"
                                                maxLines={0}
                                            >
                                                연계방향
                                            </Typography>
                                        </Flex>

                                        <RadioGroup
                                            name="integration-direction"
                                            value={formData.integrationDirection}
                                            onChange={(e) => handleDirectionChange(e.target.value)}
                                        >
                                            <Flex className="radioGroup" gap="300">
                                                {directionOptions.map((r) => (
                                                    <Radio
                                                        small
                                                        key={`integration-direction-${r.key}`}
                                                        id={`integration-direction-${r.key}`}
                                                        value={r.key}
                                                    >
                                                        {r.value}
                                                    </Radio>
                                                ))}
                                            </Flex>
                                        </RadioGroup>
                                    </Flex>

                                    <Flex className="formArea">
                                        <Flex className="labelBox w-xxxsm" alignItems="center">
                                            <Typography
                                                as="span"
                                                variant="body2"
                                                color="fg_primary"
                                                weight="regular"
                                                maxLines={0}
                                            >
                                                연계방식
                                            </Typography>
                                        </Flex>

                                        <Flex className="selectBox medium">
                                            <Select
                                                placeholder="선택"
                                                small
                                                width="100%"
                                                value={formData.integrationMethod}
                                                onChange={(e) =>
                                                    handleChangeFormField('integrationMethod', e.target.value)
                                                }
                                            >
                                                {methodOptions.map((r) => (
                                                    <Select.Option key={`integration-method-${r.key}`} value={r.key}>
                                                        {r.value}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </SearchFilter.Control>
                        </SearchFilter.Field>

                        {/* 부서 필터 */}
                        <SearchFilter.Field pin>
                            <SearchFilter.Label>부서</SearchFilter.Label>
                            <SearchFilter.Control>
                                <SearchDept.Control formData={formData} onChange={handleChangeFormField} />
                            </SearchFilter.Control>
                        </SearchFilter.Field>

                        {/* 기간 필터 */}
                        <SearchFilter.Field pin>
                            <SearchFilter.Label>
                                <SearchPeriod.Label />
                            </SearchFilter.Label>
                            <SearchFilter.Control>
                                <SearchPeriod.Control
                                    formData={formData}
                                    onChange={handleChangeFormField}
                                    option={{ options: searchPeriodCondition, type: 'RADIO' }}
                                />
                            </SearchFilter.Control>
                        </SearchFilter.Field>
                        {/*추가 필터*/}
                        <SearchFilter.Field>
                            {SearchExtraField.render({
                                t,
                                formData,
                                onChange: handleChangeFormField,
                                onSubmit: handleSubmit,
                            })}
                        </SearchFilter.Field>
                    </SearchFilter.Contents>
                    <SearchFilter.Footer>
                        <SearchFilterButtons onSubmit={handleSubmit} onReset={handleResetForm} />
                    </SearchFilter.Footer>
                </SearchFilter>
            </div>
        </>
    );
};

export default GlobalDataFilter;
