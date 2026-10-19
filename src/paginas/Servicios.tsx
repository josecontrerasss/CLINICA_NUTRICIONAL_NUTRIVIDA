import CardServicio from "../componentes/moleculas/CardServicio";

export const servicios = [
    {
        id: 1,
        titulo: "Nutrición Deportiva",
        precio: 25000,
        descripcion: "Plan a tu medida para mejorar tu rendimiento físico.",
        imagen: "/Imagenes/Servicios/deporte.jpg"
    },
    {
        id: 2,
        titulo: "Control de Peso",
        precio: 20000,
        descripcion: "Logra tu peso ideal de forma saludable y sostenible.",
        imagen: "/Imagenes/Servicios/peso.jpg"
    },
    {
        id: 3,
        titulo: "Dieta Vegana",
        precio: 22000,
        descripcion: "Transición segura con todos los nutrientes necesarios.",
        imagen: "/Imagenes/Servicios/vegana.jpg"
    }
];

function Servicios() {
    return (
        <main className="container my-5 text-center flex-grow-1">
            <h1 className="mb-4">Catálogo de Servicios</h1>
            <p className="text-muted mb-5">Revisa en detalle todos nuestros planes nutricionales.</p>

            <div className="d-flex flex-wrap justify-content-center gap-4">
                {servicios.map((servicio) => (
                    <CardServicio
                        key={servicio.id}
                        id={servicio.id}
                        titulo={servicio.titulo}
                        descripcion={servicio.descripcion}
                        precio={servicio.precio}
                        imagen={servicio.imagen}
                    />
                ))}
            </div>
        </main>
    );
}

export default Servicios;