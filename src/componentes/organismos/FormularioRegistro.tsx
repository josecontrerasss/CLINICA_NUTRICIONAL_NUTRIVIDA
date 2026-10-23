import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { 
    validarRUT, validarNombre, validarApellidos, validarCorreo, 
    validarPassword, validarSeleccion, validarDireccion 
} from "../../utilidades/validaciones";

const datosRegiones = [
    {
        nombre: "Región de La Araucanía",
        comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"]
    },
    {
        nombre: "Región Metropolitana",
        comunas: ["Santiago", "Providencia", "Maipú", "Puente Alto"]
    },
    {
        nombre: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"]
    }
];

function FormularioRegistro() {
    const [run, setRun] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    const [direccion, setDireccion] = useState("");

    const [comunasDisponibles, setComunasDisponibles] = useState<string[]>([]);

    const [errorRun, setErrorRun] = useState("");
    const [errorNombre, setErrorNombre] = useState("");
    const [errorApellidos, setErrorApellidos] = useState("");
    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorClave, setErrorClave] = useState("");
    const [errorTipo, setErrorTipo] = useState("");
    const [errorRegion, setErrorRegion] = useState("");
    const [errorComuna, setErrorComuna] = useState("");
    const [errorDireccion, setErrorDireccion] = useState("");

    const navigate = useNavigate();

    // Reemplaza tu función cargarComunas()
    useEffect(() => {
        if (region === "") {
            setComunasDisponibles([]);
            setComuna("");
            return;
        }
        
        let comunasEncontradas: string[] = [];
        for (let i = 0; i < datosRegiones.length; i++) {
            if (datosRegiones[i].nombre === region) {
                comunasEncontradas = datosRegiones[i].comunas;
            }
        }
        setComunasDisponibles(comunasEncontradas);
        setComuna(""); // Resetea la comuna al cambiar de región
    }, [region]);

    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const errRun = validarRUT(run);
        const errNombre = validarNombre(nombre);
        const errApellidos = validarApellidos(apellidos);
        const errCorreo = validarCorreo(correo);
        const errClave = validarPassword(clave);
        const errTipo = validarSeleccion(tipoUsuario, "Seleccione el tipo de usuario.");
        const errRegion = validarSeleccion(region, "Seleccione una región.");
        const errComuna = validarSeleccion(comuna, "Seleccione una comuna.");
        const errDireccion = validarDireccion(direccion);

        setErrorRun(errRun);
        setErrorNombre(errNombre);
        setErrorApellidos(errApellidos);
        setErrorCorreo(errCorreo);
        setErrorClave(errClave);
        setErrorTipo(errTipo);
        setErrorRegion(errRegion);
        setErrorComuna(errComuna);
        setErrorDireccion(errDireccion);

        if (!errRun && !errNombre && !errApellidos && !errCorreo && !errClave && !errTipo && !errRegion && !errComuna && !errDireccion) {
            alert("¡Usuario registrado con éxito!");
            navigate("/login");
        }
    };
    
    return (
        <form onSubmit={manejarEnvio} noValidate>
            <CampoFormulario
                etiqueta="RUN (Sin puntos ni guion):"
                tipo="text"
                nombre="run"
                valor={run}
                alCambiar={setRun}
                error={errorRun}
                placeholder="123456789"
            />
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
                nombre="clave"
                valor={clave}
                alCambiar={setClave}
                error={errorClave}
                placeholder="Entre 4 y 10 caracteres"
            />
            <CampoFormulario
                etiqueta="Fecha de Nacimiento (Opcional):"
                tipo="date"
                nombre="fechaNacimiento"
                valor={fechaNacimiento}
                alCambiar={setFechaNacimiento}
            />

            <div className="mb-3 text-start">
                <label className="form-label fw-bold">Tipo de Usuario:</label>
                <select 
                    className="form-select" 
                    value={tipoUsuario} 
                    onChange={(e) => setTipoUsuario(e.target.value)}
                >
                    <option value="">Seleccione un rol...</option>
                    <option value="Paciente">Paciente</option>
                    <option value="Administrador">Administrador</option>
                </select>
                {errorTipo && <span className="text-danger" style={{ fontSize: '12px' }}>{errorTipo}</span>}
            </div>

            <div className="mb-3 text-start">
                <label className="form-label fw-bold">Región:</label>
                <select 
                    className="form-select" 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)}
                >
                    <option value="">Seleccione una región...</option>
                    {datosRegiones.map((reg, index) => (
                        <option key={index} value={reg.nombre}>{reg.nombre}</option>
                    ))}
                </select>
                {errorRegion && <span className="text-danger" style={{ fontSize: '12px' }}>{errorRegion}</span>}
            </div>

            <div className="mb-3 text-start">
                <label className="form-label fw-bold">Comuna:</label>
                <select 
                    className="form-select" 
                    value={comuna} 
                    onChange={(e) => setComuna(e.target.value)}
                    disabled={comunasDisponibles.length === 0}
                >
                    <option value="">
                        {comunasDisponibles.length === 0 ? "Seleccione primero una región..." : "Seleccione una comuna..."}
                    </option>
                    {comunasDisponibles.map((com, index) => (
                        <option key={index} value={com}>{com}</option>
                    ))}
                </select>
                {errorComuna && <span className="text-danger" style={{ fontSize: '12px' }}>{errorComuna}</span>}
            </div>

            <CampoFormulario
                etiqueta="Dirección:"
                tipo="text"
                nombre="direccion"
                valor={direccion}
                alCambiar={setDireccion}
                error={errorDireccion}
            />

            <button type="submit" className="btn btn-primary w-100 mt-3 py-2">
                Registrarse
            </button>
        </form>
    );
}

export default FormularioRegistro;