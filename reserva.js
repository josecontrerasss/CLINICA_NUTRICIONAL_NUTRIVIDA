function cargarReserva(){

    let carritoGuardado = localStorage.getItem("miReserva");
    let contenedor = document.getElementById("listaSeleccionados");
    let totalElemento = document.getElementById("totalReserva");
    
    contenedor.innerHTML = "";
    let total = 0;

    if (carritoGuardado === null || JSON.parse(carritoGuardado).length === 0) {
        contenedor.innerHTML = "<p>No has seleccionado nada aún.</p>";
        totalElemento.textContent = "Total: $0";
        return;
    }

    let listaReserva = JSON.parse(carritoGuardado);

    for (let i = 0; i < listaReserva.length; i++) {
        total = total + listaReserva[i].precio;

        contenedor.innerHTML += `
            <div style="border: 1px dashed #333; padding: 10px; margin-bottom: 10px; max-width: 400px;">
                <h3>${listaReserva[i].nombre}</h3>
                <p>Valor: $${listaReserva[i].precio}</p>
                <button onclick="quitarElemento(${i})">Quitar de la lista</button>
            </div>
        `;
    }

    totalElemento.textContent = "Total: $" + total;

}

function quitarElemento(posicion) {
    let listaReserva = JSON.parse(localStorage.getItem("miReserva"));
    
    listaReserva.splice(posicion, 1);
    
    localStorage.setItem("miReserva", JSON.stringify(listaReserva));
    cargarReserva();
}

cargarReserva();