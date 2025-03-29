import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App";

// import i18n (needs to be bundled ;))
import "./i18n";

createRoot(document.getElementById("root")).render(
    <Suspense fallback="loading">
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </Suspense>,
);
