var knex = require("../database/connection");
var RegisterClass = require("../models/RegisterClass")

class RegisterClassController{

    //renderizando a view de registro de sala, e aplicando mensagens flashs
    async index(req,res){
        var msgErr = req.flash("msgErr");
        var msgSuccess = req.flash("msgSuccess");

        msgErr = (msgErr == undefined || msgErr.length == 0) ? undefined : msgErr;
        msgSuccess = (msgSuccess == undefined || msgSuccess.length == 0) ? undefined : msgSuccess;

          
        var classrooms= await RegisterClass.findAll();
        if(classrooms == undefined){
            classrooms = []
        }
        res.render("register_class", {msgErr, msgSuccess, classrooms})
    };

    //criando uma nova sala
    async newClass(req,res){
        const { name } = req.body;
        var msgErr;
        var msgSuccess;
        if (name == undefined || name == '' || name == ' '){
            //res.json({ err: "O nome não pode ser vazio! "});
            msgErr = "Campo não pode ser em branco!"
        }

        let nameClassExists = await RegisterClass.findNameClass(name);

        if(nameClassExists){
           // res.json({err: "O nome da sala já existe!"})
            msgErr = "Nome já existe!";
        }

        if(msgErr != undefined){
            req.flash("msgErr", msgErr);
            res.redirect("/registerclass");
        }else{
            
            var result =  await RegisterClass.new(name);
            if(result){
                // res.json({success: "Sala Criada!"})
                msgSuccess = "Sala Criada!"
                req.flash("msgSuccess", msgSuccess);
                res.redirect("/registerclass");
            }
        }

    }

    //renderizando view de edição de sala
    async editclassroom(req,res){
        var msgErr = req.flash("msgErr");
        var msgSuccess = req.flash("msgSuccess");

        msgErr = (msgErr == undefined || msgErr.length == 0) ? undefined : msgErr;
        msgSuccess = (msgSuccess == undefined || msgSuccess.length == 0) ? undefined : msgSuccess;

        var { id } = req.params;

        if(isNaN(id)){
            res.redirect("/registerclass");
        }

        try {
              var classroom = await RegisterClass.findById(id)
              if(classroom != undefined){
                res.render("../views/viewEdit/edit_classroom", {classroom, msgErr,msgSuccess})
            }
        } catch (err) {
            console.log(err)
            res.redirect("/registerclass")
        }
    }

    //atualizando o banco de dados com os dados editados da sala
    async updateclassroom(req,res){
        var { id, name } = req.body;
        var msgErr;
        var msgSuccess;
        var classroomName = await RegisterClass.findNameClass(name);

        if(name == undefined || name == '' || name == ' '){
            msgErr = "Nome não pode ser em branco!"
            req.flash("msgErr", msgErr)
            res.redirect(`/registerclassroom/edit/${id}`)
            return
        }

        var editClassroom = {};

        if(!classroomName){
            editClassroom.nome_sala = name;
        }else{
            msgErr = "O nome é igual ao atual!"    
            req.flash("msgErr", msgErr)
            res.redirect(`/registerclassroom/edit/${id}`)
            return
        }

        try {
            await knex.update(editClassroom).where({id: id}).table("sala")
            msgSuccess = "Aula editada com sucesso!"
            req.flash("msgSuccess", msgSuccess)
            res.redirect(`/registerclassroom/edit/${id}`)
            return
        } catch (err) {
            console.log(err)
        }

    }


};

module.exports = new RegisterClassController();