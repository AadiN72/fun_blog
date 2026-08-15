import { useEffect, useState } from "react";
import "./App.css";
import { AboutPage } from "./presentation/pages/AboutPage.jsx";
import { BlogListPage } from "./presentation/pages/BlogListPage.jsx";
import { BlogPostPage } from "./presentation/pages/BlogPostPage.jsx";
import { GuestbookPage } from "./presentation/pages/GuestbookPage.jsx";
import { HomePage } from "./presentation/pages/HomePage.jsx";
import { InfoPage } from "./presentation/pages/InfoPage.jsx";
import { InfoAppDefaultsPage } from "./presentation/pages/InfoAppDefaultsPage.jsx";
import { InfoEssentialPage } from "./presentation/pages/InfoEssentialPage.jsx";
import { InfoUsesPage } from "./presentation/pages/InfoUsesPage.jsx";
import { ProjectsPage } from "./presentation/pages/ProjectsPage.jsx";

function App() {
  const [currentPath, setCurrentPath] = useState(
    () => window.location.pathname,
  );

  useEffect(() => {
    const handleRoute = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handleRoute);
    return () => window.removeEventListener("popstate", handleRoute);
  }, []);

  if (currentPath === "/about") {
    return <AboutPage />;
  }

  if (currentPath === "/info") {
    return <InfoPage />;
  }

  if (currentPath === "/info/uses") {
    return <InfoUsesPage />;
  }

  if (currentPath === "/info/app-defaults") {
    return <InfoAppDefaultsPage />;
  }

  if (currentPath === "/info/essential") {
    return <InfoEssentialPage />;
  }

  if (currentPath === "/blog") {
    return <BlogListPage />;
  }

  if (currentPath === "/projects") {
    return <ProjectsPage />;
  }

  if (currentPath === "/guestbook") {
    return <GuestbookPage />;
  }

  if (currentPath.startsWith("/blog/")) {
    const slug = currentPath.replace("/blog/", "");
    return <BlogPostPage slug={slug} />;
  }

  return <HomePage />;
}

export default App;
