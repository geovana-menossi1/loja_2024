class Admin{
    #id
    #email
    #senha
    #nome
    #dtgamer
    #personagens
    #coins

    constructor(email, senha, nome, dtgamer, personagens, coins){
       
        this.#email  = email 
        this.#senha  = senha 
        this.#email  = nome 
        this.#dtgamer  = dtgamer 
        this.#personagens  = personagens 
        this.#coins  = coins 
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
    get dtgamer() {
        return this.#dtgamer
    }
    set dtgamer(value) {
        this.#dtgamer = value
    }
    get personagens() {
        return this.#personagens
    }
    set personagens(value) {
        this.#personagens = value
    }
    get coins() {
        return this.#coins
    }
    set coins(value) {
        this.#coins = value
    }
    

    toJson(){
        return {
            "id":this.#id,
            "email":this.#email,
            "senha":this.#senha,
            "nome":this.#nome,
            "dtgamer":this.#dtgamer,
            "personagens":this.#personagens,
            "coins":this.#coins
        }
    }
}
module.exports = Admin
