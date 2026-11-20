import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../componentes/moleculas/CampoFormulario";
import {
    validarRUT,
    validarNombre,
    validarApellidos,
    validarCorreo,
    validarPassword,
    validarSeleccion
} from "../utilidades/validaciones";
import { obtenerToken, cerrarSesion } from "../utilidades/auth";

interface UsuarioItem {
    id: number;
    run: string;
    nombre: string;
    apellidos: string;
    correo: string;
    rol: string;
}

function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState<UsuarioItem[]>([]);
    const [cargando, setCargando] = useState(true);

    const [idActual, setIdActual] = useState<number | null>(null);
    const [run, setRun] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("");

    const [errorRun, setErrorRun] = useState("");
    const [errorNombre, setErrorNombre] = useState("");
    const [errorApellidos, setErrorApellidos] = useState("");
    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorRol, setErrorRol] = useState("");

    const navigate = useNavigate();

    const obtenerCabeceras = () => ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${obtenerToken()}`
    });

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate("/login");
    };

    const cargarUsuarios = async () => {
        try {
            const respuesta = await fetch("http://localhost:8081/api/usuarios", {
                headers: obtenerCabeceras()
            });

            if (respuesta.status === 401 || respuesta.status === 403) {
                manejarCerrarSesion();
                return;
            }

            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }

            const datos = await respuesta.json();
            setUsuarios(datos);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const limpiarErrores = () => {
        setErrorRun("");
        setErrorNombre("");
        setErrorApellidos("");
        setErrorCorreo("");
        setErrorPassword("");
        setErrorRol("");
    };

    const limpiarFormulario = () => {
        setIdActual(null);
        setRun("");
        setNombre("");
        setApellidos("");
        setCorreo("");
        setPassword("");
        setRol("");
        limpiarErrores();
    };

    const editarUsuario = (usuario: UsuarioItem) => {
        setIdActual(usuario.id);
        setRun(usuario.run);
        setNombre(usuario.nombre);
        setApellidos(usuario.apellidos);
        setCorreo(usuario.correo);
        setPassword("");
        setRol(usuario.rol);
        limpiarErrores();
    };

    const borrarUsuario = async (id: number) => {
        if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

        try {
            const respuesta = await fetch(`http://localhost:8081/api/usuarios/${id}`, {
                method: "DELETE",
                headers: obtenerCabeceras()
            });

            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }

            setUsuarios(usuarios.filter(u => u.id !== id));
            if (idActual === id) {
                limpiarFormulario();
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert("No se pudo eliminar el usuario.");
        }
    };

    const guardarUsuario = async () => {
        const errRun = idActual === null ? validarRUT(run) : "";
        const errNombre = validarNombre(nombre);
        const errApellidos = validarApellidos(apellidos);
        const errCorreo = validarCorreo(correo);
        const errPass = (idActual === null || password.trim() !== "") ? validarPassword(password) : "";
        const errRol = validarSeleccion(rol, "Debe seleccionar un rol.");

        setErrorRun(errRun);
        setErrorNombre(errNombre);
        setErrorApellidos(errApellidos);
        setErrorCorreo(errCorreo);
        setErrorPassword(errPass);
        setErrorRol(errRol);

        if (errRun || errNombre || errApellidos || errCorreo || errPass || errRol) {
            return;
        }

        try {
            if (idActual !== null) {
                const respuesta = await fetch(`http://localhost:8081/api/usuarios/${idActual}`, {
                    method: "PUT",
                    headers: obtenerCabeceras(),
                    body: JSON.stringify({
                        nombre: nombre.trim(),
                        apellidos: apellidos.trim(),
                        correo: correo.trim(),
                        password: password.trim() !== "" ? password : null,
                        rol
                    })
                });

                if (!respuesta.ok) {
                    throw new Error(`Error HTTP ${respuesta.status}`);
                }

                const actualizado: UsuarioItem = await respuesta.json();
                setUsuarios(usuarios.map(u => (u.id === actualizado.id ? actualizado : u)));
                alert("Usuario actualizado exitosamente.");
            } else {
                const respuesta = await fetch("http://localhost:8081/api/usuarios", {
                    method: "POST",
                    headers: obtenerCabeceras(),
                    body: JSON.stringify({
                        run: run.trim(),
                        nombre: nombre.trim(),
                        apellidos: apellidos.trim(),
                        correo: correo.trim(),
                        password,
                        rol
                    })
                });

                const datos = await respuesta.json();

                if (!respuesta.ok) {
                    alert(datos.error || "No se pudo crear el usuario.");
                    return;
                }

                setUsuarios([...usuarios, datos]);
                alert("Usuario creado exitosamente.");
            }

            limpiarFormulario();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
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
                        <Link to="/admin-usuarios" className="nav-link text-info px-0 fw-bold">Mantenedor Usuarios</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-contactos" className="nav-link text-white px-0">Bandeja de Mensajes</Link>
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
                <h1 className="mb-2">Gestión de Usuarios</h1>
                <p className="text-muted mb-4">Aquí puedes crear, editar o eliminar los accesos al sistema y asignar roles.</p>

                <div className="card shadow-sm mb-5">
                    <div className="card-body p-0">
                        {cargando ? (
                            <p className="p-4 mb-0 text-muted">Cargando usuarios...</p>
                        ) : (
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>RUN</th>
                                        <th>Nombre Completo</th>
                                        <th>Correo</th>
                                        <th>Rol</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map(usuario => (
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.run}</td>
                                            <td>{usuario.nombre} {usuario.apellidos}</td>
                                            <td>{usuario.correo}</td>
                                            <td>
                                                <span className={`badge ${usuario.rol === 'ADMINISTRADOR' ? 'bg-primary' : 'bg-success'}`}>
                                                    {usuario.rol}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => editarUsuario(usuario)}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => borrarUsuario(usuario.id)}
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

                <div className="card shadow-sm" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <h3 className="h5 mb-4">
                            {idActual ? `Editar Usuario (ID: ${idActual})` : "Agregar Nuevo Usuario"}
                        </h3>

                        {idActual === null ? (
                            <CampoFormulario
                                etiqueta="RUN (Sin puntos ni guion):"
                                tipo="text"
                                nombre="run"
                                valor={run}
                                alCambiar={setRun}
                                error={errorRun}
                                placeholder="123456789"
                            />
                        ) : (
                            <div className="mb-3 text-start">
                                <label className="form-label fw-bold">RUN:</label>
                                <p className="form-control-plaintext border rounded px-3 bg-light mb-0">{run}</p>
                            </div>
                        )}

                        <CampoFormulario
                            etiqueta="Nombre:"
                            tipo="text"
                            nombre="nombre"
                            valor={nombre}
                            alCambiar={setNombre}
                            error={errorNombre}
                        />

                        <CampoFormulario
                            etiqueta="Apellidos:"
                            tipo="text"
                            nombre="apellidos"
                            valor={apellidos}
                            alCambiar={setApellidos}
                            error={errorApellidos}
                        />

                        <CampoFormulario
                            etiqueta="Correo Electrónico:"
                            tipo="email"
                            nombre="correo"
                            valor={correo}
                            alCambiar={setCorreo}
                            error={errorCorreo}
                        />

                        <CampoFormulario
                            etiqueta="Contraseña:"
                            tipo="password"
                            nombre="password"
                            valor={password}
                            alCambiar={setPassword}
                            error={errorPassword}
                            placeholder={idActual ? "Dejar en blanco para mantener la actual" : "Entre 4 y 10 caracteres"}
                        />

                        <div className="mb-4 text-start">
                            <label className="form-label fw-bold">Rol en el sistema:</label>
                            <select
                                className="form-select"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                            >
                                <option value="">Seleccione un rol...</option>
                                <option value="PACIENTE">Paciente</option>
                                <option value="ADMINISTRADOR">Administrador</option>
                            </select>
                            {errorRol && <span className="text-danger" style={{ fontSize: '12px' }}>{errorRol}</span>}
                        </div>

                        <div className="d-flex gap-2">
                            <button onClick={guardarUsuario} className="btn btn-success">
                                Guardar Usuario
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

export default AdminUsuarios;