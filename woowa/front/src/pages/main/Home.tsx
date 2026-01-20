import NoticeCard from './component/NoticeCard';
import MyRequestCard from './component/MyRequestCard';
import TopDictionaryCard from './component/TopDictionaryCard';
import DataTipCardSwiper from './component/DataTipCardSwiper';
import RecommendedKnowledgeCard from './component/RecommendedKnowledgeCard';
import { useTranslation } from 'react-i18next';
import SystemMapCard from '@pages/user/main/component/SystemMapCard';

const Home = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="contentsArea main typeVertical">
                <SystemMapCard />

                <div className="dashboardArea">
                    {/* Caes : Top5 사전 */}
                    <TopDictionaryCard />

                    {/* Caes : 나의 요청 현황 */}
                    <MyRequestCard />

                    {/* Caes : 데이터 활용 팁(Swiper) */}
                    <DataTipCardSwiper />

                    {/* Caes : Biz 용어 개요 */}
                    <RecommendedKnowledgeCard />

                    {/* Caes : 공지사항 */}
                    <NoticeCard />
                </div>
            </div>
        </>
    );
};
export default Home;
