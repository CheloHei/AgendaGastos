//variabels
const presupuestoUsuario = prompt('¿Cual es su gasto semanal?');

/**
 * const form = document.getElementById('agregar-gasto');
 */
const form = document.getElementById('agregar-gasto');
//const form = $('#agregar-gasto');

let cantidadPresupuesto;




//clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //metodo que va restando del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}
//==================Interfaz====================\\
class Interfaz {

    //funcion para insertar el presupuesto en vista
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = $('span#total');
        const restanteSpan = $('span#restante');
        //insertar HTML
        //presupuestoSpan.innerHTML = `${cantidad}`; 
        $(presupuestoSpan).html(`${cantidad}`);
        $(restanteSpan).html(`${cantidad}`);
    }


    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        $(divMensaje).addClass('text-center alert');
        if (tipo === 'error') {
            //divMensaje.classList.add
            $(divMensaje).addClass('alert-danger');
        } else {
            $(divMensaje).addClass('alert-success');
        }
        //divMensaje.appendChild(document.createTextNode(mensaje));
        $(divMensaje).append(document.createTextNode(mensaje));
        //insertar en el dom 
        document.querySelector('.primario').insertBefore(divMensaje, form);
        //$(divMensaje,form).insertBefore('.primario');


        setTimeout(function () {
            $('.primario .alert').remove();
            //$('#agregar-gasto').trigger('reset');
            form.reset();
        }, 3000);

    }

    //inserta gastos en la lista
    agregarGastoListado(nombre, cantidad) {
        //const gastosListado = $('#gastos ul');
        const gastosListado = document.querySelector('#gastos ul');
        console.log(gastosListado);
        const li = document.createElement('li');
        li.className = 'list-group.item  d-flex justify-content-between align-items-center';

        li.innerHTML = `
                    ${nombre}
                    <span class = "badge badge-primary badge-pills"> ${cantidad}</span>
                    `;

        gastosListado.appendChild(li);
    }

    //comprueba el presupuesto restante
    presupuestoRestante(cantidad) {
        const restante = document.querySelector('#restante');;
        const presupuestoRestanteusuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoRestanteusuario}`;
        this.comprobarPresupuesto();
    }


    //cambiarColorPresupuesto restante
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;


        if ((presupuestoTotal / 4) > presupuestoRestante) {
            //const restante = $('.restante');
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}

//event listeners
//document.addEventListener('DOMContentLoaded');
$(document).ready(function () {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        console.log(cantidadPresupuesto);
        //Instanciar la clase Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});
//form.addEventListener('sumbit',function(e))
$(form).submit((e) => {
    e.preventDefault();
    let nombreGasto = $('#gasto').val();
    let cantidadGasto = $('#cantidad').val();
    console.log('click');
    //console.log(nombreGasto);
    //console.log(cantidadGasto);
    //Instanciar de vuelta Interfaz
    const ui = new Interfaz();
    if (nombreGasto === '' || cantidadGasto === '') {
        ui.imprimirMensaje('Hubo un error', 'error');
    } else {
        //insertar en el html
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});