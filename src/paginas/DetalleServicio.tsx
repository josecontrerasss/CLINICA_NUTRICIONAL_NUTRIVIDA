import { useParams, Link } from "react-router-dom";
import { servicios } from "./Servicios";

function DetalleServicio() {
    const { id } = useParams();

    const servicio = servicios.find(
        item => item.id === Number(id)
    );

    const agregarAlCarrito = () => {
        if (servicio) {
            const guardado = localStorage.getItem("miReserva");
            let listaActual = guardado ? JSON.parse(guardado) : [];
            listaActual.push(servicio);
            localStorage.setItem("miReserva", JSON.stringify(listaActual));
            alert("Servicio agregado a tus reservas");
        }
    };

    if (!servicio) {
        return (
            <main className="container text-center my-5 flex-grow-1">
                <h2>Servicio no encontrado</h2>
                <Link to="/servicios" className="btn btn-primary mt-3">Volver al catálogo</Link>
            </main>
        );
    }

    return (
        <main className="container my-5 flex-grow-1">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                    <li className="breadcrumb-item"><Link to="/servicios">Servicios</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{servicio.titulo}</li>
                </ol>
            </nav>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <img 
                        src={servicio.imagen} 
                        className="img-fluid rounded shadow-sm w-100" 
                        alt={servicio.titulo} 
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{servicio.titulo}</h1>
                    <p className="fs-5 text-muted mb-4">{servicio.descripcion}</p>
                    <h2 className="text-primary fw-bold mb-4">
                        Valor: ${servicio.precio.toLocaleString('es-CL')}
                    </h2>
                    
                    <div className="d-flex gap-3">
                        <button onClick={agregarAlCarrito} className="btn btn-success btn-lg">
                            Reservar Hora
                        </button>
                        <Link to="/servicios" className="btn btn-outline-secondary btn-lg">
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DetalleServicio;