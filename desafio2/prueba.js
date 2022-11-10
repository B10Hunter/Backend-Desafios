const Contenedor = require('./desafio2')

async function main(){
    const products = new Contenedor('products.txt')//creamos un archivo con los producto
    // Metodo getAll()
    console.log('Mostramos todos los productos')
    let allProducts = await products.getAll()
    console.log(allProducts)
    // Metodo getById()
    let idToSearch = 4 //Aca buscamos el producto por el numero del id
    console.log(`Mostramos por consola un producto con id ${idToSearch}`)
    let productById = await products.getById(idToSearch)
    console.log(productById)
    // Metodo save()
    let newProduct1 = {"id":5, "name":"zapatilla5", "price": 18300, "thumbnail":"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/889a0eeb698040a5ab16ac3701259d99_9366/Zapatillas_Tensaur_Blanco_S24052_01_standard.jpg"} // Prueba con un producto que ya posee id
    await products.save(newProduct1)
    let newProduct2 = {"id":6,"name":"zapatilla6", "price": 21200, "thumbnail":"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/aeaaa13799db4c98875fac1300d4103b_9366/Zapatillas_Tensaur_Azul_S24053_01_standard.jpg"} // Prueba con un producto sin id
    await products.save(newProduct2)
    // Metodo deleteById()
    console.log('Producto eliminado..') 
    let productIdToDelete = 5 //eliminamos el producto que queramos por su numero de id
    await products.deleteById(productIdToDelete) 
    allProducts = await products.getAll() // Actualizamos la variable allProducts para ver si se ha eliminado el elemento
    console.log(allProducts)
    // Metodo deleteAll()
    await products.deleteAll() //Con este metodo borramos todos los pruductos
}
main()