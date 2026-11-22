import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface MensajeContacto {
    id: number;
    nombreCompleto: string;
    correo: string;
    mensaje: string;
    estado: string;
    respuestaAdmin: string | null;
    fechaCreacion: string;
    fechaRespuesta: string | null;
}

function AdminContactos() {
    const [mensajes, setMensajes] = useState<MensajeContacto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [mensajeSeleccionado, setMensajeSeleccionado] = useState<MensajeContacto | null>(null);
    const [respuesta, setRespuesta] = useState("");
    const [enviando, setEnviando] = useState(false);

    const cargarMensajes = async () => {
        try {
            const res = await fetch("http://localhost:8082/api/contactos");
            if (!res.ok) {
                throw new Error(`Error HTTP ${res.status}`);
            }
            const data = await res.json();
            setMensajes(data);
        } catch (error) {
            console.error("Error al cargar mensajes:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarMensajes();
    }, []);

    const seleccionarMensaje = (item: MensajeContacto) => {
        setMensajeSeleccionado(item);
        setRespuesta(item.respuestaAdmin || "");
    };

    const limpiarSeleccion = () => {
        setMensajeSeleccionado(null);
        setRespuesta("");
    };

    const enviarRespuesta = async () => {
        if (!mensajeSeleccionado || enviando) return;

        if (respuesta.trim() === "") {
            alert("Debe escribir una respuesta antes de enviar.");
            return;
        }

        setEnviando(true);

        try {
            const res = await fetch(`http://localhost:8082/api/contactos/${mensajeSeleccionado.id}/responder`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    respuestaAdmin: respuesta.trim(),
                }),
            });

            if (!res.ok) {
                throw new Error(`Error HTTP ${res.status}`);
            }

            const actualizado: MensajeContacto = await res.json();

            setMensajes(mensajes.map((m) => (m.id === actualizado.id ? actualizado : m)));
            alert("Respuesta guardada correctamente.");
            limpiarSeleccion();
        } catch (error) {
            console.error("Error al responder mensaje:", error);
            alert("No se pudo guardar la respuesta. Verifique que el microservicio esté activo.");
        } finally {
            setEnviando(false);
        }
    };

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
                        <Link to="/admin-contactos" className="nav-link text-info px-0 fw-bold">Bandeja de Mensajes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-reservas" className="nav-link text-white px-0">Reservas y Boletas</Link>
                    </li>
                    <li className="nav-item mt-4">
                        <Link to="/login" className="nav-link text-danger px-0">Cerrar Sesión</Link>
                    </li>
                </ul>
            </nav>

            <main className="flex-grow-1 p-5 bg-light">
                <h1 className="mb-2">Bandeja de Mensajes</h1>
                <p className="text-muted mb-4">Consulta las dudas enviadas por los pacientes y registra una respuesta oficial.</p>

                <div className="card shadow-sm mb-5">
                    <div className="card-body p-0">
                        {cargando ? (
                            <p className="p-4 mb-0 text-muted">Cargando mensajes...</p>
                        ) : mensajes.length === 0 ? (
                            <p className="p-4 mb-0 text-muted">No hay mensajes de contacto registrados aún.</p>
                        ) : (
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Remitente</th>
                                        <th>Consulta</th>
                                        <th>Fecha</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mensajes.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>
                                                <div className="fw-bold">{item.nombreCompleto}</div>
                                                <small className="text-muted">{item.correo}</small>
                                            </td>
                                            <td style={{ maxWidth: '300px' }}>{item.mensaje}</td>
                                            <td>
                                                <small>{new Date(item.fechaCreacion).toLocaleDateString('es-CL')}</small>
                                            </td>
                                            <td>
                                                <span className={`badge ${item.estado === 'RESPONDIDO' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                    {item.estado}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => seleccionarMensaje(item)}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    {item.estado === 'RESPONDIDO' ? 'Ver / Editar' : 'Responder'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {mensajeSeleccionado && (
                    <div className="card shadow-sm" style={{ maxWidth: '650px' }}>
                        <div className="card-body">
                            <h3 className="h5 mb-3">
                                Responder Consulta (ID: {mensajeSeleccionado.id})
                            </h3>

                            <div className="bg-light p-3 rounded border mb-3">
                                <p className="mb-1"><strong>De:</strong> {mensajeSeleccionado.nombreCompleto} ({mensajeSeleccionado.correo})</p>
                                <p className="mb-0 text-secondary"><strong>Mensaje:</strong> {mensajeSeleccionado.mensaje}</p>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="respuestaAdmin" className="form-label fw-bold">Respuesta del Administrador:</label>
                                <textarea
                                    id="respuestaAdmin"
                                    className="form-control"
                                    rows={4}
                                    placeholder="Escribe la respuesta para el paciente..."
                                    value={respuesta}
                                    onChange={(e) => setRespuesta(e.target.value)}
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    onClick={enviarRespuesta}
                                    className="btn btn-success"
                                    disabled={enviando}
                                >
                                    {enviando ? "Guardando..." : "Enviar Respuesta"}
                                </button>
                                <button
                                    onClick={limpiarSeleccion}
                                    className="btn btn-secondary"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminContactos;