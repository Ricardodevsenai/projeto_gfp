import { BD } from "../db.js";


class rotasContas {
  
  static async novoConta(req, res) {
    const { nome, tipo_conta,saldo,conta_padrao ,ativo} = req.body;

    try {

      const query = `insert into contas (  nome, tipo_conta,saldo,conta_padrao,ativo ) values ($1, $2, $3,$4,true)`;
     
      const valores = [  nome, tipo_conta,saldo,conta_padrao,ativo ];
      const resposta = await BD.query(query, valores);


      res.status(201).json('contas criado com sucesso');
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar contas" });
    }

  }

    static async listarConta(req, res) {
        try {
        const resposta = await BD.query("select * from contas where ativo = true");
        res.status(200).json(resposta.rows);
        } catch (error) {
        console.log('erro ao listar contas ', error);
        res.status(500).json({ message: "Erro ao listar contas",error:error.message });
        }
    }
    static async listar(req, res) {
      const { id } = req.params;
        try {
        const resposta = await BD.query("select * from contas where ativo = true and id_conta = $1", [id]);
        res.status(200).json(resposta.rows);
        } catch (error) {
        console.log('erro ao listar contas ', error);
        res.status(500).json({ message: "Erro ao listar contas",error:error.message });
        }
    }
    static async editarConta(req, res) {
        const { id } = req.params;
        const {  nome, tipo_conta,saldo,ativo,conta_padrao } = req.body;


      try {
      const resposta = await BD.query("update contas set nome = $1, tipo_conta= $2,saldo = $3 ,conta_padrao = $4, ativo = $5 where id_conta = $5",[ nome, tipo_conta,saldo,conta_padrao,ativo,id]);
      res.status(200).json("conta editado com sucesso");
      } catch (error) {
      console.log('erro ao editar conta ', error);
      res.status(500).json({ message: "Erro ao listar conta",error:error.message });
      }
  }

    static async deletarConta(req, res) {
        const { id } = req.params;
        try {
            const resposta = await BD.query("update contas set ativo = false where id_conta =$1 ", [id]);
            res.status(200).json("conta  deletada com sucesso");
        } catch (error) {
            console.log('erro ao deletar conta ', error);
            res.status(500).json({ message: "Erro ao listar conta",error:error.message });
        }
    }
    static async filtrarNome(req, res) {
//o valor sera enviado por parametro na url, deve ser enviado dessa maneira
//tipo_transacao = entrada
const { nome } = req.query;
try {
const query = `select * from contas where nome LIKE $1 and ativo = true ORDER BY nome desc`;
const valores = [`%${nome}%`]
const resposta = await BD.query(query,valores)
return res.status(200).json(resposta.rows)
} catch (error) {
  console.log('erro ao filtrar categoria ', error);
        res.status(500).json({ message: "Erro ao filtrar categoria",error:error.message });
}
}
    static async editar (req,res){
        const {id} = req.params;
        
        const { nome, tipo_conta,saldo,ativo,conta_padrao } = req.body;
        try {
          //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
          const campos =[]
          const valores = []
        
        if (nome!== undefined) {
          campos.push(`nome=$${valores.length+1}`)
          valores.push(nome)
        }
      
        if (tipo_conta!== undefined) {
          campos.push(`tipo_conta=$${valores.length+1}`)
          valores.push(tipo_conta)
        }
        if (saldo!== undefined) {
          campos.push(`saldo=$${valores.length+1}`)
          valores.push(saldo)
        }
        if (ativo !== undefined) {
          campos.push(`ativo = $${valores.length+1}`)
          valores.push(ativo)

        }
        if (conta_padrao !== undefined) {
          campos.push(`conta_padrao = $${valores.length+1}`)
          valores.push(conta_padrao)

        }
        if (campos.length === 0) {
          return res.status(400).json({message:'nenhum campo fornecido para atualização'})
        }
   
        
        const query = `update contas set  ${campos.join(',')} where id_conta = ${id} RETURNING *`
        console.log(query)
        const contas = await BD.query(query,valores)
        
        if (contas.rows.length ===0) {
          return res.status(404).json({message:`conta não encontrado`})
        }
        
        return res.status(200).json(contas.rows[0])
        
        } catch (error) {
          res.status(500).json({ message: "erro ao atualizar conta", error: error.message });
        }
        }
}
export default rotasContas;