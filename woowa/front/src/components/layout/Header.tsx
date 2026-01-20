// atelier-mold
import LogoImg from '@/assets/images/logo-v1.svg';
import { IconButton, ServiceHeader, TextInput, Typography } from '@atelier-mold/admin';
import { SearchIcon } from '@atelier-mold/admin/icons';

// component
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// model
import { ContextPath, ModalType } from '@/models/common/Constants';

// hook
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { selectContextPath } from '@/reducers/authSlice';
import { openModal } from '@/reducers/modalSlice';

// util
import SessionUtil from '@/utils/SessionUtil';
import SessionApis from '@api/common/SessionApis';

// modal
import SitemapModal from '@/components/modal/SitemapModal';
import { useSessionInfo } from '@/hooks/session/SessionContext';


/**
 * Header Component
 *
 * @returns
 */
const Header = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [totalSearchValue, setTotalSearchValue] = useState('');
	const searchRef = useRef<HTMLInputElement>(null);
	const [openSitemap, setOpenSitemap] = useState(false);

	const sessionApis = new SessionApis();
	const sessionUtil = new SessionUtil();

    const sessionInfo = useSessionInfo();
	const contextPath = useAppSelector(selectContextPath());

	// 검색영역 포커스 상태값
	const [isSearchFocused, setSearchFocused] = useState(false);

	const env = import.meta.env.VITE_APP_NODE_ENV;

	// home
	const goToHome = () => {
		navigate(contextPath);
	};

	// mypage
	const goToMyPage = () => {
		navigate(`${contextPath}/mypage`);
	};

	const goToApproval = () => {
		navigate(`${contextPath}/approval`);
	};

	const goToNotification = () => {
		navigate(`${contextPath}/notification`);
	};
	const goToAdmin = () => {
		navigate(`${contextPath}/admin`);
		window.location.reload();
	};
	const goToUser = () => {
		window.location.href = '/';
	};
	// logout
	const handleLogout = () => {
		dispatch(
			openModal({
				type: ModalType.CONFIRM,
				title: t('common.modal.title.confirm'),
				content: t('login.message.logout'),
				onConfirm: async () => {
					sessionUtil.deleteSessionInfo().then(async () => {
						await sessionApis.logoutSession();

						//window.location.reload();
						//navigate('/');
						window.location.href = '/';
					});
				},
			})
		);
	};

	const handleTotalSearch = () => {
		/*
		const searchValue = totalSearchValue;
		if (!searchValue || searchValue.length < 2) {
			let errMsg = !searchValue ? t('totalSearch:message.empty') : t('totalSearch:message.lengthChk');
			showToast('', errMsg, { type: ToastOption.DANGER });
			setTotalSearchValue('');

			if (searchRef.current) {
				searchRef.current.focus();
			}
			return;
		}
		*/

		setTotalSearchValue('');
		navigate(`${contextPath}/search?v=${totalSearchValue}`);
	};

	const handleChangeTotalSearch = (e) => {
		setTotalSearchValue(e.target.value);
	};

	// 검색어 입력 후 엔터
	const handleKeyDownTotalSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
			handleTotalSearch();
		}
	};

	// 사용자가이드 다운로드
	const downGuide = () => {
		const link = document.createElement('a');
		const fileNm = 'dataportal_user_guide.pdf';
		link.href = `/download/${fileNm}`;
		link.download = `우아한형제들_데이터포털_사용자가이드.pdf`; // 저장될 이름

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	// 검색영역 포커스 되었을때 상태값 변경
	function handleSearchFocus() {
		setSearchFocused(true);
	}
	// 검색영역 블러 되었을때 상태값 변경
	function handleSearchBlur() {
		setSearchFocused(false);
	}

	return (
		<>
			<ServiceHeader.Left>
				{/* //TODO: 나중에 어드민 로고가 생기면 이미지로 교체해주세요. (src prop 사용) */}
				<ServiceHeader.Logo src={LogoImg} placeholderText="데이터 포털" onClick={goToHome} />

				{/* env값 : 운영 - prod , 베타 - beta */}
				<ServiceHeader.Badge env={env} />
			</ServiceHeader.Left>

			<ServiceHeader.Right>
				{contextPath === ContextPath.USER && (
					<>
						{/* 통합검색 */}
						<div className="totalSearchArea">
							<div className="formBox">
								<TextInput
									type="text"
									placeholder={t('common.placeholder.search')}
									width="100%"
									small
									onKeyDown={handleKeyDownTotalSearch}
									onChange={handleChangeTotalSearch}
									value={totalSearchValue}
									ref={(e) => (searchRef.current = e)}
									onFocus={handleSearchFocus}
									onBlur={handleSearchBlur}
								/>
								<div className="btnBox">
									<IconButton
										color="ghost"
										label="검색"
										shape="square"
										size="medium"
										type="button"
										onClick={handleTotalSearch}
									>
										<SearchIcon size={20} />
									</IconButton>
								</div>
							</div>

							{/* value.length > 0 && 포커싱 되어있을시에만 노출 */}
							{
								isSearchFocused && totalSearchValue.length > 0 &&
								<div className="placeholderArea">
									<div className="bulletArea">
										<ul className="dotList">
											<li>
												<Typography className="txt" variant="body2" maxLines={0}>
													검색어는 2자리 이상 입력해주세요.
												</Typography>
											</li>
											<li>
												<Typography className="txt" variant="body2" maxLines={0}>
													한 글자 검색은 각 메뉴에서만 가능합니다.
												</Typography>
											</li>
										</ul>
									</div>
								</div>
							}
						</div>
						<Typography className="userNm" as="b" variant="body3" weight="medium" maxLines={0}>
							{sessionInfo?.userNm}님
						</Typography>

						<ServiceHeader.Link onClick={downGuide}>사용자가이드</ServiceHeader.Link>
						<ServiceHeader.Link onClick={goToNotification}>알림</ServiceHeader.Link>
						<ServiceHeader.Link onClick={() => setOpenSitemap(true)}>사이트맵</ServiceHeader.Link>
						<ServiceHeader.Link onClick={goToApproval}>결재함</ServiceHeader.Link>
						{!sessionInfo?.apldMgrAuthId
							? ''
							: <ServiceHeader.Link onClick={goToAdmin}>관리자</ServiceHeader.Link>
						}
					</>
				)}

				{/*  1-2차 개발시 노출 */}
				{(sessionInfo?.userId === 'cls_jhna' || sessionInfo?.userId === 'cls_jsahn') && (
					<ServiceHeader.Link onClick={goToMyPage}>마이페이지</ServiceHeader.Link>
				)}
			{ContextPath.ADMIN === contextPath && (
			<ServiceHeader.Link onClick={goToUser}>사용자</ServiceHeader.Link>
			)}
				<ServiceHeader.Link onClick={handleLogout}>로그아웃</ServiceHeader.Link>
			</ServiceHeader.Right>
			<SitemapModal open={openSitemap} setOpenSitemap={setOpenSitemap} onClose={() => setOpenSitemap(false)} />
		</>
	);
};
export default Header;
