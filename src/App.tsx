import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

/**
 * Routes du site. Pour ajouter une page :
 *   1. créer src/pages/MaPage.tsx
 *   2. ajouter <Route path="ma-page" element={<MaPage />} /> ci-dessous
 */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {/* URL inconnue : retour à l'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
