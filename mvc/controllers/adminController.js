const path = require('path')
const AdminDAO = require('../../DAO/adminDAO')
const CoinDAO = require('../../DAO/coinDAO')
const PersonagemDAO = require('../../DAO/personagemDAO')

function verificarAutenticacao(req, res, next) {
    if (req.session.user && req.session.user.email) {
        next();
    } else {
        res.redirect('/admin');
    }
}
module.exports = (app) => {   

   
    app.get("/gamer",async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const personagem = new PersonagemDAO()
        
        let lista_personagens = await personagem.consultarPersonagem()
       

        const coin = new CoinDAO()
        
        let lista_coins = await coin.consultarCoin()
       

        res.render('admin/addadmins', { personagens: lista_personagens, coins: lista_coins})
    })

    app.get("/gamer/lista",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const personagem = new PersonagemDAO()
        
        let lista_personagens = await personagem.consultarPersonagem()
       

        const coin = new CoinDAO()
        
        let lista_coins = await coin.consultarCoin()

        const adminDAO = new AdminDAO()
        const lista_Admin = await adminDAO.consultarAdmins()
        res.render("admin/listadmins", {admin: lista_Admin, personagens: lista_personagens, coins: lista_coins})
    })

    app.get("/gamers",verificarAutenticacao, async (req, res) => {
        
        const adminDAO = new AdminDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await adminDAO.consultarAdmins())

    })


    app.post("/registrargamer", (req, res) => {
        
        const adminDAO = new AdminDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
        const {txtnomegamer, txtsenhagamer, txtemailgamer, dtnasc_gamer, selpersonagens, selcoins } = req.body

        adminDAO.registraradmin(txtnomegamer, txtsenhagamer, txtemailgamer, dtnasc_gamer, selpersonagens, selcoins)
        res.status(201).json({ 
            msg: "ok"
        })


    })
    app.delete("/admin/apagar/:id", async (req,res) =>{
        const adminDAO = new AdminDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await adminDAO.apagarAdmin(req.params.id))

    })

    app.get("/admin/alterar/:id", async (req, res) => {
        const personagem = new PersonagemDAO()
        
        let lista_personagens = await personagem.consultarPersonagem()
       

        const coin = new CoinDAO()
        
        let lista_coins = await coin.consultarCoin()
        const adminDAO = new AdminDAO()
        const dtadmin = await adminDAO.consultarAdminId(req.params.id)
        res.render("admin/upadmins", { admin: dtadmin, personagens: lista_personagens, coins: lista_coins})
    })

    app.put("/admin/alterar", async (req, res) => {
        const adminDAO = new AdminDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, senha, email, dtnasc_gamer, personagens, coins, id} = req.body

        const r = await adminDAO.atualizarAdmin(id, nome, senha, email, dtnasc_gamer, personagens, coins)

        res.json({r})
    })
}