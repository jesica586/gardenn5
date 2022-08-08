let productos = [];
let carrito = [];
let divisa = "$";

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

        let botones = document.getElementById(producto.ids);
        botones.addEventListener("click", agregarProductoAlCarrito);
    }
}

function agregarProductoAlCarrito(e) {
    let productoSeleccionado = productos.find(producto => producto.ids == e.target.id)
    const productFound = carrito.find(prod => prod.ids == productoSeleccionado.ids)
    if(productFound) {
        carrito[carrito.indexOf(productFound)].cantidad += 1
    } else {
        carrito.push({...productoSeleccionado, cantidad: 1})
    }
    mostrarToast(productoSeleccionado.nombre)
    renderizarCarrito();
}



function renderizarCarrito() {
    
    let misProductos = document.getElementById("misProductos")
    misProductos.textContent = '';
    if(carrito.length === 0) {
        misProductos.innerHTML = `<p>Carrito vacío</p>`
    } else {
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
            <img src="imagenes/agregar.png" width="30px" id="agregar-${producto.ids}">
            <img src="imagenes/reducir.png" width="30px" id="reducir-${producto.ids}">
            `;
            
            misProductos.appendChild(cardProducto);
            
            let botonAgregar = document.getElementById(`agregar-${producto.ids}`);
            botonAgregar.addEventListener("click", function() {
                    let productFound = carrito.find(prod => prod.ids == producto.ids)
                    productFound.cantidad += 1
                    renderizarCarrito()
                    mostrarToast(productFound.nombre)
                })
                let botonReducir = document.getElementById(`reducir-${producto.ids}`);
                botonReducir.addEventListener("click", function() {
                    let productFound = carrito.find(prod => prod.ids == producto.ids)
                    if(productFound.cantidad > 1) {
                    productFound.cantidad -= 1
                    renderizarCarrito()
                    Toastify({
                        text: `Quitaste ${productFound.nombre} al carrito`,
                        duration: 1500,
                        position: "center",
                        style: {
                            background: "#141414",
                        }
                    }).showToast();
                    }
                })
                let botonEliminar = document.getElementById(producto.ids);
                botonEliminar.addEventListener("click", borrarItemCarrito);

        });

        let total = document.createElement("div");
        total.id = "total";
        total.innerHTML = `
        <p>Total: ${divisa}${calcularTotal()}</p>
        <input type="button" value="COMPRAR" id="botonTotal">
        `;
        misProductos.appendChild(total);

        botonTotal = document.getElementById("botonTotal");
        botonTotal.addEventListener("click", function(){
            
            Swal.fire({
                title:"GRACIAS POR TU COMPRA!",
                confirmButtonText:"ACEPTAR"
            })
        })
    }
}
function calcularTotal () {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio * producto.cantidad;
    }
    return total;
}
function borrarItemCarrito(e) {
    let productoEliminado = carrito.find(producto => producto.ids == e.target.id)
    carrito.splice(carrito.indexOf(productoEliminado), 1)
    renderizarCarrito();   
}

function mostrarToast(nombre) {
    Toastify({
        text: `Agregaste ${nombre} al carrito`,
        duration: 1500,
        position: "center",
        style: {
            background: "#141414",
        }
    }).showToast();
}
fetch("json/productos.json")
    .then(response => response.json())
    .then(arrayDeProductos => {
        productos = [...arrayDeProductos]
        renderizarProductos();
        renderizarCarrito();
    })

