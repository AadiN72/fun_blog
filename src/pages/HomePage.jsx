import { socialLinks } from "../application/siteData.js";
import {
  DiscordIcon,
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
} from "../atoms/SocialIcons.jsx";
import { navigate } from "../application/navigation.js";
import { BrandButton } from "../atoms/BrandButton.jsx";
import { MainNav } from "../molecules/MainNav.jsx";

const iconMap = {
  GitHub: <GitHubIcon />,
  Discord: <DiscordIcon />,
  Instagram: <InstagramIcon />,
  Email: <EmailIcon />,
};

// Placeholder images for the grid background
const backgroundImages = [
  "https://images.unsplash.com/photo-1635070041078-e3c10e774ffe?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1677442d019cecf8e11fab63db4d5f3f3f7d7d7d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1666881196284-d30d8a67d6a9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1629904853893-c2c8981a1e6e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1636889462033-628eca69f783?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop",
];

export function HomePage() {
  return (
    <div className="homepage-shell">
      {/* Background Grid */}
      <div className="background-grid" aria-hidden="true">
        {backgroundImages.map((img, idx) => (
          <img
            key={idx}
            alt="Background"
            className="grid-image"
            src={img}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="background-overlay" aria-hidden="true"></div>

      {/* Fixed Navigation */}
      <header className="top-nav-fixed">
        <div className="nav-container">
          <BrandButton />
          <MainNav activePath="/" />
          <a href="/about" className="contact-button" onClick={(e) => {
            e.preventDefault();
            navigate("/about");
          }}>
            Contact
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="homepage-main">
        <div className="hero-content">
          <h1 className="hero-title">Hey, I&apos;m Aadi.</h1>
          <p className="hero-subtitle">
            Building the next generation of intelligent machines. Exploring the
            intersection of robotics, computer vision, and autonomous systems.
          </p>

          <div className="social-icons" aria-label="Social profiles">
            {socialLinks.map(({ label, href, iconName }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="social-icon"
              >
                {iconMap[iconName]}
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-copyright">
            © 2024 Aadi. Engineered with precision.
          </div>
          <div className="footer-links">
            <a
              href="https://github.com/AadiN72/fun_blog"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a href="https://discord.com/users/ShadowNinja72" target="_blank" rel="noreferrer">
              Discord
            </a>
            <a href="/about" onClick={(e) => {
              e.preventDefault();
              navigate("/about");
            }}>
              About
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
