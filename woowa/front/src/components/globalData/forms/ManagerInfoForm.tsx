import { Flex, Form, TextInput, Typography } from '@atelier-mold/admin';
import { GlobalDataFormProps } from '@pages/user/req/global-data/hooks/useGlobalDataForm';

const ManagerInfoForm = ({ t, params, updateParams }: Pick<GlobalDataFormProps, 't' | 'params' | 'updateParams'>) => {


    return (
        <>
            <div className="formCardArea">
                <Form vertical={false}>
                    <div className="formCardHeader">
                        <Flex className="titBox">
                            <Typography className="tit" as="h4" variant="body1" weight="bold" maxLines={0}>
                                {t('globalData:title.manager')}
                            </Typography>
                        </Flex>
                    </div>

                    <div className="formCardBody">
                        {/* DH */}
                        <Form.Field>
                            <Form.Label width={140} is="required">
                                {t('globalData:label.dhManager')}
                            </Form.Label>
                            <Form.Control>
                                <div className="formCtrl">
                                    <div className="formBlock">
                                        <div className="formArea">
                                            {/* 20260116 클래스명 w-md 추가 */}
                                            <div className="formBox w-md">
                                                <TextInput
                                                    width="100%"
                                                    small
                                                    placeholder="DH를 입력하세요."
                                                    value={params?.dhManager}
                                                    onChange={(e) => updateParams('dhManager', e.target.value)}
                                                ></TextInput>
                                            </div>
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
                    </div>
                </Form>
            </div>
        </>
    );
};

export default ManagerInfoForm;