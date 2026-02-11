import React, { Suspense, useState } from 'react';

// 1. 비동기 작업을 시뮬레이션하는 유틸리티 함수
function wrapPromise(promise) {
  let status = "pending";
  let result;

  // Promise 상태 추적
  let suspender = promise.then(
      (r) => {
        status = "success";
        result = r;
      },
      (e) => {
        status = "error";
        result = e;
      }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender; //Promise를 throw하여 Suspense를 트리거함
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

// 2. 가짜 데이터 Fetch 함수 (2초 지연)
function fetchFakeData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("데이터 로딩 완료");
    }, 2000);
  });
}

// 초기 리소스 생성
const initialResource = wrapPromise(fetchFakeData());

// 3. 데이터를 보여줄 컴포넌트 (Suspend 될 컴포넌트)
function DataComponent({ resource }) {
  const data = resource.read(); // 데이터가 준비되지 않았다면 여기서 멈춤(suspend)
  return (
      <div style={{ padding: '20px', backgroundColor: '#e0f7fa', borderRadius: '8px' }}>
        <h3>{data}</h3>
      </div>
  );
}

// 4. 메인 앱 컴포넌트
export default function SuspenseTestApp() {
  const [resource, setResource] = useState(initialResource);

  const handleRefresh = () => {
    // 버튼을 누르면 새로운 Promise를 생성하여 다시 로딩 상태로 만듦
    setResource(wrapPromise(fetchFakeData()));
  };

  return (
      <div style={{ padding: '20px' }}>
        <h1>Suspense 테스트</h1>
        <p>아래 영역은 2초 뒤에 나타납니다.</p>

        {/* Suspense로 감싸고 fallback UI 지정 */}
        <Suspense fallback={<div style={{ color: 'blue', fontWeight: 'bold' }}>로딩 중...</div>}>
          <DataComponent resource={resource} />
        </Suspense>

        <button
            onClick={handleRefresh}
            style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
          다시 로딩하기
        </button>
      </div>
  );
}