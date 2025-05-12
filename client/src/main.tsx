import { createRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>ness - Transformamos Operações Críticas em Vantagem Estratégica</title>
      <meta name="description" content="Soluções especializadas em segurança, infraestrutura e operações críticas para empresas que buscam vantagem competitiva através da tecnologia." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Helmet>
    <App />
  </HelmetProvider>
);
