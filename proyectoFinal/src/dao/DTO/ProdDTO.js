export default class VideogameDTO {

    static getInsertDTO = (videogame) =>{

        return {
            title: products.name,
            price: products.price,
            code: products.code,
            image: products.src || 'url de imagen genérica'
        }
    }

    static getCardPresenterDTO = (videogame) =>{
        return {
            title: products.name,
            price: products.price,
            active:  products.stock>0,
            image:  products.src || 'url de imagen genérica'
        }
    }

    static getDetailedDTO = (videogame) =>{

    }

}