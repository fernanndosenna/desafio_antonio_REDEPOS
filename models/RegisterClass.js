var knex = require("../database/connection");


class RegisterClass{

    //criando uma nova aula
    async new(name){
        try {
            await knex.insert({nome_sala: name}).table("sala");
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    //buscando por nome das salas já registradas
    async findNameClass(name){
        try {
            var result = await knex.select("*").table("sala").where({nome_sala: name})
            if(result.length > 0 ){
                return true
            }else{
                return false
            }

        } catch (err) {
            console.log(err)
            return false
        }
    }

    //buscando todas as salas
    async findAll(){
        try {
            var result = await knex.select(["id","nome_sala"]).table("sala").orderBy("id", "desc")
            
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
  

    //edicao de salas
    async findById(id){
        try {
            var result = await knex.select(['id',"nome_sala"]).where({id: id}).table("sala")
           
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

module.exports = new RegisterClass();