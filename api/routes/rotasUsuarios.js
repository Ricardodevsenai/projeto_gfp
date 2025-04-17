import { BD } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = "chave_api_gfp";
class rotasUsuarios {
  static async novoUsuario(req, res) {
    const { nome, email, senha, tipo_acesso, ativo } = req.body;

    const saltRounds = 10;

    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    try {
      // const usuario  = await BD.query(`
      // insert into usuarios (nome, email, senha, tipo_acesso) values ($1, $2, $3, $4, $5)`,
      //  [nome, email, senhaCri+ptografada,tipo_acesso]);

      const query = `insert into usuarios (nome, email, senha, tipo_acesso) values ($1, $2, $3, $4)`;

      const valores = [nome, email, senhaCriptografada, tipo_acesso];
      const resposta = await BD.query(query, valores);

      res.status(201).json("usuario cadastrado");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  static async listarUsuarios(req, res) {
    try {
      const resposta = await BD.query(
        "select * from usuarios where ativo = true"
      );
      res.status(200).json(resposta.rows);
    } catch (error) {
      console.log("erro ao listar usuarios ", error);
      res
        .status(500)
        .json({ message: "Erro ao listar usuários", error: error.message });
    }
  }
  static async listar(req, res) {
    const { id } = req.params;
    try {
      const resposta = await BD.query(
        "select * from usuarios where ativo = true and id_usuario = $1",
        [id]
      );
      res.status(200).json(resposta.rows);
    } catch (error) {
      console.log("erro ao listar usuarios ", error);
      res
        .status(500)
        .json({ message: "Erro ao listar usuários", error: error.message });
    }
  }
  static async editarUsuarios(req, res) {
    const { id } = req.params;
    const { nome, email, senha, tipo_acesso, ativo } = req.body;

    const saltRounds = 10;

    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
    try {
      const resposta = await BD.query(
        "update usuarios set nome = $1, email = $2, senha = $3, tipo_acesso= $4,ativo =$5 where id_usuario = $6",
        [nome, email, senhaCriptografada, tipo_acesso, ativo, id]
      );
      res.status(200).json("usuario editado com sucesso");
    } catch (error) {
      console.log("erro ao editar usuario ", error);
      res
        .status(500)
        .json({ message: "Erro ao listar usuários", error: error.message });
    }
  }

  static async deletarUsuarios(req, res) {
    const { id } = req.params;
    try {
      const resposta = await BD.query(
        "update usuarios set ativo = false where id_usuario=$1 ",
        [id]
      );
      res.status(200).json("usuario deletado com sucesso");
    } catch (error) {
      console.log("erro ao deletar usuario ", error);
      res
        .status(500)
        .json({ message: "Erro ao listar usuários", error: error.message });
    }
  }
  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const resultado = await BD.query(
        `SELECT id_usuario, nome, email, senha
                   FROM usuarios
                   WHERE email = $1`,
        [email]
      );
      if (resultado.rows.length === 0) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }
      const usuario = resultado.rows[0];
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json("Email ou senha inválidos");
      }
      //gerar um novo token para o usuario
      const token = jwt.sign(
        {
          id_usuario: usuario.id_usuario,
          nome: usuario.nome,
          email: usuario.email,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res
        .status(200)
        .json({ message: "Login realizado com sucesso", token });
      // return res.status(200).json({ message: "Login realizado com sucesso" });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      return res
        .status(500)
        .json({ message: "Erro ao realizar login", erro: error.message });
    }
  }
  static async editar(req, res) {
    const { id } = req.params;

    const { nome, email, senha, tipo_acesso, ativo } = req.body;
    console.log(typeof ativo);
    try {
      //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
      const campos = [];
      const valores = [];

      if (nome !== undefined) {
        campos.push(`nome=$${valores.length + 1}`);
        valores.push(nome);
      }
      if (email !== undefined) {
        campos.push(`email=$${valores.length + 1}`);
        valores.push(email);
      }
      if (senha !== undefined) {
        campos.push(`senha=$${valores.length + 1}`);
        valores.push(senha);
      }
      if (tipo_acesso !== undefined) {
        campos.push(`tipo_acesso=$${valores.length + 1}`);
        valores.push(tipo_acesso);
      }
      if (ativo !== undefined) {
        campos.push(`ativo = $${valores.length + 1}`);
        valores.push(ativo);
        console.log(typeof valores[0]);
        console.log(typeof valores);
      }
      if (campos.length === 0) {
        return res
          .status(400)
          .json({ message: "nenhum campo fornecido para atualização" });
      }

      const query = `update usuarios set  ${campos.join(
        ","
      )} where id_usuario = ${id} RETURNING *`;
      console.log(query);
      const usuarios = await BD.query(query, valores);
      //verifica se o usuario foi atualizado

      if (usuarios.rows.length === 0) {
        return res.status(404).json({ message: `usuario não encontrado` });
      }

      return res.status(200).json(usuarios.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ message: "erro ao atualizar usuario", error: error.message });
    }
  }
}
export default rotasUsuarios;
