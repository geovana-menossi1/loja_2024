const Personagem = require("../mvc/models/personagemModel");
const Database = require("../repository/database");

class PersonagemDAO {

    #conexao

    constructor() {
        this.#conexao = new Database();
    }

    async consultarPersonagem() {

        const lista_personagem = []
        const personagens = await this.#conexao.selecionarPersonagem()

        if (personagens) {
            for (const personagem of personagens) {
                const objpersonagem = new Personagem()

                objpersonagem.id = personagem.id_personagem
                objpersonagem.nome = personagem.nome_personagem
                objpersonagem.genero = personagem.genero_personagem
                objpersonagem.tipo = personagem.tipo_personagem
                objpersonagem.totalcoin = personagem.totalcoin_personagem
                objpersonagem.latitude = personagem.start_latitude_personagem
                objpersonagem.longitude = personagem.start_longitude_personagem
                objpersonagem.skin = personagem.skins_id_skin


                lista_personagem.push(objpersonagem.toJson())
            }
        }

        return lista_personagem
    }

    registrarPersonagem(nome, genero, tipo, totalcoin,latitude,longitude,skin){

        const personagem = new Personagem()

        personagem.nome = nome
        personagem.genero = genero
        personagem.tipo = tipo
        personagem.totalcoin = totalcoin
        personagem.latitude = latitude
        personagem.longitude = longitude
        personagem.skin = skin
        

        this.#conexao.insertPersonagens(personagem.nome,personagem.genero,personagem.tipo,personagem.totalcoin,personagem.latitude,personagem.longitude,personagem.skin)
    }
    
    async consultarPersonagemId(id) {

        const personagem = await this.#conexao.selecionarPersonagensId(id)
              
        const objpersonagem = new Personagem()

                objpersonagem.id = personagem[0].id_personagem
                objpersonagem.nome = personagem[0].nome_personagem
                objpersonagem.genero = personagem[0].genero_personagem
                objpersonagem.tipo = personagem[0].tipo_personagem
                objpersonagem.totalcoin = personagem[0].totalcoin_personagem
                objpersonagem.latitude = personagem[0].start_latitude_personagem
                objpersonagem.longitude = personagem[0].start_longitude_personagem
                objpersonagem.skin = personagem[0].skins_id_skin
      

        return objpersonagem.toJson()
    }

    async atualizarCupom(id, nome, codigo, validade, valor){

        const cupom = new Cupom()

        cupom.id = id
        cupom.nomeCupom = nome
        cupom.codCupom = codigo
        cupom.validadeCupom = validade
        cupom.valorCupom = valor

        const dt = await this.#conexao.updateCupom(cupom.codCupom, cupom.nomeCupom, cupom.validadeCupom, cupom.valorCupom, cupom.id)
        return dt
    }


    async apagarPersonagem(id){
     const dados =  await this.#conexao.deletePersonagens(id)
     return dados
    }
}

module.exports = PersonagemDAO