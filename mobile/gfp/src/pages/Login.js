import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { enderecoServidor } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Login({ navigation }) {
  const [mensagem, setMensagem] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  async function verificar(e) {
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
        AsyncStorage.setItem("usuario logado", JSON.stringify ({...dados, lembrar})); 
          navigation.navigate("MenuDrawer");
      } else {
        setMensagem("Email ou senha incorretos!");
        throw new Error("Email ou senha incorretos!");
      }
    } catch (error) {
      console.error("erro ao realizar login: ", error);
      alert(error.message);
      return;
    }
  }
    useEffect(() => {
    const buscarUsuarioLogado = async () => {
      try {
        const usuariolog = await AsyncStorage.getItem("usuario logado");
        if (usuariolog) {
       const usuario = JSON.parse(usuariolog);
          if (usuario.lembrar == true) {
            navigation.navigate("MenuDrawer");
          }
        } else {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Erro ao obter usuário logado:", error);
      }
    };
    buscarUsuarioLogado();
  }, []);
  const limpar = () => {
    setSenha("");
    setEmail("");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#999"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#999"
        secureTextEntry={true}
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
      />
      <View style = {{alignItems:"center",justifyContent:"center"}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white", marginRight: 10 }}>Lembrar</Text>
          <Switch value={lembrar} onValueChange={setLembrar} />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonWrapper} onPress={verificar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonWrapper} onPress={limpar}>
        <Text style={styles.buttonText}>Limpar</Text>
      </TouchableOpacity>
      <Text style={{ color: "white", marginTop: 20 }}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  titulo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    color: "#fff",
    marginBottom: 20,
    backgroundColor: "#222",
  },
  buttonWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Login;
