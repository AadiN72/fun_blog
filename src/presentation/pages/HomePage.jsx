import { socialLinks } from "../../application/siteData.js";
import {
  DiscordIcon,
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
} from "../atoms/SocialIcons.jsx";
import { navigate } from "../../application/navigation.js";
import { PageLayout } from "../templates/PageLayout.jsx";
import armImg from "../../assets/arm.jpg";
import atlasImg from "../../assets/atlas.jpg";
import lidarImg from "../../assets/lidar.jpg";
import pcbImg from "../../assets/pcb.jpg";
import prothesisImg from "../../assets/prothesis.jpg";

const iconMap = {
  GitHub: <GitHubIcon />,
  Discord: <DiscordIcon />,
  Instagram: <InstagramIcon />,
  Email: <EmailIcon />,
};

// Placeholder images for the grid background
const backgroundImages = [armImg, atlasImg, lidarImg, pcbImg, prothesisImg];

export function HomePage() {
  return (
    <PageLayout activePath="/" className="homepage-shell">
      {/* Background Grid */}
      <div className="background-grid" aria-hidden="true">
        {backgroundImages.map((img, idx) => (
          <img key={idx} alt="Background" className="grid-image" src={img} />
        ))}
      </div>

      {/* Overlay */}
      <div className="background-overlay" aria-hidden="true"></div>

      {/* Main Content */}
      <main className="homepage-main">
        <div className="hero-content">
          <h1 className="hero-title">Hey👋, </h1>
          <h1 className="hero-title"> I&apos;m Aadi. </h1>
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

          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              navigate("/about");
            }}
            className="read-more-btn"
          >
            Read More About Me
          </a>
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
            <a
              href="https://discord.com/users/ShadowNinja72"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigate("/about");
              }}
            >
              About
            </a>
          </div>
        </div>
      </footer>
    </PageLayout>
  );
}
