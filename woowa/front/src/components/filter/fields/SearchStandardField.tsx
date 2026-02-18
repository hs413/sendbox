import { Flex, Radio, RadioGroup, SearchFilter } from '@atelier-mold/admin';
import { Option } from '@models/components/Filter';
import { FilterProps } from '@components/filter/useFilter';

const defaultOptions = [
    { key: 'all', value: 'common.label.all' },
    { key: 'logNm', value: 'common.label.koNm' },
    { key: 'phyFullNm', value: 'common.label.enNm' },
    { key: 'phyNm', value: 'common.label.phyNm' },
    { key: 'desc', value: 'common.label.desc' },
];

interface SearchStandardFilterValue {
    searchStandard: string;
}

interface SearchStandardFilterProps extends FilterProps {
    options?: Option[];
    formData: SearchStandardFilterValue;
    onChange: <K extends keyof SearchStandardFilterValue>(key: K, value: SearchStandardFilterValue[K]) => void;
}

const render = ({
    t,
    formData,
    onChange,
    options = defaultOptions,
    label = t('common.label.standard'),
    tooltip = '',
}: SearchStandardFilterProps) => {

    return (
        <>
            <SearchFilter.Label tooltip={tooltip}>{label}</SearchFilter.Label>

            <SearchFilter.Control>
                <RadioGroup
                    name="searchStandard"
                    value={formData.searchStandard}
                    onChange={(e) => onChange('searchStandard', e.target.value)}
                >
                    <Flex className="filterBox standard" gap="300">
                        {options.map((option) => (
                            <Radio id={`radio-${option.key}`} key={`radio-${option.key}`} value={option.key} small>
                                {t(option.value)}
                            </Radio>
                        ))}
                    </Flex>
                </RadioGroup>
            </SearchFilter.Control>
        </>
    );
};

const SearchStandardField = {
    render,
}

export default SearchStandardField;