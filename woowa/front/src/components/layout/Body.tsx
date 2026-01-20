// atelier-mold
import { Layout } from '@atelier-mold/admin';

// component
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ModalContainer from '@/components/modal/ModalContainer';

// page
import MyPage from '@/pages/MyPage';
import Main from '@components/layout/Main';

// util
import { useSessionInfo } from '@/hooks/session/SessionContext';
import AuthMenuUnauthorized from '../error/AuthMenuUnauthorized';
import ToastContainer from '../toast/ToastContainer';


/**
 * Body Component
 * @returns 
 */
const Body = () => {
    const location = useLocation();
    const [content, setContent] = useState<any>();

    const sessionInfo = useSessionInfo();

    useEffect(() => {
        let newContent = <Main />;
        if (location.pathname === '/') {
            const menuLength = sessionInfo.menuByAuthUser?.menus.length;
            if (menuLength === undefined || menuLength == 0) {
                newContent = <AuthMenuUnauthorized />;
            }
        }
        else if (location.pathname === '/admin') {
            const menuLength = sessionInfo.menuByAuthMgr?.menus.length;
            if (menuLength == undefined || menuLength == 0) {
                newContent = <AuthMenuUnauthorized />;
            }
        }
        else if (location.pathname === '/mypage' || location.pathname === '/admin/mypage') {
            newContent = <MyPage />;
        }

        setContent(newContent);
    }, [location.pathname]);

    return (
        <Layout.Container>
            {content}
            <ModalContainer />
            <ToastContainer />
        </Layout.Container>
    );
};
export default Body;
