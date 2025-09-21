import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  //Provide redux store to entire app
  <Provider store={store}>
    <App />
  </Provider>
);
