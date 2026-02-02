import { ReactNode, useCallback, useEffect, useState } from 'react';
import { TFunction } from 'react-i18next';

export interface FilterProps {
    t: TFunction<'translation', undefined>;
    label?: ReactNode;
    tooltip?: string;
}

type Params = { [key: string]: any };

const setForms = (params: Params, resetValue: Params) => {
    return Object.keys(resetValue).reduce((acc, key) => {
        acc[key] = params[key] ?? resetValue[key];
        return acc;
    }, {} as Params);
};

const useFilter = ({
    params,
    resetValue,
    trimFields = ['searchTable', 'includeWords', 'excludeWords'],
    setParams,
}: {
    params: Params;
    resetValue: Params;
    trimFields?: string[];
    setParams: (value: any) => void;
}) => {
    const [formData, setFormData] = useState<any>(() => setForms(params, resetValue));

    const trimValue = useCallback(() => {
        const trimmed = { ...formData };
        trimFields.forEach((field) => {
            if (!(field in trimmed)) return;
            const v = trimmed[field];
            if (typeof v === 'string') trimmed[field] = v.trim();
        });
        return trimmed;
    }, [formData, trimFields]);

    const handleChangeFormField = useCallback((key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    }, []);

    const handleChangeFormData = useCallback((newFormData: Params) => {
        setFormData((prev: any) => ({ ...prev, ...newFormData }));
    }, []);

    const handleResetForm = useCallback(() => {
        setFormData(resetValue);
    }, [resetValue]);

    const handleSubmit = useCallback(() => {
        const newParams = trimValue();
        setParams((prev: any) => ({ ...prev, ...newParams }));
    }, [setParams, trimValue]);

    useEffect(() => {
        setFormData(setForms(params, resetValue));
    }, [params, resetValue]);

    return {
        formData,
        handleChangeFormField,
        handleChangeFormData,
        handleResetForm,
        handleSubmit,
    };
};

export default useFilter;
