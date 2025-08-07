# 베타랩 프론트엔드

## 프로젝트 기술 스택

- **프레임워크** - Next.js (App Router 기반, SSR 일부 활용 예정)
- **언어** - Typescript
- **스타일링** - Tailwind
- **상태 관리**: TanStack Query (데이터 패칭용), Zustand (UI 상태 등 클라이언트 상태 관리용)
- **배포** - Vercel
- **기타** - pnpm, Zod (스키마 기반 유효성 검증)

## 깃/깃허브 컨밴션

```
1. main을 기반으로 feature 브랜치 생성 + 이슈와 연결
2. 기능 구현 후 PR 올리기 feature to main → PR 제목 = 이슈 제목
3. 병합 시 스쿼시 머지하기 → 커밋명 = 이슈, PR명
4. main 업데이트
```

### 커밋 컨벤션

- 커밋 메시지 규칙
  - `commit convention`: `commit message`
  - 예시) `feat: 로그인 구현`

| Tag name |                            Description                             |
| :------: | :----------------------------------------------------------------: |
|   feat   |                         새로운 기능을 추가                         |
|   fix    |                             버그 수정                              |
|   docs   |                             문서 수정                              |
|  style   |                    CSS 등 사용자 UI 디자인 변경                    |
| refactor |                              리팩토링                              |
|   test   |               테스트 코드, 리팩토링 테스트 코드 추가               |
|  chore   | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트 |
|  asset   |              asset (이미지, 아이콘 등) 추가 혹은 수정              |
|  rename  |         파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우         |
|  remove  |                 파일을 삭제하는 작업만 수행한 경우                 |
| comment  |                             주석 추가                              |

### 브랜치 컨벤션

- Issue를 생성한다. (작업의 단위 부여)
- Issue에 해당하는 브랜치를 생성한다.
  - `{접두사}/{이슈번호}{작업명}`
  - 예시: feat/7-kakao-login
- **Add - Commit - Push - Pull Request** 의 과정
- Pull Request를 작성한다.

### PR 컨벤션

- **기능 단위**로 PR 날리기
- PR Template 사용
