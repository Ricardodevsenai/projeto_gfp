import { BD } from "../db.js";


class rotasCategorias {
  
  static async novaCategoria(req, res) {
    const { nome, tipo_transacao, gasto_fixo,cor,icone,id_usuario } = req.body;

    try {

      const query = `insert into categorias (nome, tipo_transacao, gasto_fixo,cor,icone,id_usuario ) values ($1, $2, $3, $4,$5,$6) returning *`;
     
      const valores = [nome, tipo_transacao, gasto_fixo,cor,icone,id_usuario ];
      const resposta = await BD.query(query, valores);



      res.status(201).json('categoria cadastrado')
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar categoria" });
    }

  }
static async filtrarCategoria(req, res) {
//o valor sera enviado por parametro na url, deve ser enviado dessa maneira
//tipo_transacao = entrada
const { tipo_transacao } = req.query;
try {
const query = `select * from categorias where tipo_transacao = $1 and ativo = true ORDER BY id_categoria desc`;
const valores = [tipo_transacao]
const resposta = await BD.query(query,valores)
return res.status(200).json(resposta.rows)
} catch (error) {
  console.log('erro ao filtrar categoria ', error);
        res.status(500).json({ message: "Erro ao filtrar categoria",error:error.message });
}
}
    static async listarCategorias(req, res) {
        try {
        const resposta = await BD.query("select * from categorias where ativo = true");
        res.status(200).json(resposta.rows);
        } catch (error) {
        console.log('erro ao listar categorias ', error);
        res.status(500).json({ message: "Erro ao listar categorias",error:error.message });
        }
    }
    static async listar(req, res) {
      const { id } = req.params;
        try {
        const resposta = await BD.query("select * from categorias where ativo = true and id_categoria = $1", [id]);
        res.status(200).json(resposta.rows);
        } catch (error) {
        console.log('erro ao listar categoria ', error);
        res.status(500).json({ message: "Erro ao listar categoria",error:error.message });
        }
    }
    static async editarCategorias(req, res) {
        const { id } = req.params;
        const { nome, tipo_transacao, gasto_fixo,cor,icone,ativo,id_usuario } = req.body;

      try {
      const resposta = await BD.query("update categorias set nome = $1, tipo_transacao= $2,gasto_fixo = $3 ,cor = $4,icone = $5 ,ativo = $ 6, id_usuario = $7  where id_categoria = $8",[ nome, tipo_transacao, gasto_fixo,cor,icone,ativo,id_usuario,id]);
      res.status(200).json("categoria editado com sucesso");
      } catch (error) {
      console.log('erro ao editar categoria ', error);
      res.status(500).json({ message: "Erro ao listar usuários",error:error.message });
      }
  }

    static async deletarCategorias(req, res) {
        const { id } = req.params;
        try {
            const resposta = await BD.query("update categorias set ativo = false where id_usuario=$1 ", [id]);
            res.status(200).json("categoria deletada com sucesso");
        } catch (error) {
            console.log('erro ao deletar categoria ', error);
            res.status(500).json({ message: "Erro ao listar categoria",error:error.message });
        }
    }
    static async editar (req,res){
        const {id} = req.params;
        
        const {nome, tipo_transacao, gasto_fixo,cor,icone,ativo,id_usuario} = req.body;
        console.log(typeof(ativo))
        try {
          //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
          const campos =[]
          const valores = []
        
        if (nome!== undefined) {
          campos.push(`nome=$${valores.length+1}`)
          valores.push(nome)
        }
      
        if (tipo_transacao!== undefined) {
          campos.push(`tipo_transacao=$${valores.length+1}`)
          valores.push(tipo_transacao)
        }
        if (gasto_fixo!== undefined) {
          campos.push(`gasto_fixo=$${valores.length+1}`)
          valores.push(gasto_fixo)
        }
        if (cor!== undefined) {
          campos.push(`cor=$${valores.length+1}`)
          valores.push(cor)
        }
        if (icone!== undefined) {
          campos.push(`icone=$${valores.length+1}`)
          valores.push(icone)
        }
        if (ativo !== undefined) {
          campos.push(`ativo = $${valores.length+1}`)
          valores.push(ativo)

        }
        if (id_usuario !== undefined) {
          campos.push(`id_usuario = $${valores.length+1}`)
          valores.push(id_usuario)

        }
        if (campos.length === 0) {
          return res.status(400).json({message:'nenhum campo fornecido para atualização'})
        }
   
        
        const query = `update categorias set  ${campos.join(',')} where id_categoria = ${id} RETURNING *`
        console.log(query)
        const categorias = await BD.query(query,valores)
        
        if (categorias.rows.length ===0) {
          return res.status(404).json({message:`categoria não encontrado`})
        }
        
        return res.status(200).json(categorias.rows[0])
        
        } catch (error) {
          res.status(500).json({ message: "erro ao atualizar categoria", error: error.message });
        }
        }
}
export default rotasCategorias;