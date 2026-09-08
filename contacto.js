function enviarMensaje() {
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let comentario = document.getElementById("comentario").value.trim();

    document.getElementById("error-nombre").innerText = "";
    document.getElementById("error-correo").innerText = "";
    document.getElementById("error-comentario").innerText = "";

    let hayError = false;

    if (nombre === "") {
        document.getElementById("error-nombre").innerText = "El nombre es obligatorio.";
        hayError = true;
    } else if (nombre.length > 100) {
        document.getElementById("error-nombre").innerText = "El nombre no puede superar los 100 caracteres.";
        hayError = true;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo === "") {
        document.getElementById("error-correo").innerText = "El correo es obligatorio.";
        hayError = true;
    } else if (correo.length > 100) {
        document.getElementById("error-correo").innerText = "El correo no puede superar los 100 caracteres.";
        hayError = true;
    } else if (formatoCorreo.test(correo) === false) {
        document.getElementById("error-correo").innerText = "Debe ingresar un formato de correo válido.";
        hayError = true;
    }

    if (comentario === "") {
        document.getElementById("error-comentario").innerText = "El comentario es obligatorio.";
        hayError = true;
    } else if (comentario.length > 500) {
        document.getElementById("error-comentario").innerText = "El comentario no puede superar los 500 caracteres.";
        hayError = true;
    }

    if (hayError === false) {
        alert("¡Tu mensaje ha sido enviado con éxito! Nos contactaremos contigo pronto.");
    
        document.getElementById("nombre").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("comentario").value = "";
    }
}