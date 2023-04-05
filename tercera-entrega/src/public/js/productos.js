const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');



// Agregar un event listener a cada botón de "Agregar al carrito"
botonesAgregarCarrito.forEach((boton) => {
  boton.addEventListener('click', async (event) => {
    event.preventDefault();

// Obtener la lista de productos de la API
const apiprod = await fetch('/api/productos', {
  method: 'GET'
});

// Convertir la respuesta de la API a un objeto JSON
const productos = await apiprod.json();


    // Obtener el ID del producto seleccionado del botón presionado
    const idProducto = event.target.getAttribute('data-id');
    console.log(`Se ha seleccionado el producto con id ${idProducto}`);

    
    // Buscar el producto correspondiente en la lista de productos obtenida de la API
    const productoSeleccionado = productos.find((prod) => prod._id === idProducto);
console.log(productoSeleccionado)
    if (!productoSeleccionado) {
      console.log(`No se encontró ningún producto con id ${idProducto}`);
      return;
    }
    // Enviar el producto seleccionado al carrito utilizando una solicitud POST a la API del carrito
    await fetch(`api/carrito/${idProducto}/productos`, { 
      method:'POST',
      body:JSON.stringify(productoSeleccionado),
      headers:{
          "Content-Type":"application/json"
      }
    });

    
  });
});






