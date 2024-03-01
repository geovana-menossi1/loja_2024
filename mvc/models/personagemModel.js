//Representa uma Cupom do mundo real, concorda?
class Personagem{

    #id

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

   #nome
    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }
   #genero
    get genero() {
        return this.#genero
    }
    set genero(value) {
        this.#genero = value
    }
   #tipo
    get tipo() {
        return this.#tipo
    }
    set tipo(value) {
        this.#tipo = value
    }
   #totalcoin    
    get totalcoin() {
        return this.#totalcoin
    }
    set totalcoin(value) {
        this.#totalcoin = value
    }
    #latitude    
    get latitude() {
        return this.#latitude
    }
    set latitude(value) {
        this.#latitude = value
    }
    #longitude    
    get longitude() {
        return this.#longitude
    }
    set longitude(value) {
        this.#longitude = value
    }
    #skin    
    get skin() {
        return this.#skin
    }
    set skin(value) {
        this.#skin = value
    }
  
    //é um tipo de método padrão. Ele é invocado
    //quando o objeto é criado, ou seja, ele vai te
    //acompanhar e obrigar a passar os parametros declarados, se tiver.
    //exemplo const a = new Cupom("Batata","Frita",100)
    constructor(nome, genero, tipo, totalcoin,latitude,longitude,skin){
        this.#nome = nome
        this.#genero = genero
        this.#tipo = tipo
        this.#totalcoin = totalcoin
        this.#latitude = latitude
        this.#longitude = longitude
        this.#skin = skin
    }

     
    toJson(){
        return {
            "id": this.#id,
            "nome": this.#nome,
            "genero": this.#genero,
            "tipo": this.#tipo,
            "totalcoin": this.#totalcoin,
            "latitude": this.#latitude,
            "longitude": this.#longitude,
            "skin": this.#skin

        }
    }
}


module.exports = Personagem