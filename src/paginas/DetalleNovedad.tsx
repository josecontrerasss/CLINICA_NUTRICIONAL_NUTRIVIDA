import { useParams, Link } from "react-router-dom";

const datosNovedades = [
    {
        id: 1,
        titulo: "Cuánta agua necesitas al día",
        imagen: "/Imagenes/Novedades/Agua.jpg",
        parrafo1: "La famosa regla de los dos litros diarios es solo un promedio. Tu necesidad real cambia según tu peso, cuánto te mueves, el clima y hasta lo que comes durante el día.",
        parrafo2: "Una señal simple y confiable es el color de la orina: mientras más clara, mejor hidratado estás. Si es oscura y con olor fuerte, necesitas tomar más agua.",
        parrafo3: "Las frutas y verduras también aportan líquido, así que no todo tiene que venir del vaso. Lo importante es repartir el consumo durante el día y no dejarlo todo para la noche."
    },
    {
        id: 2,
        titulo: "Colaciones entre comidas",
        imagen: "/Imagenes/Novedades/colaciones-entre-comidas.jpg",
        parrafo1: "Muchas personas llegan al almuerzo o a la cena con tanta hambre que terminan comiendo el doble de lo que necesitaban. Ahí es donde se descontrola el día.",
        parrafo2: "Una buena colación combina algo que aporte energía con algo que aporte proteína. Una fruta con un puñado de frutos secos, un yogur natural o un huevo duro cumplen bien esa función.",
        parrafo3: "Lo importante es que sea una porción pequeña y a una hora fija, no algo que se pique durante toda la tarde."
    },
    {
        id: 3,
        titulo: "Un desayuno que rinde",
        imagen: "/Imagenes/Novedades/un-desayuno-que-rinde.jpg",
        parrafo1: "El desayuno marca cómo te sientes las primeras horas del día. Si solo tomas café o comes algo muy dulce, es probable que a media mañana ya tengas hambre y te cueste concentrarte.",
        parrafo2: "Un desayuno completo incluye tres cosas: una fuente de proteína como huevo, queso fresco o yogur, un carbohidrato integral como pan o avena, y algo de fruta.",
        parrafo3: "No tiene que ser elaborado ni caro. Avena con fruta o pan integral con huevo funcionan perfecto y se preparan en cinco minutos."
    },
    {
        id: 4,
        titulo: "Cómo leer las etiquetas",
        imagen: "/Imagenes/Novedades/como-leer-etiquetas.jpg",
        parrafo1: "Los sellos negros indican que un producto es alto en azúcares, grasas saturadas, sodio o calorías. Sirven como primera señal, pero no reemplazan mirar la tabla nutricional.",
        parrafo2: "En la tabla, revisa siempre a cuántos gramos corresponde la porción. Muchos envases muestran los valores de una porción mucho más chica de la que uno realmente come.",
        parrafo3: "La lista de ingredientes va ordenada de mayor a menor cantidad. Si el azúcar aparece dentro de los tres primeros, el producto tiene bastante más de lo que parece."
    }
];

function DetalleNovedad() {
    const { id } = useParams();
    
    const novedad = datosNovedades.find(
        item => item.id === Number(id)
    );

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
                <img src={novedad.imagen} className="img-fluid mb-4 w-100 rounded" alt={novedad.titulo} style={{ maxHeight: '400px', objectFit: 'cover' }} />
                <h1 className="mb-3">{novedad.titulo}</h1>
                <p className="text-secondary fw-bold mb-4">Publicado por el equipo de la Clínica NutriVida.</p>
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