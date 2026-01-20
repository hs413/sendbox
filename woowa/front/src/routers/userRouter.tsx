

const userRouter = [
  { index: true, element: <Home /> },
  {
    id: '/board',
    path: 'board',
    children: [
      {
        id: '/board/notice',
        path: 'notice',
        children: [
          { index: true, element: <Notice /> },
          { path: 'detail', element: <NoticeDetail /> },
          { path: 'reg', element: <NoticeReg /> },
          { path: 'edit', element: <NoticeEdit /> },
        ],
      },
      {
        id: '/board/qna',
        path: 'qna',
        loader: useQnaLoader,
        children: [
          { index: true, element: <Qna /> },
          { path: 'detail', element: <QnaDetail /> },
          { path: 'reg', element: <QnaReg /> },
          { path: 'edit', element: <QnaEdit /> },
        ],
      },
      {
        id: '/board/faq',
        path: 'faq',
        loader: useFaqLoader,
        children: [
          { index: true, element: <Faq /> },
          { path: 'reg', element: <FaqReg /> },
          { path: 'edit', element: <FaqEdit /> },
        ],
      },
    ],
  },
  {
    id: '/gov-policy',
    path: 'gov-policy',
    children: [{ index: false }, { path: 'detail/:policyId', element: <GovPolicyDetail /> }],
  },
  {
    id: '/data-discovery',
    path: 'data-discovery',
    children: [
      {
        id: '/data-discovery/std-area',
        path: 'std-area',
        children: [
          { index: true, element: <StdArea /> },
          { path: 'term-list', element: <StdAreaTermList /> },
          { path: 'term-detail', element: <StdAreaTermDetail /> },
        ],
      },
      {
        id: '/data-discovery/std-word',
        path: 'std-word',
        children: [
          { index: true, element: <StdWord /> },
          { path: 'detail', element: <StdWordDetail /> },
        ],
      },
      {
        id: '/data-discovery/std-term',
        path: 'std-term',
        children: [
          { index: true, element: <StdTerm /> },
          { path: 'detail', element: <StdTermDetail /> },
        ],
      },
      {
        id: '/data-discovery/std-domain',
        path: 'std-domain',
        children: [
          { index: true, element: <StdDomain /> },
          { path: 'detail', element: <StdDomainDetail /> },
        ],
      },
      {
        id: '/data-discovery/std-create-term',
        path: 'std-create-term',
        children: [{ index: true, element: <StdCreateTerm /> }],
      },
      {
        id: '/data-discovery/std-code',
        path: 'std-code',
        children: [{ index: true, element: <StdCode /> }],
      },
    ],
  },

  {
    // id: '/biz-term',
    path: 'biz-term',
    loader: useBizTermLoader,
    children: [
      {
        id: '/biz-term/list',
        path: 'list',
        children: [{ index: true, element: <BizTermList /> }],
      },
      {
        id: '/biz-term/management',
        path: 'management',
        children: [
          { index: true, element: <BizTermManagement /> },
          { path: 'reg', element: <BizTermReg /> },
          { path: 'edit', element: <BizTermEdit /> },
        ],
      },
      {
        id: '/biz-term/mng-ownersh',
        path: 'mng-ownersh',
        children: [{ index: true, element: <Ownership /> }],
      },
    ],
  },

  {
    id: '/req',
    path: 'req',
    children: [
      // TODO : 표준사전 신청 (개선) 적용 시 children 'std' <-> 'std2' 변경
      {
        id: '/req/std',
        path: 'std',
        children: [
          { index: true, element: <ReqStd2 /> },
          { path: 'word-reg', element: <ReqStdWordReg2 /> },
          { path: 'word-edit', element: <ReqStdWordEdit2 /> },
          { path: 'word-detail', element: <ReqStdWordDetail2 /> },

          { path: 'term-reg', element: <ReqStdTermReg2 /> },
          { path: 'term-edit', element: <ReqStdTermEdit2 /> },
          { path: 'term-detail', element: <ReqStdTermDetail2 /> },
        ],
      },
      {
        id: '/req/std2',
        path: 'std2',
        children: [
          { index: true, element: <ReqStd /> },
          { path: 'word-reg', element: <ReqStdWordReg /> },
          { path: 'word-edit', element: <ReqStdWordEdit /> },
          { path: 'word-detail', element: <ReqStdWordDetail /> },

          { path: 'term-reg', element: <ReqStdTermReg /> },
          { path: 'term-edit', element: <ReqStdTermEdit /> },
          { path: 'term-detail', element: <ReqStdTermDetail /> },
        ],
      },
      // TODO : 표준화검토 (개선) 적용 시 children 'std_review' <-> 'std_review2' 변경
      {
        id: '/req/std-review',
        path: 'std-review',
        loader: useTblInfoLoader,
        children: [
          { index: true, element: <ReqStdReview2 /> },
          { path: 'reg', element: <ReviewReg2 /> },
          { path: 'edit', element: <ReviewEdit2 /> },
          { path: 'detail', element: <ReviewDetail2 /> },
        ],
      },
      {
        id: '/req/std-review2',
        path: 'std-review2',
        loader: useTblInfoLoader,
        children: [
          { index: true, element: <ReqStdReview /> },
          { path: 'reg', element: <ReviewReg /> },
          { path: 'edit', element: <ReviewEdit /> },
          { path: 'detail', element: <ReviewDetail /> },
        ],
      },
      {
        id: '/req/tableau',
        path: 'tableau',
        loader: useReqTableauCcLoader,
        children: [
          { index: true, element: <ReqTableauList /> },
          { path: 'reg', element: <ReqTableau /> },
          { path: 'detail', element: <ReqTableauDetail /> },
          { path: 'edit', element: <ReqTableauEdit /> },
        ],
      },
      {
        id: '/req/re-ident',
        path: 're-ident',
        loader: useReqIdentCcLoader,
        children: [
          { index: true, element: <ReqReIdent /> },
          { path: 'reg', element: <ReqReIdentReg /> },
          { path: 'edit', element: <ReqReIdentEdit /> },
          { path: 'detail', element: <ReqReIdentDetail /> },
        ],
      },
      {
        id: '/req/de-ident',
        path: 'de-ident',
        loader: useReqIdentCcLoader,
        children: [
          { index: true, element: <ReqDeIdent /> },
          { path: 'reg', element: <ReqDeIdentReg /> },
          { path: 'edit', element: <ReqDeIdentEdit /> },
          { path: 'detail', element: <ReqDeIdentDetail /> },
        ],
      },
      {
        id: '/req/tableau/list',
        path: 'tableau/list',
        children: [
          { index: true, element: <PubTableauList /> },
          { path: 'detail', element: <ReqTableauDetail /> },
        ],
      },
      {
        id: '/req/schema-auth',
        path: 'schema-auth',
        loader: useReqSchemaAuthLoader,
        children: [
          { index: true, element: <ReqSchemaAuth /> },
          { path: 'reg', element: <ReqSchemaAuthReg /> },
          { path: 'edit', element: <ReqSchemaAuthEdit /> },
          { path: 'detail', element: <ReqSchemaAuthDetail /> },
        ],
      },
      {
        id: '/req/global-data',
        path: 'global-data',
        loader: useGlobalDataCdLoader,
        children: [
          { index: true, element: <ReqGlobalDataList /> },
          { path: 'reg', element: <ReqGlobalDataReg /> },
          { path: 'edit', element: <ReqGlobalDataEdit /> },
          { path: 'detail', element: <ReqGlobalDataDetail /> },
        ],
      },
    ],
  },

  {
    id: '/req-mngr',
    path: 'req-mngr',
    children: [
      // TODO : 표준사전 신청 (개선) 적용 시 children 'std' <-> 'std2' 변경
      {
        id: '/req-mngr/std',
        path: 'std',
        children: [
          { index: true, element: <ReqMngrStd2 /> },
          { path: 'word-detail', element: <ReqMngrStdWordDetail2 /> },
          { path: 'term-detail', element: <ReqMngrStdTermDetail2 /> },
        ],
      },
      {
        id: '/req-mngr/std2',
        path: 'std2',
        children: [
          { index: true, element: <ReqMngrStd /> },
          { path: 'word-detail', element: <ReqMngrStdWordDetail /> },
          { path: 'term-detail', element: <ReqMngrStdTermDetail /> },
        ],
      },
      {
        id: '/req-mngr/std-review',
        path: 'std-review',
        children: [
          { index: true, element: <ReqMngrStdReview2 /> },
          { path: 'detail', element: <ReqMngrStdReviewDetail2 /> },
        ],
      },
      {
        id: '/req-mngr/std-review2',
        path: 'std-review2',
        children: [
          { index: true, element: <ReqMngrStdReview /> },
          { path: 'detail', element: <ReqMngrStdReviewDetail /> },
        ],
      },
    ],
  },
  {
    path: 'kpi',
    children: [
      { path: 'index', element: <KpiIndex /> },
      { path: 'index/detail', element: <KpiIndexDetail /> },
      {
        id: '/kpi/aspect',
        path: 'aspect',
        children: [{ index: true, element: <KpiAspectList /> }],
      },
    ],
  },
  {
    path: 'kpi-management',
    children: [
      {
        id: '/kpi-management/aspect',
        path: 'aspect',
        children: [
          { index: true, element: <KpiAspectManagementList /> },
          { path: 'reg', element: <KpiAspectReg /> },
          { path: 'edit', element: <KpiAspectEdit /> },
        ],
      },
      {
        id: '/kpi-management/index',
        path: 'index',
        children: [
          { index: true, element: <KpiIndexManagementList /> },
          { path: 'detail', element: <KpiIndexManagementDetail /> },
          { path: 'reg', element: <KpiIndexFormTab /> },
          { path: 'edit', element: <KpiIndexEdit /> },
        ],
      },
    ],
  },
  {
    path: 'approval',
    loader: useSampleDataViewAuthLoader,
    children: [
      { index: true, element: <Approval /> },
      { path: 're-ident/detail', element: <AprvReIdentDetail /> },
      { path: 'de-ident/detail', element: <AprvDeIdentDetail /> },
      { path: 'tableau/detail', element: <AprvTableauDetail /> },
    ],
  },
  {
    id: '/meta',
    path: 'meta',
    loader: useMetaLoader,
    children: [
      {
        id: '/meta/model',
        path: 'model',
        children: [
          { index: true, element: <MetaModelList /> },
          { path: 'detail', element: <MetaModelDetail /> },
        ],
      },
    ],
  },
  {
    path: 'target-data-management',
    loader: useTargetDataKpiLoader,
    children: [
      {
        id: '/target-data-management/kpi',
        path: 'kpi',
        children: [
          { index: true, element: <TargetDataKpi /> },
          { path: 'reg', element: <TargetDataKpiReg /> },
          { path: 'edit', element: <TargetDataKpiEdit /> },
        ],
      },
      {
        id: '/target-data-management/upload',
        path: 'upload',
        children: [
          { index: true, element: <TargetDataUpload /> },
          { path: 'info', element: <TargetDataKpiInfo /> },
        ],
      },
    ],
  },
  {
    path: 'Notification',
    children: [{ index: true, element: <NotificationList /> }],
  },
  {
    path: 'mypage',
    element: <MyPage />,
  },
  {
    path: 'search',
    element: <TotalSearch />,
  },
  {
    path: 'sample',
    loader: useTblInfoLoader,
    element: <Sample />,
  },
  {
    path: 'monitoring',
    children: [
      {
        id: '/monitoring/authorization',
        path: 'authorization',
        // loader: useReqIdentCcLoader,
        children: [
          { index: true, element: <Authorization /> },
          {
            path: 'violations/detail',
            element: <AuthorizationViolationDetail />,
          },
        ],
      },
      {
        id: '/monitoring/governance',
        path: 'governance',
        loader: useGovMonitoringLoader,
        children: [
          { index: true, element: <GovMonitoring /> },
          { path: 'std-non-act/:schemaNm/:tblNm/:stanDate', element: <MgStdNonActDetail /> },
          {
            path: 'std-disagree/:schemaNm/:tblNm/:stanDate',
            element: <MgStdDisagreeDetail />,
          },
          { path: 'non-table/:schemaNm/:tblNm/:stanDate', element: <MgTableDetail /> },
          { path: 'del-table/:schemaNm/:tblNm/:stanDate', element: <MgDelTableDetail /> },
          {
            path: 'std-non-act-edit/:schemaNm/:tblNm/:stanDate/edit',
            element: <MgStdNonActEdit />,
          },
          {
            path: 'std-disagree-edit/:schemaNm/:tblNm/:stanDate/edit',
            element: <MgStdDisagreeEdit />,
          },
          {
            path: 'non-table-edit/:schemaNm/:tblNm/:stanDate/edit',
            element: <MgTableEdit />,
          },
          {
            path: 'del-table-edit/:schemaNm/:tblNm/:stanDate/edit',
            element: <MgDelTableEdit />,
          },
        ],
      },
    ],
  },
];