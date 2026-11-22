import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { ServicioItem } from "./Servicios";
import type { MedicoItem } from "./Nosotros";

interface HorarioItem {
    id: number;
    medico: MedicoItem;
    fecha: string;
    horaInicio: string;
    disponible: boolean;
}

function DetalleServicio() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [servicio, setServicio] = useState<ServicioItem | null>(null);
    const [medicos, setMedicos] = useState<MedicoItem[]>([]);
    const [horarios, setHorarios] = useState<HorarioItem[]>([]);

    const [medicoId, setMedicoId] = useState<string>("");
    const [horarioId, setHorarioId] = useState<string>("");
    const [errorSeleccion, setErrorSeleccion] = useState<string>("");

    const [cargando, setCargando] = useState(true);
    const [cargandoHorarios, setCargandoHorarios] = useState(false);

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            try {
                const [respServicio, respMedicos] = await Promise.all([
                    fetch(`http://localhost:8083/api/servicios/${id}`),
                    fetch("http://localhost:8084/api/medicos")
                ]);

                if (respServicio.ok) {
                    const datosServicio: ServicioItem = await respServicio.json();
                    setServicio(datosServicio);
                } else {
                    setServicio(null);
                }

                if (respMedicos.ok) {
                    const datosMedicos: MedicoItem[] = await respMedicos.json();
                    setMedicos(datosMedicos);
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
                setServicio(null);
            } finally {
                setCargando(false);
            }
        };

        cargarDatosIniciales();
    }, [id]);

    useEffect(() => {
        if (!medicoId) {
            setHorarios([]);
            setHorarioId("");
            return;
        }

        const cargarHorarios = async () => {
            setCargandoHorarios(true);
            setHorarioId("");
            setErrorSeleccion("");

            try {
                const respuesta = await fetch(`http://localhost:8084/api/medicos/${medicoId}/horarios`);
                if (!respuesta.ok) {
                    setHorarios([]);
                    return;
                }
                const datos: HorarioItem[] = await respuesta.json();
                setHorarios(datos);
            } catch (error) {
                console.error("Error al cargar horarios:", error);
                setHorarios([]);
            } finally {
                setCargandoHorarios(false);
            }
        };

        cargarHorarios();
    }, [medicoId]);

    const agregarAlCarrito = () => {
        if (!servicio) return;

        if (!medicoId || !horarioId) {
            setErrorSeleccion("Debes seleccionar un nutricionista y un bloque horario disponible.");
            return;
        }

        const medicoElegido = medicos.find(m => m.id === Number(medicoId));
        const horarioElegido = horarios.find(h => h.id === Number(horarioId));

        if (!medicoElegido || !horarioElegido) {
            setErrorSeleccion("La selección de especialista u horario no es válida.");
            return;
        }

        const guardado = localStorage.getItem("miReserva");
        const listaActual = guardado ? JSON.parse(guardado) : [];

        const yaEnCarrito = listaActual.some((item: any) => item.horarioId === horarioElegido.id);
        if (yaEnCarrito) {
            setErrorSeleccion("Ese bloque horario ya se encuentra agregado en tu lista de reservas.");
            return;
        }

        listaActual.push({
            ...servicio,
            medicoId: medicoElegido.id,
            medicoNombre: medicoElegido.nombreCompleto,
            especialidad: medicoElegido.especialidad,
            horarioId: horarioElegido.id,
            fecha: horarioElegido.fecha,
            horaInicio: horarioElegido.horaInicio
        });

        localStorage.setItem("miReserva", JSON.stringify(listaActual));
        alert("Servicio y bloque horario agregados a tus reservas.");
        navigate("/reserva");
    };

    if (cargando) {
        return (
            <main className="container text-center my-5 flex-grow-1">
                <p className="text-muted fs-5">Cargando detalle del servicio...</p>
            </main>
        );
    }

    if (!servicio) {
        return (
            <main className="container text-center my-5 flex-grow-1">
                <h2>Servicio no encontrado</h2>
                <Link to="/servicios" className="btn btn-primary mt-3">Volver al catálogo</Link>
            </main>
        );
    }

    return (
        <main className="container my-5 flex-grow-1">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                    <li className="breadcrumb-item"><Link to="/servicios">Servicios</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{servicio.titulo}</li>
                </ol>
            </nav>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <img
                        src={servicio.imagen}
                        className="img-fluid rounded shadow-sm w-100"
                        alt={servicio.titulo}
                        style={{ maxHeight: '420px', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{servicio.titulo}</h1>
                    <p className="fs-5 text-muted mb-3">{servicio.descripcion}</p>
                    <h2 className="text-primary fw-bold mb-4">
                        Valor: ${servicio.precio.toLocaleString('es-CL')}
                    </h2>

                    <div className="card bg-light border-0 p-3 mb-4">
                        <h5 className="fw-bold mb-3">Agenda tu especialista</h5>

                        <div className="mb-3">
                            <label htmlFor="selectMedico" className="form-label fw-bold">
                                Nutricionista:
                            </label>
                            <select
                                id="selectMedico"
                                className="form-select"
                                value={medicoId}
                                onChange={(e) => {
                                    setMedicoId(e.target.value);
                                    setErrorSeleccion("");
                                }}
                            >
                                <option value="">-- Selecciona un profesional --</option>
                                {medicos.map((medico) => (
                                    <option key={medico.id} value={medico.id}>
                                        {medico.nombreCompleto} ({medico.especialidad})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="selectHorario" className="form-label fw-bold">
                                Fecha y hora disponible:
                            </label>
                            <select
                                id="selectHorario"
                                className="form-select"
                                value={horarioId}
                                disabled={!medicoId || cargandoHorarios}
                                onChange={(e) => {
                                    setHorarioId(e.target.value);
                                    setErrorSeleccion("");
                                }}
                            >
                                <option value="">
                                    {!medicoId
                                        ? "Primero selecciona un nutricionista"
                                        : cargandoHorarios
                                            ? "Cargando bloques disponibles..."
                                            : horarios.length === 0
                                                ? "Sin bloques horarios disponibles"
                                                : "-- Selecciona fecha y hora --"}
                                </option>
                                {horarios.map((horario) => (
                                    <option key={horario.id} value={horario.id}>
                                        {horario.fecha} — {horario.horaInicio.slice(0, 5)} hrs
                                    </option>
                                ))}
                            </select>
                        </div>

                        {errorSeleccion && (
                            <span className="text-danger mt-2" style={{ fontSize: '13px' }}>
                                {errorSeleccion}
                            </span>
                        )}
                    </div>

                    <div className="d-flex gap-3">
                        <button onClick={agregarAlCarrito} className="btn btn-success btn-lg">
                            Reservar Hora
                        </button>
                        <Link to="/servicios" className="btn btn-outline-secondary btn-lg">
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DetalleServicio;