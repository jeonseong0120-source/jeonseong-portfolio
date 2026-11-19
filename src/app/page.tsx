const projects = [
  {
    name: "DONDOK",
    description:
      "참여 횟수에 따라 공동 보증금을 나누는 지분 기반 습관 형성 서비스",
    role: "Backend · Frontend",
  },
  {
    name: "DEVNEAR",
    description:
      "지역과 보유 기술을 기준으로 클라이언트와 프리랜서를 연결하는 매칭 서비스",
    role: "Repository Maintainer · Backend · Frontend",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top">JEONSEONG</a>
        <nav aria-label="주요 메뉴">
          <a href="#projects">PROJECTS</a>
          <a href="#about">ABOUT</a>
          <a href="mailto:jeonseong0120@gmail.com">CONTACT</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">PRODUCT ENGINEER · FULL-STACK DEVELOPER</p>
        <h1>사용자에게 닿는 흐름까지<br />직접 확인하며 만듭니다.</h1>
        <p className="hero-copy">
          API 구현에서 멈추지 않고 실제 화면과 사용자 흐름을 함께 확인합니다.
          문제의 구조를 이해하고 서비스 안에서 자연스럽게 이어지는 결과를 만드는 개발자 전성입니다.
        </p>
        <div className="hero-actions">
          <a className="primary-link" href="#projects">프로젝트 보기</a>
          <a className="text-link" href="https://github.com/jeonseong0120-source" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <p>01 / SELECTED PROJECTS</p>
          <h2>대표 프로젝트</h2>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project" key={project.name}>
              <span className="project-number">0{index + 1}</span>
              <div>
                <p className="project-role">{project.role}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <span aria-hidden="true" className="project-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section about" id="about">
        <div className="section-heading">
          <p>02 / ABOUT</p>
          <h2>전성</h2>
        </div>
        <p>
          프론트엔드와 디자인에도 관심이 많아 기능이 실제 서비스 안에서 어떻게 보이고 작동하는지까지 확인합니다.
          필요한 순간에는 끝까지 몰입해 결과를 만들어내는 편입니다.
        </p>
      </section>

      <footer>
        <a href="mailto:jeonseong0120@gmail.com">jeonseong0120@gmail.com</a>
        <span>© 2026 JEONSEONG</span>
      </footer>
    </main>
  );
}
