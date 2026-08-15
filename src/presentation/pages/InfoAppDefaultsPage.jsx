import infoData from "../../../fun_blog_cdn/info.json";
import { navigate } from "../../application/navigation.js";
import { PageLayout } from "../templates/PageLayout.jsx";

export function InfoAppDefaultsPage() {
  const { appDefaults } = infoData;

  return (
    <PageLayout activePath="/info" className="info-shell">
      <main className="info-main">
        <article className="info-card">
          <div className="info-content">
            <section className="info-page-heading">
              <h1>{appDefaults.title}</h1>
            </section>

            <ul className="info-list app-defaults">
              {appDefaults.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      </main>
    </PageLayout>
  );
}
