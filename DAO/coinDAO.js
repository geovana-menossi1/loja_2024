const Coin = require("../mvc/models/coinModel");
const Database = require("../repository/database");

class CoinDAO {

    #conexao

    constructor() {
        this.#conexao = new Database();
    }

    async consultarCoin() {

        const lista_coin = []
        const coins = await this.#conexao.selecionarCoins()

        if (coins) {
            for (const coin of coins) {
                const objcoin = new Coin()

                objcoin.id = coin.id_coin
                objcoin.nome = coin.nome_coin
                objcoin.valor = coin.value_coin
                objcoin.imagem = coin.image_coin
               


                lista_coin.push(objcoin.toJson())
            }
        }

        return lista_coin
    }

    registrarCoin(nome, valor, imagem){

        const coin = new Coin()

        coin.nome = nome
        coin.valor = valor
        coin.imagem = imagem
       

        this.#conexao.insertCoins(coin.nome,  coin.valor, coin.imagem)
    }
    
    async consultarCoinId(id) {

        const coin = await this.#conexao.selecionarCoinsId(id)
              
        const objcoin = new Coin()

        objcoin.id = coin[0].id_coin
        objcoin.nome = coin[0].nome_coin
        objcoin.valor = coin[0].value_coin
        objcoin.imagem = coin[0].image_coin
       
      

        return objcoin.toJson()
    }

   


    async apagarCoin(id){
     const dados =  await this.#conexao.deleteCoins(id)
     return dados
    }
}

module.exports = CoinDAO