//Carregando os módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express();
const admin = require("./routes/admin")
const path = require("path")
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require("./config/auth")(passport)

//Configurações 
//Sessão
app.use(session({
    secret: 'celkeonesession',
    resave: true,
    saveUninitialized: true
}))
//Passport
app.use(passport.initialize())
app.use(passport.session())
//Flash
app.use(flash())

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Handlebars
app.engine('handlebars', handlebars({ defaultLayout: "main" }))
app.set("view engine", 'handlebars')

//Conexão com banco de dados
mongoose.connect('mongodb://localhost/celke', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizado com sucesso...")
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizado com sucesso: " + erro)
})

//Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")))

//Rotas
app.use('/admin', admin)

//Iniciar o servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log("Servidor iniciado!");
})