
/**
 * O express é um pacotinho com funções prontas criadas
 * por pessoas do bem, para tornar a construção de 
 * servidores com javascript de mais fácil.
 * 
 * Use npm install express para baixa-lo
 * 
 */
const path = require('path');
const bodyParser = require('body-parser');
const express = require("express");
const banco = require('./repository/database');
const session = require("express-session");
const crypto = require("crypto");
const GamerDAO =  require("./DAO/gamerDAO")
const PersonagemDAO = require("./DAO/personagemDAO")


/**
 * O que essa linha faz? Lembra do require express logo acima ? Então, 
 * aquilo é uma função que executa varias coisinhas, quando você o executa
 * -> express()  <- automaticamente um servidor é criado.
 */
const app = express()

/***
 * 
 * Esse pacotinho também tem uma função, e você precisa fazer o require
 * para poder usar na sua aplicação, conforme abaixo. 
 */
const consign = require("consign")

app.set('view engine', 'ejs')
app.set('views','mvc/views/ctrldev')
app.use(express.static('mvc/views/public'))

/**
 * Você usa isso para trabalhar com json, caso não seja feita essa configuração
 * basicamente você não vai conseguir manipular json vindo de fora. Faz o teste aí.
 * Tira essa configuração e tenta receber um json. Depois me conta.
 */
const db = new banco();
const generateRandomSecret = () => {
    return crypto.randomBytes(64).toString('hex');
}
function verificarAutenticacao(req, res, next) {
    // Verifica se o usuário está autenticado
    if (req.session.user && req.session.user.email) {
        // Se estiver autenticado, prossiga para a próxima middleware
        next();
    } else {
        // Se não estiver autenticado, redirecione para a página de login
        res.redirect('/admin');
    }
}
app.use(session({
    secret:generateRandomSecret(),
    resave:false,
    saveUninitialized:true
}))
// Configuração do Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configurando o diretório para servir arquivos estáticos
app.use(express.static(path.resolve(__dirname, "./mvc/views/ctrldev")));

// Rota para a página inicial
app.get("/admin", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const gamer = new GamerDAO()
    let lista_gamer = await gamer.consultarGamers()
    res.render('index', {gamers: lista_gamer})
});

// Rota para processar o formulário de login
app.post('/login', async (req, res) => {
    const email = req.body.txtctrllogin;
    const senha = req.body.txtctrlpass;
  
    // Consulta SQL para verificar o login usando método da classe Database
    try {
        const result = await db.verificarLogin(email, senha);
        if (result.length > 0) {
            // Se o login for bem-sucedido, redirecione para home.html
            req.session.user = { email: email };
            res.redirect('/home');
             
        } else {
            // Se o login falhar, redirecione para error.html
           
            res.redirect('/error');
        }
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        res.redirect('/error');
    }
});
app.get("/logout", (req, res) => {
    // Destrua a sessão
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
        } else {
            // Redirecione para a página de login após destruir a sessão
            res.redirect('/admin');
        }
    });
});
// Rota para a página home
app.get("/home",verificarAutenticacao, async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    
        res.render('home', { userEmail: req.session.user.email });
    
});

// Rota para a página de erro
app.get("/error", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "error.html"));
});

app.use(express.json())

/**
 * Entenda como a mesma descrita acima, porém com formulários.
 */
app.use(express.urlencoded({extended: true}))

/**
 * Fazendo isso você não vai precisar ficar importando todos os aquivos
 * que você criou nessa página, um por vez.
 * O própio consign vai na pasta controllers localizada dentro da outra pasta
 * mvc e carrega todos os arquivos que estão lá até aqui, sem você precisar fazer 
 * mais nada.
 */
consign()
        .include("mvc/controllers")
        .into(app)


/**
 * 
 * Isso serve pra você dizer que seu servidor vai funcionar na porta 3000
 * ou seja, para alguém te encontrar, vai ter que acessar http:seu-ip:3000/,
 * o console.log é só um tchan pra você saber que seu servidor está online
 */
app.listen(3001, () => console.log("Online Server at port 3001"))

/**
 * Use isso para reusar o app em outro arquivo. Lembrando que lá no outro arquivo
 * você vai precisar fazer o const app = require('../trocar-pelo-caminho/startup.js')
 */

app.use(bodyParser.urlencoded({ extended: true }));

// Configurando o diretório para servir arquivos estáticos
 app.use(express.static(path.resolve(__dirname, '../views/ctrldev')));

 app.post("/registrargamer2", async (req, res) => {
    const gamerDAO = new GamerDAO();
    const personagem = new PersonagemDAO()
    let lista_personagens = await personagem.consultarPersonagem()
    const coin = new CoinDAO()
    let lista_coins = await coin.consultarCoin()

    res.render('admin/addadmins', { personagens: lista_personagens, coins: lista_coins})
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { txtnomegamer, txtemailgamer, txtsenhagamer, txtdatagamer, txtcoingamer, txtpersongamer } = req.body;
    console.log('txtnomegamer:', txtnomegamer);
    console.log('txtemailgamer:', txtemailgamer);

    try {
        const retorno = await gamerDAO.registrarGamer(txtnomegamer, txtemailgamer, txtsenhagamer, txtdatagamer, txtcoingamer, txtpersongamer)
        // if (retorno) {
        //     print
            // Se o registro for bem-sucedido, armazene o e-mail na sessão
            req.session.email = txtemailgamer;
            res.redirect('/home');
            console.log('Certo')
        // } else {
        //     // Se o registro falhar, redirecione para error.html
        //     console.log("ELSE");
        //     res.redirect('/error');
        // }
    } catch (error) {
        console.error('Erro ao registrar o gamer:', error);
        console.log("CATH");
        res.redirect('/error');
    }
});

 
module.exports = app