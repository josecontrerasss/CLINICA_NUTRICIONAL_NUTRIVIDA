let producto = JSON.parse(localStorage.getItem("servicioDetalle"));

document.getElementById("imagen").src = 
    producto.imagen;

document.getElementById("nombre").textContent = 
    producto.nombre;

document.getElementById("precio").textContent = 
    "Precio: $" + producto.precio;

document.getElementById("descripcion").textContent = 
    producto.descripcion;

function agregarAReserva() {
    let carritoGuardado = localStorage.getItem("miReserva");
    let listaReserva;

    if (carritoGuardado === null) {
        listaReserva = [];
    } else {
        listaReserva = JSON.parse(carritoGuardado);
    }

    listaReserva.push(producto);

    localStorage.setItem("miReserva", JSON.stringify(listaReserva));

    alert("¡Servicio agregado a tu reserva!");
    window.location.href = "servicios.html";
}