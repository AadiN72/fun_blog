import { BrandButton } from "../atoms/BrandButton.jsx";
import { MainNav } from "../molecules/MainNav.jsx";

export function PageLayout({ children, activePath = "/", className = "" }) {
  return (
    <div className={`page-shell ${className}`.trim()}>
      <header className="top-nav-fixed">
        <div className="nav-container">
          <BrandButton />
          <MainNav activePath={activePath} />
        </div>
      </header>

      {children}
    </div>
  );
}
