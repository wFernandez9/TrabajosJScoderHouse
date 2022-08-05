//Clase constructora de objeto
class Persona {
    constructor(nombre, apellido, nacimiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacimiento = nacimiento;
    }
}

//array vacio
let array = [];

//pusheo al array con nuevos objetos
array.push(new Persona('Walter', 'Fernandez', '1989')); //0
array.push(new Persona('Isabel', 'Rolando', '1970')); //1
array.push(new Persona('Sofia', 'Guerra', '1990')); //2
array.push(new Persona('Luciana', 'Guerra', '1995')); //3
array.push(new Persona('Mauro', 'Fernandez', '1991')); //4
array.push(new Persona('Theo', 'Fernandez', '2015')); //5

//muestra del array
console.log(array);
//muestra el elemento 4 del array
console.log(array[4]); 