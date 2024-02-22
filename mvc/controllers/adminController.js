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

        res.render('admin/addadmins')
    })
    app.get("/gamer/lista", verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
    
        const adminDAO = new AdminDAO();
        const lista_admins = await adminDAO.consultarAdmins();
    
        res.render("admin/listadmins", { Admins: lista_admins }); 
    });

    app.get("/gamers",verificarAutenticacao, async (req, res) => {
        
        const adminDAO = new AdminDAO();
        
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
        const {txtnomegamer, txtsenhagamer, txtemailgamer, dtnascgamer, selpersonagens, selcoins } = req.body

        adminDAO.registraradmin(txtnomegamer, txtsenhagamer, txtemailgamer, dtnascgamer, selpersonagens, selcoins)

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
        const adminDAO = new AdminDAO()
        const dtadmin = await adminDAO.consultarAdminId(req.params.id)
        res.render("admin/upadmins", { admin: dtadmin  })
    })

    app.put("/admin/alterar", async (req, res) => {
        const adminDAO = new AdminDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, senha, email, dtgamer, personagens, coins, id} = req.body

        const r = await adminDAO.atualizarAdmin(id, nome, senha, email, dtgamer, personagens, coins)

        res.json({r})
    })
}