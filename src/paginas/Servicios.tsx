import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export interface ServicioItem {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

function Servicios() {
    const [servicios, setServicios] = useState<ServicioItem[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarServicios = async () => {
            try {
                const respuesta = await fetch("http://localhost:8083/api/servicios");
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP ${respuesta.status}`);
                }
                const datos: ServicioItem[] = await respuesta.json();
                setServicios(datos);
            } catch (error) {
                console.error("Error al cargar servicios:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarServicios();
    }, []);

    const serviciosFiltrados = servicios.filter((servicio) =>
        servicio.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main className="container my-5 flex-grow-1">
            <h1 className="text-center mb-4">Nuestros Servicios</h1>

            <div className="row justify-content-center mb-5">
                <div className="col-12 col-md-8 col-lg-6">
                    <input
                        type="text"
                        className="form-control form-control-lg border-primary shadow-sm"
                        placeholder="Buscar servicio por nombre..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            {cargando ? (
                <div className="text-center mt-4">
                    <p className="text-muted fs-5">Cargando catálogo de servicios...</p>
                </div>
            ) : (
                <div className="row g-4">
                    {serviciosFiltrados.length === 0 ? (
                        <div className="col-12 text-center mt-4">
                            <p className="text-muted fs-5">No se encontraron servicios con ese nombre.</p>
                        </div>
                    ) : (
                        serviciosFiltrados.map((servicio) => (
                            <div className="col-12 col-md-6 col-lg-3" key={servicio.id}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={servicio.imagen}
                                        className="card-img-top"
                                        alt={servicio.titulo}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{servicio.titulo}</h5>
                                        <p className="card-text text-muted">{servicio.descripcion}</p>
                                        <p className="text-primary fw-bold fs-5 mb-4">
                                            ${servicio.precio.toLocaleString('es-CL')}
                                        </p>

                                        <div className="mt-auto d-flex flex-column gap-2">
                                            <Link to={`/servicio/${servicio.id}`} className="btn btn-outline-primary">
                                                Ver Detalle
                                            </Link>
                                            <Link to={`/servicio/${servicio.id}`} className="btn btn-success">
                                                Reservar Hora
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </main>
    );
}

export default Servicios;