import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../componentes/moleculas/CampoFormulario";
import { validarNombre } from "../utilidades/validaciones";
import { obtenerToken, cerrarSesion } from "../utilidades/auth";
import type { ServicioItem } from "./Servicios";

function AdminServicios() {
    const [servicios, setServicios] = useState<ServicioItem[]>([]);
    const [cargando, setCargando] = useState(true);

    const [idActual, setIdActual] = useState<number | null>(null);
    const [titulo, setTitulo] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");

    const [errorTitulo, setErrorTitulo] = useState("");
    const [errorPrecio, setErrorPrecio] = useState("");

    const navigate = useNavigate();

    const obtenerCabeceras = () => ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${obtenerToken()}`
    });

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate("/login");
    };

    const cargarServicios = async () => {
        try {
            const respuesta = await fetch("http://localhost:8083/api/servicios");
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const datos: ServicioItem[] = await respuesta.json();
            setServicios(datos);
        } catch (error) {
            console.error("Error al cargar servicios:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarServicios();
    }, []);

    const limpiarErrores = () => {
        setErrorTitulo("");
        setErrorPrecio("");
    };

    const limpiarFormulario = () => {
        setIdActual(null);
        setTitulo("");
        setPrecio("");
        setDescripcion("");
        setImagen("");
        limpiarErrores();
    };

    const editarServicio = (servicio: ServicioItem) => {
        setIdActual(servicio.id);
        setTitulo(servicio.titulo);
        setPrecio(servicio.precio.toString());
        setDescripcion(servicio.descripcion || "");
        setImagen(servicio.imagen || "");
        limpiarErrores();
    };

    const borrarServicio = async (id: number) => {
        if (!window.confirm("¿Seguro que deseas eliminar este servicio?")) return;

        try {
            const respuesta = await fetch(`http://localhost:8083/api/servicios/${id}`, {
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

            setServicios(servicios.filter(servicio => servicio.id !== id));
            if (idActual === id) {
                limpiarFormulario();
            }
        } catch (error) {
            console.error("Error al eliminar servicio:", error);
            alert("No se pudo eliminar el servicio.");
        }
    };

    const guardarServicio = async () => {
        const errTitulo = validarNombre(titulo);
        const errPrecio = precio.trim() === "" || Number(precio) <= 0 ? "Debe ingresar un valor mayor a 0." : "";

        setErrorTitulo(errTitulo);
        setErrorPrecio(errPrecio);

        if (errTitulo || errPrecio) {
            return;
        }

        const payload = {
            titulo: titulo.trim(),
            precio: Number(precio),
            descripcion: descripcion.trim() || "Plan nutricional personalizado.",
            imagen: imagen.trim() || "/Imagenes/Servicios/deportiva.jpg"
        };

        try {
            if (idActual !== null) {
                const respuesta = await fetch(`http://localhost:8083/api/servicios/${idActual}`, {
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

                const actualizado: ServicioItem = await respuesta.json();
                setServicios(servicios.map(s => (s.id === actualizado.id ? actualizado : s)));
                alert("Servicio actualizado exitosamente.");
            } else {
                const respuesta = await fetch("http://localhost:8083/api/servicios", {
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

                const creado: ServicioItem = await respuesta.json();
                setServicios([...servicios, creado]);
                alert("Servicio creado exitosamente.");
            }

            limpiarFormulario();
        } catch (error) {
            console.error("Error al guardar servicio:", error);
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
                        <Link to="/admin" className="nav-link text-info px-0 fw-bold">Mantenedor Servicios</Link>
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
                <h1 className="mb-2">Gestión de Servicios</h1>
                <p className="text-muted mb-4">Aquí puedes consultar, crear, editar o eliminar los servicios del catálogo.</p>

                <div className="card shadow-sm mb-5">
                    <div className="card-body p-0">
                        {cargando ? (
                            <p className="p-4 mb-0 text-muted">Cargando servicios...</p>
                        ) : (
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre del Servicio</th>
                                        <th>Valor</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicios.map(servicio => (
                                        <tr key={servicio.id} data-testid={`fila-servicio-${servicio.id}`}>
                                            <td>{servicio.id}</td>
                                            <td data-testid={`nombre-servicio-${servicio.id}`}>{servicio.titulo}</td>
                                            <td>${servicio.precio.toLocaleString('es-CL')}</td>
                                            <td>
                                                <button
                                                    onClick={() => editarServicio(servicio)}
                                                    className="btn btn-warning btn-sm me-2"
                                                    data-testid={`btn-editar-${servicio.id}`}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => borrarServicio(servicio.id)}
                                                    className="btn btn-danger btn-sm"
                                                    data-testid={`btn-borrar-${servicio.id}`}
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

                <div className="card shadow-sm" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <h3 className="h5 mb-4">
                            {idActual ? `Editar Servicio (ID: ${idActual})` : "Agregar Nuevo Servicio"}
                        </h3>

                        <CampoFormulario
                            etiqueta="Nombre del Servicio:"
                            tipo="text"
                            nombre="tituloServicio"
                            valor={titulo}
                            alCambiar={setTitulo}
                            error={errorTitulo}
                        />

                        <CampoFormulario
                            etiqueta="Valor ($):"
                            tipo="number"
                            nombre="precioServicio"
                            valor={precio}
                            alCambiar={setPrecio}
                            error={errorPrecio}
                        />

                        <CampoFormulario
                            etiqueta="Ruta de Imagen:"
                            tipo="text"
                            nombre="imagenServicio"
                            valor={imagen}
                            alCambiar={setImagen}
                            placeholder="/Imagenes/Servicios/deportiva.jpg"
                        />

                        <div className="mb-4 text-start">
                            <label htmlFor="descripcionServicio" className="form-label fw-bold">Descripción:</label>
                            <textarea
                                id="descripcionServicio"
                                className="form-control"
                                rows={3}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="d-flex gap-2">
                            <button onClick={guardarServicio} className="btn btn-success">
                                Guardar Servicio
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

export default AdminServicios;