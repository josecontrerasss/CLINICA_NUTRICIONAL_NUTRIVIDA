import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../componentes/moleculas/CampoFormulario";
import { obtenerToken, cerrarSesion } from "../utilidades/auth";
import type { NovedadItem } from "./Novedades";

function AdminNovedades() {
    const [novedades, setNovedades] = useState<NovedadItem[]>([]);
    const [cargando, setCargando] = useState(true);

    const [idActual, setIdActual] = useState<number | null>(null);
    const [titulo, setTitulo] = useState("");
    const [resumen, setResumen] = useState("");
    const [imagen, setImagen] = useState("");
    const [parrafo1, setParrafo1] = useState("");
    const [parrafo2, setParrafo2] = useState("");
    const [parrafo3, setParrafo3] = useState("");

    const [errorTitulo, setErrorTitulo] = useState("");
    const [errorResumen, setErrorResumen] = useState("");
    const [errorParrafos, setErrorParrafos] = useState("");

    const navigate = useNavigate();

    const obtenerCabeceras = () => ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${obtenerToken()}`
    });

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate("/login");
    };

    const cargarNovedades = async () => {
        try {
            const respuesta = await fetch("http://localhost:8086/api/novedades");
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const datos: NovedadItem[] = await respuesta.json();
            setNovedades(datos);
        } catch (error) {
            console.error("Error al cargar novedades:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarNovedades();
    }, []);

    const limpiarErrores = () => {
        setErrorTitulo("");
        setErrorResumen("");
        setErrorParrafos("");
    };

    const limpiarFormulario = () => {
        setIdActual(null);
        setTitulo("");
        setResumen("");
        setImagen("");
        setParrafo1("");
        setParrafo2("");
        setParrafo3("");
        limpiarErrores();
    };

    const editarNovedad = (novedad: NovedadItem) => {
        setIdActual(novedad.id);
        setTitulo(novedad.titulo);
        setResumen(novedad.resumen);
        setImagen(novedad.imagen);
        setParrafo1(novedad.parrafo1);
        setParrafo2(novedad.parrafo2);
        setParrafo3(novedad.parrafo3);
        limpiarErrores();
    };

    const borrarNovedad = async (id: number) => {
        if (!window.confirm("¿Seguro que deseas eliminar este artículo?")) return;

        try {
            const respuesta = await fetch(`http://localhost:8086/api/novedades/${id}`, {
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

            setNovedades(novedades.filter(n => n.id !== id));
            if (idActual === id) {
                limpiarFormulario();
            }
        } catch (error) {
            console.error("Error al eliminar novedad:", error);
            alert("No se pudo eliminar el artículo.");
        }
    };

    const guardarNovedad = async () => {
        const errTitulo = titulo.trim() === "" ? "El título es obligatorio." : titulo.length > 150 ? "Máximo 150 caracteres." : "";
        const errResumen = resumen.trim() === "" ? "El resumen es obligatorio." : resumen.length > 300 ? "Máximo 300 caracteres." : "";
        const errParrafos = (parrafo1.trim() === "" || parrafo2.trim() === "" || parrafo3.trim() === "")
            ? "Los tres párrafos del artículo son obligatorios."
            : "";

        setErrorTitulo(errTitulo);
        setErrorResumen(errResumen);
        setErrorParrafos(errParrafos);

        if (errTitulo || errResumen || errParrafos) {
            return;
        }

        const payload = {
            titulo: titulo.trim(),
            resumen: resumen.trim(),
            imagen: imagen.trim() || "/Imagenes/Novedades/Agua.jpg",
            parrafo1: parrafo1.trim(),
            parrafo2: parrafo2.trim(),
            parrafo3: parrafo3.trim()
        };

        try {
            if (idActual !== null) {
                const respuesta = await fetch(`http://localhost:8086/api/novedades/${idActual}`, {
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

                const actualizada: NovedadItem = await respuesta.json();
                setNovedades(novedades.map(n => (n.id === actualizada.id ? actualizada : n)));
                alert("Novedad actualizada exitosamente.");
            } else {
                const respuesta = await fetch("http://localhost:8086/api/novedades", {
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

                const creada: NovedadItem = await respuesta.json();
                setNovedades([...novedades, creada]);
                alert("Novedad publicada exitosamente.");
            }

            limpiarFormulario();
        } catch (error) {
            console.error("Error al guardar novedad:", error);
            alert("Ocurrió un error al comunicarse con el servidor.");
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
                        <Link to="/admin-medicos" className="nav-link text-white px-0">Mantenedor Médicos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-reservas" className="nav-link text-white px-0">Reservas y Boletas</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-novedades" className="nav-link text-info px-0 fw-bold">Mantenedor Novedades</Link>
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
                <h1 className="mb-2">Gestión de Novedades</h1>
                <p className="text-muted mb-4">Publica, edita o elimina los artículos educativos del blog clínico.</p>

                <div className="card shadow-sm mb-5">
                    <div className="card-body p-0">
                        {cargando ? (
                            <p className="p-4 mb-0 text-muted">Cargando artículos...</p>
                        ) : (
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Título del Artículo</th>
                                        <th>Fecha Publicación</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {novedades.map(novedad => (
                                        <tr key={novedad.id}>
                                            <td>{novedad.id}</td>
                                            <td>{novedad.titulo}</td>
                                            <td>
                                                {novedad.fechaPublicacion
                                                    ? new Date(novedad.fechaPublicacion).toLocaleDateString('es-CL')
                                                    : "-"}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => editarNovedad(novedad)}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => borrarNovedad(novedad.id)}
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

                <div className="card shadow-sm" style={{ maxWidth: '720px' }}>
                    <div className="card-body">
                        <h3 className="h5 mb-4">
                            {idActual ? `Editar Artículo (ID: ${idActual})` : "Publicar Nueva Novedad"}
                        </h3>

                        <CampoFormulario
                            etiqueta="Título del Artículo:"
                            tipo="text"
                            nombre="tituloNovedad"
                            valor={titulo}
                            alCambiar={setTitulo}
                            error={errorTitulo}
                        />

                        <CampoFormulario
                            etiqueta="Resumen (tarjeta):"
                            tipo="text"
                            nombre="resumenNovedad"
                            valor={resumen}
                            alCambiar={setResumen}
                            error={errorResumen}
                        />

                        <CampoFormulario
                            etiqueta="Ruta de Imagen:"
                            tipo="text"
                            nombre="imagenNovedad"
                            valor={imagen}
                            alCambiar={setImagen}
                            placeholder="/Imagenes/Novedades/Agua.jpg"
                        />

                        <div className="mb-3 text-start">
                            <label htmlFor="parrafo1Novedad" className="form-label fw-bold">Párrafo 1:</label>
                            <textarea
                                id="parrafo1Novedad"
                                className="form-control"
                                rows={3}
                                value={parrafo1}
                                onChange={(e) => setParrafo1(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="parrafo2Novedad" className="form-label fw-bold">Párrafo 2:</label>
                            <textarea
                                id="parrafo2Novedad"
                                className="form-control"
                                rows={3}
                                value={parrafo2}
                                onChange={(e) => setParrafo2(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="parrafo3Novedad" className="form-label fw-bold">Párrafo 3:</label>
                            <textarea
                                id="parrafo3Novedad"
                                className="form-control"
                                rows={3}
                                value={parrafo3}
                                onChange={(e) => setParrafo3(e.target.value)}
                            ></textarea>
                            {errorParrafos && (
                                <span className="text-danger" style={{ fontSize: '12px' }}>{errorParrafos}</span>
                            )}
                        </div>

                        <div className="d-flex gap-2 mt-4">
                            <button onClick={guardarNovedad} className="btn btn-success">
                                Guardar Novedad
                            </button>
                            <button onClick={limpiarFormulario} className="btn btn-secondary">
                                Cancelar / Limpiar
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminNovedades;