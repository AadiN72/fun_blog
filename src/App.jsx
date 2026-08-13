import { useEffect, useState } from "react";
import "./App.css";
import { AboutPage } from "./presentation/pages/AboutPage.jsx";
import { HomePage } from "./presentation/pages/HomePage.jsx";

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

  return <HomePage />;
}

export default App;
