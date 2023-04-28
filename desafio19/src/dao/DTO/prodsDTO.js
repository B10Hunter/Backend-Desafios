export default class ProductosDTO {
    
    static getInsertDTO = (prods, file) => {
        return{
            
        title: prods.title || 'Sin titulo',
        price: prods.price,
        thumbnail : `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}` || 'sin imagen'

        }
    }
}