const Admin = require("../mvc/models/adminModel")
const Database = require("../repository/database");
 
class AdminDAO {
 
    #conexao
 
    constructor() {
        this.#conexao = new Database();
    }
 
    async consultarAdmins() {
 
        const lista_Admin = []
        const admins = await this.#conexao.selectGamers()
 
        if (admins) {
            for (const admin of admins) {
                const objAdmin = new Admin()
 
                objAdmin.id = admin.id_gamers
                objAdmin.nome = admin.nome_gamer
                objAdmin.senha = admin.senha_gamer
                objAdmin.email = admin.email_gamer
                objAdmin.dtnasc_gamer = admin.dtnasc_gamer
                objAdmin.personagens_id_personagem = admin.personagens_id_personagem
                objAdmin.coins = admin.coins_id_coin
                objAdmin.nome_coin = admin.nome_coin
                objAdmin.nome_personagem = admin.nome_personagem
 
                lista_Admin.push(objAdmin.toJson())
            }
        }
 
        return lista_Admin
    }

    registraradmin(nome, senha, email, dtnasc_gamer, personagens_id_personagem, coins  ){

        const admin = new Admin()
        
        admin.nome = nome
        admin.senha = senha
        admin.email = email
        admin.dtnasc_gamer = dtnasc_gamer
        admin.personagens_id_personagem = personagens_id_personagem
        admin.coins = coins

        this.#conexao.insertadmin(admin.nome, admin.senha, admin.email, admin.dtnasc_gamer, admin.personagens_id_personagem, admin.coins)
    }
 
   
    async consultarAdminId(id) {
 
        const admin = await this.#conexao.selecionarAdminId(id)
             
        const objAdmin = new Admin()
 
        objAdmin.id = admin[0].id_gamers
        objAdmin.nome = admin[0].nome_gamer
        objAdmin.senha = admin[0].senha_gamer
        objAdmin.email = admin[0].email_gamer
        objAdmin.dtnasc_gamer = admin[0].dtnasc_gamer
        objAdmin.personagens = admin[0].personagens_id_personagem
        objAdmin.coins = admin[0].coins_id_coin
        objAdmin.nome_coin = admin[0].nome_coin
        objAdmin.nome_personagem = admin[0].nome_personagem
     
 
        return objAdmin.toJson()
    }
 
    async atualizarAdmin(id, nome, senha, email, dtnasc_gamer, personagens, coins){
 
        const admin = new Admin()
 
        admin.id = id
        admin.nome = nome
        admin.senha = senha
        admin.email = email
        admin.dtnasc_gamer = dtnasc_gamer
        admin.personagens = personagens
        admin.coins = coins
 
        const dt = await this.#conexao.updateAdmin(admin.nome, admin.senha, admin.email, admin.dtnasc_gamer, admin.personagens, admin.coins, admin.id)
        return dt
    }
    async apagarAdmin(id){
     const dados =  await this.#conexao.deleteAdmin(id)
     return dados
    }
}
 
module.exports = AdminDAO