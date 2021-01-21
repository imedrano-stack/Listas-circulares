// V A R I A B L E S 
var btnAgregar = document.querySelector('#btnAgregar');
var btnEliminar = document.querySelector('#btnEliminar');
var btnBuscar = document.querySelector('#btnBuscar');
var btnImprimir = document.querySelector('#btnImprimir');
var btnCrearRecorrido = document.querySelector('#btnCrearRecorrido');

// L I S T A 
var lista = document.querySelector("#lista");

// C L A S E S
class Base {
    constructor(nombreBase, minutos) {
        this.nombreBase = nombreBase;
        this.minutos = minutos;
        this.siguiente = null;
    }
    
    
    articleToHtml() {
        let productString = '<li class="list-group-item">';
        for (let key in this) {
            productString += `<div>${key}: ${this[key]}</div>`;
        }
        
        return productString + "</li>";
    }

    articleToHtmlRecorrido(base, hora) {
        let productString = '<li class="list-group-item">';
        for (let key in this) {
            productString += `<div>${key}: ${this[key]}</div>`;
        }
        
        let texto = "Estas en " + base + " a las " + hora;

        return productString + texto + "</li>";
    }

}

class BaseAutobuses {
    constructor(){
        this.inicio = null;
        this.tamaño = 0;
    }
    
    agregarBase(nuevo){
        if(this.inicio === null){
            this.inicio = nuevo;
            nuevo.siguiente = this.inicio;
        }else{
            let aux = this.inicio;
            while(aux.siguiente !== this.inicio){
                aux = aux.siguiente;
            }
            aux.siguiente = nuevo;
            nuevo.siguiente = this.inicio;
        }
        this.tamaño++;
        this.imprimir();
    }

    eliminarBase(nombre) {
       if(this.tamaño === 1){
        this.inicio = null;
        this.tamaño--;
        this.imprimir();
        return null;
       }
        let aux = this.inicio;
        if(aux.nombreBase === nombre){
           this.inicio = aux.siguiente;
           let temp = this.inicio;

            while(temp.siguiente.nombreBase !== nombre){
                temp = temp.siguiente;
            }
            this.tamaño--;
            temp.siguiente = this.inicio;
            this.imprimir();
        }
        else {
            let temp = this.inicio;

            while(temp.siguiente.nombreBase !== nombre){
                temp = temp.siguiente;
            }
            temp.siguiente = temp.siguiente.siguiente;
            this.tamaño--;
            this.imprimir();
            return temp.siguiente;
        }
        
    }

    buscarBase(nombre) {
        if(this.inicio !== null){
            let aux = this.inicio;
            let fin = false;
            let x = 0;
            while(!fin){
                if(aux.nombreBase == nombre){
                    fin = true;
                    return aux;
                }
                aux = aux.siguiente;
                x++;
                if(x>this.tamaño){
                    alert("Base no encontrada");
                    return null
                }
            }
        }
        alert("Base no encontrada");
        return null
    }

    imprimir() {
        lista.innerHTML = "";
        if(!this.inicio) return false
        let aux = this.inicio;
        let fin = false;
        while(!fin){
            lista.innerHTML += aux.articleToHtml();
            aux = aux.siguiente;
            if(aux.nombreBase === this.inicio.nombreBase){
                fin = true;
            }
        }
    }

    crearRecorrido(baseIn, horaIn, horaFin){
        lista.innerHTML = "";
        let baseaux = this.buscarBase(baseIn);
        let horaaux = Number(horaIn);
        
        while(horaaux < horaFin){
            lista.innerHTML += baseaux.articleToHtmlRecorrido(baseaux.nombreBase, horaaux);
            baseaux = baseaux.siguiente;
            horaaux += Number(baseaux.minutos);
        }
        lista.innerHTML += baseaux.articleToHtmlRecorrido(baseaux.nombreBase, horaaux);
    }
}

//L I S T A S  D E  E V E N T O S 

let baseAutobuses = new BaseAutobuses();

// B O T O N  A G R E G A R
btnAgregar.addEventListener("click", () => {
    let nombreBase = (document.querySelector('#nombreBase'));
    let tiempoBase = (document.querySelector('#tiempoBase'));
    let base1 = new Base(nombreBase.value, Number(tiempoBase.value));
    baseAutobuses.agregarBase(base1);
    console.log(base1);
});

// B O T O N  E L I M I N A R
btnEliminar.addEventListener("click", () => {
    var eliminarBase = document.querySelector("#eliminarBase");
    baseAutobuses.eliminarBase(eliminarBase.value);
});

// B O T O N  B U S C A R
btnBuscar.addEventListener("click", () => {
    var buscarBase = document.querySelector("#buscarBase");
    let base = baseAutobuses.buscarBase(buscarBase.value);
    lista.innerHTML = "";
    lista.innerHTML += base.articleToHtml();
});

// B O T O N  I M P R I M I R
btnImprimir.addEventListener("click", () => {
    baseAutobuses.imprimir();
});

// B O T O N  R E C O R R I D O
btnCrearRecorrido.addEventListener("click", () => {
    var baseInico = document.querySelector("#baseInicio");
    var horaInicio = document.querySelector("#horaInicio");
    var horaFin = document.querySelector("#horaFin");
    baseAutobuses.crearRecorrido(baseInico.value, horaInicio.value, horaFin.value);
});