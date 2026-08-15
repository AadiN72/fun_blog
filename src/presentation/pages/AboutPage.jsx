import armImg from "../../assets/arm.jpg";
import atlasImg from "../../assets/atlas.jpg";
import lidarImg from "../../assets/lidar.jpg";
import pcbImg from "../../assets/pcb.jpg";
import prothesisImg from "../../assets/prothesis.jpg";
import { navigate } from "../../application/navigation.js";
import { PageLayout } from "../templates/PageLayout.jsx";

const backgroundImages = [armImg, atlasImg, lidarImg, pcbImg, prothesisImg];

export function AboutPage() {
  return (
    <PageLayout activePath="/about" className="homepage-shell">
      {/* Background Grid */}
      <div className="background-grid" aria-hidden="true">
        {backgroundImages.map((img, idx) => (
          <img key={idx} alt="Background" className="grid-image" src={img} />
        ))}
      </div>

      {/* Overlay */}
      <div className="background-overlay" aria-hidden="true"></div>

      {/* Main Content */}
      <main className="homepage-main about-content-wrapper">
        <article className="about-content-card">
          {/* Decorative Marks */}
          <div className="about-mark about-mark-top-left">
            <div className="about-mark-dot"></div>
            <span className="about-mark-text">SYS_01</span>
          </div>
          <div className="about-mark about-mark-top-right">
            <span className="about-mark-text">SEC_ABOUT</span>
            <div className="about-mark-bar"></div>
          </div>

          {/* Header */}
          <header className="about-header">
            <h1 className="about-title">About Me</h1>
            <div className="about-accent"></div>
          </header>

          {/* Prose Content */}
          <div className="about-prose">
            <p>
              My name is Aadi. I am currently pursuing a bachelor's degree in
              Electronics and Communications Engineering, and I spend a lot of
              my time working on software projects that sit at the border of
              robotics, AI, and engineering.
            </p>

            <p>
              I am especially interested in robotics, machine learning, embedded
              systems, autonomous systems, computer vision, human-robot
              interaction, and the engineering decisions behind intelligent
              machines. I enjoy learning how software connects with hardware,
              sensors, control systems, and real-world physical problems.
            </p>

            <p>
              I build apps and tools for the web, but I'm more driven by systems
              and research-driven ideas than by trend chasing. A lot of my
              interest comes from understanding how software can be useful in
              practical, technical domains where performance, reliability, and
              implementation details matter.
            </p>

            <div className="about-divider"></div>

            <p>
              Outside of code, I am a big gamer, a film enthusiast, and a music
              lover. I play piano and am working towards my ARSM diploma.
              Minecraft, Ghost of Tsushima, and Jedi: Fallen Order are some of
              my favourites, and I love anime, especially when it leans into
              deep world-building or strong emotional storytelling.
            </p>

            <p>
              Christopher Nolan is a huge favourite of mine, especially
              Interstellar, Inception, Tenet, Oppenheimer, and Dunkirk. I love
              that mix of ideas, scale, and technical craft, and it is one of
              the reasons I am drawn to engineering-heavy, concept-rich work.
            </p>

            <p>
              This blog is a place for technically interesting writing —
              robotics, AI, ML, embedded systems, research, and the kinds of
              engineering ideas I find worth thinking about.
            </p>
          </div>

          {/* Bottom Decorative Mark */}
          <div className="about-mark about-mark-bottom-right">
            <svg
              fill="none"
              height="40"
              viewBox="0 0 40 40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0H10V2H2V10H0V0Z" fill="currentColor"></path>
              <path d="M40 40H30V38H38V30H40V40Z" fill="currentColor"></path>
            </svg>
          </div>
        </article>
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
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Home
            </a>
          </div>
        </div>
      </footer>
    </PageLayout>
  );
}
