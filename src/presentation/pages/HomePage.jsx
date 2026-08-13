import { socialLinks, topics } from "../../application/siteData.js";
import {
  DiscordIcon,
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
} from "../atoms/SocialIcons.jsx";
import { navigate } from "../../application/navigation.js";
import { PageLayout } from "../templates/PageLayout.jsx";

const iconMap = {
  GitHub: <GitHubIcon />,
  Discord: <DiscordIcon />,
  Instagram: <InstagramIcon />,
  Email: <EmailIcon />,
};

export function HomePage() {
  return (
    <PageLayout activePath="/">
      <main className="hero-section">
        <div className="hero-title">
          <div className="hero-wave" aria-hidden="true">
            👋
          </div>
          <h1>Hey, I'm Aadi.</h1>
        </div>

        <div className="bio-copy">
          <p>
            I am a student and hobbyist software developer with a strong
            interest in robotics, AI, machine learning, embedded systems, and
            emerging technology.
          </p>
          <p>
            I like to build things that sit at the edge of engineering and
            research, from control systems to computer vision, autonomy, and
            electronics.
          </p>
        </div>

        <div className="interest-chips" aria-label="Main topics">
          {topics.map((topic) => (
            <span key={topic} className="chip">
              {topic}
            </span>
          ))}
        </div>

        <a
          className="read-more"
          href="/about"
          onClick={(event) => {
            event.preventDefault();
            navigate("/about");
          }}
        >
          Read more <span aria-hidden="true">→</span>
        </a>

        <div className="social-row" aria-label="Social profiles">
          {socialLinks.map(({ label, href, iconName }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              {iconMap[iconName]}
            </a>
          ))}
        </div>
      </main>
    </PageLayout>
  );
}
