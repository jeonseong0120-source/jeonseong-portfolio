import type { Metadata } from "next";
import Link from "next/link";
import DevnearDemo from "./DevnearDemo";
import styles from "./devnear.module.css";

export const metadata: Metadata = {
  title: "DEVNEAR | 전성 포트폴리오",
  description: "지역과 기술을 기준으로 클라이언트와 프리랜서를 연결하는 매칭 서비스",
};

export default function DevnearPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/">전성</Link>
          <strong>DEVNEAR</strong>
          <Link href="/#projects">프로젝트</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>지역·기술 기반 프리랜서 매칭</p>
          <h1>필요한 사람을,<br />가까운 곳에서 찾습니다.</h1>
          <p className={styles.lead}>
            프로젝트에 필요한 기술과 활동 지역을 입력하면 조건에 맞는 프리랜서를 찾고,
            기술·평점·수행 경험을 기준으로 추천 순서와 근거를 보여줍니다.
          </p>
          <div className={styles.heroLinks}>
            <a href="#demo">30초 체험</a>
            <a href="https://github.com/jeonseong0120-source/devnear" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <dl className={styles.facts}>
            <div><dt>기간</dt><dd>2026.04.03 – 2026.04.27</dd></div>
            <div><dt>팀</dt><dd>4명</dd></div>
            <div><dt>역할</dt><dd>저장소 관리 · 백엔드 · 프론트엔드</dd></div>
          </dl>
        </div>

        <div className={styles.heroBrowser} aria-label="데브니어 프리랜서 탐색 화면 예시">
          <div className={styles.browserTop}>
            <div><span /><span /><span /></div>
            <p>devnear · 프리랜서 찾기</p>
          </div>
          <div className={styles.browserContent}>
            <aside>
              <strong>활동 지역</strong>
              <span className={styles.activeFilter}>전국</span>
              <span>서울</span><span>경기</span><span>인천</span>
              <strong>기술</strong>
              <span>Java</span><span>React</span>
            </aside>
            <div className={styles.heroResults}>
              <div className={styles.resultHeader}><div><small>추천 인재</small><strong>조건에 맞는 프리랜서 12명</strong></div><span>추천순⌄</span></div>
              <div className={styles.profileGrid}>
                {[
                  ["윤서진", "백엔드 개발자", "94", "서울 강남"],
                  ["김도현", "풀스택 개발자", "89", "경기 성남"],
                  ["박지우", "프론트엔드 개발자", "86", "서울 성동"],
                  ["이하늘", "웹 개발자", "82", "인천 연수"],
                ].map(([name, role, score, region], index) => (
                  <div className={styles.profileCard} key={name}>
                    <div className={`${styles.profileImage} ${styles[`profile${index + 1}`]}`}><span>{name.slice(0, 1)}</span></div>
                    <small>{score}% MATCH</small>
                    <strong>{name}</strong><p>{role}</p><span>{region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DevnearDemo />

      <section className={styles.scopeSection}>
        <div className={styles.sectionIntro}>
          <p>담당 범위</p>
          <h2>인증의 시작부터<br />매칭 결과까지.</h2>
          <span>
            공통 개발 기반과 역할별 인증 구조를 만들고, 탐색·상세 화면과 API를 연결했습니다.
            조건에 따른 매칭 순서와 실제 DB 실행 과정도 함께 확인했습니다.
          </span>
        </div>
        <div className={styles.scopeList}>
          <div><span>01</span><strong>개발 기반</strong><p>도메인 구조, API 명세, Docker Compose와 PR 협업 구조</p></div>
          <div><span>02</span><strong>인증·온보딩</strong><p>JWT, Google OAuth2와 역할별 사용자 흐름</p></div>
          <div><span>03</span><strong>매칭·조회</strong><p>지역 선필터링, 규칙 기반 점수와 DB 페이지네이션</p></div>
          <div><span>04</span><strong>화면 연동</strong><p>로그인, 회원가입, 프리랜서 탐색·상세 화면 API 연결</p></div>
        </div>
      </section>

      <section className={styles.contributionSection}>
        <div className={styles.sectionIntro}>
          <p>핵심 구현</p>
          <h2>보이지 않는 흐름까지<br />확인했습니다.</h2>
        </div>

        <article className={styles.contribution}>
          <div className={styles.contributionCopy}>
            <span>01 · 역할별 인증</span>
            <h3>인증할 때와<br />사용자를 조회할 때를 나눴습니다.</h3>
            <p>
              JWT 필터에서 매번 사용자 정보를 DB로 조회하지 않고, 토큰의 사용자 식별값과 역할로
              인증 정보를 구성했습니다. 실제 사용자 엔티티가 필요한 서비스에서만 한 번 조회해
              같은 요청 안에서 재사용했습니다.
            </p>
            <ul>
              <li>CLIENT·FREELANCER·BOTH 역할을 API 접근 기준으로 사용</li>
              <li>JWT Claim으로 인증 필터 단계의 사용자 DB 조회 제거</li>
              <li>요청 범위 UserContext로 같은 요청의 중복 조회 최소화</li>
            </ul>
          </div>
          <div className={`${styles.flowVisual} ${styles.authVisual}`} aria-label="JWT 인증과 사용자 조회 분리 흐름">
            <div><small>BEARER TOKEN</small><strong>userId · role</strong></div><i>→</i>
            <div className={styles.authCore}><small>JWT FILTER</small><strong>서명·만료 확인</strong><span>DB 조회 없음</span></div><i>→</i>
            <div><small>USER CONTEXT</small><strong>필요할 때 1회 조회</strong></div>
          </div>
        </article>

        <article className={`${styles.contribution} ${styles.reverseContribution}`}>
          <div className={styles.contributionCopy}>
            <span>02 · 규칙 기반 매칭</span>
            <h3>추천 순서를<br />설명할 수 있도록.</h3>
            <p>
              외부 AI 판단에만 의존하지 않고 같은 조건에는 같은 결과가 나오도록 규칙을 정했습니다.
              지역으로 후보를 먼저 좁힌 뒤 기술 일치도, 평점, 수행 경험을 점수로 바꿔 정렬했습니다.
            </p>
            <ul>
              <li>요구 기술과 보유 기술의 교집합 50%</li>
              <li>평점 정규화 30%와 완료 프로젝트 수 20%</li>
              <li>MVP 가설임을 명시하고 운영 데이터 기반 개선 방향 정리</li>
            </ul>
          </div>
          <div className={`${styles.flowVisual} ${styles.matchVisual}`} aria-label="규칙 기반 매칭 점수 구성">
            <div className={styles.scoreRing}><strong>89</strong><span>추천 점수</span></div>
            <div className={styles.scoreRows}>
              <div><span>기술 일치도</span><i><b style={{ width: "92%" }} /></i><strong>50%</strong></div>
              <div><span>평점</span><i><b style={{ width: "84%" }} /></i><strong>30%</strong></div>
              <div><span>수행 경험</span><i><b style={{ width: "72%" }} /></i><strong>20%</strong></div>
            </div>
          </div>
        </article>

        <article className={styles.contribution}>
          <div className={styles.contributionCopy}>
            <span>03 · JPA와 실제 SQL</span>
            <h3>코드 순서와<br />SQL 순서를 구분했습니다.</h3>
            <p>
              기술 목록을 바꿀 때 기존 항목을 지우고 같은 기술을 다시 추가하면 복합키 충돌이 발생했습니다.
              Java 코드의 호출 순서와 DB에 실행되는 SQL 순서가 다를 수 있다는 점을 확인하고,
              삭제를 먼저 반영한 뒤 새 데이터를 추가했습니다.
            </p>
            <ul>
              <li>P6Spy로 DELETE·INSERT 실행 순서 확인</li>
              <li>컬렉션 clear 후 flush로 삭제를 DB에 먼저 반영</li>
              <li>양방향 연관관계도 객체 양쪽에서 함께 갱신</li>
            </ul>
          </div>
          <div className={`${styles.flowVisual} ${styles.sqlVisual}`} aria-label="JPA 쓰기 지연과 SQL 실행 순서 해결">
            <div className={styles.codeHeader}><span>ProjectService.java</span><span>SQL ORDER</span></div>
            <code><span>project.getProjectSkills().clear();</span><strong>entityManager.flush();</strong><span>project.updateSkills(newSkills);</span></code>
            <div className={styles.sqlOrder}><span>DELETE</span><i>→</i><span>INSERT</span><strong>복합키 충돌 방지</strong></div>
          </div>
        </article>
      </section>

      <section className={styles.outroSection}>
        <p>결과와 회고</p>
        <h2>추상화 뒤에서<br />실제로 일어나는 일을 봤습니다.</h2>
        <span>
          인증부터 역할별 온보딩과 매칭까지 사용자 흐름을 연결했습니다. 프레임워크의 편리한 기능을
          사용하는 데서 멈추지 않고, 객체 상태와 SQL 실행 순서까지 확인하며 원인을 좁혔습니다.
        </span>
        <div className={styles.outroLinks}>
          <a href="https://github.com/jeonseong0120-source/devnear" target="_blank" rel="noreferrer">GitHub</a>
          <Link href="/projects/dondok">이전 프로젝트 · DONDOK</Link>
          <Link href="/">홈으로</Link>
        </div>
      </section>
    </main>
  );
}
