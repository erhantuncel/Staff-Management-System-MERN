import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { getRouter } from "./routes";

// import i18n (needs to be bundled ;))
import "./i18n";
import { UIContextProvider } from "./contexts/UIContext";
import { StaffListContextProvider } from "./contexts/StaffListContext";

const router = getRouter();

createRoot(document.getElementById("root")).render(
    <Suspense fallback="loading">
        <StrictMode>
            <UIContextProvider>
                <StaffListContextProvider>
                    <RouterProvider router={router} />
                </StaffListContextProvider>
            </UIContextProvider>
        </StrictMode>
    </Suspense>,
);
