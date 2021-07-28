//**  ARQUIVO DE CONFIGURAÇÃO **/
const express = require("express");
const app = express();
const router = require("./routes/routes");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash= require("express-flash")

//configurações
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//messagens flash *configurações
 
//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash());

//template engine
app.set("view engine", "ejs");

app.use(express.static('public'));


app.use("/", router);

//conexão com servidor
const port = 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});