export const corFundo = "#0d0d0d";
export const corFundo2 = "#262626";
export const corTextos = "#f2f2f2";  
export const corSecundaria = "#706ef9";
export const corPrincipal = "#59b6ff";



const Estilos = {
    conteudo: {
      flex: 1,
      width: "100%",
      backgroundColor: corFundo,
    },
    conteudoHeader: {
      flex: 1,

      backgroundColor: corSecundaria,
   
    },
    conteudoCorpo: {
      flex: 1,
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 25,
      padding: 15,
    },imagemLista:{
      width: 35,
      height: 35,
      marginRight: 10,
    },
    itemLista:{
      flexDirection: "row",
      alignItems: "center",
      padding: 7,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },textContainer:{
      flex: 1,
    },
    nomeLista:{
      fontSize: 16,
      fontWeight: "bold",
      color: corSecundaria,
    },
    
  };
  export default Estilos;
  