import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
function Principal (){
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();
  useEffect(() => {
    const buscarUsuarioLogado = async () => {
      try {
        const usuariolog = await localStorage.getItem("usuario logado");
        if (usuariolog) {
          setUsuario(JSON.parse(usuariolog));
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao obter usuário logado:", error);
      }
    };
    buscarUsuarioLogado();
  }, []);
  const botao = async () => {
    try {
      await localStorage.removeItem("usuario logado");
      navigate("/");
    } catch (error) {
      console.error("Erro ao remover usuário logado:", error);
    }
  };
    return(
            <div>
              <div style = {{flexDirection: "row", justifyContent: "space-between",alignItems: "center"}}>
                <p>Bem-vindo, {usuario.nome}</p>
                <button
                  onClick={botao}>Sair</button>
              </div>
              <p>Principal</p>
            </div>
    )
}

export default Principal;