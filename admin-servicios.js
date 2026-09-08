function editarServicio(id, nombre, precio) {
    document.getElementById("titulo-formulario").innerText = "Editar Servicio (ID: " + id + ")";
    document.getElementById("admin-id").value = id;
    document.getElementById("admin-nombre").value = nombre;
    document.getElementById("admin-precio").value = precio;
    
}

function limpiarFormulario() {
    document.getElementById("titulo-formulario").innerText = "Agregar Nuevo Servicio";
    document.getElementById("admin-id").value = "";
    document.getElementById("admin-nombre").value = "";
    document.getElementById("admin-precio").value = "";
    document.getElementById("admin-descripcion").value = "";
}

function guardarServicio() {
    let nombre = document.getElementById("admin-nombre").value.trim();
    let precio = document.getElementById("admin-precio").value.trim();

    if(nombre === "" || precio === "") {
        alert("Debe completar el nombre y el precio.");
    } else {
        alert("¡Servicio guardado exitosamente!");
        limpiarFormulario();
    }
}