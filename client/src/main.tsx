import { createRoot } from "react-dom/client";
import "./index.css";
import { CategoriesContextProvider } from "./global/globalStates/CategoriesContext";
import { LoadingProvider } from "./components/loadingContext/LoadingContext";
import { App } from "./App";
import { Provider } from "react-redux";
import store from "./global/globalStates/redux/store/store";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <CategoriesContextProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </CategoriesContextProvider>
  </Provider>
);
