const Database = require("../repository/database");
const Gamer = require("../mvc/models/adminModel");

class gamerDAO{

    #conexao

    constructor(){
        this.#conexao = new Database();
    };
    async consultarGamers() {

        const lista_gamer = []
        const gamers = await this.#conexao.selecionarGamers()

        if (gamers) {
            for (const gamer of gamers) {
                const objgamers = new Gamer()

                objgamers.id = gamer.id_gamers
                objgamers.nome_gamer = gamer.nome_gamer
                objgamers.senha_gamer = gamer.senha_gamer
                objgamers.email_gamer = gamer.email_gamer
                objgamers.dtnasc_gamer = gamer.dtnasc_gamer
                objgamers.personagem_id_personagem = gamer.personagem_id_personagem
                objgamers.coins_id_coins = gamer.coins_id_coins


                lista_gamer.push(objgamers.toJson())
               

            }
        }
        return lista_gamer
    }
    

    registrarGamer(nome, email, senha, datanasc, coin, personagem){

        const gamer = new Gamer();
    
        gamer.nome = nome;
        gamer.email = email;
        gamer.senha = senha;
        gamer.datanasc = datanasc;
        gamer.coin = coin;
        gamer.personagem = personagem;
    
    
        this.#conexao.adicionarLogin(gamer.nome, gamer.email, gamer.senha, gamer.datanasc, gamer.coin, gamer.personagem);
        
    };
    async consultarAdminId(id) {
 
        const admin = await this.#conexao.selecionarAdminId(id)
             
        const objAdmin = new Admin()
 
        objAdmin.id = admin[0].id_gamers
        objAdmin.nome = admin[0].nome_gamer
        objAdmin.senha = admin[0].senha_gamer
        objAdmin.email = admin[0].email_gamer
        objAdmin.dtnasc = admin[0].dtnasc_gamer
        objAdmin.personagens = admin[0].personagens_id_personagem
        objAdmin.coins = admin[0].coins_id_coin
     
 
        return objAdmin.toJson()
    }
 
    async atualizarAdmin(id, nome, senha, email, dtnasc, personagens, coins){
 
        const admin = new Admin()
 
        admin.id = id
        admin.nome = nome
        admin.senha = senha
        admin.email = email
        admin.dtnasc = dtnasc
        admin.personagens = personagens
        admin.coins = coins
 
        const dt = await this.#conexao.updateAdmin(admin.nome, admin.senha, admin.email, admin.dtnasc, admin.personagens, admin.coins, admin.id)
        return dt
    }
    async apagarAdmin(id){
     const dados =  await this.#conexao.deleteAdmin(id)
     return dados
    }
}
module.exports = gamerDAO
