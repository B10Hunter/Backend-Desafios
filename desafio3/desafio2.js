const { promises: fs } = require('fs')

class Contenedor{
    constructor(route){
        this.route = route
    }
    async save(object){
        const products = await this.getAll()
        object.id = products.length === 0 ? 0 : object.id = products[products.length - 1].id + 1
        products.push(object)
        try {
            console.log(`El siguiente elemento sera guardado : \n${JSON.stringify(object)}`)
            await fs.writeFile(this.route, JSON.stringify(products, null, 2))
            console.log('Guardado exitoso')
        } catch (error) {
            console.error('Error de escritura')
            console.error(error)
        }
    }
    async getById(id){
        const products = await this.getAll()
        if(!this.checkLength(products)){
            return
        }
        let product = products.find(element => element.id == id)
        return product ? product : null
    }
    async getAll(){
        try {
            let products = await fs.readFile(this.route, 'utf-8')
            return JSON.parse(products)
        } catch (error) {
            console.error('Error')
            console.error(error)
            return []
        }
    }
    async deleteById(id){
        const products = await this.getAll()
        if(!this.checkLength(products)){
            return
        }
        const product = products.find(element => element.id == id)
        const newProducts = products.filter(element => element != product)
        console.log(newProducts)
        try {
            console.log(`El siguiente elemento sera eliminado : \n${JSON.stringify(product)}`)
            await fs.writeFile(this.route, JSON.stringify(newProducts, null, 2))
            console.log(`Cambios guardados`)
        } catch (error) {
            console.error('Error')
            console.error(error)
        }
    }
    async deleteAll(){
        try {
            console.log('Se procedera a borrar todos los elementos ...')
            await fs.writeFile(this.route, "")
            console.log('Elementos eliminados con exito.')
        } catch (error) {
            console.error('Error')
            console.error(error)
        }
    }
    async getRandom(){
        const products = await this.getAll()
        return this.checkLength(products) ? products[Math.floor(Math.random() * products.length)] : null
    }
    checkLength(arr){
        if (arr.length === 0){
            console.error('El Array esta vacio')
            return false
        }
        return true
    }
}

module.exports = Contenedor;