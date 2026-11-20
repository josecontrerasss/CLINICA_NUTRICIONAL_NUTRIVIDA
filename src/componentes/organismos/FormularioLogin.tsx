import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { validarCorreo, validarPassword } from "../../utilidades/validaciones";
import { guardarSesion } from "../../utilidades/auth";

function FormularioLogin() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errCorreo = validarCorreo(correo);
        const errPassword = validarPassword(password);

        setErrorCorreo(errCorreo);
        setErrorPassword(errPassword);

        if (errCorreo !== "" || errPassword !== "" || cargando) {
            return;
        }

        setCargando(true);

        try {
            const respuesta = await fetch("http://localhost:8081/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo: correo.trim(),
                    password,
                }),
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setErrorPassword(datos.error || "Usuario o clave incorrectos.");
                return;
            }

            guardarSesion(datos);

            if (datos.rol === "ADMINISTRADOR") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setErrorPassword("No se pudo conectar con el servidor de autenticación.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>
            <CampoFormulario
                etiqueta="Correo:"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
                error={errorCorreo}
                placeholder="ejemplo@correo.cl"
            />
            <CampoFormulario
                etiqueta="Clave:"
                tipo="password"
                nombre="clave"
                valor={password}
                alCambiar={setPassword}
                error={errorPassword}
                placeholder="Ingresa tu contraseña"
            />

            <button type="submit" className="btn btn-primary w-100 mt-3 py-2" disabled={cargando}>
                {cargando ? "Ingresando..." : "Ingresar"}
            </button>
        </form>
    );
}

export default FormularioLogin;