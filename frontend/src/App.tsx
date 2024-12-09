import React from "react";
import { BrowserRouter as Router, Routes,Route  } from "react-router-dom";
import PageAjouter from "./pages/PageAjouter";
import PageHome from "./pages/PageHome"; // Par exemple, si vous avez une page d'accueil
import PageConsulter from "./pages/PageConsulter";
import PageModifierMot from "./pages/PageModifierMot";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<PageHome/>} />
        <Route path="/ajouter" element={<PageAjouter/>} />
        <Route path="/consulter" element={<PageConsulter />} />
        <Route path="/modifier/:id" element={<PageModifierMot />} />
      </Routes>
    </Router>
  );
};

export default App;
