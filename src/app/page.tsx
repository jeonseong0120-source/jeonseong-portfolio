import SiteHeader from "./SiteHeader";

const projects = [
  {
    id: "dondok",
    name: "DONDOK",
    category: "습관 형성 서비스",
    description:
      "참여 횟수에 따라 공동 보증금을 나누는 지분 기반 습관 형성 서비스",
    role: "백엔드 · 프론트엔드",
    tech: "Java 17 · Spring Boot · JPA · QueryDSL · MySQL · Next.js",
    href: "/projects/dondok",
  },
  {
    id: "devnear",
    name: "DEVNEAR",
    category: "프리랜서 매칭 서비스",
    description:
      "지역과 보유 기술을 기준으로 클라이언트와 프리랜서를 연결하는 매칭 서비스",
    role: "저장소 관리 · 백엔드 · 프론트엔드",
    tech: "Java 17 · Spring Boot · JPA · QueryDSL · MySQL · Redis",
    href: "/projects/devnear",
  },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-intro">
          <p className="hero-kicker">전성 <span>백엔드 개발자</span></p>
          <h1>
            Java·Spring으로<br />
            <span>서비스의 흐름을 만듭니다.</span>
          </h1>
          <p className="hero-subtitle">API에서 끝내지 않고, 화면에 도착한 결과까지 확인합니다.</p>
          <div className="hero-actions">
            <a className="primary-link" href="#projects">프로젝트 보기</a>
            <a className="secondary-link" href="/jeonseong-resume.pdf" target="_blank">이력서 보기</a>
          </div>
        </div>

        <div className="hero-proof" aria-label="백엔드 기능이 사용자 화면으로 이어지는 개발 흐름">
          <div className="proof-topline">
            <span>FROM REQUEST</span>
            <span>TO EXPERIENCE</span>
          </div>
          <div className="proof-copy">
            <p>API에서 끝내지 않고</p>
            <strong>화면에 도착한 결과까지.</strong>
          </div>
          <div className="proof-flow" aria-hidden="true">
            <div className="proof-server">
              <small>BACKEND</small>
              <span><i />요청 검증</span>
              <span><i />비즈니스 로직</span>
              <span><i />데이터 응답</span>
            </div>
            <div className="proof-connector"><span>REST API</span><i>→</i></div>
            <div className="proof-screen">
              <div className="proof-browser"><i /><i /><i /></div>
              <div className="proof-ui">
                <span />
                <strong />
                <p /><p />
                <span className="proof-ui-result">주요 화면 흐름 확인</span>
              </div>
            </div>
          </div>
          <div className="proof-bottomline">
            <span>DONDOK</span><span>DEVNEAR</span><span>2026</span>
          </div>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="experience-heading">
          <p>Experience</p>
          <h2>개발과 협업을<br />실제 일정 안에서 배웠습니다.</h2>
        </div>
        <div className="experience-list">
          <article>
            <time>2026.07 – 2026.08</time>
            <div><strong>그렙 생성형 AI 활용 개발 인턴십</strong><p>4인 팀 팀장 · 백엔드 API, 프론트엔드 연동, 교차 점검과 일정 조율</p></div>
          </article>
          <article>
            <time>2025.12 – 2026.06</time>
            <div><strong>프로그래머스 생성형 AI 백엔드 데브코스</strong><p>Java·Spring 기반 팀 프로젝트 · 서비스 설계, 구현, 배포와 협업</p></div>
          </article>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="projects-heading">
          <p>Selected Projects</p>
          <h2>백엔드와 화면을 맡은<br />두 팀 프로젝트.</h2>
          <span>서비스를 먼저 이해하고, 그 안에서 해결한 기술 문제를 확인할 수 있습니다.</span>
        </div>

        <div className="project-showcases">
          {projects.map((project) => (
            <article className={`project-showcase ${project.id}`} key={project.name}>
              <div className="project-copy">
                <p className="project-category">{project.category}</p>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-role">{project.role}</p>
                <p className="project-tech">{project.tech}</p>
                <a className="project-link" href={project.href}>프로젝트 살펴보기</a>
              </div>

              {project.id === "dondok" ? (
                <div className="project-visual dondok-visual" aria-label="돈독 서비스 화면 예시">
                  <div className="phone-frame">
                    <div className="phone-island" />
                    <div className="phone-screen">
                      <div className="mock-nav"><span>‹</span><strong>코딩 실력 향상</strong><span>●</span></div>
                      <div className="mock-cover">
                        <span>공부</span>
                        <h4>코딩 실력 향상</h4>
                      </div>
                      <div className="mock-tabs"><strong>정보</strong><span>멤버</span></div>
                      <div className="mock-content">
                        <p>매일 알고리즘 문제를 풀고 인증하며 함께 성장합니다.</p>
                        <div className="mock-stat"><span>미션 수행 기간</span><strong>총 28일</strong></div>
                        <span className="mock-action">입장 신청 · 보증금 30,000원</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="project-visual devnear-visual" aria-label="데브니어 서비스 화면 예시">
                  <div className="browser-frame">
                    <div className="browser-bar"><span /><span /><span /></div>
                    <div className="browser-body">
                      <aside>
                        <strong>활동 지역</strong>
                        <span className="selected-filter">전국</span>
                        <span>서울</span><span>경기</span><span>인천</span>
                      </aside>
                      <div className="talent-grid">
                        {["서울 강남", "서울 성동", "경기 성남", "인천 연수"].map((region, index) => (
                          <div className="talent-card" key={region}>
                            <div className={`talent-cover cover-${index + 1}`} />
                            <strong>{["백엔드 개발자", "프론트엔드 개발자", "웹 디자이너", "풀스택 개발자"][index]}</strong>
                            <p>{["JAVA · SPRING", "REACT · TYPESCRIPT", "FIGMA · DESIGN SYSTEM", "NEXT.JS · SPRING"][index]}</p>
                            <span>{region}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-contact">
          <a href="mailto:jeonseong0120@gmail.com">jeonseong0120@gmail.com</a>
          <a href="https://github.com/jeonseong0120-source" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://decisive-act-f75.notion.site/f29230df73de826b892f8163ca510f50" target="_blank" rel="noreferrer">Notion</a>
          <a href="/jeonseong-resume.pdf" target="_blank">Resume</a>
        </div>
        <span>© 2026 전성</span>
      </footer>
    </main>
  );
}
