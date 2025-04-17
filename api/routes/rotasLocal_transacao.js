import { BD } from "../db.js";


class rotasLocalTransacao {
  
  static async novoLocalTransacao(req, res) {
    const { nome, tipo_local,saldo,ativo } = req.body;

    try {

      const query = `insert into local_transacao ( nome, tipo_local,saldo,ativo ) values ($1, $2, $3,true)`;
     
      const valores = [ nome, tipo_local,saldo ];
      const resposta = await BD.query(query, valores);


      res.status(201).json('local de transacao criado com sucesso');
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar local de transacao" });
    }

  }

    static async listarLocalTransacao(req, res) {
        try {
        const resposta = await BD.query("select * from local_transacao where ativo = true");
        res.status(200).json(resposta.rows);
        } catch (error) {
        console.log('erro ao listar local da transacao ', error);
        res.status(500).json({ message: "Erro ao listar local transacao",error:error.message });
        }
    }
    static async listar(req, res) {
      const { id } = req.params;
        try {
        const resposta = await BD.query("select * from local_transacao where ativo = true and id_local_transacao = $1", [id]);
        res.status(200).json(resposta.rows);
        } catch (error) {
        console.log('erro ao listar local transacao ', error);
        res.status(500).json({ message: "Erro ao listar local transacao",error:error.message });
        }
    }
    static async editarLocalTransacao(req, res) {
        const { id } = req.params;
        const { nome, tipo_local,saldo,ativo } = req.body;


      try {
      const resposta = await BD.query("update local_transacao set nome = $1, tipo_local= $2,saldo = $3 ,ativo = $4 where id_local_transacao = $5",[ nome, tipo_local,saldo,ativo,id]);
      res.status(200).json("local transacao editado com sucesso");
      } catch (error) {
      console.log('erro ao editar local transacao ', error);
      res.status(500).json({ message: "Erro ao listar localtransacao",error:error.message });
      }
  }

    static async deletarLocalTransacao(req, res) {
        const { id } = req.params;
        try {
            const resposta = await BD.query("update local_transacao set ativo = false where id_local_transacao =$1 ", [id]);
            res.status(200).json("local transacao  deletada com sucesso");
        } catch (error) {
            console.log('erro ao deletar categoria ', error);
            res.status(500).json({ message: "Erro ao listar categoria",error:error.message });
        }
    }
    static async editar (req,res){
        const {id} = req.params;
        
        const { nome, tipo_local,saldo,ativo } = req.body;
        try {
          //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
          const campos =[]
          const valores = []
        
        if (nome!== undefined) {
          campos.push(`nome=$${valores.length+1}`)
          valores.push(nome)
        }
      
        if (tipo_local!== undefined) {
          campos.push(`tipo_local=$${valores.length+1}`)
          valores.push(tipo_local)
        }
        if (saldo!== undefined) {
          campos.push(`saldo=$${valores.length+1}`)
          valores.push(saldo)
        }
        if (ativo !== undefined) {
          campos.push(`ativo = $${valores.length+1}`)
          valores.push(ativo)

        }
        if (campos.length === 0) {
          return res.status(400).json({message:'nenhum campo fornecido para atualização'})
        }
   
        
        const query = `update local_transacao set  ${campos.join(',')} where id_local_transacao = ${id} RETURNING *`
        console.log(query)
        const categorias = await BD.query(query,valores)
        
        if (categorias.rows.length ===0) {
          return res.status(404).json({message:`local transacao não encontrado`})
        }
        
        return res.status(200).json(categorias.rows[0])
        
        } catch (error) {
          res.status(500).json({ message: "erro ao atualizar local transacao", error: error.message });
        }
        }
}
export default rotasLocalTransacao;