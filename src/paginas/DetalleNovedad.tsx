import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { NovedadItem } from "./Novedades";

function DetalleNovedad() {
    const { id } = useParams();
    const [novedad, setNovedad] = useState<NovedadItem | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDetalle = async () => {
            try {
                const respuesta = await fetch(`http://localhost:8086/api/novedades/${id}`);
                if (!respuesta.ok) {
                    setNovedad(null);
                    return;
                }
                const datos: NovedadItem = await respuesta.json();
                setNovedad(datos);
            } catch (error) {
                console.error("Error al cargar detalle de novedad:", error);
                setNovedad(null);
            } finally {
                setCargando(false);
            }
        };

        cargarDetalle();
    }, [id]);

    if (cargando) {
        return (
            <main className="container text-center my-5 flex-grow-1">
                <p className="text-muted fs-5">Cargando artículo...</p>
            </main>
        );
    }

    if (!novedad) {
        return (
            <main className="container text-center my-5 flex-grow-1">
                <h2>Novedad no encontrada</h2>
                <Link to="/novedades" className="btn btn-primary mt-3">Volver a Novedades</Link>
            </main>
        );
    }

    return (
        <main className="flex-grow-1">
            <nav aria-label="breadcrumb" className="container mt-3">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                    <li className="breadcrumb-item"><Link to="/novedades">Novedades</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{novedad.titulo}</li>
                </ol>
            </nav>

            <article className="container mx-auto my-5" style={{ maxWidth: '760px' }}>
                <img
                    src={novedad.imagen}
                    className="img-fluid mb-4 w-100 rounded"
                    alt={novedad.titulo}
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
                <h1 className="mb-3">{novedad.titulo}</h1>
                <p className="text-secondary fw-bold mb-4">
                    Publicado por el equipo de la Clínica NutriVida
                    {novedad.fechaPublicacion ? ` — ${new Date(novedad.fechaPublicacion).toLocaleDateString('es-CL')}` : "."}
                </p>
                <p className="fs-5">{novedad.parrafo1}</p>
                <p className="fs-5">{novedad.parrafo2}</p>
                <p className="fs-5">{novedad.parrafo3}</p>

                <div className="mt-5">
                    <Link to="/novedades" className="btn btn-outline-primary">Volver a Novedades</Link>
                </div>
            </article>
        </main>
    );
}

export default DetalleNovedad;