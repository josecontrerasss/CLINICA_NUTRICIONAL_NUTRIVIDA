import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export interface NovedadItem {
    id: number;
    titulo: string;
    resumen: string;
    imagen: string;
    parrafo1: string;
    parrafo2: string;
    parrafo3: string;
    fechaPublicacion?: string;
}

function Novedades() {
    const [novedades, setNovedades] = useState<NovedadItem[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarNovedades = async () => {
            try {
                const respuesta = await fetch("http://localhost:8086/api/novedades");
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP ${respuesta.status}`);
                }
                const datos: NovedadItem[] = await respuesta.json();
                setNovedades(datos);
            } catch (error) {
                console.error("Error al cargar novedades:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarNovedades();
    }, []);

    const novedadesFiltradas = novedades.filter((novedad) =>
        novedad.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main className="flex-grow-1">
            <section className="container text-center my-5">
                <div className="bg-primary text-white p-4 rounded-3 mb-4">
                    <h2>Novedades</h2>
                    <p>Consejos y noticias escritos por el equipo de la clínica.</p>
                </div>

                <div className="row justify-content-center mb-4">
                    <div className="col-12 col-md-8 col-lg-6">
                        <input
                            type="text"
                            className="form-control form-control-lg border-primary shadow-sm"
                            placeholder="Buscar artículo por título..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                {cargando ? (
                    <p className="text-muted fs-5 mt-4">Cargando novedades...</p>
                ) : novedadesFiltradas.length === 0 ? (
                    <p className="text-muted fs-5 mt-4">No se encontraron artículos con ese título.</p>
                ) : (
                    <div className="row g-4">
                        {novedadesFiltradas.map((novedad) => (
                            <div className="col-md-6 col-lg-3" key={novedad.id}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={novedad.imagen}
                                        className="card-img-top"
                                        alt={novedad.titulo}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{novedad.titulo}</h5>
                                        <p className="card-text flex-grow-1">{novedad.resumen}</p>
                                        <Link to={`/novedad/${novedad.id}`} className="btn btn-primary mt-auto">
                                            Leer Más
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Novedades;