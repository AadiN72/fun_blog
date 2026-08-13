import { navigate } from "../../application/navigation.js";

export function BrandButton() {
  return (
    <button
      type="button"
      className="brand"
      aria-label="Go to home"
      onClick={() => navigate("/")}
    >
      <span className="brand-mark">{"{A}"}</span>
    </button>
  );
}
