import { TextButton, Typography } from '@atelier-mold/admin';

const ReqGlobalDataGuide = ({ t }) => {
    return (
        <div className="customMsgBox">
            <p className="txtRef">{t('globalData:message.guide.integrationInfo1')}</p>
            <p className="txtInfo">{t('globalData:message.guide.warn')}</p>
            <div className="bulletArea">
                <ul className="dotList gray">
                    <li>
                        <Typography className="txt" variant="body2" maxLines={0}>
                            {t('globalData:message.guide.integrationInfo2')}
                        </Typography>
                    </li>
                    <li>
                        <Typography className="txt" variant="body2" maxLines={0}>
                            {t('globalData:message.guide.integrationInfo3')}
                        </Typography>
                    </li>
                    <li>
                        <Typography className="txt" variant="body2" maxLines={0}>
                            {t('globalData:message.guide.integrationInfo4')}
                        </Typography>
                    </li>
                    <li>
                        <Typography className="txt" variant="body2" maxLines={0}>
                            {t('globalData:message.guide.integrationInfo5')}
                        </Typography>
                    </li>
                    <li>
                        <Typography className="txt" variant="body2" maxLines={0}>
                            {t('globalData:message.guide.slackChannel')}
                        </Typography>
                        <span className="btnUnderlineBox">
                            <TextButton size="xsmall">
                                <Typography className="underline" as="span" variant="body2" maxLines={0}>
                                    {t('globalData:message.guide.supportDataGov')}
                                </Typography>
                            </TextButton>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ReqGlobalDataGuide;
