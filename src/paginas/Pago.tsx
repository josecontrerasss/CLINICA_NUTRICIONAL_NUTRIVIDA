import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { obtenerToken, obtenerUsuario, cerrarSesion } from "../utilidades/auth";
import { validarNombre, validarNumeroTarjeta, validarVencimiento, validarCvv } from "../utilidades/validaciones";

interface ItemCarritoPago {
    id: number;
    titulo: string;
    precio: number;
    medicoNombre?: string;
    horarioId?: number;
    fecha?: string;
    horaInicio?: string;
}

function Pago() {
    const [items, setItems] = useState<ItemCarritoPago[]>([]);
    const [total, setTotal] = useState(0);
    const [metodoPago, setMetodoPago] = useState("Tarjeta de Débito");
    const [nombreTarjeta, setNombreTarjeta] = useState("");
    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [vencimiento, setVencimiento] = useState("");
    const [cvv, setCvv] = useState("");

    const [errorNombre, setErrorNombre] = useState("");
    const [errorNumero, setErrorNumero] = useState("");
    const [errorVencimiento, setErrorVencimiento] = useState("");
    const [errorCvv, setErrorCvv] = useState("");

    const [procesando, setProcesando] = useState(false);
    const [errorPago, setErrorPago] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const guardado = localStorage.getItem("miReserva");
        if (guardado) {
            const lista: ItemCarritoPago[] = JSON.parse(guardado);
            setItems(lista);
            const sumaTotal = lista.reduce((acumulador, item) => acumulador + item.precio, 0);
            setTotal(sumaTotal);
        }

        const usuario = obtenerUsuario();
        if (usuario) {
            setNombreTarjeta(usuario.nombre);
        }
    }, []);

    const procesarPago = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorPago("");

        const errNom = validarNombre(nombreTarjeta);
        const errNum = validarNumeroTarjeta(numeroTarjeta);
        const errVen = validarVencimiento(vencimiento);
        const errCod = validarCvv(cvv);

        setErrorNombre(errNom);
        setErrorNumero(errNum);
        setErrorVencimiento(errVen);
        setErrorCvv(errCod);

        if (errNom !== "" || errNum !== "" || errVen !== "" || errCod !== "") {
            return;
        }

        const token = obtenerToken();
        const usuario = obtenerUsuario();

        if (!token || !usuario) {
            navigate("/login");
            return;
        }

        if (items.length === 0) {
            setErrorPago("No tienes reservas en el carrito.");
            return;
        }

        const itemsInvalidos = items.some(item => !item.horarioId);
        if (itemsInvalidos) {
            setErrorPago("Hay servicios sin especialista u horario asignado. Regresa a Mis Reservas y vuelve a seleccionarlos.");
            return;
        }

        setProcesando(true);

        try {
            const payload = {
                usuarioNombre: nombreTarjeta.trim() || usuario.nombre,
                metodoPago,
                items: items.map(item => ({
                    servicioId: item.id,
                    horarioId: item.horarioId
                }))
            };

            const respuesta = await fetch("http://localhost:8085/api/reservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (respuesta.status === 401 || respuesta.status === 403) {
                cerrarSesion();
                navigate("/login");
                return;
            }

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setErrorPago(datos.mensaje || "No se pudo procesar la reserva.");
                return;
            }

            localStorage.removeItem("miReserva");
            alert(`¡Pago procesado con éxito! Boleta N° ${datos.numeroBoleta} emitida.`);
            navigate("/reserva");
        } catch (error) {
            console.error("Error al procesar pago:", error);
            setErrorPago("Error de conexión con el servidor de reservas.");
        } finally {
            setProcesando(false);
        }
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
                                <p className="text-muted mb-1">Total a Pagar ({items.length} consulta{items.length === 1 ? "" : "s"})</p>
                                <h2 className="text-success fw-bold">
                                    ${total.toLocaleString('es-CL')}
                                </h2>
                            </div>

                            {errorPago && (
                                <div className="alert alert-danger" role="alert">
                                    {errorPago}
                                </div>
                            )}

                            <form onSubmit={procesarPago} noValidate>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Medio de pago</label>
                                    <select
                                        className="form-select form-select-lg bg-light"
                                        value={metodoPago}
                                        onChange={(e) => setMetodoPago(e.target.value)}
                                    >
                                        <option value="Tarjeta de Débito">Tarjeta de Débito (Redcompra)</option>
                                        <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nombre en la tarjeta</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg bg-light"
                                        placeholder="Ej: María López"
                                        value={nombreTarjeta}
                                        onChange={(e) => {
                                            setNombreTarjeta(e.target.value);
                                            if (errorNombre) setErrorNombre("");
                                        }}
                                    />
                                    {errorNombre && (
                                        <span className="text-danger d-block mt-1" style={{ fontSize: "12px" }}>
                                            {errorNombre}
                                        </span>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Número de tarjeta</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg bg-light"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        maxLength={16}
                                        value={numeroTarjeta}
                                        onChange={(e) => {
                                            setNumeroTarjeta(e.target.value.replace(/\D/g, ""));
                                            if (errorNumero) setErrorNumero("");
                                        }}
                                    />
                                    {errorNumero && (
                                        <span className="text-danger d-block mt-1" style={{ fontSize: "12px" }}>
                                            {errorNumero}
                                        </span>
                                    )}
                                </div>

                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label className="form-label fw-bold">Vencimiento</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg bg-light"
                                            placeholder="MM/AA"
                                            maxLength={5}
                                            value={vencimiento}
                                            onChange={(e) => {
                                                setVencimiento(e.target.value);
                                                if (errorVencimiento) setErrorVencimiento("");
                                            }}
                                        />
                                        {errorVencimiento && (
                                            <span className="text-danger d-block mt-1" style={{ fontSize: "12px" }}>
                                                {errorVencimiento}
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold">CVV</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg bg-light"
                                            placeholder="123"
                                            maxLength={3}
                                            value={cvv}
                                            onChange={(e) => {
                                                setCvv(e.target.value.replace(/\D/g, ""));
                                                if (errorCvv) setErrorCvv("");
                                            }}
                                        />
                                        {errorCvv && (
                                            <span className="text-danger d-block mt-1" style={{ fontSize: "12px" }}>
                                                {errorCvv}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="d-grid gap-3">
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg fw-bold shadow-sm"
                                        disabled={procesando || items.length === 0}
                                    >
                                        {procesando ? "Procesando pago..." : "Pagar Reserva"}
                                    </button>
                                    <Link to="/reserva" className="btn btn-outline-secondary btn-lg fw-bold">
                                        Volver al Carrito
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