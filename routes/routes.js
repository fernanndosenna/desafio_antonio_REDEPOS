const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const RegisterClassController = require("../controllers/RegisterClassController");
const TeacherController = require("../controllers/TeacherController")
const studentsController = require("../controllers/studentsController");

//rotas aula
router.get("/", HomeController.index);
router.get("/registerclass", RegisterClassController.index);
router.post("/registerclass",RegisterClassController.newClass);
router.get("/registerclassroom/edit/:id", RegisterClassController.editclassroom);
router.post("/registerclassroom/update", RegisterClassController.updateclassroom);
//rotas professor
router.get("/teacherregistration",TeacherController.index);
router.post("/teacherregistration/save", TeacherController.newTeacher);
router.get("/teacher/edit/:id", TeacherController.editTeacher);
router.post("/teacher/update", TeacherController.updateTeacher);
//rotas alunos
router.get("/students", studentsController.index);
router.post("/students/save", studentsController.newStudent);
router.get("/students/edit/:id", studentsController.editStudents);
router.post("/students/update", studentsController.updateStudents);

module.exports = router;