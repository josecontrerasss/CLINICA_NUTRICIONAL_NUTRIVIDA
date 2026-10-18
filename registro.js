let datosRegiones = [
    {
        nombre: "Región de La Araucanía",
        comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"]
    },
    {
        nombre: "Región Metropolitana",
        comunas: ["Santiago", "Providencia", "Maipú", "Puente Alto"]
    },
    {
        nombre: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"]
    }
];

let selectRegion = document.getElementById("region");

for (let i = 0; i < datosRegiones.length; i++) {
    selectRegion.innerHTML += `
        <option value="${datosRegiones[i].nombre}">${datosRegiones[i].nombre}</option>
    `;
}

function cargarComunas() {
    let regionSeleccionada = document.getElementById("region").value;
    let selectComuna = document.getElementById("comuna");

    selectComuna.innerHTML = '<option value="">Seleccione una comuna...</option>';

    for (let i = 0; i < datosRegiones.length; i++) {
        
        if (datosRegiones[i].nombre === regionSeleccionada) {
            
            let comunasDeEstaRegion = datosRegiones[i].comunas;
            
            for (let j = 0; j < comunasDeEstaRegion.length; j++) {
                selectComuna.innerHTML += `
                    <option value="${comunasDeEstaRegion[j]}">${comunasDeEstaRegion[j]}</option>
                `;
            }
        }
    }
}

function validarRUT(rut) {
    if (rut.length < 8 || rut.length > 9) {
        return false;
    }

    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma = suma + (cuerpo[i] * multiplo);
        multiplo = multiplo + 1;
        if (multiplo > 7) { 
            multiplo = 2; 
        }
    }
    
    let dvCalculado = 11 - (suma % 11);
    let dvEsperado = dvCalculado.toString();
    
    if (dvCalculado === 11) {
        dvEsperado = "0";
    } else if (dvCalculado === 10) {
        dvEsperado = "K";
    }
    
    return dv === dvEsperado;
}

function registrar() {
    let run = document.getElementById("run").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let clave = document.getElementById("clave").value.trim();
    let tipoUsuario = document.getElementById("tipoUsuario").value;
    let region = document.getElementById("region").value;
    let comuna = document.getElementById("comuna").value;
    let direccion = document.getElementById("direccion").value.trim();

    document.getElementById("error-run").innerText = "";
    document.getElementById("error-nombre").innerText = "";
    document.getElementById("error-apellidos").innerText = "";
    document.getElementById("error-correo").innerText = "";
    document.getElementById("error-clave").innerText = "";
    document.getElementById("error-tipo").innerText = "";
    document.getElementById("error-region").innerText = "";
    document.getElementById("error-comuna").innerText = "";
    document.getElementById("error-direccion").innerText = "";

    let hayError = false;

    if (run === "") {
        document.getElementById("error-run").innerText = "El RUN es obligatorio.";
        hayError = true;
    } else if (validarRUT(run) === false) {
        document.getElementById("error-run").innerText = "El RUN ingresado no es válido (Recuerde: sin puntos ni guion).";
        hayError = true;
    }

    if (nombre === "") {
        document.getElementById("error-nombre").innerText = "El nombre es obligatorio.";
        hayError = true;
    } else if (nombre.length > 50) {
        document.getElementById("error-nombre").innerText = "Máximo 50 caracteres.";
        hayError = true;
    }

    if (apellidos === "") {
        document.getElementById("error-apellidos").innerText = "Los apellidos son obligatorios.";
        hayError = true;
    } else if (apellidos.length > 100) {
        document.getElementById("error-apellidos").innerText = "Máximo 100 caracteres.";
        hayError = true;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo === "") {
        document.getElementById("error-correo").innerText = "El correo es obligatorio.";
        hayError = true;
    } else if (correo.length > 100) {
        document.getElementById("error-correo").innerText = "Máximo 100 caracteres.";
        hayError = true;
    } else if (formatoCorreo.test(correo) === false) {
        document.getElementById("error-correo").innerText = "Formato de correo inválido.";
        hayError = true;
    }

    if (clave === "") {
        document.getElementById("error-clave").innerText = "La contraseña es obligatoria.";
        hayError = true;
    } else if (clave.length < 4 || clave.length > 10) {
        document.getElementById("error-clave").innerText = "La contraseña debe tener entre 4 y 10 caracteres.";
        hayError = true;
    }

    if (tipoUsuario === "") {
        document.getElementById("error-tipo").innerText = "Seleccione el tipo de usuario.";
        hayError = true;
    }
    if (region === "") {
        document.getElementById("error-region").innerText = "Seleccione una región.";
        hayError = true;
    }
    if (comuna === "") {
        document.getElementById("error-comuna").innerText = "Seleccione una comuna.";
        hayError = true;
    }

    if (direccion === "") {
        document.getElementById("error-direccion").innerText = "La dirección es obligatoria.";
        hayError = true;
    } else if (direccion.length > 300) {
        document.getElementById("error-direccion").innerText = "Máximo 300 caracteres.";
        hayError = true;
    }

    if (hayError === false) {
        alert("¡Usuario registrado con éxito!"); 
        window.location.href = "login.html";
    }
}