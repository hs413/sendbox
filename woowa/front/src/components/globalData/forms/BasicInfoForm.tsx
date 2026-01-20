import { AssistiveText, DatePicker, Flex, Form, TextInput, Tooltip, Typography } from '@atelier-mold/admin';
import WFTextarea from '@components/textarea/WFTextarea';
import { ChangeEvent, forwardRef, useEffect, useRef } from 'react';
import { CircleHelpIcon } from '@atelier-mold/admin/icons';
import { GlobalDataFormProps } from '@models/model/GlobalDataModel';
import { useAppSelector } from '@/hooks/useRedux';
import { selectCodeList } from '@reducers/codeSlice';
import { GroupCodeType } from '@models/common/Constants';
import HyperlinkField from '@components/globalData/fields/HyperlinkField';

const BasicInfoForm =forwardRef( ({ t, params, updateParams, errors, formRefs }: GlobalDataFormProps) => {
    const tooltipCustomText = (
        <div className="tooltipCustomBox">
            <ul className="dotList">
                <li>
                    <Typography className="txt" variant="body2" maxLines={0}>
                        {t('globalData:tooltip.streamType')}
                    </Typography>
                </li>
                <li>
                    <Typography className="txt" variant="body2" maxLines={0}>
                        {t('globalData:tooltip.batchType1')} <br />
                        {t('globalData:tooltip.batchType2')}
                    </Typography>
                </li>
                <li>
                    <Typography className="txt" variant="body2" maxLines={0}>
                        {t('globalData:tooltip.empty')}
                    </Typography>
                </li>
            </ul>
        </div>
    );

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const timerRef = useRef<number | null>(null);

    // 희망일정
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const headers = useAppSelector(selectCodeList(GroupCodeType.REQ_GCP_DESC_HEADER)).map((r) => `● ${r.codeNm} : `);

    const handleChangePurpose = (e: ChangeEvent<HTMLInputElement>) => {
        updateParams('purpose', e.target.value);
    };

    const handleChangeHopeDt = (date: any) => {
        updateParams('hopeDt', date);
    };

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        const flush = () => {
            updateParams('description', el.value);
        };

        const onInput = () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(flush, 300);
        };

        el.addEventListener('input', onInput);

        return () => {
            el.removeEventListener('input', onInput);
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, [updateParams]);

    return (
        <div className="formCardArea">
            <Form vertical={false}>
                <div className="formCardHeader">
                    <Flex className="titBox">
                        <Typography className="tit" as="h4" variant="body1" weight="bold" maxLines={0}>
                            {t('globalData:title.default')}
                        </Typography>
                    </Flex>
                </div>

                <div className="formCardBody">
                    {/* 목적 */}
                    <Form.Field>
                        <Form.Label width={140} is="required">
                            {t('globalData:label.purpose')}
                        </Form.Label>
                        <Form.Control>
                            <div className="formCtrl">
                                <div className="formBlock">
                                    <div className="formArea">
                                        <div className="formBox w-md">
                                            <TextInput
                                                ref={(e) => (formRefs.current['purpose'] = e)}
                                                small
                                                width="100%"
                                                placeholder="목적을 입력하세요."
                                                value={params.purpose}
                                                onChange={handleChangePurpose}
                                                invalid={!!errors?.purpose}
                                            ></TextInput>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form.Control>
                        <Form.Message  asError match={() => errors?.purpose != undefined}>
                            <div className="msgArea">
                                <AssistiveText variant='invalid'>{errors?.purpose?.message}</AssistiveText>
                            </div>
                        </Form.Message>
                    </Form.Field>

                    {/* 논의채널 */}
                    <Form.Field>
                        {HyperlinkField.render({
                            t,
                            updateParams,
                            field: 'discussionChannel',
                            value: params?.discussionChannel,
                            description: 'DH와 논의가 이뤄지는 채널이 있다면 알려주세요.',
                        })}
                    </Form.Field>

                    {/* 보안검토 결과 */}
                    <Form.Field>
                        {HyperlinkField.render({
                            t,
                            updateParams,
                            field: 'securityReviewUrl',
                            value: params?.securityReviewUrl,
                            description: 'DH와 논의가 이뤄지는 채널이 있다면 알려주세요.',
                        })}
                    </Form.Field>

                    {/* 희망일정 */}
                    <Form.Field>
                        <Form.Label width={140} is="required">
                            {t('globalData:label.hopeDt')}
                        </Form.Label>
                        <Form.Control>
                            <div className="formCtrl">
                                <div className="formBlock">
                                    <div className="formArea">
                                        <div className="periodBox">
                                            <div className="datePickerBox">
                                                <DatePicker
                                                    width={400}
                                                    onDateChange={handleChangeHopeDt}
                                                    range={false}
                                                    weekStartsOn="월"
                                                    value={params.hopeDt ? new Date(params.hopeDt) : tomorrow}
                                                    disable={{
                                                        before: tomorrow,
                                                    }}
                                                >
                                                    <DatePicker.Trigger width="100%" small placeholder="YYYY-MM-DD" />
                                                </DatePicker>
                                            </div>
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
                                        희망일정은 오늘 이후 입력 가능합니다. DH와 주요 과제의 경우 Critical 한 일정을
                                        알려주세요.
                                    </Typography>
                                </div>
                            </div>
                        </Form.Control>
                        {/*<Form.Message>*/}
                        {/*    <div className="msgArea">*/}
                        {/*        <AssistiveText variant='invalid'>에러 메세지1</AssistiveText>*/}
                        {/*    </div>*/}
                        {/*</Form.Message>*/}
                    </Form.Field>

                    {/* 요청내용 설명*/}
                    <Form.Field>
                        {/* 퍼블수정 20260115 - 문구수정 */}
                        <Form.Label width={140} is="required">
                            {t('globalData:label.reqContent')}
                        </Form.Label>
                        <Form.Control>
                            <div className="formCtrl">
                                <div className="formBlock">
                                    <div className="formArea">
                                        <div className="formBox">
                                            <WFTextarea
                                                ref={textareaRef}
                                                headers={headers}
                                                rows={15}
                                                value={params.description || undefined}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="descBox flexList">
                                    <Tooltip content={tooltipCustomText}>
                                        <CircleHelpIcon size={16} color="fg_secondary" />
                                        <Typography
                                            as="span"
                                            variant="body2"
                                            weight="regular"
                                            color="fg_secondary"
                                            maxLines={0}
                                        >
                                            targer(source) 위치
                                        </Typography>
                                    </Tooltip>
                                </div>
                            </div>
                        </Form.Control>
                        {/*<Form.Message>
                                    <div className="msgArea">
                                        <AssistiveText variant='invalid'>에러 메세지1</AssistiveText>
                                    </div>
                                </Form.Message>*/}
                    </Form.Field>
                </div>
            </Form>
        </div>
    );
});
export default BasicInfoForm;
