import { createRoot } from "./react/src/index.js";
import App from "./App.js";

const root = createRoot(document.getElementById("root"));
root.render(App);

export { root };
