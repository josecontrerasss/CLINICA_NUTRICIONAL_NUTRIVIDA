import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerToken, obtenerUsuario, cerrarSesion } from "../utilidades/auth";

interface ItemCarrito {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
    medicoId?: number;
    medicoNombre?: string;
    especialidad?: string;
    horarioId?: number;
    fecha?: string;
    horaInicio?: string;
}

interface DetalleBoleta {
    id: number;
    servicioId: number;
    servicioTitulo: string;
    precioUnitario: number;
    medicoNombre: string;
    especialidad: string;
    fechaCita: string;
    horaCita: string;
}

interface ReservaHistorial {
    id: number;
    numeroBoleta: string;
    metodoPago: string;
    total: number;
    estado: string;
    fechaReserva: string;
    detalles: DetalleBoleta[];
}

interface ConteoReservas {
    totalReservas: number;
    totalCitasAgendadas: number;
}

function Reserva() {
    const [listaReserva, setListaReserva] = useState<ItemCarrito[]>(() => {
        const guardado = localStorage.getItem("miReserva");
        return guardado ? JSON.parse(guardado) : [];
    });

    const [historial, setHistorial] = useState<ReservaHistorial[]>([]);
    const [conteo, setConteo] = useState<ConteoReservas | null>(null);
    const [cargandoHistorial, setCargandoHistorial] = useState(false);

    const navigate = useNavigate();
    const token = obtenerToken();
    const usuario = obtenerUsuario();

    useEffect(() => {
        if (!token || !usuario) return;

        const cargarHistorialYConteo = async () => {
            setCargandoHistorial(true);
            try {
                const cabeceras = {
                    "Authorization": `Bearer ${token}`
                };

                const [respHistorial, respConteo] = await Promise.all([
                    fetch("http://localhost:8085/api/reservas/mis-reservas", { headers: cabeceras }),
                    fetch("http://localhost:8085/api/reservas/mis-reservas/conteo", { headers: cabeceras })
                ]);

                if (respHistorial.status === 401 || respHistorial.status === 403) {
                    cerrarSesion();
                    navigate("/login");
                    return;
                }

                if (respHistorial.ok) {
                    const datosHistorial: ReservaHistorial[] = await respHistorial.json();
                    setHistorial(datosHistorial);
                }

                if (respConteo.ok) {
                    const datosConteo: ConteoReservas = await respConteo.json();
                    setConteo(datosConteo);
                }
            } catch (error) {
                console.error("Error al cargar historial de reservas:", error);
            } finally {
                setCargandoHistorial(false);
            }
        };

        cargarHistorialYConteo();
    }, []);

    const quitarElemento = (posicion: number) => {
        const nuevaLista = listaReserva.filter((_, index) => index !== posicion);
        setListaReserva(nuevaLista);
        localStorage.setItem("miReserva", JSON.stringify(nuevaLista));
    };

    const total = listaReserva.reduce((acumulador, item) => acumulador + item.precio, 0);

    return (
        <main className="container my-5 flex-grow-1">
            <section className="text-center mb-5">
                <h1 className="mb-4">Mis Reservas Pendientes</h1>

                <div className="d-flex flex-column align-items-center gap-3">
                    {listaReserva.length === 0 ? (
                        <p className="text-muted">No tienes servicios pendientes en tu carrito.</p>
                    ) : (
                        listaReserva.map((item, index) => (
                            <div
                                key={index}
                                className="card shadow-sm p-3 d-flex flex-column flex-sm-row align-items-center"
                                style={{ width: '100%', maxWidth: '640px', textAlign: 'left' }}
                            >
                                <img
                                    src={item.imagen}
                                    alt={item.titulo}
                                    style={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: '8px', marginRight: '20px' }}
                                />

                                <div className="flex-grow-1 mt-3 mt-sm-0">
                                    <h3 className="h4 mb-1">{item.titulo}</h3>
                                    {item.medicoNombre ? (
                                        <p className="mb-1 text-secondary">
                                            <strong>Especialista:</strong> {item.medicoNombre} ({item.especialidad})
                                        </p>
                                    ) : (
                                        <p className="mb-1 text-danger small">
                                            Este ítem no tiene especialista asignado. Quítalo y selecciónalo desde el detalle del servicio.
                                        </p>
                                    )}
                                    {item.fecha && item.horaInicio && (
                                        <p className="mb-2 text-secondary">
                                            <strong>Fecha y hora:</strong> {item.fecha} a las {item.horaInicio.slice(0, 5)} hrs
                                        </p>
                                    )}
                                    <p className="mb-3 text-primary fs-5 fw-bold">
                                        Valor: ${item.precio.toLocaleString('es-CL')}
                                    </p>

                                    <button
                                        onClick={() => quitarElemento(index)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Quitar de la lista
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <h2 className="text-primary fw-bold mt-4 mb-4">
                    Total: ${total.toLocaleString('es-CL')}
                </h2>

                <div>
                    <Link to="/servicios" className="btn btn-outline-secondary me-2">
                        Seguir agregando servicios
                    </Link>

                    {listaReserva.length > 0 && (
                        token && usuario ? (
                            <Link to="/pago" className="btn btn-success px-4">
                                Pagar y Confirmar
                            </Link>
                        ) : (
                            <Link to="/login" className="btn btn-warning px-4 fw-bold">
                                Inicia sesión para pagar
                            </Link>
                        )
                    )}
                </div>
            </section>

            <hr className="my-5" />

            <section>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
                    <h2 className="h3 mb-0">Historial de Reservas Confirmadas</h2>
                    {token && usuario && conteo && (
                        <div className="d-flex gap-2">
                            <span className="badge bg-primary fs-6">
                                Boletas emitidas: {conteo.totalReservas}
                            </span>
                            <span className="badge bg-success fs-6">
                                Citas agendadas: {conteo.totalCitasAgendadas}
                            </span>
                        </div>
                    )}
                </div>

                {!token || !usuario ? (
                    <div className="alert alert-light border text-center">
                        <p className="mb-2 text-muted">
                            Inicia sesión con tu cuenta de paciente para ver tus boletas y horas agendadas.
                        </p>
                        <Link to="/login" className="btn btn-outline-primary btn-sm">
                            Ir a Iniciar Sesión
                        </Link>
                    </div>
                ) : cargandoHistorial ? (
                    <p className="text-muted">Cargando historial de reservas...</p>
                ) : historial.length === 0 ? (
                    <p className="text-muted">Aún no tienes reservas confirmadas en tu historial.</p>
                ) : (
                    <div className="row g-4">
                        {historial.map((reserva) => (
                            <div className="col-12 col-lg-6" key={reserva.id}>
                                <div className="card shadow-sm h-100">
                                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                        <span className="fw-bold text-primary">{reserva.numeroBoleta}</span>
                                        <span className="badge bg-success">{reserva.estado}</span>
                                    </div>
                                    <div className="card-body">
                                        <p className="text-muted small mb-2">
                                            Fecha de emisión: {new Date(reserva.fechaReserva).toLocaleString('es-CL')} | Pago: {reserva.metodoPago}
                                        </p>
                                        <ul className="list-group list-group-flush mb-3">
                                            {reserva.detalles.map((det) => (
                                                <li key={det.id} className="list-group-item px-0">
                                                    <div className="fw-bold">{det.servicioTitulo}</div>
                                                    <div className="small text-secondary">
                                                        Nutricionista: {det.medicoNombre} ({det.especialidad})
                                                    </div>
                                                    <div className="small text-secondary">
                                                        Cita: {det.fechaCita} a las {det.horaCita.slice(0, 5)} hrs — ${det.precioUnitario.toLocaleString('es-CL')}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="text-end fw-bold fs-5 text-dark">
                                            Total Pagado: ${reserva.total.toLocaleString('es-CL')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Reserva;