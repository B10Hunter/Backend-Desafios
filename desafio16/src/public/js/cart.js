const bntBorrarProdCart = document.querySelectorAll('.borrar-prod-cart');

bntBorrarProdCart.forEach((boton) => {
  boton.addEventListener('click', async (event) => {
    event.preventDefault();

// Obtener la lista de productos de la API
const apiProdCart = await fetch('/api/carrito', {
  method: 'GET'
});

// Convertir la respuesta de la API a un objeto JSON
const productos = await apiProdCart.json();


// Obtener el ID del producto seleccionado del botón presionado
const idProducto = event.target.getAttribute('data-id');
console.log(`Se ha seleccionado el producto con id ${idProducto}`);


// Buscar el producto correspondiente en la lista de productos obtenida de la API
const productoSeleccionado = productos.find((prod) => prod._id === idProducto);

if (!productoSeleccionado) {
    console.log(`No se encontró ningún producto con id ${idProducto}`);
    return;
    }
    // Enviar el producto seleccionado del carrito para eliminarlo
    await fetch(`api/carrito/productos/${idProducto}`, { 
        method:'DELETE',
        body:JSON.stringify(productoSeleccionado),
        headers:{
            "Content-Type":"application/json"
    }
    });
    
    window.location.reload();
    });
});