import { useState } from "react";
import { Link } from "react-router-dom";
import { validarNombre, validarCorreo } from "../utilidades/validaciones";

function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: "Juan Pérez", correo: "admin@demo.cl", rol: "Administrador" },
        { id: 2, nombre: "María López", correo: "maria@correo.cl", rol: "Paciente" }
    ]);

    const [idActual, setIdActual] = useState<number | null>(null);
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("");

    const limpiarFormulario = () => {
        setIdActual(null);
        setNombre("");
        setCorreo("");
        setRol("");
    };

    const editarUsuario = (usuario: any) => {
        setIdActual(usuario.id);
        setNombre(usuario.nombre);
        setCorreo(usuario.correo);
        setRol(usuario.rol);
    };

    const borrarUsuario = (id: number) => {
        const nuevaLista = usuarios.filter(usuario => usuario.id !== id);
        setUsuarios(nuevaLista);
    };

    const guardarUsuario = () => {
        if (validarNombre(nombre) !== "" || validarCorreo(correo) !== "" || rol === "") {
            alert("Debe completar correctamente el nombre, el correo y seleccionar un rol.");
            return;
        }

        if (idActual !== null) {
            const nuevaLista = usuarios.map(usuario => {
                if (usuario.id === idActual) {
                    return { id: idActual, nombre, correo, rol };
                }
                return usuario;
            });
            setUsuarios(nuevaLista);
            alert("Usuario actualizado exitosamente.");
        } else {
            const nuevoUsuario = {
                id: Date.now(),
                nombre,
                correo,
                rol
            };
            setUsuarios([...usuarios, nuevoUsuario]);
            alert("Usuario creado exitosamente.");
        }
        
        limpiarFormulario();
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
                    <li className="nav-item mt-4">
                        <Link to="/login" className="nav-link text-danger px-0">Cerrar Sesión</Link>
                    </li>
                </ul>
            </nav>

            <main className="flex-grow-1 p-5 bg-light">
                <h1 className="mb-2">Gestión de Usuarios</h1>
                <p className="text-muted mb-4">Aquí puedes crear, editar o eliminar los accesos al sistema y asignar roles.</p>

                <div className="card shadow-sm mb-5">
                    <div className="card-body p-0">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.correo}</td>
                                        <td>
                                            <span className={`badge ${usuario.rol === 'Administrador' ? 'bg-primary' : 'bg-success'}`}>
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
                    </div>
                </div>

                <div className="card shadow-sm" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <h3 className="h5 mb-4">
                            {idActual ? `Editar Usuario (ID: ${idActual})` : "Agregar Nuevo Usuario"}
                        </h3>
                        
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre Completo:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Correo Electrónico:</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                value={correo} 
                                onChange={(e) => setCorreo(e.target.value)} 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Rol en el sistema:</label>
                            <select 
                                className="form-select" 
                                value={rol} 
                                onChange={(e) => setRol(e.target.value)}
                            >
                                <option value="">Seleccione un rol...</option>
                                <option value="Paciente">Paciente</option>
                                <option value="Administrador">Administrador</option>
                            </select>
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