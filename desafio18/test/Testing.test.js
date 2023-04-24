import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Pruebas de peticiones al servidor',()=>{
    before(async function(){
        await requester.get('/test/init')
    })

    it('El endpoint POST /api/sessions/register debe registrar correctamente un usuario', async function(){
        
        const testUser = {
            first_name:"Marcos",
            last_name:"Gonzalo",
            email:"test1@correo.com",
            password:"123"
        }
        
        const response = await requester.post('/api/sessions/register')
        .field('first_name',testUser.first_name)
        .field('last_name',testUser.last_name)
        .field('email',testUser.email)
        .field('password',testUser.password)
        .attach('avatar','./test/avatar.png')
    
        const {_body} = response;
        expect(_body.message).to.be.equal("Registrado");
        
    })
it('El endpoint GET /api/productos debe traer los prods',async function(){
        const response = await requester.get('/api/productos');
        expect(response.status).to.be.ok;
        console.log(response.text);
        
    })

})




