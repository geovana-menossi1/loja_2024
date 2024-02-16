const path = require('path')
const AdminDAO = require('../../DAO/adminDAO')

function verificarAutenticacao(req, res, next) {
    if (req.session.user && req.session.user.email) {
        next();
    } else {
        res.redirect('/admin');
    }
}
module.exports = (app) => {   

   
    app.get("/gamer",verificarAutenticacao, (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        
        res.sendFile(path.resolve("mvc/views/ctrldev/admin/addadmins.html"))
    })

    app.get("/gamer/lista",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")

        const adminDAO = new AdminDAO()
        const lista_admins = await adminDAO.consultarAdmins()
   
        res.render("admin/listadmins", { admin: lista_admins })
    })

    app.get("/gamers",verificarAutenticacao, async (req, res) => {
        
        const adminDAO = new adminDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await adminDAO.consultarAdmins())

    })


    app.post("/registrargamer", (req, res) => {
        
        const adminDAO = new AdminDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
        const {txtnomegamer, txtsenhagamer, txtemailgamer, dtnascgamer } = req.body

        adminDAO.registraradmin(txtnomegamer, txtsenhagamer, txtemailgamer, dtnascgamer)

        res.status(201).json({ 
            msg: "ok"
        })

    })
    app.delete("/gamer/apagar/:id", async (req,res) =>{
        const adminDAO = new adminDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await adminDAO.apagaradmin(req.params.id))

    })

    app.get("/gamer/alterar/:id", async (req, res) => {
        const adminDAO = new adminDAO()

        const dtadmin = await adminDAO.consultarAdminId(req.params.id)
        

        res.render("gamer/upadmins", { admin: dtadmin  })
    })

    app.put("/gamer/alterar", async (req, res) => {
        const adminDAO = new adminDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, senha, email, dtgamer, id } = req.body

        const r = await adminDAO.atualizarAdmin(id, nome, senha, email, dtgamer)

        res.json({r})
        

    })
}