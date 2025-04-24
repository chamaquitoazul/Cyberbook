import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.tsx";
import * as Sentry from "@sentry/react";

// Inicialización de Sentry
Sentry.init({
  dsn: "https://28cf4fa82c1f3a8f422572dbc27abde6@o4509209291784192.ingest.us.sentry.io/4509209559891968", // Aquí irá tu DSN de Sentry
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);