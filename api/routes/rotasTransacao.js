import { BD } from "../db.js";


class rotasTransacao {
  
  static async novaTransacao(req, res) {
    const { valor, descricao,data_transacao,data_vencimento,data_pagamento,tipo_transacao,id_local_transacao,id_categoria,id_subcategoria ,id_usuario,num_parcelas,parcela_atual } = req.body;

    try {

      const query = `insert into transacoes ( valor, descricao,data_transacao,data_vencimento,data_pagamento,tipo_transacao,id_local_transacao,id_categoria,id_subcategoria ,id_usuario,num_parcelas,parcela_atual ) values ($1, $2, $3,$5, $6,$7, $8,$9,$10,$11,$12)`;
     
      const valores = [ valor, descricao,data_transacao,data_vencimento,data_pagamento,tipo_transacao,id_local_transacao,id_categoria,id_subcategoria ,id_usuario,num_parcelas,parcela_atual ];
      const resposta = await BD.query(query, valores);


      res.status(201).json('transacao criado com sucesso');
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar transacao" });
    }

  }

    static async listarTransacao(req, res) {
        try {
        const resposta = await BD.query("select * from transacoes");
        res.status(200).json(resposta.rows);
        } catch (error) {
        console.log('erro ao listar  transacao ', error);
        res.status(500).json({ message: "Erro ao listar transacao",error:error.message });
        }
    }
    static async listar(req, res) {
      const { id } = req.params;
        try {
        const resposta = await BD.query("select * from transacoes where id_transacao = $1", [id]);
        res.status(200).json(resposta.rows);
        } catch (error) {
        console.log('erro ao listar transacao ', error);
        res.status(500).json({ message: "Erro ao listar transacao",error:error.message });
        }
    }
    static async editarTransacao(req, res) {
        const { id } = req.params;
        const { nome, tipo_local,saldo,ativo } = req.body;


      try {
      const resposta = await BD.query("update transacoes set nome = $1, tipo_local= $2,saldo = $3 ,ativo = $4 where id_local_transacao = $5",[ nome, tipo_local,saldo,ativo,id]);
      res.status(200).json("local transacao editado com sucesso");
      } catch (error) {
      console.log('erro ao editar local transacao ', error);
      res.status(500).json({ message: "Erro ao listar localtransacao",error:error.message });
      }
  }

    static async deletarTransacao(req, res) {
        const { id } = req.params;
        try {
            const resposta = await BD.query("delete from transacoes where id_transacao = $1 ", [id]);
            res.status(200).json(" transacao  deletada com sucesso");
        } catch (error) {
            console.log('erro ao deletar transacao ', error);
            res.status(500).json({ message: "Erro ao listar transacao",error:error.message });
        }
    }
    static async editar (req,res){
        const {id} = req.params;
        
        const { valor, descricao,data_transacao,data_vencimento,data_pagamento,tipo_transacao,id_local_transacao,id_categoria,id_subcategoria ,id_usuario,num_parcelas,parcela_atual } = req.body;
        try {
          //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
          const campos =[]
          const valores = []
        
        if (valor!== undefined) {
          campos.push(`valor=$${valores.length+1}`)
          valores.push(valor)
        }
      
        if (descricao!== undefined) {
          campos.push(`descricao=$${valores.length+1}`)
          valores.push(descricao)
        }
        if (data_transacao!== undefined) {
          campos.push(`data_transacao=$${valores.length+1}`)
          valores.push(data_transacao)
        }
        if (data_vencimento !== undefined) {
          campos.push(`data_vencimento = $${valores.length+1}`)
          valores.push(data_vencimento)

        }
        if (data_pagamento !== undefined) {
          campos.push(`data_pagamento = $${valores.length+1}`)
          valores.push(data_pagamento)

        }
        if (tipo_transacao !== undefined) {
          campos.push(`tipo_transacao = $${valores.length+1}`)
          valores.push(tipo_transacao)

        }
        if (id_local_transacao !== undefined) {
          campos.push(`id_local_transacao = $${valores.length+1}`)
          valores.push(id_local_transacao)

        }
        if (id_categoria !== undefined) {
          campos.push(`id_categoria = $${valores.length+1}`)
          valores.push(id_categoria)

        }
        if (id_subcategoria !== undefined) {
          campos.push(`id_subcategoria = $${valores.length+1}`)
          valores.push(id_subcategoria)

        }
        if (id_usuario !== undefined) {
          campos.push(`id_usuario = $${valores.length+1}`)
          valores.push(id_usuario)

        }
        if (num_parcelas !== undefined) {
          campos.push(`num_parcelas = $${valores.length+1}`)
          valores.push(num_parcelas)

        }
        if (parcela_atual !== undefined) {
          campos.push(`parcela_atual = $${valores.length+1}`)
          valores.push(parcela_atual)

        }
        if (campos.length === 0) {
          return res.status(400).json({message:'nenhum campo fornecido para atualização'})
        }
   
        
        const query = `update transacoes set  ${campos.join(',')} where id_transacao = ${id} RETURNING *`
        console.log(query)
        const categorias = await BD.query(query,valores)
        
        if (categorias.rows.length ===0) {
          return res.status(404).json({message:`transacao não encontrado`})
        }
        
        return res.status(200).json(categorias.rows[0])
        
        } catch (error) {
          res.status(500).json({ message: "erro ao atualizar transacao", error: error.message });
        }
        }
}
export default rotasTransacao;