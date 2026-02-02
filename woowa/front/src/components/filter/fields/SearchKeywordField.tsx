import { Checkbox, Flex, SearchFilter, Select, Spacer, TextInput } from '@atelier-mold/admin';
import { KeyboardEvent } from 'react';
import { Option } from '@models/components/Filter';
import { FilterProps } from '@components/filter/useFilter';

const defaultMatchTypes: Option[] = [
    { key: 'allMatch', value: 'common.label.allMatch' },
    { key: 'partialMatch', value: 'common.label.partialMatch' },
    { key: 'startWith', value: 'common.label.startWith' },
    { key: 'endWith', value: 'common.label.endWith' },
];

interface SearchKeywordFilterValue {
    searchConditions: string;
    searchTable: string;
    excludeExpired: boolean;
    includeSynonym: boolean;
}

interface SearchKeywordFilterProps extends FilterProps {
    formData: SearchKeywordFilterValue;
    onChange: <K extends keyof SearchKeywordFilterValue>(key: K, value: SearchKeywordFilterValue[K]) => void;
    onSubmit: () => void;

    enableExcludeExpired?: boolean;
    enableIncludeSynonym?: boolean;
    matchTypes?: Option[];
    defaultMatchType?: string;
}

const render = ({
    t,
    formData,
    onChange,
    onSubmit,
    label = t('common.label.searchValue'),
    tooltip = t('common.tooltip.searchTable'),

    enableExcludeExpired = false,
    enableIncludeSynonym = false,
    matchTypes = defaultMatchTypes,
    defaultMatchType = 'partialMatch',
}: SearchKeywordFilterProps) => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <>
            <SearchFilter.Label tooltip={tooltip}>{label}</SearchFilter.Label>
            <SearchFilter.Control>
                <Flex className="filterBox searchWord">
                    <Flex justifyContent="space-between">
                        <Flex gap="100">
                            <Flex className="selectBox">
                                {/* 검색어 조건 옵션: 부분 or 완전 일치  */}
                                <Select
                                    small
                                    width="100%"
                                    defaultValue={defaultMatchType}
                                    onChange={(e) => onChange('searchConditions', e.target.value || defaultMatchType)}
                                    value={formData.searchConditions}
                                >
                                    {matchTypes.map((option) => (
                                        <Select.Option value={option.key} key={option.key}>
                                            {t(option.value)}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Flex>
                            {/* 검색어 */}
                            <Flex className="inputBox">
                                <TextInput
                                    width="100%"
                                    small
                                    placeholder={t('common.placeholder.searchInput')}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => onChange('searchTable', e.target.value)}
                                    value={formData.searchTable}
                                />
                            </Flex>
                        </Flex>
                    </Flex>

                    <Spacer x="300" />

                    <Flex className="checkBox" gap="200">
                        {/* 만료단어 제외 */}
                        {enableExcludeExpired && (
                            <Checkbox
                                small
                                id="excludeExpired"
                                name="excludeExpired"
                                onChange={(e) => onChange('excludeExpired', e.target.checked)}
                                checked={formData.excludeExpired}
                            >
                                {t('common.label.excludeExpired')}
                            </Checkbox>
                        )}
                        {/* 동의어 함께 찾기 */}
                        {enableIncludeSynonym && (
                            <Checkbox
                                small
                                id="includeSynonym"
                                name="includeSynonym"
                                tooltip={t('common.tooltip.includeSynonym')}
                                checked={formData.includeSynonym}
                                onChange={(e) => onChange('includeSynonym', e.target.checked)}
                            >
                                {t('common.label.includeSynonym')}
                            </Checkbox>
                        )}
                    </Flex>
                </Flex>
            </SearchFilter.Control>
        </>
    );
};

const SearchKeywordField = {
    render,
};

export default SearchKeywordField;
