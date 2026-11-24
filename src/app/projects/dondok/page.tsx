import type { Metadata } from "next";
import Link from "next/link";
import DondokDemo from "./DondokDemo";
import styles from "./dondok.module.css";

export const metadata: Metadata = {
  title: "DONDOK",
  description: "참여 횟수에 따라 공동 보증금을 나누는 지분 기반 습관 형성 서비스",
};

export default function DondokPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/">전성</Link>
          <strong>DONDOK</strong>
          <Link href="/#projects">프로젝트</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>지분 기반 습관 형성 서비스</p>
          <h1>돈을 걸고,<br />함께 습관을 만듭니다.</h1>
          <p className={styles.lead}>
            같은 목표를 가진 사람들과 크루를 만들고 미션에 참여합니다.
            활동이 끝나면 참여 횟수를 기준으로 공동 보증금을 나눕니다.
          </p>
          <div className={styles.heroLinks}>
            <a href="#demo">30초 체험</a>
            <a href="https://github.com/jeonseong0120-source/dondok-be" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <dl className={styles.facts}>
            <div><dt>기간</dt><dd>2026.05.22 – 2026.06.26</dd></div>
            <div><dt>팀</dt><dd>5명</dd></div>
            <div><dt>역할</dt><dd>백엔드 · 프론트엔드</dd></div>
            <div><dt>기술</dt><dd>Java 17 · Spring Boot · JPA · QueryDSL · MySQL · Next.js 16 · TypeScript</dd></div>
          </dl>
        </div>

        <div className={styles.heroPhone} aria-label="돈독 크루 상세 화면 예시">
          <div className={styles.phoneIsland} />
          <div className={styles.phoneHeader}><span>‹</span><strong>코딩 실력 향상</strong><span>●</span></div>
          <div className={styles.phoneCover}>
            <span>📝 공부</span>
            <h2>코딩 실력 향상</h2>
          </div>
          <div className={styles.phoneTabs}><strong>정보</strong><span>멤버</span></div>
          <div className={styles.phoneBody}>
            <p>매일 알고리즘 문제를 풀고 인증하며 함께 성장합니다.</p>
            <div className={styles.periodCard}>
              <span>미션 수행 기간</span>
              <strong>총 28일</strong>
              <small>2026.06.26 – 2026.07.24</small>
            </div>
            <span className={styles.phoneAction}>입장 신청 · 보증금 30,000원</span>
          </div>
        </div>
      </section>

      <DondokDemo />

      <section className={styles.scopeSection}>
        <div className={styles.sectionIntro}>
          <p>담당 범위</p>
          <h2>서비스의 입구부터<br />크루의 종료까지.</h2>
          <span>
            크루 생성·탐색·상세·가입 신청 API와 주요 화면을 연결하고,
            일정과 동시 요청에도 상태가 어긋나지 않도록 서버 흐름을 구현했습니다.
          </span>
        </div>

        <div className={styles.scopeList}>
          <div><span>01</span><strong>크루 API</strong><p>생성, 탐색, 상세 조회, 가입 신청과 화면 연동</p></div>
          <div><span>02</span><strong>상태 전환</strong><p>모집 일정에 따른 활성화·취소·종료 배치</p></div>
          <div><span>03</span><strong>동시 가입</strong><p>정원 초과와 중복 신청을 구분하는 정합성 제어</p></div>
          <div><span>04</span><strong>제품 기반</strong><p>Next.js 공통 UI, 인증 복구, PWA와 Vercel 배포 환경</p></div>
        </div>
      </section>

      <section className={styles.contributionSection}>
        <div className={styles.sectionIntro}>
          <p>핵심 구현</p>
          <h2>정상 요청보다<br />경계 상황을 먼저 봤습니다.</h2>
        </div>

        <article className={styles.contribution}>
          <div className={styles.contributionCopy}>
            <span>01 · 동시 가입</span>
            <h3>마지막 한 자리를<br />두 명에게 주지 않도록.</h3>
            <p>
              정원이 한 자리 남았을 때 두 요청이 같은 인원을 읽으면 모두 가입 가능하다고
              판단할 수 있습니다. 크루에 버전 값을 두고 낙관적 락을 적용해 먼저 반영된 요청만
              성공하도록 했습니다.
            </p>
            <ul>
              <li>모집 상태·마감 시각·현재 인원 재확인</li>
              <li>버전 충돌과 중복 신청 오류를 서로 다른 응답으로 분리</li>
              <li>CAPACITY_FULL·모집 마감·중복 신청 오류를 구분해 안내</li>
            </ul>
            <div className={styles.evidenceGrid}>
              <p><strong>확인</strong>서비스 테스트에서 낙관적 락 예외가 CONCURRENT_PAYMENT_ERROR로 변환되는지 확인했습니다.</p>
              <p><strong>한계</strong>실제 동시 부하 테스트는 수행하지 않아 경쟁 상황의 처리량과 충돌률은 측정하지 못했습니다.</p>
            </div>
          </div>
          <div className={`${styles.flowVisual} ${styles.lockVisual}`} aria-label="낙관적 락 동시 가입 처리 흐름">
            <div className={styles.flowRequest}><span>가입 요청 A</span><small>같은 크루 · 같은 버전</small></div>
            <div className={styles.flowRequest}><span>가입 요청 B</span><small>같은 크루 · 같은 버전</small></div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowCore}><small>OPTIMISTIC LOCK</small><strong>version 7 → 8</strong></div>
            <div className={styles.flowResultRow}>
              <div><strong>성공</strong><span>참가자 저장</span></div>
              <div><strong>충돌</strong><span>오류 응답</span></div>
            </div>
          </div>
        </article>

        <article className={`${styles.contribution} ${styles.reverseContribution}`}>
          <div className={styles.contributionCopy}>
            <span>02 · 상태 전환 배치</span>
            <h3>날짜 계산을<br />확정된 상태로 바꾸었습니다.</h3>
            <p>
              기능마다 현재 날짜를 다시 계산하면 같은 크루를 서로 다른 상태로 판단할 수 있습니다.
              KST 자정을 기준으로 모집 결과와 미션 종료 상태를 순서대로 확정했습니다.
            </p>
            <ul>
              <li>모집 완료 시 정원 충족 여부에 따라 활성화 또는 취소</li>
              <li>진행 종료일이 지난 크루를 종료 상태로 전환</li>
              <li>크루별 처리 단위를 나눠 한 건의 실패가 전체 실행을 막지 않도록 구성</li>
            </ul>
            <div className={styles.evidenceGrid}>
              <p><strong>확인</strong>활성화·취소·종료 조건을 서비스 테스트로 나누고 경계 날짜의 상태 변화를 확인했습니다.</p>
              <p><strong>한계</strong>운영 중 실패 건을 자동 재처리하는 별도 큐와 관리 화면은 구현하지 못했습니다.</p>
            </div>
          </div>
          <div className={`${styles.flowVisual} ${styles.batchVisual}`} aria-label="크루 상태 전환 배치 흐름">
            <div className={styles.batchTime}><span>00:00</span><small>Asia / Seoul</small></div>
            <ol>
              <li><span>01</span><div><strong>신청 만료</strong><small>PENDING → EXPIRED</small></div></li>
              <li><span>02</span><div><strong>모집 결과 확정</strong><small>RECRUITING → ACTIVE / 취소</small></div></li>
              <li><span>03</span><div><strong>미션 종료</strong><small>ACTIVE → CLOSED</small></div></li>
            </ol>
          </div>
        </article>

        <article className={styles.contribution}>
          <div className={styles.contributionCopy}>
            <span>03 · 외부 AI 응답 검증</span>
            <h3>AI의 답을<br />저장값으로 믿지 않았습니다.</h3>
            <p>
              사용자의 목표로 습관 모임 초안을 추천할 때 JSON 지시만으로는 코드 블록, 빈 값,
              잘못된 요일을 막을 수 없었습니다. 파싱과 도메인 검증을 통과한 결과만 수정 가능한
              초안으로 제공했습니다.
            </p>
            <ul>
              <li>Markdown 코드 블록 제거 후 JSON 파싱</li>
              <li>빈 응답·파싱 실패를 명확한 오류로 구분</li>
              <li>기간·요일·보증금·필수값을 서버 규칙으로 재검증</li>
            </ul>
            <div className={styles.evidenceGrid}>
              <p><strong>확인</strong>빈 응답·잘못된 빈도·누락된 요일·기간 범위 초과를 테스트로 재현했습니다.</p>
              <p><strong>한계</strong>외부 모델의 모든 출력 변형을 예측할 수 없어 파싱 실패는 명확한 오류로 반환합니다.</p>
            </div>
          </div>
          <div className={`${styles.flowVisual} ${styles.aiVisual}`} aria-label="AI 응답 검증 처리 흐름">
            <div className={styles.aiPrompt}><span>사용자 목표</span><strong>매일 운동하는 습관</strong></div>
            <div className={styles.aiResponse}><small>AI RESPONSE</small><code>```json &#123; ... &#125; ```</code></div>
            <div className={styles.validationSteps}>
              <span>코드 블록 제거</span><span>JSON 파싱</span><span>규칙 검증</span>
            </div>
            <div className={styles.aiDraft}><span>검증 완료</span><strong>수정 가능한 초안</strong></div>
          </div>
        </article>
      </section>

      <section className={styles.outroSection}>
        <p>결과와 회고</p>
        <h2>화면이 열리는 순간까지<br />서버의 책임이라고 생각했습니다.</h2>
        <span>
          정상 요청뿐 아니라 동시 신청, 일정 경계, 외부 응답의 불확실성을 기능 설계에 포함했습니다.
          프론트엔드까지 직접 연결하며 API의 상태와 식별자가 실제 사용자 경험으로 이어지는 과정을 확인했습니다.
        </span>
        <div className={styles.outroLinks}>
          <a href="https://github.com/jeonseong0120-source/dondok-be" target="_blank" rel="noreferrer">Backend GitHub</a>
          <a href="https://github.com/jeonseong0120-source/dondok-fe" target="_blank" rel="noreferrer">Frontend GitHub</a>
          <Link href="/projects/devnear">다음 프로젝트 · DEVNEAR</Link>
        </div>
      </section>
    </main>
  );
}
