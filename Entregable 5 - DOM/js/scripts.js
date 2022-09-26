//Carrito

/* let carrito = JSON.parse(localStorage.getItem("carrito"));
if (carrito) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
    carrito = [];
} */
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

//clase constructora de nuevo objetos
class libro {
    constructor(nombre, genero, precio, foto, id) {
        this.nombre = nombre;
        this.genero = genero;
        this.precio = Number(precio);
        this.id = Number(id);
        this.foto = foto;
    }
}


//productos ya declarados
let producto = [];
const productos = [];

function cargarProductos() {
    producto.push(new libro("Martin Fierro", "gauchesco", 630, "./img/martinfierro.jpg", 001));
    producto.push(new libro("El diario de Ana Frank", "Biografía", 800, "./img/anafrank.jpg", 002));
    producto.push(new libro("La Divina Comedia", "literatura", 900, "./img/ladivinacomedia.png", 003));
    producto.push(new libro("El Avaro", "Comedia", 620, "./img/elavaro.jpg", 004));
    producto.push(new libro("La Politica", "Tratado", 780, "./img/lapolitica.png", 005));
    producto.push(new libro("Cuando no queden mas entrellas que contar", "Novela", 500, "./img/cuandonoquedenmasestrellasquecontar.webp", 006));
}
cargarProductos();

//traigo de la api y lo pusheo a un array
const librosApi = [];

async function apiLibros() {
    const APIGET = "./js/productos.json";
    const resp = await fetch(APIGET);
    const data = await resp.json();
    data.forEach(e => producto.push(new libro(e.nombre, e.genero, e.precio, e.foto, e.id)))
    /* producto.push(data); */
    /* producto = productos.concat(librosApi); */
}

const contenedorCarritoCompras = document.querySelector('#items');
const contenedorDeProductos = document.getElementsByClassName("row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center");
const contenedorFooterCarrito = document.querySelector("#footer");

const addProductos = contenedorDeProductos[0];

//funcion de dibujo de carrito
function dibujarCarrito() {

    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";

    carrito.forEach(
        (elemento) => {
            let renglonesCarrito = document.createElement("tr");

            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.id}</td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                <td>$${elemento.producto.precio}</td>
                <td>$${elemento.producto.precio * elemento.cantidad}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito += elemento.cantidad * elemento.producto.precio;

            //add evento a carrito
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);

            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });

            //remueve producto del carrito
            let borrarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);

            borrarProducto.addEventListener("click", (e) => {
                removerProductoCarrito(elemento);
                dibujarCarrito();
            });

        }
    );


    if (carrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `
                  <th scope="row" colspan="5">Inicia tu compra!</th>
              `;
    } else {
        contenedorFooterCarrito.innerHTML = `
                  <th scope="row" colspan="5">Total de la compra: $${sumaCarrito}</th>
              `;
    }

}

let finalizar = document.querySelector('#finalizar')
finalizar.onclick = () => {
    Swal.fire({
        title: 'Orden confirmada!',
        text: 'Gracias por su compra!',
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })
}



//remover producto del carrito
function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = carrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);

    carrito.length = 0;

    elementosAMantener.forEach((elemento) => carrito.push(elemento));
}





function crearCard(producto) {
    //footer card
    let footerCard = document.createElement("div");
    footerCard.className = "card-footer p-4 pt-0 border-top-0 bg-transparent"
    //boton
    let botonAgregar = document.createElement("div");
    botonAgregar.className = "text-center"
    botonAgregar.className = "btn btn-outline-dark mt-auto";
    botonAgregar.innerText = "Agregar";

    //card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body p-4";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio}</p>
    `;
    cuerpoCarta.append(footerCard);
    cuerpoCarta.append(botonAgregar);

    //imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //CARD
    let carta = document.createElement("div");
    carta.className = "card h-100 m-4";
    carta.append(imagen);
    carta.append(cuerpoCarta);

    let colum = document.createElement('div');
    colum.className = "col mb-5";
    colum.append(carta);
    //dibujado desde el storage
    /* let total = precioFinal();
    let precioTotal = document.getElementById("precioTotal");
    precioTotal.innerHTML = "$" + total;*/
    dibujarCarrito();
    //agregar algunos eventos
    botonAgregar.onclick = () => {
        //agregado el sweetalert
        cartelAdd();

        let elementoExistente = carrito.find((elemento) => elemento.producto.id == producto.id);

        if (elementoExistente) {
            elementoExistente.cantidad += 1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            carrito.push(elementoCarrito);
        }

        /* let elementoCarrito = new ElementoCarrito(producto, 1);
        carrito.push(elementoCarrito); */
        /* let total = precioFinal();
        let precioTotal = document.getElementById("precioTotal");
        precioTotal.innerHTML = "$" + total; */
        dibujarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    return carta;

}


async function dibujarCatalogoProductos() {
    await apiLibros();
    addProductos.innerHTML = "";
    producto.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            addProductos.append(contenedorCarta);
        }
    );

};
dibujarCatalogoProductos();

//funcion preciofinal
function precioFinal() {
    let totalPrecios = carrito.reduce(((acumulador, carrito) => acumulador + carrito.producto.precio), 0);
    return totalPrecios;


}
//funcion de cartel de Sweet
function cartelAdd() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 1000
    })
}