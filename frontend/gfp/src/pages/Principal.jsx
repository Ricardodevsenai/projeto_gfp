import React, { useEffect, useState } from "react";
import {useNavigation} from "react-router-dom";
function Principal (){
    const [usuario, setUsuario] = useState({});
    const navigation = useNavigation();
  useEffect(() => {
    const buscarUsuarioLogado = async () => {
      try {
        const usuariolog = await localStorage.getItem("usuario logado");
        if (usuariolog) {
          setUsuario(JSON.parse(usuariolog));
        } else {
          navigation.navigate("Login");
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
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao remover usuário logado:", error);
    }
  };
    return(
            <div>
              <div style = {{flexDirection: "row", justifyContent: "space-between",alignItems: "center"}}>
                <p>Bem-vindo, {usuario.nome}</p>
                <button
                  title="Sair"
                  onPress={botao}/>
              </div>
              <p>Principal</p>
            </div>
    )
}

export default Principal;