import { useState } from "react";
import Perfil from "./components/Perfil";
import Formulario from "./components/Formulario";
import ReposList from "./components/ReposList";

function App() {
  const [formularioEstaVisivel, setFormularioEstaVisivel] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");

  return (
    <div className="container">
      <input
        className="input"
        type="text"
        placeholder="Digite o nome de usuário do GitHub"
        value={nomeUsuario}
        onChange={(e) => setNomeUsuario(e.target.value)}
      />

      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario} />
          <ReposList nomeUsuario={nomeUsuario} />
        </>
      )}
    </div>
  );
}

export default App;




