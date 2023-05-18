import config from "../config/config.js";

export let usersService;
export let prodService;
export let cartsService;
export let ticketsService;
export let historieService;

switch(config.app.PERSISTENCE) {
    case "MONGO":
        const {default:MongoUser} = await import('../dao/userDAO.js');
        const {default:MongoProds} = await import('../dao/productos.js');
        const {default:MongoCart} = await import('../dao/carrito.js');
        const {default:MongoTickets} = await import('../dao/TicketsDAO.js');
        const {default:MongoHistory} = await import('../dao/HistoriesDAO.js');

        usersService = new MongoUser();
        prodService = new MongoProds();
        cartsService = new MongoCart();
        ticketsService = new MongoTickets();
        historieService = new MongoHistory();
        break;
    case "FILESYSTEM":
}