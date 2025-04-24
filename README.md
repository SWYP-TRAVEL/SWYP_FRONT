## Link

[컴포넌트와 페이지 확인 링크](https://swyp-travel.github.io/SWYP_FRONT)

## 디렉토리 구조 요약

- 📁 `src/`
  - 📁 `api/` : 클라이언트 API 함수 모음
    - 📁 `auth/` : 인증 관련 API 함수
  - 📁 `app/` : 페이지 및 라우팅 구성 (Next.js App Router)
    - 📁 `api/` : 서버 API 핸들러 (route.ts)
    - 📁 `login/` : 로그인 페이지 UI
    - 📁 `protected/` : 보호된 인증 페이지들
  - 📁 `components/` : 재사용 가능한 UI 컴포넌트
  - 📁 `hooks/` : 커스텀 React 훅
  - 📁 `lib/` : 외부 라이브러리 설정 및 초기화
  - 📁 `store/` : 상태 관리(store) 정의
  - 📁 `stories/` : 스토리북 및 디자인 관련 자료
    - 📁 `assets/` : 테스트용 이미지, 아이콘 등
  - 📁 `utils/` : 공통 유틸 함수 모음
