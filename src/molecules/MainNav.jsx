import { navItems } from "../application/siteData.js";
import { navigate } from "../application/navigation.js";

export function MainNav({ activePath = "/" }) {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      {navItems.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          className={`nav-link ${href === activePath ? "active" : ""}`}
          onClick={(event) => {
            event.preventDefault();
            navigate(href);
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
