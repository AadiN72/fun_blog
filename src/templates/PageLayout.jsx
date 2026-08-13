import { BrandButton } from "../atoms/BrandButton.jsx";
import { MainNav } from "../molecules/MainNav.jsx";

export function PageLayout({ children, activePath = "/", className = "" }) {
  return (
    <div className={`page-shell ${className}`.trim()}>
      <header className="top-header">
        <BrandButton />
        <MainNav activePath={activePath} />
      </header>

      {children}

      <footer className="site-footer">
        <span>amrita town</span>
        <span className="footer-separator">•</span>
        <span>prev</span>
        <span className="footer-separator">•</span>
        <span>random</span>
        <span className="footer-separator">•</span>
        <span>next →</span>
      </footer>
    </div>
  );
}
