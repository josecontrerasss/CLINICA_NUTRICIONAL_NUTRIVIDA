import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerToken, cerrarSesion } from "../utilidades/auth";

interface DetalleReservaAdmin {
    id: number;
    servicioTitulo: string;
    precioUnitario: number;
    medicoNombre: string;
    especialidad: string;
    fechaCita: string;
    horaCita: string;
}

interface ReservaAdminItem {
    id: number;
    numeroBoleta: string;
    usuarioId: number;
    usuarioCorreo: string;
    usuarioNombre: string;
    metodoPago: string;
    total: number;
    estado: string;
    fechaReserva: string;
    detalles: DetalleReservaAdmin[];
}

function AdminReservas() {
    const [reservas, setReservas] = useState<ReservaAdminItem[]>([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate("/login");
    };

    useEffect(() => {
        const cargarReservas = async () => {
            try {
                const respuesta = await fetch("http://localhost:8085/api/reservas", {
                    headers: {
                        "Authorization": `Bearer ${obtenerToken()}`
                    }
                });

                if (respuesta.status === 401 || respuesta.status === 403) {
                    manejarCerrarSesion();
                    return;
                }

                if (!respuesta.ok) {
                    throw new Error(`Error HTTP ${respuesta.status}`);
                }

                const datos: ReservaAdminItem[] = await respuesta.json();
                setReservas(datos);
            } catch (error) {
                console.error("Error al cargar reservas:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarReservas();
    }, []);

    return (
        <div className="d-flex min-vh-100">
            <nav className="bg-dark text-white p-4" style={{ width: '250px' }}>
                <h4 className="mb-4">NutriVida Admin</h4>
                <ul className="nav flex-column gap-2">
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-white px-0">Inicio Website</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link text-white px-0">Mantenedor Servicios</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-usuarios" className="nav-link text-white px-0">Mantenedor Usuarios</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-contactos" className="nav-link text-white px-0">Bandeja de Mensajes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-medicos" className="nav-link text-white px-0">Mantenedor Médicos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-reservas" className="nav-link text-info px-0 fw-bold">Reservas y Boletas</Link>
                    </li>
                    <li className="nav-item mt-4">
                        <button
                            onClick={manejarCerrarSesion}
                            className="btn btn-link nav-link text-danger px-0 text-start"
                        >
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </nav>

            <main className="flex-grow-1 p-5 bg-light">
                <h1 className="mb-2">Reservas y Boletas Emitidas</h1>
                <p className="text-muted mb-4">Listado general de atenciones pagadas y agendadas en la clínica.</p>

                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        {cargando ? (
                            <p className="p-4 mb-0 text-muted">Cargando reservas...</p>
                        ) : reservas.length === 0 ? (
                            <p className="p-4 mb-0 text-muted">No hay reservas registradas todavía.</p>
                        ) : (
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>N° Boleta</th>
                                        <th>Paciente</th>
                                        <th>Detalle de Citas</th>
                                        <th>Pago</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservas.map((reserva) => (
                                        <tr key={reserva.id}>
                                            <td className="fw-bold text-primary">{reserva.numeroBoleta}</td>
                                            <td>
                                                <div>{reserva.usuarioNombre}</div>
                                                <small className="text-muted">{reserva.usuarioCorreo}</small>
                                            </td>
                                            <td>
                                                {reserva.detalles.map((det) => (
                                                    <div key={det.id} className="small mb-1">
                                                        <strong>{det.servicioTitulo}</strong> — {det.medicoNombre} ({det.fechaCita} {det.horaCita.slice(0, 5)})
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                <div>{reserva.metodoPago}</div>
                                                <small className="text-muted">
                                                    {new Date(reserva.fechaReserva).toLocaleDateString('es-CL')}
                                                </small>
                                            </td>
                                            <td className="fw-bold text-success">
                                                ${reserva.total.toLocaleString('es-CL')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminReservas;