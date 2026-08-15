import infoData from "../../../fun_blog_cdn/info.json";
import { navigate } from "../../application/navigation.js";
import { PageLayout } from "../templates/PageLayout.jsx";

export function InfoEssentialPage() {
  const { essentialMedia } = infoData;

  return (
    <PageLayout activePath="/info" className="info-shell">
      <main className="info-main">
        <article className="info-card">
          <div className="info-content">
            <section className="info-page-heading">
              <h1>{essentialMedia.title}</h1>
            </section>

            <div className="media-list">
              {essentialMedia.items.map((item) => (
                <div key={item.url} className="media-item">
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                  {item.path && <p className="media-path">{item.path}</p>}
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
    </PageLayout>
  );
}
