import { useState } from "react";
import { Link } from "react-router-dom";

export const servicios = [
    { 
        id: 1, 
        titulo: "Nutrición Deportiva", 
        precio: 25000, 
        imagen: "/Imagenes/Servicios/deporte.jpg", 
        descripcion: "Plan alimenticio enfocado en el rendimiento físico y recuperación." 
    },
    { 
        id: 2, 
        titulo: "Control de Peso", 
        precio: 20000, 
        imagen: "/Imagenes/Servicios/peso.jpg", 
        descripcion: "Evaluación y seguimiento para alcanzar tu peso ideal de forma sana." 
    },
    { 
        id: 3, 
        titulo: "Nutrición Infantil", 
        precio: 22000, 
        imagen: "/Imagenes/Servicios/infantil.jpg", 
        descripcion: "Asesoría nutricional para el desarrollo saludable de los niños." 
    },
    { 
        id: 4, 
        titulo: "Asesoría Vegana/Vegetariana", 
        precio: 23000, 
        imagen: "/Imagenes/Servicios/vegana.jpg", 
        descripcion: "Transición y mantenimiento seguro de dietas basadas en plantas." 
    }
];

function Servicios() {
    const [busqueda, setBusqueda] = useState("");

    const agregarAlCarrito = (servicio: any) => {
        const guardado = localStorage.getItem("miReserva");
        let listaActual = guardado ? JSON.parse(guardado) : [];
        listaActual.push(servicio);
        localStorage.setItem("miReserva", JSON.stringify(listaActual));
        alert("Servicio agregado a tus reservas");
    };

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
                                        <button 
                                            onClick={() => agregarAlCarrito(servicio)} 
                                            className="btn btn-success"
                                        >
                                            Reservar Hora
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}

export default Servicios;