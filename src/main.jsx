import { createRoot } from "react-dom/client";
import "./posthog.js";
import App from "./App.jsx";
import "../styles.css";
import "../details.css";

createRoot(document.getElementById("root")).render(<App />);
