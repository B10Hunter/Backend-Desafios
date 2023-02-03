import {faker} from '@faker-js/faker'
//Acá usamos  faker para crear productos
faker.locale= 'es'
export const prodFaker = ()  =>{
    const numeProd = 5;
    let products = [];
    for(let i=0;i<numeProd;i++) {
        products.push(generadorProd());
    }
    return products 
}

const generadorProd = () => {
    return{
        id: faker.database.mongodbObjectId(),
        titlle: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.random.numeric(2),
        image: faker.image.image()
    }
}
