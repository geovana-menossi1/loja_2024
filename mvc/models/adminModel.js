class Admin{
    #id
    #email
    #senha
    #nome
    #dtnasc_gamer
    #personagens_id_personagem
    #coins
    #nome_coin
    #nome_personagem

    constructor(email, senha, nome, dtnasc_gamer, personagens_id_personagem, coins, nome_coin, nome_personagem){
       
        this.#email  = email 
        this.#senha  = senha 
        this.#email  = nome 
        this.#dtnasc_gamer  = dtnasc_gamer 
        this.#personagens_id_personagem  = personagens_id_personagem 
        this.#coins  = coins 
        this.#nome_coin  = nome_coin 
        this.#nome_personagem  = nome_personagem 
    }
    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }
    get email() {
        return this.#email
    }
    set email(value) {
        this.#email = value
    }
    get senha() {
        return this.#senha
    }
    set senha(value) {
        this.#senha = value
    }
    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }
    get dtnasc_gamer() {
        return this.#dtnasc_gamer
    }
    set dtnasc_gamer(value) {
        this.#dtnasc_gamer = value
    }
    get personagens_id_personagem() {
        return this.#personagens_id_personagem
    }
    set personagens_id_personagem(value) {
        this.#personagens_id_personagem = value
    }
    get coins() {
        return this.#coins
    }
    set coins(value) {
        this.#coins = value
    }
    get nome_coin() {
        return this.#nome_coin
    }
    set nome_coin(value) {
        this.#nome_coin = value
    }
    get nome_personagem() {
        return this.#nome_personagem
    }
    set nome_personagem(value) {
        this.#nome_personagem = value
    }
    

    toJson(){
        return {
            "id":this.#id,
            "email":this.#email,
            "senha":this.#senha,
            "nome":this.#nome,
            "dtnasc_gamer":this.#dtnasc_gamer,
            "personagens_id_personagem":this.#personagens_id_personagem,
            "coins":this.#coins,
            "nome_coin":this.#nome_coin,
            "nome_personagem":this.#nome_personagem
        }
    }
}
module.exports = Admin
