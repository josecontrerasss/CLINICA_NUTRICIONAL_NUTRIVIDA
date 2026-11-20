import { Navigate } from "react-router-dom";
import { obtenerToken, obtenerUsuario } from "../utilidades/auth";

type Props = {
    children: React.ReactNode;
    rolRequerido?: string;
};

function RutaProtegida({ children, rolRequerido }: Props) {
    const token = obtenerToken();
    const usuario = obtenerUsuario();

    if (!token || !usuario) {
        return <Navigate to="/login" replace />;
    }

    if (rolRequerido && usuario.rol !== rolRequerido) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

export default RutaProtegida;