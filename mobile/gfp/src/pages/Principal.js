import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Principal({ navigation }) {
  const [usuario, setUsuario] = useState({});
  useEffect(() => {
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
    buscarUsuarioLogado();
  }, []);
  const botao = async () => {
    try {
      await AsyncStorage.removeItem("usuario logado");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao remover usuário logado:", error);
    }
  };
  return (
    <View>
      <View style = {{flexDirection: "row", justifyContent: "space-between",alignItems: "center"}}>
        <Text>Bem-vindo, {usuario.nome}</Text>
        <Button
          title="Sair"
          onPress={botao}/>
      </View>
      <Text>Principal</Text>
    </View>
  );
}

export default Principal;
