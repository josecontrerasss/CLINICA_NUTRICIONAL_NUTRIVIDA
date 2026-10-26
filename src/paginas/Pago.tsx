import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Pago() {
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const guardado = localStorage.getItem("miReserva");
        if (guardado) {
            const lista = JSON.parse(guardado);
            const sumaTotal = lista.reduce((acumulador: number, item: any) => acumulador + item.precio, 0);
            setTotal(sumaTotal);
        }
    }, []);

    const procesarPago = (e: React.FormEvent) => {
        e.preventDefault();
        alert("¡Pago procesado con éxito! Tu reserva está confirmada.");
        localStorage.removeItem("miReserva"); 
        navigate("/"); 
    };

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
                                    <input type="text" className="form-control form-control-lg bg-light" required placeholder="XXXX XXXX XXXX XXXX" />
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label className="form-label fw-bold">Vencimiento</label>
                                        <input type="text" className="form-control form-control-lg bg-light" required placeholder="MM/YY"  />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold">CVV</label>
                                        <input type="password" className="form-control form-control-lg bg-light" required placeholder="123" />
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