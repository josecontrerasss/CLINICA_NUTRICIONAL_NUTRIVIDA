import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Pago() {
    const [total, setTotal] = useState(0);
    const [servicios, setServicios] = useState<any[]>([]);
    
    const [pagoExitoso, setPagoExitoso] = useState(false);
    const [datosBoleta, setDatosBoleta] = useState<any>(null);

    useEffect(() => {
        const guardado = localStorage.getItem("miReserva");
        if (guardado) {
            const lista = JSON.parse(guardado);
            setServicios(lista);
            const sumaTotal = lista.reduce((acumulador: number, item: any) => acumulador + item.precio, 0);
            setTotal(sumaTotal);
        }
    }, []);

    const procesarPago = (e: React.FormEvent) => {
        e.preventDefault();
        
        const numeroBoleta = Math.floor(Math.random() * 1000000) + 1000;
        const fecha = new Date().toLocaleDateString('es-CL', {
            year: 'numeric', month: 'long', day: 'numeric', 
            hour: '2-digit', minute: '2-digit'
        });

        setDatosBoleta({
            numero: numeroBoleta,
            fecha: fecha,
            items: servicios,
            total: total
        });

        localStorage.removeItem("miReserva");
        setPagoExitoso(true);
    };

    if (pagoExitoso && datosBoleta) {
        return (
            <main className="container my-5 flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: '550px', width: '100%' }}>
                    <div className="card-header bg-success text-white text-center py-4 rounded-top-4">
                        <h2 className="mb-0 fw-bold">¡Pago Exitoso!</h2>
                        <p className="mb-0 mt-1">Tu reserva ha sido confirmada</p>
                    </div>
                    
                    <div className="card-body p-4 p-md-5 bg-white">
                        <div className="text-center mb-4">
                            <h4 className="text-primary fw-bold text-uppercase border-bottom pb-3">Boleta Electrónica</h4>
                        </div>
                        
                        <div className="row mb-4 text-muted">
                            <div className="col-6">
                                <p className="mb-1"><strong>N° Boleta:</strong> {datosBoleta.numero}</p>
                                <p className="mb-1"><strong>Empresa:</strong> NutriVida SpA</p>
                            </div>
                            <div className="col-6 text-end">
                                <p className="mb-1"><strong>Fecha:</strong> {datosBoleta.fecha}</p>
                                <p className="mb-1"><strong>Ciudad:</strong> Temuco, CL</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h6 className="fw-bold mb-3 text-dark">Detalle de Servicios:</h6>
                            <ul className="list-group list-group-flush mb-3 border-top border-bottom">
                                {datosBoleta.items.map((item: any, index: number) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
                                        <span className="text-secondary">{item.titulo || item.nombre}</span>
                                        <span className="fw-bold text-dark">${item.precio.toLocaleString('es-CL')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-5 bg-light p-4 rounded-3 border">
                            <h5 className="mb-0 fw-bold text-dark">TOTAL PAGADO:</h5>
                            <h3 className="mb-0 text-success fw-bold">${datosBoleta.total.toLocaleString('es-CL')}</h3>
                        </div>

                        <div className="d-grid">
                            <Link to="/" className="btn btn-primary btn-lg fw-bold shadow-sm rounded-3">
                                Volver al Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="container my-5 flex-grow-1">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-primary text-white text-center py-4 rounded-top-4">
                            <h4 className="mb-0 fw-bold">Finalizar Pago</h4>
                        </div>
                        <div className="card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <p className="text-muted mb-1">Total a Pagar</p>
                                <h2 className="text-success fw-bold">
                                    ${total.toLocaleString('es-CL')}
                                </h2>
                            </div>
                            
                            <form onSubmit={procesarPago}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nombre en la tarjeta</label>
                                    <input type="text" className="form-control form-control-lg bg-light" required placeholder="Ej: Juan Pérez" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Número de tarjeta</label>
                                    <input type="text" className="form-control form-control-lg bg-light" required placeholder="XXXX XXXX XXXX XXXX" maxLength={16} minLength={16} />
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label className="form-label fw-bold">Vencimiento</label>
                                        <input type="text" className="form-control form-control-lg bg-light" required placeholder="MM/YY" maxLength={5} />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold">CVV</label>
                                        <input type="password" className="form-control form-control-lg bg-light" required placeholder="123" maxLength={3} minLength={3} />
                                    </div>
                                </div>
                                
                                <div className="d-grid gap-3">
                                    <button type="submit" className="btn btn-success btn-lg fw-bold shadow-sm">
                                        Pagar Reserva
                                    </button>
                                    <Link to="/servicios" className="btn btn-outline-secondary btn-lg fw-bold">
                                        Cancelar
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Pago;