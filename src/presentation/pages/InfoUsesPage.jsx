import infoData from "../../../fun_blog_cdn/info.json";
import { navigate } from "../../application/navigation.js";
import { PageLayout } from "../templates/PageLayout.jsx";

export function InfoUsesPage() {
  const { techIUse } = infoData;

  return (
    <PageLayout activePath="/info" className="info-shell">
      <main className="info-main">
        <article className="info-card">
          <div className="info-content">
            <section className="info-page-heading">
              <h1>{techIUse.title}</h1>
            </section>

            {techIUse.sections.map((section) => (
              <div key={section.heading} className="info-block">
                <h3>{section.heading}</h3>
                {section.items &&
                  section.items.map((item) => (
                    <div key={item.name} className="info-item">
                      <p className="info-item-name">{item.name}</p>
                      <p>{item.description}</p>
                    </div>
                  ))}
                {section.description && (
                  <p className="info-item-description">{section.description}</p>
                )}
                {section.list && (
                  <ul className="info-list">
                    {section.list.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </article>
      </main>
    </PageLayout>
  );
}
