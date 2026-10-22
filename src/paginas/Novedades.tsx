import { Link } from "react-router-dom";

const datosNovedades = [
    {
        id: 1,
        titulo: "Cuánta agua necesitas al día",
        imagen: "/Imagenes/Novedades/Agua.jpg",
        resumen: "La regla de los dos litros no aplica igual para todos. Estas son las señales que sí sirven."
    },
    {
        id: 2,
        titulo: "Colaciones entre comidas",
        imagen: "/Imagenes/Novedades/colaciones-entre-comidas.jpg",
        resumen: "Comer entre comidas no es el problema. El asunto es qué eliges y a qué hora."
    },
    {
        id: 3,
        titulo: "Un desayuno que rinde",
        imagen: "/Imagenes/Novedades/un-desayuno-que-rinde.jpg",
        resumen: "Qué incluir en la mañana para llegar sin hambre al almuerzo."
    },
    {
        id: 4,
        titulo: "Cómo leer las etiquetas",
        imagen: "/Imagenes/Novedades/como-leer-etiquetas.jpg",
        resumen: "Los sellos y la tabla nutricional explicados en simple."
    }
];

function Novedades() {
    return (
        <main className="flex-grow-1">
            <section className="container text-center my-5">
                <div className="bg-primary text-white p-4 rounded-3 mb-4">
                    <h2>Novedades</h2>
                    <p>Consejos y noticias escritos por el equipo de la clínica.</p>
                </div>

                <div className="row g-4">
                    {datosNovedades.map((novedad) => (
                        <div className="col-md-6 col-lg-3" key={novedad.id}>
                            <div className="card h-100">
                                <img src={novedad.imagen} className="card-img-top" alt={novedad.titulo} />
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
            </section>
        </main>
    );
}

export default Novedades;