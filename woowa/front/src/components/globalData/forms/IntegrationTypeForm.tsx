import { ChangeEvent, useEffect, useMemo, useRef } from 'react';

import { useAppSelector } from '@/hooks/useRedux';

import { GlobalDataFormProps } from '@models/model/GlobalDataModel';
import { GroupCodeType } from '@models/common/Constants';

import { selectCodeList } from '@reducers/codeSlice';

import { Flex, Form, Radio, RadioGroup, Select, Typography } from '@atelier-mold/admin';
import WFTextarea from '@components/textarea/WFTextarea';
import HyperlinkField from '@components/globalData/fields/HyperlinkField';

enum METHOD_TYPE {
    BATCH = 'BATCH',
}

const IntegrationTypeForm = ({
    t,
    params,
    updateParams,
}: Pick<GlobalDataFormProps, 't' | 'params' | 'updateParams'>) => {
    const headers = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_INTEGRATION_TYPE))
        .filter((r) => {

            const a = [params?.integrationMethod || '', params?.zeppelinStatus || ''].filter(Boolean).join('_');

            return r.codeDsc.split(' | ').some(b => b === a);
        })
        .map((r) => `● ${r.codeNm} : `);

    const directionOptions = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_INTEGRATION_DIRECTION));

    const methods = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_INTEGRATION_METHOD));
    const methodOptions = useMemo(() => {
        const direction = params?.integrationDirection || 'WOOWA_TO_DH';

        return methods.filter(r => r.codeDsc.includes(direction));
    }, [params?.integrationDirection])

    const zeppelinOptions = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_ZEPPELIN_STATUS));

    const integrationRef = useRef<HTMLTextAreaElement>(null);
    const integrationTimerRef = useRef<number | null>(null);



    useEffect(() => {
        const el = integrationRef.current;
        if (!el) return;

        const flush = () => {
            updateParams('integrationSpec', el.value);
        };

        const onInput = () => {
            if (integrationTimerRef.current) window.clearTimeout(integrationTimerRef.current);
            integrationTimerRef.current = window.setTimeout(flush, 300);
        };

        el.addEventListener('input', onInput);

        return () => {
            el.removeEventListener('input', onInput);
            if (integrationTimerRef.current) window.clearTimeout(integrationTimerRef.current);
        };
    }, [updateParams]);

    const handleDirectionChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateParams('integrationDirection', e.target.value);
        updateParams('integrationMethod', METHOD_TYPE.BATCH);
        updateParams('zeppelinStatus', 'Y');
    };

    const handleMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        updateParams('integrationMethod', value);

        if (value === METHOD_TYPE.BATCH) {
            updateParams('zeppelinStatus', 'Y');
        } else {
            updateParams('zeppelinStatus', '');
        }
    };

    const handleZeppelinChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateParams('zeppelinStatus', e.target.value);
    };

    return (
        <div className="formCardArea">
            <Form vertical={false}>
                <div className="formCardHeader">
                    <Flex className="titBox">
                        <Typography className="tit" as="h4" variant="body1" weight="bold" maxLines={0}>
                            {t('globalData:title.integration')}
                        </Typography>
                    </Flex>
                </div>

                <div className="formCardBody">
                    {/* 방향 */}
                    <Form.Field>
                        <Form.Label width={140} is="required">
                            {t('globalData:label.integrationDirection')}
                        </Form.Label>
                        <Form.Control>
                            <div className="formCtrl">
                                <div className="formBlock">
                                    <div className="formArea">
                                        <RadioGroup
                                            name="direction"
                                            value={params?.integrationDirection}
                                            onChange={handleDirectionChange}
                                        >
                                            <div className="radioBox">
                                                {directionOptions.map((r) => (
                                                    <Radio
                                                        small
                                                        id={`direction-${r.codeId}`}
                                                        key={`direction-${r.codeId}`}
                                                        value={r.codeId}
                                                    >
                                                        {r.codeNm}
                                                    </Radio>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </Form.Control>
                        {/*<Form.Message>
                            <div className="msgArea">
                                <AssistiveText variant="invalid">에러 메세지1</AssistiveText>
                            </div>
                        </Form.Message>*/}
                    </Form.Field>

                    {/* 방식 */}
                    <Form.Field>
                        <Form.Label width={140} is="required">
                            {t('globalData:label.integrationMethod')}
                        </Form.Label>
                        <Form.Control>
                            <div className="formCtrl">
                                <div className="formBlock">
                                    <div className="formArea">
                                        <div className="formBox w-sm">
                                            <Select
                                                placeholder="선택"
                                                small
                                                width="100%"
                                                name="integrationMethod"
                                                onChange={handleMethodChange}
                                                value={params?.integrationMethod}
                                            >
                                                {methodOptions.map((r) => (
                                                    <Select.Option value={r.codeId} key={r.codeId}>
                                                        {r.codeNm}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </div>

                                        {params.integrationMethod === METHOD_TYPE.BATCH && (
                                            <div className="flexList">
                                                <Typography className="shrink-0" as="p" variant="body2" maxLines={0}>
                                                    제플린 데이터 여부
                                                </Typography>

                                                <RadioGroup
                                                    name="zpl"
                                                    value={params?.zeppelinStatus}
                                                    onChange={handleZeppelinChange}
                                                >
                                                    <div className="radioBox">
                                                        {zeppelinOptions.map((r) => (
                                                            <Radio
                                                                small
                                                                id={`zpl-${r.codeId}`}
                                                                key={`zpl-${r.codeId}`}
                                                                value={r.codeId}
                                                            >
                                                                {r.codeNm}
                                                            </Radio>
                                                        ))}
                                                    </div>
                                                </RadioGroup>
                                                <div className="radioBox">

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Form.Control>
                        {/*<Form.Message>*/}
                        {/*    <div className="msgArea">*/}
                        {/*        <AssistiveText variant='invalid'>에러 메세지1</AssistiveText>*/}
                        {/*    </div>*/}
                        {/*</Form.Message>*/}
                    </Form.Field>

                    {/* 양식 : 퍼블수정 20260115 - 마크업변경 */}
                    <Form.Field>
                        <Form.Label width={140} is="required">
                            {t('globalData:label.integrationSpec')}
                        </Form.Label>
                        <Form.Control>
                            <div className="formCtrl">
                                <div className="formBlock">
                                    <div className="formArea">
                                        <div className="formBox">
                                            <WFTextarea
                                                ref={integrationRef}
                                                headers={headers}
                                                rows={15}
                                                value={params.integrationSpec || undefined}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="descBox">
                                    <Typography
                                        className="txt"
                                        as="p"
                                        variant="body2"
                                        color="fg_secondary"
                                        maxLines={0}
                                    >
                                        양식에 기재된 항목 포함한 템플릿이 필요해요.
                                    </Typography>
                                </div>
                            </div>
                        </Form.Control>
                        {/*<Form.Message>
                            <div className="msgArea">
                                <AssistiveText variant="invalid">에러 메세지1</AssistiveText>
                            </div>
                        </Form.Message>*/}
                    </Form.Field>

                    <Form.Field>
                        {HyperlinkField.render({
                            t,
                            updateParams,
                            field: 'refUrl',
                            value: params?.refUrl,
                            multi: true,
                        })}
                    </Form.Field>
                </div>
            </Form>
        </div>
    );
};

export default IntegrationTypeForm;
