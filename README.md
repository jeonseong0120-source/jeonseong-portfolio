# 전성 포트폴리오

Next.js 기반 정적 포트폴리오입니다. 노션은 원본 자료 보관용으로 사용하고, 이 저장소에는 채용 담당자가 빠르게 읽을 수 있도록 선별한 내용을 관리합니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## IntelliJ IDEA

1. IntelliJ IDEA에서 이 폴더를 엽니다.
2. Node.js 인터프리터가 자동 인식됐는지 확인합니다.
3. 우측 상단 실행 구성에서 `Portfolio Dev`를 선택해 실행합니다.
4. 검사할 때는 `Portfolio Lint`, 배포 전에는 `Portfolio Build`를 실행합니다.

공유 실행 설정은 `.run/` 폴더에 포함되어 있습니다.

## 페이지 구조

```text
/
├── /projects/dondok
└── /projects/devnear
```

홈에서는 두 프로젝트를 빠르게 비교할 수 있고, 각 상세 페이지에서는 샘플 데이터로 핵심 사용자 흐름을 직접 체험할 수 있습니다.

## 배포 전 확인

```bash
npm run lint
npm run build
```

- `public/jeonseong-resume.pdf`: 웹사이트 이력서 다운로드 파일
- Notion: 상세 원본 자료
- GitHub: 프로젝트 코드 및 변경 이력
