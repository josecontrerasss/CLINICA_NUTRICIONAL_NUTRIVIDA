export const validarRUT = (rut: string): string => {
    if (rut.trim() === "") return "El RUN es obligatorio.";
    if (rut.length < 8 || rut.length > 9) return "El RUN ingresado no es válido (Recuerde: sin puntos ni guion).";
    
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma = suma + (parseInt(cuerpo[i]) * multiplo);
        multiplo = multiplo + 1;
        if (multiplo > 7) { 
            multiplo = 2; 
        }
    }
    
    const dvCalculado = 11 - (suma % 11);
    let dvEsperado = dvCalculado.toString();
    
    if (dvCalculado === 11) {
        dvEsperado = "0";
    } else if (dvCalculado === 10) {
        dvEsperado = "K";
    }
    
    if (dv !== dvEsperado) return "El RUN ingresado no es válido (Recuerde: sin puntos ni guion).";
    return "";
};

export const validarNombre = (nombre: string): string => {
    if (nombre.trim() === "") return "El nombre es obligatorio.";
    if (nombre.length > 50) return "Máximo 50 caracteres.";
    return "";
};

export const validarApellidos = (apellidos: string): string => {
    if (apellidos.trim() === "") return "Los apellidos son obligatorios.";
    if (apellidos.length > 100) return "Máximo 100 caracteres.";
    return "";
};

export const validarCorreo = (correo: string): string => {
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo.trim() === "") return "El correo es obligatorio.";
    if (correo.length > 100) return "Máximo 100 caracteres.";
    if (!formatoCorreo.test(correo)) return "Formato de correo inválido.";
    return "";
};

export const validarMensaje = (mensaje: string): string => {
    if (mensaje.trim() === "") return "El comentario es obligatorio.";
    if (mensaje.length > 500) return "El comentario no puede superar los 500 caracteres.";
    return "";
};

export const validarPassword = (password: string): string => {
    if (password.trim() === "") return "La contraseña es obligatoria.";
    if (password.length < 4 || password.length > 10) return "La contraseña debe tener entre 4 y 10 caracteres.";
    return "";
};

export const validarRepetirPassword = (password: string, repetirPassword: string): string => {
    if (repetirPassword.trim() === "") return "Debe confirmar su contraseña.";
    if (password !== repetirPassword) return "Las contraseñas no coinciden.";
    return "";
};

export const validarSeleccion = (valor: string, mensajeVacio: string): string => {
    if (valor.trim() === "") return mensajeVacio;
    return "";
};

export const validarDireccion = (direccion: string): string => {
    if (direccion.trim() === "") return "La dirección es obligatoria.";
    if (direccion.length > 300) return "Máximo 300 caracteres.";
    return "";
};