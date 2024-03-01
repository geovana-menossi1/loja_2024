class Coins{

    #id
    #nome
    #valor
    #imagem
    
    constructor(nome, valor, imagem){
       
        this.#nome  = nome 
        this.#valor= valor
        this.#imagem  = imagem 
     
        
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

   
    get nome() {
        return this.#nome 
    }
    set nome(value) {
        this.#nome = value
    }
   
    get valor() {
        return this.#valor 
    }
    set valor(value) {
        this.#valor = value
    } 
    get imagem() {
        return this.#imagem
    }
    set imagem(value) {
        this.#imagem  = value
    }
       
   
    
    

     
    toJson(){
        return {
            "id": this.#id,
            "nome": this.#nome,
            "valor":this.#valor,
            "imagem": this.#imagem
            
        }
    }
}


module.exports = Coins