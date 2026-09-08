// Carga los datos de la fila seleccionada en el formulario
function editarUsuario(id, nombre, correo, rol) {
    document.getElementById("titulo-formulario-usuario").innerText = "Editar Usuario (ID: " + id + ")";
    document.getElementById("admin-id-usuario").value = id;
    document.getElementById("admin-nombre-usuario").value = nombre;
    document.getElementById("admin-correo-usuario").value = correo;
    document.getElementById("admin-rol-usuario").value = rol;
    
}

function limpiarFormularioUsuario() {
    document.getElementById("titulo-formulario-usuario").innerText = "Agregar Nuevo Usuario";
    document.getElementById("admin-id-usuario").value = "";
    document.getElementById("admin-nombre-usuario").value = "";
    document.getElementById("admin-correo-usuario").value = "";
    document.getElementById("admin-clave-usuario").value = "";
    document.getElementById("admin-rol-usuario").value = "";
}

function guardarUsuario() {
    let nombre = document.getElementById("admin-nombre-usuario").value.trim();
    let correo = document.getElementById("admin-correo-usuario").value.trim();
    let rol = document.getElementById("admin-rol-usuario").value;

    if (nombre === "" || correo === "" || rol === "") {
        alert("Debe completar el nombre, el correo y seleccionar un rol.");
    } else {
        alert("¡Usuario guardado exitosamente!");
        limpiarFormularioUsuario();
    }
}