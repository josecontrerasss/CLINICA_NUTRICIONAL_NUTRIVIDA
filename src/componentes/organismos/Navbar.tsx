import { Link, useNavigate, useLocation } from "react-router-dom";
import { obtenerUsuario, cerrarSesion } from "../../utilidades/auth";

function Navbar() {
    const navigate = useNavigate();
    useLocation();
    const usuario = obtenerUsuario();

    const manejarLogout = () => {
        cerrarSesion();
        navigate("/login");
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-custom">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">NutriVida</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mx-auto">
                            <Link className="nav-link active" to="/">Inicio</Link>
                            <Link className="nav-link" to="/nosotros">Nosotros</Link>
                            <Link className="nav-link" to="/servicios">Servicios</Link>
                            <Link className="nav-link" to="/novedades">Novedades</Link>
                            <Link className="nav-link" to="/contacto">Contacto</Link>
                        </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end align-items-center">
                        {usuario ? (
                            <>
                                <span className="me-2 fw-semibold text-secondary">
                                    Hola, {usuario.nombre}
                                </span>
                                {usuario.rol === "ADMINISTRADOR" && (
                                    <Link className="btn btn-warning btn-sm me-2" to="/admin">
                                        Panel Admin
                                    </Link>
                                )}
                                <Link className="btn btn-primary me-2" to="/reserva">Reservar Hora</Link>
                                <button onClick={manejarLogout} className="btn btn-outline-danger">
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-primary me-md-2" to="/login">Login</Link>
                                <Link className="btn btn-primary" to="/reserva">Reservar Hora</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;