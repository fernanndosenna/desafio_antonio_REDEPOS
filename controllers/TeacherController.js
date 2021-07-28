const classroomRegistration = require("../models/RegisterClass")
const TeacherRegistration = require("../models/TeacherRegistration")
var knex = require("../database/connection");

class TeacherController{
    
    //funcionadade para renderizar a view de registro de aula
    async index(req,res){
        var msgErr = req.flash("msgErr");
        var msgSuccess = req.flash("msgSuccess");

        msgErr = (msgErr == undefined || msgErr.length == 0) ? undefined : msgErr;
        msgSuccess = (msgSuccess == undefined || msgSuccess.length == 0) ? undefined : msgSuccess;
    
        try {
        
          var TeacherAndClassrom = await TeacherRegistration.joinTeacherAndClassroom();
        
          var classrooms =  await classroomRegistration.findAll();

        if(classrooms == undefined){
            classrooms = []
        }
        if(  TeacherAndClassrom == undefined){
            TeacherAndClassrom = []

        }
          res.render("teacher_registration", {classrooms, msgSuccess,msgErr, TeacherAndClassrom})
            
        } catch (error) {
            console.log(error)
       }

    }

    //cadastrando professor
    async newTeacher(req,res){
        var { name, id } = req.body; //id da sala selecionada pelo professor
        
        if(id == 0){
            id = null
        }
        var msgErr;
        var msgSuccess;

        if (name == undefined || name == '' || name == ' '){
            //res.json({ err: "O nome não pode ser vazio! "});
            msgErr = "Campo não pode ser em branco!"
        }

        if(msgErr != undefined){
            req.flash("msgErr", msgErr);
            res.redirect("/teacherregistration");
        }else{
            
            var result =  await TeacherRegistration.new(name,id);

            if(result){
                // res.json({success: "Sala Criada!"})
                msgSuccess = "Professor Cadastrado!"
                req.flash("msgSuccess", msgSuccess);
                res.redirect("/teacherregistration");
            }
        }

      
    }

    //carregando view de edição do professor, e fazendo listagem de aulas e professores.
    async editTeacher(req,res){
        var { id } = req.params;

        var msgErr = req.flash("msgErr");
        var msgSuccess = req.flash("msgSuccess");

        msgErr = (msgErr == undefined || msgErr.length == 0) ? undefined : msgErr;
        msgSuccess = (msgSuccess == undefined || msgSuccess.length == 0) ? undefined : msgSuccess;

        if(isNaN(id)){
            res.redirect("/registerclass");
        }
     
       try {

          const classrooms =  await classroomRegistration.findAll();
          var teacher = await TeacherRegistration.findById(id)
          if(teacher != undefined){

            res.render("../views/viewEdit/edit_teacher", {teacher, classrooms, msgSuccess,msgErr})
         }
      } catch (err) {
          console.log(err)
          res.redirect("/registerclass")
      }
    }

    //atualizando professor, nome e aula.
    async updateTeacher(req,res){
        var { id, name, id_sala} = req.body;
        var msgErr;
        var msgSuccess;
        var editTeacher = {};

        if(id_sala == ''){
            id_sala = null
        }
  
        if(name == undefined || name == '' || name == ' '){
            msgErr = "Campo não pode ser em branco!"
            req.flash("msgErr", msgErr)
            res.redirect(`/teacher/edit/${id}`)  
            return    
       }

        editTeacher.nome = name;
        editTeacher.id_sala = id_sala
        try {
            await knex.update(editTeacher).where({id:id}).table("professor")   
            res.redirect(`/teacherregistration`)  
        } catch (err) {
            console.log(err)
        }

    }

}

module.exports = new TeacherController()