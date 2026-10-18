function ingresar() {

    let correo = document.getElementById("correo").value.trim();
    let clave = document.getElementById("clave").value.trim();
    
    let msjErrorCorreo = document.getElementById("error-correo");
    let msjErrorClave = document.getElementById("error-clave");

    msjErrorCorreo.innerText = "";
    msjErrorClave.innerText = "";

    let hayError = false;
    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo === "") {
        msjErrorCorreo.innerText = "El correo es obligatorio.";
        hayError = true;
    } else if (correo.length > 100) {
        msjErrorCorreo.innerText = "El correo no puede tener más de 100 caracteres.";
        hayError = true;
    } else if (!formatoCorreo.test(correo)) {
        msjErrorCorreo.innerText = "Ingrese un correo válido.";
        hayError = true;
    }

    if (clave === "") {
        msjErrorClave.innerText = "La contraseña es obligatoria.";
        hayError = true;
    } else if (clave.length < 4 || clave.length > 10) {
        msjErrorClave.innerText = "La contraseña debe tener entre 4 y 10 caracteres.";
        hayError = true;
    }

    if (hayError === false) {
        
        if (correo === "admin@demo.cl" && clave === "1234") {
            window.location.href = "admin.html"; 
        } else if(correo === "usuario@demo.cl" && clave === "5678") {
            window.location.href = "index.html"; 
        } else {
            msjErrorClave.innerText = "Usuario o clave incorrectos";
        }
    }
}