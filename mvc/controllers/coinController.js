//pacotinho pra você trabalhar com caminho de arquivos, como ele você pode chegar
//em qualquer diretório ou arquivo de boa, você vai ver ali embaixo.
const path = require('path')
const CoinDAO = require('../../DAO/coinDAO')
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs').promises;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'views', 'public', 'images', 'upload'));
    },
    filename: function (req, file, cb) {
      const extensao = path.extname(file.originalname);
  
      const nomeArquivo = crypto.createHash('md5').update(file.originalname + Date.now().toString()).digest('hex') + extensao;
      cb(null, nomeArquivo);
    },
  });
  
  
  const upload = multer({ storage: storage });
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

   
    app.get("/coin",verificarAutenticacao, (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        
        res.sendFile(path.resolve("mvc/views/ctrldev/coin/addcoin.html"))
    })

    app.get("/coin/lista",verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")

        const coinDAO = new CoinDAO()
        const lista_coin = await coinDAO.consultarCoin()
   
        res.render("coin/listcoin", { coin: lista_coin })
    })

    app.get("/cupons",verificarAutenticacao, async (req, res) => {
        
        const cupomDAO = new CupomDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await cupomDAO.consultarCupons())

    })


app.post('/registrarcoin', upload.single('imagem'), async (req, res) => {
 const coinDAO= new CoinDAO;
    try {
      const extensao = path.extname(req.file.originalname);
      const nomeArquivo = crypto.createHash('md5').update(req.file.originalname + Date.now().toString()).digest('hex') + extensao;

      const caminhoDestino = path.join(__dirname, '..', 'views', 'public', 'images', 'upload', nomeArquivo);

      await fs.rename(req.file.path, caminhoDestino);

      console.log('Upload bem-sucedido');

      const {
        txtid: id,
        txtnomecoin: nome,
        txtlcoin: valor,
        
      } = req.body;


      let status;

      if (!id) {
        status = await coinDAO.registrarCoin( nome, valor,nomeArquivo);
      } else {
        status = await coinDAO.atualizar(nome, valor,nomeArquivo, id);
      
      }
      res.json({ status });
    } catch (error) {
      console.error(error);
      
      res.status(500).send('Erro ao realizar o upload. É necessário selecionar uma imagem');
    }
  });
  
  app.delete("/coin/:id", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const coinDAO = new CoinDAO()

    const status = await coinDAO.apagarCoin(req.params.id)

    res.json({
      status
    })
  })

    app.get("/cupom/alterar/:id", async (req, res) => {
        const cupomDAO = new CupomDAO()

        const dtcupom = await cupomDAO.consultarCuponId(req.params.id)
        

        res.render("cupom/upcupons", { cupom: dtcupom  })
    })

    app.put("/cupom/alterar", async (req, res) => {
        const cupomDAO = new CupomDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, codigo, validade, valor, id } = req.body

        const r = await cupomDAO.atualizarCupom(id, nome, codigo, validade,valor)

        res.json({r})
        

    })
}