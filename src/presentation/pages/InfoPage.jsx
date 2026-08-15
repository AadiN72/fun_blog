import infoData from "../../../fun_blog_cdn/info.json";
import { navigate } from "../../application/navigation.js";
import { PageLayout } from "../templates/PageLayout.jsx";

export function InfoPage() {
  const { techIUse, appDefaults, essentialMedia } = infoData;

  const infoCards = [
    {
      title: techIUse.title,
      description:
        "You'd expect a tech person to be opinionated about the tools they use. Here's some of my highlights.",
      href: "/info/uses",
    },
    {
      title: appDefaults.title,
      description: "That list from Hemispheric Views.",
      href: "/info/app-defaults",
    },
    {
      title: essentialMedia.title,
      description: "Articles and videos that live in my head rent-free.",
      href: "/info/essential",
    },
  ];

  return (
    <PageLayout activePath="/info" className="info-shell">
      <main className="info-main">
        <article className="info-card">
          <div className="info-content">
            <section className="info-page-heading">
              <h1>Info</h1>
            </section>

            <ul className="info-home-list">
              {infoCards.map((card) => (
                <li key={card.title}>
                  <a
                    href={card.href}
                    className="info-home-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(card.href);
                    }}
                  >
                    <article className="info-home-card">
                      <h2>{card.title}</h2>
                      <p>{card.description}</p>
                    </article>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </main>
    </PageLayout>
  );
}
