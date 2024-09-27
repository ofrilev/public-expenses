import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { CategoriesContextProvider } from "./components/categoriesContext/CategoriesContext";
import { LoadingProvider } from "./components/loadingContext/LoadingContext";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <CategoriesContextProvider>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </CategoriesContextProvider>
);
