import { navigate } from "../../application/navigation.js";
import { PageLayout } from "../templates/PageLayout.jsx";

export function InfoCanteenPage() {
  return (
    <PageLayout activePath="/info" className="info-shell">
      <main className="info-main">
        <article className="info-card">
          <header className="info-header">
            <div className="brand-inline">
              <span className="brand-mini">✦</span>
              <span className="brand-word">aadi</span>
            </div>
            <nav className="info-topbar" aria-label="Info navigation">
              <a
                href="/info"
                className="info-top-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/info");
                }}
              >
                Info
              </a>
              <a
                href="/projects"
                className="info-top-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/projects");
                }}
              >
                Projects
              </a>
              <a
                href="/blog"
                className="info-top-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/blog");
                }}
              >
                Blog
              </a>
              <a
                href="/guestbook"
                className="info-top-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/guestbook");
                }}
              >
                Guestbook
              </a>
            </nav>
          </header>

          <div className="info-content">
            <section className="info-page-heading">
              <h1>Canteen Log</h1>
            </section>

            <div className="info-block">
              <p>
                Nothing here yet, but this is the place for the campus canteen
                notes and little food logs.
              </p>
            </div>
          </div>
        </article>
      </main>
    </PageLayout>
  );
}
