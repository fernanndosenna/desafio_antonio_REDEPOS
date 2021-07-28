const Students = require("../models/Students");
const knex = require("../database/connection")

class studentsController{

    //exibindo view de cadastro de estudantes, e passando variáveis de relacionamentos  e etc..
    async index(req,res){
        var msgErr = req.flash("msgErr");
        var msgSuccess = req.flash("msgSuccess");

        msgErr = (msgErr == undefined || msgErr.length == 0) ? undefined : msgErr;
        msgSuccess = (msgSuccess == undefined || msgSuccess.length == 0) ? undefined : msgSuccess;

        try {

            var alunosEprofessores = await Students.JOINalunosEprofessores()
            var professores =  await Students.findAll();
            if(alunosEprofessores == undefined){
                alunosEprofessores = []
            }
            if(professores == undefined){
                professores = []
            }
            res.render("students", {msgSuccess,msgErr, alunosEprofessores,professores})
              
          } catch (err) {
              console.log(err)
         }
         
    }

    //cadastrando um novo aluno
    async newStudent(req,res){
        var { nome_aluno, id_professor} = req.body
        var msgErr;
        var msgSuccess;

        if(id_professor == 0){
            id_professor = null
        }

        if(nome_aluno == undefined || nome_aluno == '' || nome_aluno == ' '){
            msgErr = "Campo não pode ser em branco!"
            req.flash("msgErr", msgErr);
            res.redirect("/students");
            return
        }
        if(!msgErr == undefined){
            req.flash("msgErr", msgErr);
            res.redirect("/students");
        }else{

            try {
                const result = await Students.new(nome_aluno, id_professor);

                if(result){
                    msgSuccess = "Aluno Cadastrado!"
                    req.flash("msgSuccess", msgSuccess);
                    res.redirect("/students");
                }

            } catch (err) {
                console.log(err)
            }
      
        }
    }

    //editando alunos
    async editStudents(req,res){
        var { id } = req.params;
        var msgErr = req.flash("msgErr");
        var msgSuccess = req.flash("msgSuccess");

        msgErr = (msgErr == undefined || msgErr.length == 0) ? undefined : msgErr;
        msgSuccess = (msgSuccess == undefined || msgSuccess.length == 0) ? undefined : msgSuccess;

        if(isNaN(id)){
            res.redirect("/registerclass");
        }

        try {

            const professores =  await Students.findAll();
            var aluno = await Students.findById(id);
            console.log(aluno)
            res.render("../views/viewEdit/edit_students", {professores, aluno, msgErr})
           
        } catch (err) {
            console.log(err)
            res.redirect("/registerclass")
        }
    }

    //atualizando estudantes
    async updateStudents(req,res){
        var {nome_aluno, id_professor, id} = req.body;
        var editStudents = {}
        var msgErr;

        console.log(id)

        if(id_professor == ''){
            id_professor = null
        }

        
        if(nome_aluno == undefined || nome_aluno == '' || nome_aluno == ' '){
            msgErr = "Campo não pode ser em branco!"
            req.flash("msgErr", msgErr)
            res.redirect(`/students/edit/${id}`)  
            return    
       }

       editStudents.nome_aluno =  nome_aluno;
       editStudents.id_professor = id_professor

       try {
            await knex.update(editStudents).where({id:id}).table("aluno")   
            res.redirect(`/students`)  
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new studentsController();