// atelier-mold
import { AtelierRoot, GNB, Layout, ServiceHeader } from '@atelier-mold/admin';

// component
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import ErrorAppBoundary from '@/components/error/ErrorAppBoundary';
import Body from '@components/layout/Body';
import Header from '@components/layout/Header';

// hook
import useMenus from '@/hooks/useMenus';

// util


/**
 * Root Layout
 * 
 * @returns 
 */
const RootLayout = () => {
    const location = useLocation();
    // const navigate = useNavigate();

    // const sessionUtil = new SessionUtil();
    const pathname = location.pathname.replace(/\/\s*$/, '');
    const isPopup = pathname.includes('/popup');

    // gnb state
    const [isGnbOpen, setIsGnbOpen] = useState(true);
    const menus = useMenus();

    // // TODO: 팝업이 있을 시 추후 적용
    // const handleNaviLink = (e: any, menu: any) => {
    //     if (menu.menuUrl.includes('/popup')) {
    //         e.preventDefault();
    //         sessionUtil.setLocalStorageInfo(useSessionInfo());

    //         openPopup(`/popup${menu.menuUrl}`);
    //     }
    // };

    return (
        <>
            {isPopup ? (
                <ErrorBoundary fallback={<ErrorAppBoundary />}>
                    <Outlet />
                </ErrorBoundary>
            ) : (
                <AtelierRoot>
                    <ErrorBoundary fallback={<ErrorAppBoundary />}>
                    <Layout
                        gnbControl={{
                            isGnbOpen,
                            setIsGnbOpen,
                        }}
                    >
                        <Layout.ServiceHeader>
                            <ServiceHeader>
                                <Header />
                            </ServiceHeader>
                        </Layout.ServiceHeader>
                        <Layout.Main>
                            <Layout.Gnb>
                                <GNB menus={menus} open={true} />
                            </Layout.Gnb>
                            <Layout.Body>
                                {/* div.fullWidth - 컨텐츠영역 최대 너비 100% */}
                                <div className="fullWidth">
                                    <Body />
                                </div>
                            </Layout.Body>
                        </Layout.Main>
                    </Layout>
                    </ErrorBoundary>
                </AtelierRoot>
            )}
        </>
    );
};
export default RootLayout;
