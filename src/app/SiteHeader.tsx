export default function SiteHeader() {
  const links = (
    <>
      <a href="#projects">프로젝트</a>
      <a href="#experience">경험</a>
      <a href="/jeonseong-resume.pdf" target="_blank">이력서</a>
      <a href="https://decisive-act-f75.notion.site/f29230df73de826b892f8163ca510f50" target="_blank" rel="noreferrer">Notion</a>
      <a href="mailto:jeonseong0120@gmail.com">연락처</a>
    </>
  );

  return (
    <header className="site-header">
      <a className="wordmark" href="#top">전성</a>
      <nav className="desktop-nav" aria-label="주요 메뉴">{links}</nav>
      <details className="mobile-menu">
        <summary aria-label="메뉴 열기"><span /><span /></summary>
        <nav aria-label="모바일 메뉴">{links}</nav>
      </details>
    </header>
  );
}
