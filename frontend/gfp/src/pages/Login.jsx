import { useState } from "react";
import { enderecoServidor } from "../utils.jsx";
import {useNavigate} from "react-router-dom"
const Login = () => {
  const [mensagem, setMensagem] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate()
  async function botaoEntrar(e) {
    e.preventDefault();
    try {
      if (email == "" || senha == "") {
        throw new Error("Preencha todos os campos");
      }
      //altenticando utilizando api de back end com fetch
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        navigate("/principal")
        localStorage.setItem("usuario logado",JSON.stringify(dados));
      }else{
        setMensagem("Email ou senha incorretos!")
        throw new Error("Email ou senha incorretos!")
        
      }


    } catch (error) {
      console.error("erro ao realizar login: ", error);
      alert(error.message);
      return;
    }
  }

  const limpar = () => {
    setMensagem("");
    setSenha("");
    setEmail("");
  };

  return (
    <div
      className="card"
      style={{ width: "400px", margin: "auto", padding: "10px" }}
    >
      <img
        src="https://logodownload.org/wp-content/uploads/2019/08/senai-logo.png"
        alt=""
        style={{ width: "370px", height: "60px" }}
      />

      <p styles={{ textAlign: "center", marginTop: "10px" }}>Login</p>
      <p style={{ marginTop: "10px" }}>Email</p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Digite o email"
        style={{
          border: "none",
          borderRadius: "5px",
          padding: "6px",
          width: "370px",
    
        }}
      />
      <p style={{ marginTop: "20px" }}>Senha</p>
      <input
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
        type="password"
        placeholder="digite a senha"
        style={{
          border: "none",
          borderRadius: "5px",
          padding: "6px",
          width: "370px",
         
        }}
      />
      <br />
      <button
        style={{
          marginTop: "20px",
          border: "none",
          borderRadius: "5px",
          padding: "6px",
          width: "185px",
          color: "white",
          backgroundColor: "red",
        }}
        onClick={botaoEntrar}
      >
        Entrar
      </button>
      <button
        style={{
          marginTop: "20px",
          border: "none",
          borderRadius: "5px",
          padding: "6px",
          width: "185px",
          color: "white",
          backgroundColor: "red",
        }}
        onClick={limpar}
      >
        Limpar
      </button>
      <p>{mensagem}</p>
    </div>
  );
};


export default Login;
