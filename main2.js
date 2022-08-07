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
    const producto = productos.find(producto => producto.ids.toString() === e.target.id )
    carrito.push(producto);
    console.log("carrito: ", carrito)
    renderizarCarrito();
}

function renderizarCarrito() {
    //Array de los productos añadidos al carrito
    // let productosSeleccionados = productos.filter(producto => carrito.includes(producto.ids.toString()))
    
    let misProductos = document.getElementById("misProductos")
    var cardProducto = document.createElement("div")
    // let miCarrito = document.getElementById("miCarrito")
    // let carritoVacio = document.getElementById("carritoVacio")

    carrito.forEach(mostrar);

    function mostrar(productoSeleccionado) {

        cardProducto.innerHTML =
            `
                        <div> 
                        <img class="imagenCarrito" src="${productoSeleccionado.imagen}" alt=${productoSeleccionado.nombre}>
                        <div>
                        <p>${productoSeleccionado.nombre}</p>
                        <p>$${productoSeleccionado.precio}</p>
                        </div>
                        <img src="imagenes/eliminar.jpg" width="30px" id="${productoSeleccionado.ids}">
                        </div>
                        `;

        misProductos.appendChild(cardProducto);

        let botonEliminar = document.getElementById(productoSeleccionado.ids);
        botonEliminar.addEventListener("click", borrarItemCarrito);

        function borrarItemCarrito(e) {
            console.log("e.target.parentElement: ", e.target.parentElement )
            e.target.parentElement.remove()                  
        }
    }
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