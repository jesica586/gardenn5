let productos = [];
let carrito = [];
let divisa = "$";

//MOSTRAMOS LOS PRODUCTOS EN EL INDEX
function renderizarProductos() {
    for (const producto of productos) {
        let seccionProductos = document.getElementById("productos");
        let card = document.createElement("div");
        card.innerHTML = `
        <div class='card-body'> 
        <img src= "${producto.imagen}" class='imagen' alt='${producto.nombre}'> 
        <h5 class='nombreProducto'>${producto.nombre}</h5> 
        <p class='precio'>$${producto.precio}</p>
        <input class='boton' id='${producto.ids}' type='button' value='COMPRAR'>
        </div>`;
        seccionProductos.appendChild(card);

        //CONFIGURAMOS EL BOTON PARA LLAMAR A LA FUNCIÓN DE AÑADIR EL PRODUCTO AL CARRITO AL HACER CLICK
        let botones = document.getElementById(producto.ids);
        botones.addEventListener("click", agregarProductoAlCarrito);
    }
}

//FUNCIÓN PARA AÑADIR EL PRODUCTO AL CARRITO QUE A LA VEZ LLAMA A LA FUNCION QUE MUESTRA LOS PRODUCTOS EN EL CARRITO
function agregarProductoAlCarrito(e) {
    let productoSeleccionado = productos.find(producto => producto.ids == e.target.id)
    const productFound = carrito.find(prod => prod.ids == productoSeleccionado.ids)
    if(productFound) {
        carrito[carrito.indexOf(productFound)].cantidad += 1
    } else {
        carrito.push({...productoSeleccionado, cantidad: 1})
    }
    console.log("carrito: ", carrito)
    renderizarCarrito();
}

function renderizarCarrito() {
    //Array de los productos añadidos al carrito
    // let productosSeleccionados = productos.filter(producto => carrito.includes(producto.ids.toString()))
    
    let misProductos = document.getElementById("misProductos")
   
   
    // let miCarrito = document.getElementById("miCarrito")
    // let carritoVacio = document.getElementById("carritoVacio")
    misProductos.textContent = '';

    carrito.forEach(producto => {
        let cardProducto = document.createElement("div")
        cardProducto.id = "item"
        cardProducto.innerHTML =
            `
            <img class="imagenCarrito" src="${producto.imagen}" alt=${producto.nombre}>
            <div>
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <p>Cantidad:${producto.cantidad}</p>
            </div>
            <img src="imagenes/eliminar.jpg" width="30px" id="${producto.ids}">
            `;
            misProductos.appendChild(cardProducto);
            let botonEliminar = document.getElementById(producto.ids);
            botonEliminar.addEventListener("click", borrarItemCarrito);
    });    
   
}

function borrarItemCarrito(e) {
    console.log("e.target.parentElement: ", e.target.parentElement )
    // remove element from carrito 
    let productoEliminado = carrito.find(producto => producto.ids == e.target.id)
    carrito.splice(carrito.indexOf(productoEliminado), 1)
    renderizarCarrito();   
    //e.target.parentElement.remove()                  
}

fetch("json/productos.json")
    .then(response => response.json())
    .then(arrayDeProductos => {
        productos = [...arrayDeProductos]
        //LLAMO A LA FUNCION DE MOSTRAR PRODUCTOS, LA CUAL A LA VEZ LLAMA A LA FUNCION DE AGREGAR EL PRODUCTO AL CARRITO
        renderizarProductos();
        //LLAMO A LA FUNCION QUE MUESTRA LOS PRODUCTOS AGREGADOS EN EL CARRITO
        renderizarCarrito();
    })