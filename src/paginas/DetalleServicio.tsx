import { useParams, useNavigate } from "react-router-dom";
import { servicios } from "./Servicios";
import BotonVolver from "../componentes/atomos/BotonVolver";

function DetalleServicio() {
    const { id } = useParams();
    const navigate = useNavigate();

    const producto = servicios.find(
        (item) => item.id === Number(id)
    );

    const agregarAReserva = () => {
        if (!producto) return;

        let carritoGuardado = localStorage.getItem("miReserva");
        let listaReserva = [];

        if (carritoGuardado !== null) {
            listaReserva = JSON.parse(carritoGuardado);
        }

        listaReserva.push(producto);

        localStorage.setItem("miReserva", JSON.stringify(listaReserva));

        alert("¡Servicio agregado a tu reserva!");
        
        navigate("/servicios");
    };

    return (
        <main className="container my-5 text-center flex-grow-1">
            <h1 className="mb-4">Detalle del Servicio</h1>
            
            <div className="card mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
                <img 
                    src={producto?.imagen} 
                    className="card-img-top" 
                    alt={producto?.titulo} 
                    style={{ height: '300px', objectFit: 'contain', backgroundColor: '#f8f9fa', padding: '15px' }} 
                />
                <div className="card-body p-4">
                    <h2 className="card-title mb-3">{producto?.titulo}</h2>
                    <p className="fw-bold text-primary fs-4 mb-3">${producto?.precio?.toLocaleString('es-CL')}</p>
                    <p className="card-text text-muted mb-4">{producto?.descripcion}</p>
                    
                    <button onClick={agregarAReserva} className="btn btn-success w-100 mb-2">
                        Agregar a mi Reserva
                    </button>
                    
                    <BotonVolver/>
                </div>
            </div>
        </main>
    );
}

export default DetalleServicio;