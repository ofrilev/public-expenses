import { createRoot } from "react-dom/client";
import "./index.css";

import { CategoriesContextProvider } from "./global/globalStates/CategoriesContext";
import { LoadingProvider } from "./components/loadingContext/LoadingContext";
import { App } from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <CategoriesContextProvider>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </CategoriesContextProvider>
);
