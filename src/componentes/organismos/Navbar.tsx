import { Link } from "react-router-dom";

function Navbar() {
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

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link className="btn btn-outline-primary me-md-2" to="/login">Login</Link>
                        <Link className="btn btn-primary" to="/reserva">Reservar Hora</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;