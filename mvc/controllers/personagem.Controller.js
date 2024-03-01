//pacotinho pra você trabalhar com caminho de arquivos, como ele você pode chegar
//em qualquer diretório ou arquivo de boa, você vai ver ali embaixo.
const path = require('path')
const PersonagemDAO = require('../../DAO/personagemDAO')
const SkinDAO = require('../../DAO/skinDAO')

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
//Lembra que você usou o consign no startup? Então, nem tudo é mamão com acucar
//Você precisa fazer isso para usar o app do startup. O app é exatamente o app de lá
module.exports = (app) => {   

   
    app.get("/personagem",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const skin = new SkinDAO()
        
        
        let lista_skins = await skin.consultarSkins()
        console.log(lista_skins)


        res.render('personagens/addpersonagem', { skins: lista_skins})
    })

    app.get("/personagem/lista",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")

        const personagemDAO = new PersonagemDAO()
        const lista_personagem = await personagemDAO.consultarPersonagem()
   
        res.render("personagens/listpersonagem", { personagens: lista_personagem })
    })

    app.get("/cupons",verificarAutenticacao, async (req, res) => {
        
        const personagemDAO = new personagemDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await personagemDAO.consultarCupons())

    })


    app.post("/registrarpersonagem", (req, res) => {
        
        const personagemDAO = new PersonagemDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
        const {txtnomepersonagem, genper, tipoper, txtvalorpersonagem,txtlatpersonagem,txtlongpersonagem,selecioneskin } = req.body

        personagemDAO.registrarPersonagem(txtnomepersonagem, genper, tipoper, txtvalorpersonagem,txtlatpersonagem,txtlongpersonagem,selecioneskin)

        res.status(201).json({ 
            msg: "ok"
        })

    })
    app.delete("/personagem/apagar/:id", async (req,res) =>{
        const personagemDAO = new PersonagemDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await personagemDAO.apagarPersonagem(req.params.id))

    })

    app.get("/personagem/alterar/:id", async (req, res) => {
        const personagemDAO = new PersonagemDAO()

        const dtpersonagem = await PersonagemDAO(req.params.id)
        

        res.render("personagem/upcupons", { personagem: dtpersonagem  })
    })

    app.put("/personagem/alterar", async (req, res) => {
        const personagemDAO = new personagemDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, codigo, validade, valor, id } = req.body

        const r = await personagemDAO.atualizarpersonagem(id, nome, codigo, validade,valor)

        res.json({r})
        

    })
}