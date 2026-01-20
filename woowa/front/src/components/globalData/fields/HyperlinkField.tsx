import { TFunction } from 'react-i18next';
import { Button, Form, IconButton, TextInput, Typography } from '@atelier-mold/admin';
import { DeleteIcon, RefreshIcon } from '@atelier-mold/admin/icons';
import { LinkInfo } from '@models/model/GlobalDataModel';

interface HyperlinkFieldProps {
    t: TFunction<'translation', undefined>;
    updateParams: (key: string, value: any) => void;
    multi?: boolean;
    field: string;
    value: LinkInfo[];
    description?: string;
}

const emptyItem = (): LinkInfo => ({ url: '', linkName: '' });

const isEmpty = (it: LinkInfo) => !it.url?.trim() && !it.linkName?.trim();

const normalizeForStore = (items: LinkInfo[]) => {
    if (items.length === 1 && isEmpty(items[0])) return [];
    return items;
};

const render = ({ t, value = [], updateParams, description, field, multi = false }: HyperlinkFieldProps) => {
    const uiItems: LinkInfo[] = value.length ? value : [emptyItem()];

    const setUiItems = (nextUiItems: LinkInfo[]) => {
        const nextValue = normalizeForStore(nextUiItems);
        updateParams(field, nextValue);
    };

    const handleUrlChange = (idx: number, nextUrl: string) => {
        setUiItems(uiItems.map((it, i) => (i === idx ? { ...it, url: nextUrl } : it)));
    };

    const handleLinkNameChange = (idx: number, nextName: string) => {
        setUiItems(uiItems.map((it, i) => (i === idx ? { ...it, linkName: nextName } : it)));
    };

    const handleReset = (idx: number) => {
        setUiItems(uiItems.map((it, i) => (i === idx ? emptyItem() : it)));
    };

    const handleAdd = () => setUiItems([...uiItems, emptyItem()]);

    const handleRemove = (idx: number) => {
        const next = uiItems.filter((_, i) => i !== idx);
        setUiItems(next.length ? next : [emptyItem()]);
    };

    return (
        <>
            <Form.Label width={140}>{t(`globalData:label.${field}`)}</Form.Label>
            <Form.Control>
                <div className="formCtrl">
                    {uiItems.map((it, idx) => (
                        <div key={idx}  className="formLoopBox">
                            <div className="formBlock">
                                <div className="formArea">
                                    <div className="formBox w-md">
                                        <TextInput
                                            width="100%"
                                            small
                                            placeholder={t(`globalData:message.placeholder.${field}`)}
                                            value={it.url}
                                            onChange={(e) => handleUrlChange(idx, e.target.value)}
                                        />
                                    </div>

                                    <IconButton
                                        color="ghost"
                                        label="되돌리기"
                                        shape="square"
                                        size="medium"
                                        type="button"
                                        onClick={() => handleReset(idx)}
                                    >
                                        <RefreshIcon />
                                    </IconButton>

                                    { idx > 0 && (
                                        <IconButton
                                            color="ghost"
                                            label="삭제"
                                            shape="square"
                                            size="medium"
                                            type="button"
                                            onClick={() => handleRemove(idx)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </div>
                            </div>

                            <div className="formBlock">
                                <div className="formArea w-md">
                                    <Typography className="shrink-0" as="p" variant="body2" maxLines={0}>
                                        {t(`globalData:label.hyperlink`)}
                                    </Typography>
                                    <div className="formBox">
                                        <TextInput
                                            width="100%"
                                            small
                                            placeholder={t(`globalData:message.placeholder.${field}Name`)}
                                            value={it.linkName}
                                            onChange={(e) => handleLinkNameChange(idx, e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {description && (
                                <div className="descBox">
                                    <Typography
                                        className="txt"
                                        as="p"
                                        variant="body2"
                                        color="fg_secondary"
                                        maxLines={0}
                                    >
                                        {description}
                                    </Typography>
                                </div>
                            )}
                        </div>
                    ))}

                    {multi && (
                        <div className="formBottom">
                            <div className="formArea">
                                <div className="btnBox">
                                    <Button variant="outline" color="secondary" type="button" onClick={handleAdd}>
                                        {t('globalData:button.addRefUrl')}
                                    </Button>
                                </div>
                                <div className="descBox">
                                    <Typography
                                        className="txt"
                                        as="p"
                                        variant="body2"
                                        color="fg_secondary"
                                        maxLines={0}
                                    >
                                        양식에 기재된 항목에 관련된 문서 링크 URL을 추가할 수 있어요.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Form.Control>
        </>
    );
};

const HyperlinkField = {
    render,
};

export default HyperlinkField;
