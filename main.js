var carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//LLAMANDO A LOS PRODUCTOS .JSON
let seccionProductos = document.getElementById("productos");

fetch("json/productos.json")
.then(response => response.json())
.then(productos => {
    
    
        
        //DOM PRODUCTOS
        for (const producto of productos) {
            
            //agregar produtos al DOM
            let seccionProductos = document.getElementById("productos");
            let card = document.createElement("div");
            card.innerHTML = `<div class='card-body'> <img src= "${producto.imagen}" class='imagen' alt='${producto.nombre}'> <h5 class='nombreProducto'>${producto.nombre}</h5> <p class='precio'>$${producto.precio}</p><input class='boton' id='${producto.id}' type='button' value='COMPRAR'></div>`;
            seccionProductos.appendChild(card);

            
            //agregar al carrito - boton
            let botones = document.getElementById(producto.id);
            botones.addEventListener("click", agregarProducto);
            
            function agregarProducto() {
                carrito.push(producto)
                
                
                //STORAGE
                localStorage.setItem(JSON.stringify(producto), JSON.stringify(carrito));
                
                
                function calcularTotal(acu, producto) {
                    acu += producto.precio;
                    return acu
                }
                
                let precioTotal = carrito.reduce(calcularTotal, 0);
                
                
                // Descripción de productos añadidos
                var miCarrito = document.getElementById("miCarrito")
                var contenidoCarrito = document.createElement("div")
                
                contenidoCarrito.classList.toggle("productoCarrito")
                
                   
                contenidoCarrito.innerHTML =
                
                `
                <div > 
                <img class="imagenCarrito" src="${producto.imagen}" alt=${producto.nombre}>
                <div>
                <p>${producto.nombre}</p>
                <p>$${producto.precio}</p>
                </div>
                <div id="botonEliminar" id="${producto.nombre}">
                <span class="iconify" data-icon="ei:trash"></span>
                </div>
                </div>
                `;
                
                miCarrito.appendChild(contenidoCarrito);
                
                let totalCarrito = document.createElement("p")
                totalCarrito.innerHTML = `Total a pagar: $${precioTotal}`;
                
                // ELIMINAR PRODUCTO DEL CARRITO
                
                var botonEliminar=document.getElementById("botonEliminar");
                var productoI = document.getElementById("product");
  

                botonEliminar.addEventListener("click", function(e){
                    console.log(e) //respuesta de la consola: valor del contenidoCarrito
                })
            
                
                
                //NOTIFICACIÓN: PRODUCTO AGREGADO AL CARRITO
                Toastify({
                    text: `Agregaste ${producto.nombre} al carrito`,
                    duration: 1500,
                    position: "center",
                    style: {
                        background: "#141414",
                    }
                }).showToast();
            }
        }
    })
    
    
    // if(carrito.length===0){
    //     var carritoVacio = document.getElementById("carritoVacio")
    //     carritoVacio.parentNode.removeChild(carritoVacio)
    // } else{ 
    
    //     console.log("hola")
    // }

    
    
    // //DOM
    
    // ELIMINAR
    // //Titulo Mi Carrito
// let tituloCarrito = document.createElement("h2");
// let seccionCarrito = document.getElementById(`miCarrito`)
// seccionCarrito.append(tituloCarrito);
// tituloCarrito.innerText = "Mi Carrito:";


// // Descripción de productos añadidos - div contenedor
// var productosCarrito = document.createElement("div");
// seccionCarrito.appendChild(productosCarrito);


// let totalCarrito = document.createElement("p");

// seccionCarrito.append(totalCarrito);