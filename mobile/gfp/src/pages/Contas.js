import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enderecoServidor } from "../utils";
import Estilos, { corPrincipal } from "../styles/Estilos";

function Contas({ navigation }) {
  const [dadolista, setDadosLista] = useState([]);
  const [usuario, setUsuario] = useState({});

  const buscarDados = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/contas`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      const dados = await resposta.json();
      setDadosLista(dados);
    } catch (error) {
      console.error("Erro ao obter usuário logado:", error);
    }
  };

      const buscarUsuarioLogado = async () => {
      try {
        const usuariolog = await AsyncStorage.getItem("usuario logado");
        if (usuariolog) {
          setUsuario(JSON.parse(usuariolog));
        } else {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Erro ao obter usuário logado:", error);
      }
    };

  useEffect(() => { 
    buscarUsuarioLogado();

   
  }, []);

  useEffect(() => { 
  
    buscarDados();
   
  }, [usuario]);

  const exibirItemLista = ({ item }) => {
    return (
      <TouchableOpacity style={Estilos.itemLista}>
        <Image
          source={require("../assets/image.png")}
          style={Estilos.imagemLista}
        />
        <View style={Estilos.conteudoCorpo}>
          <Text style={Estilos.nomeLista}>{item.nome}</Text>
          <Text>{item.tipo_conta}</Text>
        </View>
        <MaterialIcons name="edit" size={24} color={corPrincipal} />
        <MaterialIcons name="delete" size={24} color={corPrincipal} 
        onPress={botaoExcluir(item.id_conta)}/>
      </TouchableOpacity>
    );
  };
  const botaoExcluir = async (id) => {
    try {
      const resposta = await fetch(`${enderecoServidor}/contas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (resposta.ok) {
        buscarDados();
      } else {
        console.error("Erro ao excluir conta:", resposta.status);
      }
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    }
  };

  return (
    <View style={Estilos.conteudoHeader}>
      <View style={Estilos.conteudoCorpo}>
        <Text>Contas</Text>
        <FlatList
          data={dadolista}
          renderItem={exibirItemLista}
          keyExtractor={(item) => item.id_conta}
        />
      </View>
    </View>
  );
}

export default Contas;
