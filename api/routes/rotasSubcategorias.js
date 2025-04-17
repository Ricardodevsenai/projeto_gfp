import { BD } from "../db.js";

class rotasSubcategorias {
  static async novaSubcategoria(req, res) {
    const { nome, id_categoria, gasto_fixo } = req.body;

    try {
      const subcategorias = await BD.query(
        `INSERT INTO subcategorias
                 (nome, id_categoria, gasto_fixo) VALUES ($1, $2, $3) RETURNING *`,
        [nome, id_categoria, gasto_fixo]
      );
      return res.status(201).json(subcategorias.rows[0]);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao criar SubCategoria", message: error.message });
    }
  }
  static async listarSubcategoria(req, res) {
    try {
      const subcategorias = await BD.query(`SELECT 
    subcategorias.nome, 
    categorias.nome AS nome_categoria, 
    subcategorias.gasto_fixo, 
    subcategorias.ativo
FROM 
    subcategorias
JOIN 
    categorias ON subcategorias.id_categoria = categorias.id_categoria; where subcategorias.ativo = true`);
      return res.status(200).json(subcategorias.rows); //Retorna lista de usuarios
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao listar subCategorias", error: error.message });
    }
  }

  static async listar(req, res) {
    const { id } = req.params;
    try {
      const resposta = await BD.query(
        `SELECT 
    subcategorias.nome, 
    categorias.nome AS nome_categoria, 
    subcategorias.gasto_fixo, 
    subcategorias.ativo
FROM 
    subcategorias
JOIN 
    categorias ON subcategorias.id_categoria = categorias.id_categoria; where subcategorias.ativo = true and id_subcategoria = $1`,
        [id]
      );
      res.status(200).json(resposta.rows);
    } catch (error) {
      console.log("erro ao listar Subcategoria ", error);
      res
        .status(500)
        .json({ message: "Erro ao listar Subcategoria", error: error.message });
    }
  }
  static async deletarSubcategoria(req, res) {
    const { id } = req.params;
    try {
      const query = `UPDATE subcategorias SET ativo = false WHERE id_subcategoria = $1`;
      const valores = [id];
      // Executar a query
      const subcategoria = await BD.query(query, valores);
      return res.status(200).json(subcategoria.rows[0]);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar subcategoria",
        error: error.message,
      });
    }
  }
  static async editarSubcategoria(req, res) {
    const { id } = req.params;
    const { nome, id_categoria, gasto_fixo, ativo } = req.body;
    try {
      const subcategoria = await BD.query(
        `
                UPDATE subcategorias SET nome = $1, id_categoria = $2, gasto_fixo = $3,ativo = $4 where id_subcategoria = $5`,
        [nome, id_categoria, gasto_fixo, ativo, id]
      );

      return res.status(200).json(subcategoriaAtualizada);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar dados da subcategoria",
        error: error.message,
      });
    }
  }
  static async editar(req, res) {
    const { id } = req.params;
    const { nome, id_categoria, gasto_fixo, ativo } = req.body;
    try {
      // Inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
      const campos = [];
      const valores = [];
      // Verifica quais campos foram fornecidos
      if (nome !== undefined) {
        campos.push(`nome = $${valores.length + 1}`);
        valores.push(nome);
      }
      if (id_categoria !== undefined) {
        campos.push(`id_categoria = $${valores.length + 1}`);
        valores.push(id_categoria);
      }
      if (gasto_fixo !== undefined) {
        campos.push(`gasto_fixo = $${valores.length + 1}`);
        valores.push(gasto_fixo);
      }
      if (ativo !== undefined) {
        campos.push(`ativo = $${valores.length + 1}`);
        valores.push(ativo);
      }
      if (campos.length === 0) {
        return res
          .status(400)
          .json({ erro: "Informe os campos a serem atualizados" });
      }

      // Montar a query
      const query = `UPDATE subcategorias SET ${campos.join(",")}
            WHERE id_subcategoria = ${id} returning *`;

      // Executar a query
      const subcategoria = await BD.query(query, valores);

      // Verifica se o usuario foi atualizado
      if (subcategoria.rows.length === 0) {
        return res.status(404).json({ erro: "subcategoria não encontrada" });
      }
      return res.status(200).json(subcategoria.rows[0]);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar dados da subcategoria",
        error: error.message,
      });
    }
  }
}

export default rotasSubcategorias;
