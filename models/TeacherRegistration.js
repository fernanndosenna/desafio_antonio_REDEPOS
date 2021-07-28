var knex = require("../database/connection");

class TeacherRegistration {

    //registrando um professor relacionado a uma sala
    async new(name,id){
     
        try {
            const data = await knex.insert({
                nome: name,
                id_sala: id
            }).table("professor")
            
            return true
        } catch (err) {
            console.log(err);
        }
    }   

    //pegando informações do professor e sua sala.
    async joinTeacherAndClassroom(){
       const data = await knex.select(["professor.id","professor.nome","sala.nome_sala","professor.id_sala"])
       .from("sala").rightOuterJoin('professor', 'sala.id', 'professor.id_sala').orderBy("professor.id", "desc")
       if(data.length > 0){
           return data
       }
    }

   

      //encontrando professor pelo id
      async findById(id){
        try {
            const result = await knex.select(["professor.nome","sala.nome_sala","professor.id_sala","professor.id"]).where({"professor.id": id})
            .from("sala").rightOuterJoin('professor', 'sala.id', 'professor.id_sala').orderBy("professor.id", "desc")

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

module.exports = new TeacherRegistration();