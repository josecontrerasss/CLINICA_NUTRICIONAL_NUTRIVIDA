import { useState } from "react";
import { Link } from "react-router-dom";

function Reserva() {
    const [listaReserva, setListaReserva] = useState(() => {
        const guardado = localStorage.getItem("miReserva");
        return guardado ? JSON.parse(guardado) : [];
    });

    const quitarElemento = (posicion: number) => {
        const nuevaLista = listaReserva.filter((item: any, index: number) => index !== posicion);
        setListaReserva(nuevaLista);
        localStorage.setItem("miReserva", JSON.stringify(nuevaLista));
    };

    let total = 0;
    for (let i = 0; i < listaReserva.length; i++) {
        total += listaReserva[i].precio;
    }

    return (
        <main className="container my-5 text-center flex-grow-1">
            <h1 className="mb-4">Mis Reservas</h1>
            
            <div className="d-flex flex-column align-items-center gap-3">
                {listaReserva.length === 0 ? (
                    <p className="text-muted">No has seleccionado nada aún.</p>
                ) : (
                    listaReserva.map((item: any, index: number) => (
                        <div key={index} className="card shadow-sm p-3 d-flex flex-row align-items-center" style={{ width: '100%', maxWidth: '600px', textAlign: 'left' }}>
                            
                            <img 
                                src={item.imagen} 
                                alt={item.titulo || item.nombre} 
                                style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '8px', marginRight: '20px' }} 
                            />
                            
                            <div className="flex-grow-1">
                                <h3 className="h4 mb-2">{item.titulo || item.nombre}</h3>
                                <p className="mb-3 text-primary fs-5 fw-bold">Valor: ${item.precio.toLocaleString('es-CL')}</p>
                                
                                <button 
                                    onClick={() => quitarElemento(index)} 
                                    className="btn btn-danger"
                                >
                                    Quitar de la lista
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            <h2 className="text-primary fw-bold mt-5 mb-4">
                Total: ${total.toLocaleString('es-CL')}
            </h2>

            <div>
                <Link to="/servicios" className="btn btn-outline-secondary me-2">
                    Seguir agregando servicios
                </Link>
                {listaReserva.length > 0 && (
                    <button onClick={() => alert("Simulación de pago")} className="btn btn-success">
                        Confirmar Reserva
                    </button>
                )}
            </div>
        </main>
    );
}

export default Reserva;