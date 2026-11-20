import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import {
    validarRUT,
    validarNombre,
    validarApellidos,
    validarCorreo,
    validarPassword,
    validarSeleccion,
    validarDireccion
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
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    const [direccion, setDireccion] = useState("");

    const [comunasDisponibles, setComunasDisponibles] = useState<string[]>([]);

    const [errorRun, setErrorRun] = useState("");
    const [errorNombre, setErrorNombre] = useState("");
    const [errorApellidos, setErrorApellidos] = useState("");
    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorClave, setErrorClave] = useState("");
    const [errorRegion, setErrorRegion] = useState("");
    const [errorComuna, setErrorComuna] = useState("");
    const [errorDireccion, setErrorDireccion] = useState("");
    const [errorServidor, setErrorServidor] = useState("");
    const [enviando, setEnviando] = useState(false);

    const navigate = useNavigate();

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
        setComuna("");
    }, [region]);

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorServidor("");

        const errRun = validarRUT(run);
        const errNombre = validarNombre(nombre);
        const errApellidos = validarApellidos(apellidos);
        const errCorreo = validarCorreo(correo);
        const errClave = validarPassword(clave);
        const errRegion = validarSeleccion(region, "Seleccione una región.");
        const errComuna = validarSeleccion(comuna, "Seleccione una comuna.");
        const errDireccion = validarDireccion(direccion);

        setErrorRun(errRun);
        setErrorNombre(errNombre);
        setErrorApellidos(errApellidos);
        setErrorCorreo(errCorreo);
        setErrorClave(errClave);
        setErrorRegion(errRegion);
        setErrorComuna(errComuna);
        setErrorDireccion(errDireccion);

        if (errRun || errNombre || errApellidos || errCorreo || errClave || errRegion || errComuna || errDireccion || enviando) {
            return;
        }

        setEnviando(true);

        try {
            const respuesta = await fetch("http://localhost:8081/api/auth/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    run: run.trim(),
                    nombre: nombre.trim(),
                    apellidos: apellidos.trim(),
                    correo: correo.trim(),
                    password: clave,
                    fechaNacimiento: fechaNacimiento || null,
                    region,
                    comuna,
                    direccion: direccion.trim(),
                }),
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setErrorServidor(datos.error || "No se pudo completar el registro.");
                return;
            }

            alert("¡Usuario registrado con éxito! Ahora puedes iniciar sesión.");
            navigate("/login");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setErrorServidor("No se pudo conectar con el servidor.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>
            {errorServidor && (
                <div className="alert alert-danger py-2 text-start" style={{ fontSize: '14px' }}>
                    {errorServidor}
                </div>
            )}

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

            <button type="submit" className="btn btn-primary w-100 mt-3 py-2" disabled={enviando}>
                {enviando ? "Registrando..." : "Registrarse"}
            </button>
        </form>
    );
}

export default FormularioRegistro;