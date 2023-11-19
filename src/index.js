import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import App from "./App";
import EnterAddress from "./EnterAddress";
import GoogleMap from "./googlemap";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <GoogleMap />
  </StrictMode>
);
