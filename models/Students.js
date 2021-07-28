const knex = require("../database/connection")

class Students{

    async new(nome_aluno, id_professor){
        try { 
                const data = await knex.insert({
                    nome_aluno: nome_aluno,
                    id_professor: id_professor
                }).table("aluno");

                return true;

        } catch (err) {
            console.log(err)
        }
    }

     //buscando todas os professores
     async findAll(){
        try {
            var result = await knex.select(["id","nome"]).table("professor").orderBy("id", "desc")
            
            if(result.length > 0){
                return result
            }else{
                return undefined;
            }
        } catch (err) {

            console.log(err);
            return undefined;
        }
    }

    
    async JOINalunosEprofessores(){
         const data = await knex.select(["aluno.id","aluno.nome_aluno","professor.nome", "aluno.id_professor"])
       .from("aluno").leftOuterJoin('professor', 'professor.id','aluno.id_professor').orderBy("aluno.id", "desc")
      
    
       if(data.length > 0){
           return data
       }
    }

    
    async findById(id){
        try {
            const result = await knex.select(["aluno.id","aluno.nome_aluno","professor.nome", "aluno.id_professor"])
            .where({"aluno.id": id})
            .from("aluno").leftOuterJoin('professor', 'professor.id','aluno.id_professor').orderBy("aluno.id", "desc")
           
            if(result.length > 0) {         
                return result[0]     
            }else{
                return undefined;
            } 
        } catch (err) {
            console.log(err)
            return undefined;
        }
    }
}

module.exports = new Students()