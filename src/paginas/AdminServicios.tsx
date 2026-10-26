import { useState } from "react";
import { Link } from "react-router-dom";
import { validarNombre } from "../utilidades/validaciones";

function AdminServicios() {
    const [servicios, setServicios] = useState([
        { id: 1, nombre: "Nutrición Deportiva", precio: 25000, descripcion: "" },
        { id: 2, nombre: "Control de Peso", precio: 20000, descripcion: "" }
    ]);

    const [idActual, setIdActual] = useState<number | null>(null);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const limpiarFormulario = () => {
        setIdActual(null);
        setNombre("");
        setPrecio("");
        setDescripcion("");
    };

    const editarServicio = (servicio: any) => {
        setIdActual(servicio.id);
        setNombre(servicio.nombre);
        setPrecio(servicio.precio.toString());
        setDescripcion(servicio.descripcion || "");
    };

    const borrarServicio = (id: number) => {
        const nuevaLista = servicios.filter(servicio => servicio.id !== id);
        setServicios(nuevaLista);
        if (idActual === id) {
            limpiarFormulario();
        }
    };

    const guardarServicio = () => {
        if (validarNombre(nombre) !== "" || precio.trim() === "") {
            alert("Debe completar el nombre y el precio.");
            return;
        }

        if (idActual !== null) {
            const nuevaLista = servicios.map(servicio => {
                if (servicio.id === idActual) {
                    return { id: idActual, nombre, precio: Number(precio), descripcion };
                }
                return servicio;
            });
            setServicios(nuevaLista);
            alert("Servicio actualizado exitosamente.");
        } else {
            const nuevoServicio = {
                id: Date.now(),
                nombre,
                precio: Number(precio),
                descripcion
            };
            setServicios([...servicios, nuevoServicio]);
            alert("Servicio creado exitosamente.");
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
                        <Link to="/admin" className="nav-link text-info px-0 fw-bold">Mantenedor Servicios</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-usuarios" className="nav-link text-white px-0">Mantenedor Usuarios</Link>
                    </li>
                    <li className="nav-item mt-4">
                        <Link to="/login" className="nav-link text-danger px-0">Cerrar Sesión</Link>
                    </li>
                </ul>
            </nav>

            <main className="flex-grow-1 p-5 bg-light">
                <h1 className="mb-2">Gestión de Servicios</h1>
                <p className="text-muted mb-4">Aquí puedes consultar, crear, editar o eliminar los servicios del catálogo.</p>

                <div className="card shadow-sm mb-5">
                    <div className="card-body p-0">
                        <table className="table table-hover mb-0">
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
                                        <td data-testid={`nombre-servicio-${servicio.id}`}>{servicio.nombre}</td>
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
                    </div>
                </div>

                <div className="card shadow-sm" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <h3 className="h5 mb-4">
                            {idActual ? `Editar Servicio (ID: ${idActual})` : "Agregar Nuevo Servicio"}
                        </h3>
                        
                        <div className="mb-3">
                            <label htmlFor="nombreServicio" className="form-label fw-bold">Nombre del Servicio:</label>
                            <input 
                                id="nombreServicio"
                                type="text" 
                                className="form-control" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="precioServicio" className="form-label fw-bold">Valor ($):</label>
                            <input 
                                id="precioServicio"
                                type="number" 
                                className="form-control" 
                                value={precio} 
                                onChange={(e) => setPrecio(e.target.value)} 
                            />
                        </div>

                        <div className="mb-4">
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