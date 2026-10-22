export const validarNombre = (nombre: string): string => {
    if (nombre.trim() === "") return "El nombre es obligatorio.";
    if (nombre.length > 100) return "El nombre no puede superar los 100 caracteres.";
    return "";
};

export const validarCorreo = (correo: string): string => {
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo.trim() === "") return "El correo es obligatorio.";
    if (correo.length > 100) return "El correo no puede superar los 100 caracteres.";
    if (!formatoCorreo.test(correo)) return "Debe ingresar un formato de correo válido.";
    return "";
};

export const validarMensaje = (mensaje: string): string => {
    if (mensaje.trim() === "") return "El comentario es obligatorio.";
    if (mensaje.length > 500) return "El comentario no puede superar los 500 caracteres.";
    return "";
};