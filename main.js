let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let divisa = "$";

function renderizarProductos() {
    for (const producto of productos) {
        let seccionProductos = document.getElementById("productos");
        let card = document.createElement("div");
        card.innerHTML = `
        <div class='card-body'> 
        <img src= "${producto.imagen}" class='imagen' alt='${producto.nombre}'> 
        <h5 class='nombreProducto'>${producto.nombre}</h5>
        <p class='precio'>$${producto.precio.toLocaleString('de-DE')}</p>
        <input class='botonComprar' id='${producto.id}' type='button' value='COMPRAR'>
        </div>`;
        seccionProductos.appendChild(card);

        let botones = document.getElementById(producto.id);
        botones.addEventListener("click", agregarProductoAlCarrito);
    }
}

function agregarProductoAlCarrito(e) {
    let productoSeleccionado = productos.find(producto => producto.id == e.target.id)
    const productFound = carrito.find(prod => prod.id == productoSeleccionado.id)
    if (productFound) {
        carrito[carrito.indexOf(productFound)].cantidad += 1
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 })
    }
    mostrarToast(productoSeleccionado.nombre)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito();
}

function renderizarCarrito() {
    let misProductos = document.getElementById("misProductos")
    misProductos.textContent = '';
    if (carrito.length === 0) {
        misProductos.innerHTML = `<p>CARRITO VACÍO</p>`
    } else {
        carrito.forEach(producto => {
            let cardProducto = document.createElement("div")
            cardProducto.id = "item"
            cardProducto.innerHTML =
                `
            <img class="imagenCarrito" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="cartNombreYCantidad">
                <p class="cartNombre">${producto.nombre}</p>
                <div>
                    <p class="tituloCantidad">Cantidad: </p>
                    <span class="cartBoton" id="reducir-${producto.id}">-</span>
                    <span class="nroCantidad">${producto.cantidad}</span> 
                    <span class="cartBoton" id="agregar-${producto.id}">+</span>
                    </div>
                </div>
            <div class="cartEliminarYPrecio">
                <img class="botonEliminar" src="imagenes/eliminar.jpg" id="${producto.id}">
                <p class="cartPrecio">$${producto.precio.toLocaleString('de-DE')}</p>
            </div>
            `;

            misProductos.appendChild(cardProducto);

            let botonAgregar = document.getElementById(`agregar-${producto.id}`);
            botonAgregar.addEventListener("click", function () {
                let productFound = carrito.find(prod => prod.id == producto.id)
                productFound.cantidad += 1
                renderizarCarrito()
                mostrarToast(productFound.nombre)
                localStorage.setItem("carrito", JSON.stringify(carrito))
            })
            let botonReducir = document.getElementById(`reducir-${producto.id}`);
            botonReducir.addEventListener("click", function () {
                let productFound = carrito.find(prod => prod.id == producto.id)
                if (productFound.cantidad > 1) {
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
                localStorage.setItem("carrito", JSON.stringify(carrito))
            })
            let botonEliminar = document.getElementById(producto.id);
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
        botonTotal.addEventListener("click", function () {

            Swal.fire({
                title: "GRACIAS POR TU COMPRA!",
                confirmButtonText: "ACEPTAR"
            })
        })
    }
}

function calcularTotal() {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio * producto.cantidad;
    }
    return total.toLocaleString('de-DE');

}
function borrarItemCarrito(e) {
    let productoEliminado = carrito.find(producto => producto.id == e.target.id)
    carrito.splice(carrito.indexOf(productoEliminado), 1)
    renderizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito))
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