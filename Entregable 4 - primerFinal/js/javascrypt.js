//productos ya declarados
const Producto = [
    { nombre: "Martin Fierro", precio: 630 },
    { nombre: "El Diario de Ana Frank", precio: 800 },
    { nombre: "Tragica Comedia", precio: 900 },
    { nombre: "El Avaro", precio: 620 },
    { nombre: "La Politica", precio: 780 },
];

//clase constructora de nuevo objetos
class libro {
    constructor(nombre, precio) {
        this.nombre = nombre
        this.precio = precio
    }
}

//funcion para interactuar y agregar libros nuevos a producto
function agregarlibro() {
    let nombreLibro = prompt("ingrese el nombre del libro")
    let nuevoPrecio = prompt("ingrese el precio")


    let libronuevo = new libro(nombreLibro, nuevoPrecio,)

    Producto.push(libronuevo)
    console.log(Producto)
    return null;

}

//Carrito
let carrito = [];

//funcion para agregar al carrito
const addCarrito = () => {
    let nombre = prompt("ingrese un nombre")
    let resultado = Producto.find((n) => n.nombre.toLowerCase() === nombre.toLowerCase());


    if (resultado) {
        carrito.push(resultado);
        console.log(carrito);
    } else {
        alert("El libro no existe");
    }
};

//funcion preciofinal
function precioFinal() {
    let totalPrecios = carrito.reduce(((acumulador, carrito) => acumulador + carrito.precio), 0);
    return totalPrecios;
}

//interacion con el usuario
let proceso = true;
do {
    let intUsuario = prompt("Desea comprar(Si/No) o Agregar un producto a stock(ADD)").toLowerCase()

    while (intUsuario != "si" && intUsuario != "no" && intUsuario != "add") {
        alert("Por favor ingrese una opcion")
        intUsuario = prompt("Desea comprar(Si/No) o Agregar un producto(ADD)")
    }
    //Si el usuario quiere comprar, agrega al carrito y devuelve precio final
    if (intUsuario == "si") {
        let continuar = true;
        do {
            alert("Nuestra lista de productos")
            let todosLosProductos = Producto.map((Producto) => Producto.nombre + " $" + Producto.precio);
            alert(todosLosProductos.join(" - "));
            addCarrito()
            let afirmativo = prompt("Desea continuar?(Si/No)").toUpperCase()
            if (afirmativo == "NO") {
                continuar = false;

            }
        } while (continuar == true)
        alert("Precio final es: " + precioFinal())
    }

    else if (intUsuario == "add") {
        let continuar = true;

        //agrega nuevos libros a productos
        do {
            agregarlibro();
            alert("Libro agregados")
            let afirmativo = prompt("Desea agregar otro libro?(Si/No)").toUpperCase();
            if (afirmativo == "NO") {
                continuar = false;

            }
        } while (continuar == true)
        alert("Libro/s agregados");
        let seguir = prompt("Desea continuar en la pagina?(Si/No)").toUpperCase
        if (seguir == "NO") {
            proceso = false;
        }
    }
    else if (intUsuario == "no") {
        proceso = false;
    }


} while (proceso == true);

alert("Hasta luego")
