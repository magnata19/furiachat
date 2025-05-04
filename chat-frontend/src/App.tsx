import React from "react";
import Chat from "./pages/Chat/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import CadastroUsuario from "./pages/cadastro/CadastroUsuario";
import DadosTime from "./pages/DadosTime/DadosTime";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/time" element={<DadosTime />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
