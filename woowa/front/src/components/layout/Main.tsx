import { Chip, Flex, PageHeader, Spacer, Typography } from '@atelier-mold/admin';

// icon
import { RatingEmptyIcon, RatingFullIcon } from '@atelier-mold/admin/icons';

// component
import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import HistoryTab from '@/components/tab/HistoryTab';

// 댓글layer
import ReqComment from '@/components/reqComment';

// hook
import useBookmark from '@/hooks/useBookmark';
import useCommonButton from '@/hooks/useCommonButton';
import useHistory from '@/hooks/useHistory';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import useReqComment from '@/hooks/useReqComment';
import { selectContextPath } from '@/reducers/authSlice';
import { selectBookmarkList, selectMenuList, setBookmarkList } from '@/reducers/menuSlice';

// model
import { useBookmarkList, useCreateBookmark, useDeleteBookmark } from '@/hooks/queries/useBookmarkQueries';
import { usePing } from '@/hooks/queries/usePingQueries';
import { ContextPath } from '@/models/common/Constants';
import { HistoryInfo } from '@/models/common/History';

// util
import { useSessionInfo } from '@/hooks/session/SessionContext';
import { showToast } from '@/utils/FuncUtil';
import { findMenuById, findMenuRecursive, findStartsWithMenuRecursive } from '@/utils/MenuUtil';
import SessionUtil from '@utils/SessionUtil';
import CommentFallback from '@components/fallback/CommentFallback';

/**
 * Main Component
 *
 * @returns
 */
const Main = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const menuList = useAppSelector(selectMenuList());
    const bookmarkList = useAppSelector(selectBookmarkList());
    const contextPath = useAppSelector(selectContextPath());

    const sessionUtil = new SessionUtil();
    const sessionInfo = useSessionInfo();
    const [searchParams] = useSearchParams();

    // pageHistory
    const [pageHistory, setPageHistory] = useState<HistoryInfo[]>(
        contextPath === ContextPath.ADMIN ? sessionUtil.getAdminHistory() : sessionUtil.getHistory()
    );

    // history hook
    const history = useHistory(pageHistory, setPageHistory);

    // menu
    const pathname = location.pathname;
    const pathquery = location.search;

    let menuObj = findMenuRecursive(menuList, pathname);
    if (!menuObj && pathname !== '/' && pathname !== '/admin') {
        menuObj = findStartsWithMenuRecursive(menuList, pathname);
    }

    let pMenuObj = findMenuById(menuList, menuObj?.upMenuId);
    let menuName = menuObj?.menuNm;

    let canBookmark = true;
    let isListPage = true;
    let isDetailPage = false;

    let isUserMain = pathname === '/' ? true : false;
    let isAdminMain = pathname === '/admin' ? true : false;
    let isTotalSearch = pathname === '/search' ? true : false;
    let isApproval = pathname === '/approval' ? true : false;
    let isNotification = pathname === '/notification' ? true : false;

    // // TODO: 1-1차 오픈에는 즐겨찾기버튼 숨김처리. 이 라인을 없애면 정상적으로 다시 동작
    // canBookmark = false;

    // 관리자페이지 여부
    const isAdminPage = contextPath === ContextPath.ADMIN ? true : false;

    const bpath = pathname.substring(0, pathname.lastIndexOf('/'));
    let epath = 'list';

    // 리스트 페이지가 아닌 경우
    if (pathname !== menuObj?.menuUrl && pathname + pathquery !== menuObj?.menuUrl) {
        canBookmark = false;
        isListPage = false;

        epath = pathname.substring(pathname.lastIndexOf('/') + 1);
        menuObj = findMenuRecursive(menuList, bpath);
        pMenuObj = findMenuById(menuList, menuObj?.upMenuId);

        const tempMenuNm = menuObj?.menuNm;
        const tempSubNm = epath.startsWith('word-') ? '단어' : epath.startsWith('term-') ? '용어' : '';

        if (epath == 'reg' || epath.endsWith('-reg')) {
            menuName = tempMenuNm + ` ${tempSubNm} 등록`;
        } else if (epath == 'edit' || epath.endsWith('-edit')) {
            menuName = tempMenuNm + ` ${tempSubNm} 수정`;
        } else if (epath == 'detail' || epath.endsWith('-detail')) {
            isDetailPage = true;
            menuName = tempMenuNm + ` ${tempSubNm} 상세`;
        } else if (epath == 'info' || epath.endsWith('-info')) {
            menuName = ` ${pMenuObj?.menuNm} 정보`;
        }
    }

    // 즐겨찾기 버튼
    const [isBookmark, setIsBookmark] = useState(false);

    const {
        data: qmResponse,
        isSuccess: qmIsSuccess,
        isError: qmError,
        refetch: qmRefetch,
    } = useBookmarkList(sessionInfo.userId);
    const { data: cqResponse, isSuccess: cqIsSuccess, isError: cqIsError, mutate: cqMutate } = useCreateBookmark();
    const { data: dqResponse, isSuccess: dqIsSuccess, isError: dqIsError, mutate: dqMutate } = useDeleteBookmark();

    const { data: pingResponse, refetch: pingRefetch } = usePing();

    const toggleBookmark = () => {
        if (isBookmark) {
            dqMutate({
                userId: sessionInfo.userId,
                menuId: menuObj.menuId,
            });
        } else {
            cqMutate({
                userId: sessionInfo.userId,
                menuId: menuObj.menuId,
            });
        }
    };

    // 조회된 북마크 리스트에 현재 페이지가 포함되어 있다면
    useEffect(() => {
        setIsBookmark(bookmarkList.find((item) => item.menuId === menuObj?.menuId));
    }, [bookmarkList, menuObj]);

    // 북마크 관련 응답처리
    useEffect(() => {
        if (qmError || qmResponse?.successOrNot === 'N') {
            //showToast('', t('bookmark.toast.error.list'), { type: 'warning' });
        } else if (qmIsSuccess) {
            if (qmResponse?.data) {
                dispatch(setBookmarkList(qmResponse.data.menus));
            }
        }
    }, [qmResponse, qmIsSuccess, qmError, dispatch]);

    useEffect(() => {
        if (cqIsError || cqResponse?.successOrNot === 'N') {
            showToast('', t('bookmark.toast.error.create'), { type: 'warning' });
        } else if (cqIsSuccess) {
            showToast('', t('bookmark.toast.success.create'), { type: 'success' });
            qmRefetch();
        }
    }, [cqResponse, cqIsSuccess, cqIsError, qmRefetch, dispatch]);

    useEffect(() => {
        if (dqIsError || dqResponse?.successOrNot === 'N') {
            showToast('', t('bookmark.toast.error.delete'), { type: 'warning' });
        } else if (dqIsSuccess) {
            showToast('', t('bookmark.toast.success.delete'), { type: 'warning' });
            qmRefetch();
        }
    }, [dqResponse, dqIsSuccess, dqIsError, qmRefetch, dispatch]);

    useEffect(() => {
        // 페이지 이동 시 스크롤 최상단으로 이동
        window.scrollTo(0, 0);

        // 모든 input, textarea에 autocomplete=off 적용
        const els = document.querySelectorAll('form, input, textarea');
        els.forEach((el) => {
            el.removeAttribute('autocomplete');
            el.setAttribute('autocomplete', 'off');
        });
    }, [pathname]); // pathname이 변경될 때마다 실행

    // 사용자별 bookmark 조회
    useBookmark(sessionInfo.userId);

    type titleInfoType = {
        menuNm?: string;
        subMenuNm?: string;
    };

    // 공통버튼 Hook
    const commonButton = useCommonButton();

    // 페이지제목
    const [titleInfo, setTitleInfo] = useState<titleInfoType>({});

    const resetCommonValue = () => {
        setTitleInfo({});

        commonButton.resetButtonAll();
    };

    // 댓글layer
    const reqComment = useReqComment();

    const [isOpenCmnComments, setOpenCmnComments] = useState(false);

    function handleCmnCommentsClose () {
        setOpenCmnComments(false);
    }

    useLayoutEffect(() => {
        //메뉴 이동 시 titleInfo, common button handler 초기화
        resetCommonValue();

        reqComment.close();

        // Detail페이지는 required 제거
        if (isDetailPage) {
            const els = document.querySelectorAll('.contentsArea .formCardArea form .formCardBody svg g#LabelItem');
            els.forEach((el) => {
                if (el.parentElement && el.parentElement.tagName.toLowerCase() === 'svg') {
                    el.parentElement.remove();
                }
            });
        }

        // server ping
        //console.log('mount ping');
        const intervalId = setInterval(() => {
            //console.log('ping:', pingResponse);
            pingRefetch();
        }, 25 * 60 * 1000); // 베타에서 1시간30분으로 유지됨, 운영에서는 25분

        return () => {
            //console.log('unmount ping');
            clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
        };
    }, [location.pathname]);

    /**
     * Breadcrumb 변경
     */
    let breadcrumb = [
        { path: pMenuObj?.menuUrl, label: pMenuObj?.menuNm },
        { path: menuObj?.menuUrl, label: menuObj?.menuNm, onClick: (path: any) => navigate(path) },
    ];

    /**
     * 1depth 제거 목록
     *
     * 데이터 표준사전 > 표준 종합 사전 ( 다시 표기함 )
     * 표준 KPI 조회 > 지표 조회
     * KPI 관리 > 지표 관리
     */
    if (
        /*pathname === '/data-discovery/std-area/term-list' ||*/
        pathname === '/kpi/index/detail' ||
        pathname === '/kpi-management/index/detail' ||
        pathname.startsWith('/notification')
    ) {
        breadcrumb = [{ path: menuObj?.menuUrl, label: menuObj?.menuNm, onClick: (path: any) => navigate(path) }];
    }
    //표준 종합 사전 > 용어 목록
    if (pathname === '/data-discovery/std-area/term-detail') {
        const wordId = searchParams.get('wordId');

        breadcrumb = [
            { path: menuObj?.menuUrl, label: menuObj?.menuNm, onClick: (path: any) => navigate(path) },
            {
                path: `/data-discovery/std-area/term-list?wordId=${wordId}`,
                label: '용어 목록',
                onClick: (path: any) => navigate(path),
            },
        ];
    }

    if (pathname === '/monitoring/governance') {
        breadcrumb = []; // list 페이지에서는 breadcrumb 숨김
    }

    // 거버넌스 모니터링 상세/수정 페이지들
    if (pathname.startsWith('/monitoring/governance/')) {
        const pathParts = pathname.split('/');
        const type = pathParts[3];
        const schemaNm = pathParts[4];
        const tblNm = pathParts[5];
        const stanDate = pathParts[6];

        const tabLabels = {
            'std-non-act': '표준화 미수행',
            'std-disagree': '표준 불일치',
            'non-table': '테이블 미생성 모델',
            'del-table': '삭제 테이블',
        };

        const isEditPage = type.includes('-edit');
        const baseType = isEditPage ? type.replace('-edit', '') : type;

        // 디테일 페이지인지 확인 (edit이 아닌 페이지)
        const isDetailPage = !isEditPage;

        breadcrumb = [
            { path: menuObj?.menuUrl, label: menuObj?.menuNm, onClick: (path: any) => navigate(path) },
            {
                path: `/monitoring/governance`,
                label: '거버넌스 모니터링',
                onClick: (path: any) => navigate(path),
            },
        ];

        // 디테일 페이지에서만 탭 추가
        if (isDetailPage) {
            breadcrumb.push({
                path: `/monitoring/governance/${baseType}/${schemaNm}/${tblNm}/${stanDate}`,
                label: tabLabels[baseType as keyof typeof tabLabels],
                onClick: (path: any) => navigate(path),
            });
        }

        if (isEditPage) {
            breadcrumb.push({
                path: `/monitoring/governance/${type}/${schemaNm}/${tblNm}/${stanDate}/edit`,
                label: `${tabLabels[baseType as keyof typeof tabLabels]}` + ` ` + '수정',
                onClick: (path: any) => navigate(path),
            });
        }
    }

    //결재선
    if (pathname.startsWith('/approval')) {
        const menuNm = '결재함';

        breadcrumb = [{ path: '/approval', label: menuNm, onClick: (path: any) => navigate(path) }];
    }

    const context = {
        ...commonButton,

        setTitleInfo: setTitleInfo,
        setOpenCmnComments: setOpenCmnComments,
        resetCommonValue: resetCommonValue,

        menuNm: menuName,
        breadcrumb: breadcrumb,
        bookmark: bookmarkList,
        history: history,
        reqComment: reqComment,
    };

    // list, main인 경우에는 breadcrumb를 삭제
    if (isListPage || isUserMain || isAdminMain || isTotalSearch || isApproval || isNotification) {
        context.breadcrumb = [];
    }

    // gov-monitoring edit/detail 페이지에서 breadcrumb의 첫 번째 항목 제거 (첫 번째 > 기호 제거)
    if (
        pathname.startsWith('/monitoring/governance/') &&
        (pathname.includes('-edit') ||
            pathname.includes('-non-act') ||
            pathname.includes('-disagree') ||
            pathname.includes('-non-table') ||
            pathname.includes('-del-table') ||
            pathname.includes('/std-non-act/') ||
            pathname.includes('/std-disagree/') ||
            pathname.includes('/non-table/') ||
            pathname.includes('/del-table/'))
    ) {
        if (context.breadcrumb.length > 0) {
            context.breadcrumb = context.breadcrumb.slice(1);
        }
    }

    

    return (
        <>
            <HistoryTab data={pageHistory} setter={setPageHistory} />

            {/* 댓글layer : 플로팅댓글 열렸을때 .on 추가, 닫혔을때 제거 */}
            <div className={`colDivide ${reqComment.isOpen ? 'on':''} `}>
            {/*<div className={`colDivide ${isOpenCmnComments ? 'on':''} `}>*/}
                <div className="colLeft">

                    {/* 20250402 퍼블수정 - Spacer 항시노출
                    {isListPage && <Spacer y="400" />} 
                    */}
                    <Spacer y="400" />

                    {/* pageHeader */}
                    <PageHeader>
                        <PageHeader.Breadcrumb items={context.breadcrumb} />
                        <PageHeader.Title>
                            <Flex flexDirection="column">
                                <Typography className="subTit" as="p" variant="title1" weight="bold" maxLines={0}>
                                    {titleInfo?.menuNm ? titleInfo.menuNm : context.menuNm}
                                </Typography>
                                <Typography className="subTit" as="p" variant="title1" weight="regular" maxLines={0}>
                                    {titleInfo?.subMenuNm ? titleInfo.subMenuNm : ''}
                                </Typography>
                            </Flex>

                            {canBookmark && !isAdminPage && (
                                // <Button variant='fill' color='white' size='small' onClick={toggleBookmark} >
                                //     <Button.Left>
                                //         {isBookmark ? <RatingFullIcon /> : <RatingEmptyIcon />}
                                //     </Button.Left>
                                // </Button>
                                <Flex>
                                    <Spacer x="200" />
                                    <Chip selected={!!isBookmark} onClick={toggleBookmark}>
                                        <Chip.Left>{isBookmark ? <RatingFullIcon /> : <RatingEmptyIcon />}</Chip.Left>
                                        즐겨찾기
                                    </Chip>
                                </Flex>
                            )}
                        </PageHeader.Title>
                        <PageHeader.Description> </PageHeader.Description>
                        <PageHeader.Right>
                            <Flex gap="100">{commonButton.renderTopButtonLayout(bpath, epath, pathname)}</Flex>
                        </PageHeader.Right>
                    </PageHeader>

                    <Spacer y="300" />
                    {/* //pageHeader */}

                    <Outlet context={context} />
                </div>

                <div className="colRight">
                    {reqComment.isOpen && reqComment.refId && reqComment.type && (
                        <Suspense fallback={<CommentFallback />}>
                            <ReqComment
                                onClose={reqComment.close}
                                refKey={reqComment.refKey}
                                refId={reqComment.refId}
                                type={reqComment.type}
                                reason={reqComment.reason}
                                hasAdminRole={reqComment.hasAdminRole}
                                setCount={reqComment.setCount}
                            />
                        </Suspense>
                    )}
                    {/*<ReqComment*/}
                    {/*    onClose={reqComment.close}*/}
                    {/*    refId="00000198-1731-6f61-017d-3c32a7f0172d"*/}
                    {/*    type={ReqCommentType.REQUEST}*/}
                    {/*/>*/}
                    {/*<ReqComment*/}
                    {/*    onClose={handleCmnCommentsClose}*/}
                    {/*    refId="00000198-1731-6f61-017d-3c32a7f0172d"*/}
                    {/*    type={ReqCommentType.REQUEST}*/}
                    {/*/>*/}
                </div>
            </div>

            {commonButton.renderBottomButtonLayout(bpath, epath, pathname)}
        </>
    );
};

export default Main;
