import { Flex, SearchFilter, TextInput, Typography } from '@atelier-mold/admin';
import { KeyboardEvent } from 'react';
import { commaedStirng2Array } from '@utils/StringUtil';
import { FilterProps } from '@components/filter/useFilter';

interface SearchExtraFilterValue {
    includeWords: string;
    excludeWords: string;
}

interface SearchExtraFilterProps extends FilterProps {
    formData: SearchExtraFilterValue;
    onChange: <K extends keyof SearchExtraFilterValue>(key: K, value: SearchExtraFilterValue[K]) => void;
    onSubmit: () => void;
}

const render = ({
    t,
    formData,
    onChange,
    onSubmit,
    tooltip = t('common.tooltip.additionalFilter'),
}: SearchExtraFilterProps) => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <>
            <SearchFilter.Label tooltip={tooltip}>
                <Flex className="searchFormTopArea" alignItems="center" gap="100">
                    <Typography as="span" variant="body2" weight="regular" maxLines={0}>
                        {t('common.label.additionalFilter')}
                    </Typography>
                    <Typography as="span" variant="body2" color="fg_secondary" weight="regular" maxLines={0}>
                        {t('common.label.optional')}
                    </Typography>
                </Flex>
            </SearchFilter.Label>

            <SearchFilter.Control>
                <Flex className="filterBox searchFormBottomArea" gap="400">
                    {/* 포함 */}
                    <Flex className="formArea">
                        <Flex className="labelBox" alignItems="center">
                            <Typography as="span" variant="body2" color="fg_primary" weight="regular" maxLines={0}>
                                {t('common.label.include')}
                            </Typography>
                        </Flex>

                        <Flex className="formBox">
                            <TextInput
                                small
                                width="100%"
                                placeholder={t('common.placeholder.includeWords')}
                                onChange={(e) => onChange('includeWords', e.target.value)}
                                onKeyDown={handleKeyDown}
                                value={formData.includeWords}
                            />
                        </Flex>
                    </Flex>

                    {/* 제외 */}
                    <Flex className="formArea">
                        <Flex className="labelBox" alignItems="center">
                            <Typography as="span" variant="body2" color="fg_primary" weight="regular" maxLines={0}>
                                {t('common.label.exclude')}
                            </Typography>
                        </Flex>
                        <Flex className="formBox">
                            <TextInput
                                small
                                width="100%"
                                placeholder={t('common.placeholder.excludeWords')}
                                onChange={(e) => onChange('excludeWords', e.target.value)}
                                onKeyDown={handleKeyDown}
                                value={formData.excludeWords}
                            />
                        </Flex>
                    </Flex>
                </Flex>
            </SearchFilter.Control>
        </>
    );
};

export const hasWordConflict = (formData: SearchExtraFilterValue) => {
    const includeWords = commaedStirng2Array(formData.includeWords);
    const excludeWords = new Set(commaedStirng2Array(formData.excludeWords));

    return includeWords.some((word) => excludeWords.has(word));
}

const SearchExtraField = {
    render,
}

export default SearchExtraField;