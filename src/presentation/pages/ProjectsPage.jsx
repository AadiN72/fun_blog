import { useEffect, useState } from "react";
import { navigate } from "../../application/navigation.js";
import { PageLayout } from "../templates/PageLayout.jsx";

const PROJECTS_URL =
  "https://api.github.com/repos/AadiN72/fun_blog_cdn/contents/projects.json";

const formatRange = (start, end) => {
  if (!start && !end) {
    return "";
  }

  const startDate = start ? new Date(start) : "";
  const endDate = end ? new Date(end) : "";

  const format = (value) => {
    if (!value || Number.isNaN(value.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(value);
  };

  const formattedStart = format(startDate);
  const formattedEnd = end === "Present" ? "Present" : format(endDate);

  if (formattedStart && formattedEnd) {
    return `${formattedStart} - ${formattedEnd}`;
  }

  return formattedStart || formattedEnd || "";
};

export function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const headers = {
          Accept: "application/vnd.github+json",
        };

        // Add GitHub token if available for higher rate limits
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (token) {
          headers.Authorization = `token ${token}`;
        }

        const response = await fetch(PROJECTS_URL, {
          headers,
        });

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.content) {
          throw new Error("No content in GitHub response");
        }

        // Decode base64 content from GitHub API
        let decoded;
        try {
          // GitHub API returns base64 with line breaks; remove them before decoding
          const base64Clean = data.content.replace(/\s/g, "");
          decoded = atob(base64Clean).trim();
        } catch (decodeErr) {
          throw new Error(`Base64 decode failed: ${decodeErr.message}`);
        }

        // Parse the decoded JSON
        let parsed;
        try {
          parsed = JSON.parse(decoded);
        } catch (parseErr) {
          throw new Error(`JSON parse failed: ${parseErr.message}`);
        }

        if (!isMounted) {
          return;
        }

        setProjects(Array.isArray(parsed) ? parsed : []);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        console.error("Projects load error:", err);
        setError("Unable to load projects right now.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout activePath="/projects" className="projects-shell">
      <main className="projects-main">
        <article className="projects-card">
          <header className="projects-header">
            <h1 className="projects-title">Projects</h1>
          </header>

          {/* Intro */}
          <p className="projects-intro-text">
            This is a subset of my best projects. I've made many minor
            contributions to various repositories and have others that are still
            in the works.
          </p>

          {/* Projects List */}
          <div className="projects-content">
            {loading && <div className="project-status">Loading projects…</div>}
            {error && <div className="project-status error">{error}</div>}

            {!loading && !error && (
              <div className="projects-list">
                {projects.map((project) => (
                  <article key={project.title} className="project-card">
                    <div className="project-head">
                      <h3>{project.title}</h3>
                      <div className="project-links" aria-label="Project links">
                        {project.links?.source && (
                          <a
                            href={project.links.source}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Source code"
                          >
                            ↗
                          </a>
                        )}
                        {project.links?.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Live demo"
                          >
                            ⌁
                          </a>
                        )}
                      </div>
                    </div>

                    <p>{project.description}</p>

                    {project.badge && (
                      <div className="project-badge-wrap">
                        <span className="project-badge">{project.badge}</span>
                      </div>
                    )}

                    {project.start && (
                      <div className="project-date">
                        {formatRange(project.start, project.end)}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
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
