import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testarConexao } from './db.js';
import rotasUsuarios from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasSubcategorias from './routes/rotasSubcategorias.js';
import rotasLocalTransacao from './routes/rotasLocal_transacao.js';
import rotasTransacao from './routes/rotasTransacao.js';
const app = express();
dotenv.config();
testarConexao();
app.use(cors());0
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Funcionando!')
})
//rotas usuarios
app.post("/usuarios/login", rotasUsuarios.login);
app.post('/usuarios', rotasUsuarios.novoUsuario);
app.get('/usuarios', rotasUsuarios.listarUsuarios);
app.get('/usuarios/:id', rotasUsuarios.listar);
app.put('/usuarios/:id', rotasUsuarios.editarUsuarios);
app.delete('/usuarios/:id', rotasUsuarios.deletarUsuarios);
app.patch('/usuarios/:id', rotasUsuarios.editar)


//rotas categorias
app.post('/categorias', rotasCategorias.novaCategoria);
app.get('/categorias', rotasCategorias.listarCategorias);
app.get('/categorias/:id', rotasCategorias.listar);
app.put('/categorias/:id', rotasCategorias.editarCategorias);
app.delete('/categorias/:id', rotasCategorias.deletarCategorias);
app.patch('/categorias/:id', rotasCategorias.editar)


//rotas subcategorias
app.post('/subcategorias', rotasSubcategorias.novaSubcategoria);
app.get('/subcategorias', rotasSubcategorias.listarSubcategoria);
app.get('/subcategorias/:id', rotasSubcategorias.listar);
app.put('/subcategorias/:id', rotasSubcategorias.editarSubcategoria);
app.delete('/subcategorias/:id', rotasSubcategorias.deletarSubcategoria);
app.patch('/subcategorias/:id', rotasSubcategorias.editar)




//rotas local_transacao
app.post('/localtransacao', rotasLocalTransacao.novoLocalTransacao);
app.get('/localtransacao', rotasLocalTransacao.listarLocalTransacao);
app.get('/localtransacao/:id', rotasLocalTransacao.listar);
app.put('/localtransacao/:id', rotasLocalTransacao.editarLocalTransacao);
app.delete('/localtransacao/:id', rotasLocalTransacao.deletarLocalTransacao);
app.patch('/localtransacao/:id', rotasLocalTransacao.editar)


//rotas local_transacao
app.post('/transacao', rotasTransacao.novaTransacao);
app.get('/transacao', rotasTransacao.listarTransacao);
app.get('/transacao/:id', rotasTransacao.listar);
app.put('/transacao/:id', rotasTransacao.editarTransacao);
app.delete('/transacao/:id', rotasTransacao.deletarTransacao);
app.patch('/transacao/:id', rotasTransacao.editar)


const porta = 3000
app.listen(porta, () => {
    console.log(`api http://localhost:${porta}`);
})
