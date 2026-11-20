export interface SesionUsuario {
    token: string;
    id: number;
    nombre: string;
    correo: string;
    rol: string;
}

export const guardarSesion = (sesion: SesionUsuario): void => {
    localStorage.setItem("token", sesion.token);
    localStorage.setItem("usuario", JSON.stringify(sesion));
};

export const obtenerToken = (): string | null => {
    return localStorage.getItem("token");
};

export const obtenerUsuario = (): SesionUsuario | null => {
    const guardado = localStorage.getItem("usuario");
    if (!guardado) return null;
    try {
        return JSON.parse(guardado);
    } catch {
        return null;
    }
};

export const cerrarSesion = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
};