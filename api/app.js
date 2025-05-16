import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testarConexao } from "./db.js";
import rotasUsuarios from "./routes/rotasUsuarios.js";
import rotasCategorias from "./routes/rotasCategorias.js";
import rotasSubcategorias from "./routes/rotasSubcategorias.js";
import rotasContas from "./routes/rotasContas.js";
import rotasTransacao from "./routes/rotasTransacao.js";
import { autenticarToken } from "./routes/rotasUsuarios.js";
const app = express();
dotenv.config();
testarConexao();
app.use(cors());
0;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Funcionando!");
});
//rotas usuarios
app.post("/usuarios/login",rotasUsuarios.login);
app.post("/usuarios",rotasUsuarios.novoUsuario);
app.get("/usuarios", autenticarToken,rotasUsuarios.listarUsuarios);
app.get("/usuarios/:id",autenticarToken,rotasUsuarios.listar);
app.put("/usuarios/:id",autenticarToken,rotasUsuarios.editarUsuarios);
app.delete("/usuarios/:id",autenticarToken,rotasUsuarios.deletarUsuarios);
app.patch("/usuarios/:id",autenticarToken,rotasUsuarios.editar);

//rotas categorias
app.post("/categorias",autenticarToken,rotasCategorias.novaCategoria);
app.get("/categorias",autenticarToken,rotasCategorias.listarCategorias);
app.get("/categorias/filtro",autenticarToken,rotasCategorias.filtrarCategoria);
app.get("/categorias/:id", autenticarToken,rotasCategorias.listar);
app.put("/categorias/:id",autenticarToken,rotasCategorias.editarCategorias);
app.delete("/categorias/:id",autenticarToken,rotasCategorias.deletarCategorias);
app.patch("/categorias/:id",autenticarToken,rotasCategorias.editar);
app.get("/categorias/filtrarCategoria", autenticarToken,rotasCategorias.filtrarCategoria);

//rotas subcategorias
app.post("/subcategorias",autenticarToken,rotasSubcategorias.novaSubcategoria);
app.get("/subcategorias",autenticarToken,rotasSubcategorias.listarSubcategoria);
app.get("/subcategorias/:id",autenticarToken,rotasSubcategorias.listar);
app.put("/subcategorias/:id",autenticarToken,rotasSubcategorias.editarSubcategoria);
app.delete("/subcategorias/:id",autenticarToken,rotasSubcategorias.deletarSubcategoria);
app.patch("/subcategorias/:id",autenticarToken,rotasSubcategorias.editar);

//rotas contas
app.post("/contas",rotasContas.novoConta);
app.get("/contas",autenticarToken,rotasContas.listarConta);
app.get("/contas/:id",rotasContas.listar);
app.put("/contas/:id",rotasContas.editarConta);
app.delete("/contas/:id",rotasContas.deletarConta);
app.patch("/contas/:id",rotasContas.editar);
app.get("/contas/filtrarContas",rotasContas.filtrarNome);

//rotas transacao
app.get("/transacao/somarTransacoes",rotasTransacao.somarTransacoes);
app.get("/transacao/filtroData",rotasTransacao.filtrarPorData);
app.get("/transacao/vencida",rotasTransacao.transacoesVencidas);
app.post("/transacao",autenticarToken,rotasTransacao.novaTransacao);
app.get("/transacao",autenticarToken,rotasTransacao.listarTransacao);
app.get("/transacao/:id",autenticarToken,rotasTransacao.listar);
app.put("/transacao/:id",autenticarToken,rotasTransacao.editarTransacao);
app.delete("/transacao/:id",autenticarToken,rotasTransacao.deletarTransacao);
app.patch("/transacao/:id",autenticarToken,rotasTransacao.editar);


const porta = 3000;
app.listen(porta, () => {
  console.log(`api http://localhost:${porta}`);
});
