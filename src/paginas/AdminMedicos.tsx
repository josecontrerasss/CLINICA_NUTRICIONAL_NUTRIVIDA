import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../componentes/moleculas/CampoFormulario";
import { validarNombre } from "../utilidades/validaciones";
import { obtenerToken, cerrarSesion } from "../utilidades/auth";
import type { MedicoItem } from "./Nosotros";

interface HorarioAdminItem {
    id: number;
    medico: MedicoItem;
    fecha: string;
    horaInicio: string;
    disponible: boolean;
}

function AdminMedicos() {
    const [medicos, setMedicos] = useState<MedicoItem[]>([]);
    const [cargando, setCargando] = useState(true);

    const [idActual, setIdActual] = useState<number | null>(null);
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [imagen, setImagen] = useState("");
    const [activo, setActivo] = useState(true);

    const [errorNombre, setErrorNombre] = useState("");
    const [errorEspecialidad, setErrorEspecialidad] = useState("");

    const [medicoAgenda, setMedicoAgenda] = useState<MedicoItem | null>(null);
    const [horarios, setHorarios] = useState<HorarioAdminItem[]>([]);
    const [fechaBloque, setFechaBloque] = useState("");
    const [horaBloque, setHoraBloque] = useState("");
    const [errorBloque, setErrorBloque] = useState("");

    const navigate = useNavigate();

    const obtenerCabeceras = () => ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${obtenerToken()}`
    });

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate("/login");
    };

    const cargarMedicos = async () => {
        try {
            const respuesta = await fetch("http://localhost:8084/api/medicos?incluirInactivos=true");
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const datos: MedicoItem[] = await respuesta.json();
            setMedicos(datos);
        } catch (error) {
            console.error("Error al cargar médicos:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarMedicos();
    }, []);

    const limpiarFormulario = () => {
        setIdActual(null);
        setNombreCompleto("");
        setEspecialidad("");
        setImagen("");
        setActivo(true);
        setErrorNombre("");
        setErrorEspecialidad("");
    };

    const editarMedico = (medico: MedicoItem) => {
        setIdActual(medico.id);
        setNombreCompleto(medico.nombreCompleto);
        setEspecialidad(medico.especialidad);
        setImagen(medico.imagen || "");
        setActivo(medico.activo);
        setErrorNombre("");
        setErrorEspecialidad("");
    };

    const guardarMedico = async () => {
        const errNombre = validarNombre(nombreCompleto);
        const errEsp = especialidad.trim() === "" ? "La especialidad es obligatoria." : "";

        setErrorNombre(errNombre);
        setErrorEspecialidad(errEsp);

        if (errNombre || errEsp) {
            return;
        }

        const payload = {
            nombreCompleto: nombreCompleto.trim(),
            especialidad: especialidad.trim(),
            imagen: imagen.trim() || "/Imagenes/Doctores/doktor1.jpg",
            activo
        };

        try {
            if (idActual !== null) {
                const respuesta = await fetch(`http://localhost:8084/api/medicos/${idActual}`, {
                    method: "PUT",
                    headers: obtenerCabeceras(),
                    body: JSON.stringify(payload)
                });

                if (respuesta.status === 401 || respuesta.status === 403) {
                    manejarCerrarSesion();
                    return;
                }

                if (!respuesta.ok) {
                    throw new Error(`Error HTTP ${respuesta.status}`);
                }

                const actualizado: MedicoItem = await respuesta.json();
                setMedicos(medicos.map(m => (m.id === actualizado.id ? actualizado : m)));
                alert("Nutricionista actualizado exitosamente.");
            } else {
                const respuesta = await fetch("http://localhost:8084/api/medicos", {
                    method: "POST",
                    headers: obtenerCabeceras(),
                    body: JSON.stringify(payload)
                });

                if (respuesta.status === 401 || respuesta.status === 403) {
                    manejarCerrarSesion();
                    return;
                }

                if (!respuesta.ok) {
                    throw new Error(`Error HTTP ${respuesta.status}`);
                }

                const creado: MedicoItem = await respuesta.json();
                setMedicos([...medicos, creado]);
                alert("Nutricionista registrado exitosamente.");
            }

            limpiarFormulario();
        } catch (error) {
            console.error("Error al guardar médico:", error);
            alert("Ocurrió un error al comunicarse con el servidor.");
        }
    };

    const borrarMedico = async (id: number) => {
        if (!window.confirm("¿Seguro que deseas eliminar este nutricionista y sus horarios?")) return;

        try {
            const respuesta = await fetch(`http://localhost:8084/api/medicos/${id}`, {
                method: "DELETE",
                headers: obtenerCabeceras()
            });

            if (respuesta.status === 401 || respuesta.status === 403) {
                manejarCerrarSesion();
                return;
            }

            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }

            setMedicos(medicos.filter(m => m.id !== id));
            if (idActual === id) {
                limpiarFormulario();
            }
            if (medicoAgenda?.id === id) {
                setMedicoAgenda(null);
                setHorarios([]);
            }
        } catch (error) {
            console.error("Error al eliminar médico:", error);
            alert("No se pudo eliminar el profesional.");
        }
    };

    const abrirAgenda = async (medico: MedicoItem) => {
        setMedicoAgenda(medico);
        setFechaBloque("");
        setHoraBloque("");
        setErrorBloque("");

        try {
            const respuesta = await fetch(`http://localhost:8084/api/medicos/${medico.id}/horarios?soloDisponibles=false`);
            if (!respuesta.ok) {
                setHorarios([]);
                return;
            }
            const datos: HorarioAdminItem[] = await respuesta.json();
            setHorarios(datos);
        } catch (error) {
            console.error("Error al cargar horarios:", error);
            setHorarios([]);
        }
    };

    const agregarBloqueHorario = async () => {
        if (!medicoAgenda) return;

        if (!fechaBloque || !horaBloque) {
            setErrorBloque("Debes ingresar fecha y hora de inicio.");
            return;
        }

        setErrorBloque("");

        try {
            const respuesta = await fetch(`http://localhost:8084/api/medicos/${medicoAgenda.id}/horarios`, {
                method: "POST",
                headers: obtenerCabeceras(),
                body: JSON.stringify({
                    fecha: fechaBloque,
                    horaInicio: horaBloque.length === 5 ? `${horaBloque}:00` : horaBloque
                })
            });

            if (respuesta.status === 401 || respuesta.status === 403) {
                manejarCerrarSesion();
                return;
            }

            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }

            const creado: HorarioAdminItem = await respuesta.json();
            setHorarios([...horarios, creado]);
            setFechaBloque("");
            setHoraBloque("");
        } catch (error) {
            console.error("Error al crear bloque horario:", error);
            alert("No se pudo agregar el bloque horario.");
        }
    };

    const liberarBloque = async (horarioId: number) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/api/horarios/${horarioId}/liberar`, {
                method: "PUT",
                headers: obtenerCabeceras()
            });

            if (respuesta.status === 401 || respuesta.status === 403) {
                manejarCerrarSesion();
                return;
            }

            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }

            const actualizado: HorarioAdminItem = await respuesta.json();
            setHorarios(horarios.map(h => (h.id === actualizado.id ? actualizado : h)));
        } catch (error) {
            console.error("Error al liberar horario:", error);
            alert("No se pudo liberar el bloque horario.");
        }
    };

    const eliminarBloque = async (horarioId: number) => {
        if (!window.confirm("¿Eliminar este bloque horario?")) return;

        try {
            const respuesta = await fetch(`http://localhost:8084/api/horarios/${horarioId}`, {
                method: "DELETE",
                headers: obtenerCabeceras()
            });

            if (respuesta.status === 401 || respuesta.status === 403) {
                manejarCerrarSesion();
                return;
            }

            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }

            setHorarios(horarios.filter(h => h.id !== horarioId));
        } catch (error) {
            console.error("Error al eliminar bloque:", error);
            alert("No se pudo eliminar el bloque horario.");
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
                        <Link to="/admin-contactos" className="nav-link text-white px-0">Bandeja de Mensajes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-medicos" className="nav-link text-info px-0 fw-bold">Mantenedor Médicos</Link>
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
                <h1 className="mb-2">Gestión de Nutricionistas y Agenda</h1>
                <p className="text-muted mb-4">Administra el equipo clínico y sus bloques horarios disponibles.</p>

                <div className="card shadow-sm mb-5">
                    <div className="card-body p-0">
                        {cargando ? (
                            <p className="p-4 mb-0 text-muted">Cargando equipo clínico...</p>
                        ) : (
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre Completo</th>
                                        <th>Especialidad</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicos.map(medico => (
                                        <tr key={medico.id}>
                                            <td>{medico.id}</td>
                                            <td>{medico.nombreCompleto}</td>
                                            <td>{medico.especialidad}</td>
                                            <td>
                                                <span className={`badge ${medico.activo ? "bg-success" : "bg-secondary"}`}>
                                                    {medico.activo ? "Activo" : "Inactivo"}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => abrirAgenda(medico)}
                                                    className="btn btn-info btn-sm text-white me-2"
                                                >
                                                    Agenda
                                                </button>
                                                <button
                                                    onClick={() => editarMedico(medico)}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => borrarMedico(medico.id)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Borrar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="h5 mb-4">
                                    {idActual ? `Editar Nutricionista (ID: ${idActual})` : "Registrar Nuevo Nutricionista"}
                                </h3>

                                <CampoFormulario
                                    etiqueta="Nombre Completo:"
                                    tipo="text"
                                    nombre="nombreMedico"
                                    valor={nombreCompleto}
                                    alCambiar={setNombreCompleto}
                                    error={errorNombre}
                                />

                                <CampoFormulario
                                    etiqueta="Especialidad:"
                                    tipo="text"
                                    nombre="especialidadMedico"
                                    valor={especialidad}
                                    alCambiar={setEspecialidad}
                                    error={errorEspecialidad}
                                    placeholder="Ej: Nutrición deportiva"
                                />

                                <CampoFormulario
                                    etiqueta="Ruta de Imagen:"
                                    tipo="text"
                                    nombre="imagenMedico"
                                    valor={imagen}
                                    alCambiar={setImagen}
                                    placeholder="/Imagenes/Doctores/doktor1.jpg"
                                />

                                <div className="form-check mb-4 text-start">
                                    <input
                                        id="checkActivo"
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={activo}
                                        onChange={(e) => setActivo(e.target.checked)}
                                    />
                                    <label htmlFor="checkActivo" className="form-check-label fw-bold">
                                        Profesional activo
                                    </label>
                                </div>

                                <div className="d-flex gap-2">
                                    <button onClick={guardarMedico} className="btn btn-success">
                                        Guardar Profesional
                                    </button>
                                    <button onClick={limpiarFormulario} className="btn btn-secondary">
                                        Cancelar / Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="h5 mb-3">
                                    {medicoAgenda
                                        ? `Bloques Horarios: ${medicoAgenda.nombreCompleto}`
                                        : "Agenda de Bloques Horarios"}
                                </h3>

                                {!medicoAgenda ? (
                                    <p className="text-muted mb-0">
                                        Haz clic en el botón <strong>Agenda</strong> de un nutricionista en la tabla superior para ver o agregar sus horas disponibles.
                                    </p>
                                ) : (
                                    <>
                                        <div className="row g-2 align-items-end mb-3">
                                            <div className="col-5">
                                                <CampoFormulario
                                                    etiqueta="Fecha:"
                                                    tipo="date"
                                                    nombre="fechaBloque"
                                                    valor={fechaBloque}
                                                    alCambiar={setFechaBloque}
                                                />
                                            </div>
                                            <div className="col-4">
                                                <CampoFormulario
                                                    etiqueta="Hora:"
                                                    tipo="time"
                                                    nombre="horaBloque"
                                                    valor={horaBloque}
                                                    alCambiar={setHoraBloque}
                                                />
                                            </div>
                                            <div className="col-3 mb-3">
                                                <button onClick={agregarBloqueHorario} className="btn btn-primary w-100">
                                                    Agregar
                                                </button>
                                            </div>
                                        </div>

                                        {errorBloque && (
                                            <p className="text-danger mb-3" style={{ fontSize: '13px' }}>{errorBloque}</p>
                                        )}

                                        <table className="table table-sm table-bordered align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
                                                    <th>Estado</th>
                                                    <th>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {horarios.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={4} className="text-center text-muted">
                                                            Sin bloques registrados.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    horarios.map(bloque => (
                                                        <tr key={bloque.id}>
                                                            <td>{bloque.fecha}</td>
                                                            <td>{bloque.horaInicio.slice(0, 5)}</td>
                                                            <td>
                                                                <span className={`badge ${bloque.disponible ? "bg-success" : "bg-danger"}`}>
                                                                    {bloque.disponible ? "Disponible" : "Ocupado"}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {!bloque.disponible && (
                                                                    <button
                                                                        onClick={() => liberarBloque(bloque.id)}
                                                                        className="btn btn-outline-success btn-sm me-1"
                                                                    >
                                                                        Liberar
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => eliminarBloque(bloque.id)}
                                                                    className="btn btn-outline-danger btn-sm"
                                                                >
                                                                    Eliminar
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminMedicos;