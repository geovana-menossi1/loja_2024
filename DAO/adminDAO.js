const Admin = require("../mvc/models/adminModel")
const Database = require("../repository/database");
 
class AdminDAO {
 
    #conexao
 
    constructor() {
        this.#conexao = new Database();
    }
 
    async consultarAdmins() {
 
        const lista_Admin = []
        const Admins = await this.#conexao.selectGamers()
 
        if (Admins) {
            for (const admin of Admins) {
                const objAdmin = new Admin()
 
                objAdmin.id = admin.id_gamers
                objAdmin.nome = admin.nome_gamer
                objAdmin.senha = admin.senha_gamer
                objAdmin.email = admin.email_gamer
                objAdmin.dtNascAdmin = admin.dtnasc_gamer
                objAdmin.personagens_Admin = admin.personagens_id_personagem
                objAdmin.coinsAdmin = admin.coins_id_coin
 
 
                lista_Admin.push(objAdmin.toJson())
            }
        }
 
        return lista_Admin
    }

    registraradmin(nome, senha, email, dtNascAdmin, personagens, coinsAdmin  ){

        const admin = new Admin()
        
        admin.nome = nome
        admin.senha = senha
        admin.email = email
        admin.dtNascAdmin = dtNascAdmin
        admin.personagens = personagens
        admin.coinsAdmin = coinsAdmin

        this.#conexao.insertadmin(admin.nome, admin.senha, admin.email, admin.dtNascAdmin, admin.personagens, admin.coinsAdmin)
    }
 
   
    async consultarAdminId(id) {
 
        const admin = await this.#conexao.selecionarAdminId(id)
             
        const objAdmin = new Admin()
 
        objAdmin.id = admin[0].	id_gamers
        objAdmin.nomeAdmin = admin[0].nome_gamer
        objAdmin.senhaAdmin = admin[0].senha_gamer
        objAdmin.emailAdmin = admin[0].email_gamer
        objAdmin.dtNascAdmin = admin[0].dtnasc_gamer
        objAdmin.personagens = admin[0].personagens_id_personagem
        objAdmin.coinsAdmin = admin[0].coins_id_coin
     
 
        return objAdmin.toJson()
    }
 
    async atualizarAdmin(id, nome, senha, email, dtgamer, personagens, coins){
 
        const admin = new Admin()
 
        admin.id = id
        admin.nomeAdmin = nome
        admin.senhaAdmin = senha
        admin.emailAdmin = email
        admin.dtNascAdmin = dtgamer
        admin.personagens = personagens
        admin.coinsAdmin = coins
 
        const dt = await this.#conexao.updateAdmin(admin.id, admin.nomeAdmin, admin.senhaAdmin, admin.emailAdmin, admin.dtNascAdmin, admin.personagens, admin.coinsAdmin)
        return dt
    }
    async apagarAdmin(id){
     const dados =  await this.#conexao.deleteAdmin(id)
     return dados
    }
}
 
module.exports = AdminDAO