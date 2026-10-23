import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { validarCorreo, validarPassword } from "../../utilidades/validaciones";

function FormularioLogin() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const navigate = useNavigate();

    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const errCorreo = validarCorreo(correo);
        const errPassword = validarPassword(password);

        setErrorCorreo(errCorreo);
        setErrorPassword(errPassword);

        if (errCorreo === "" && errPassword === "") {
            if (correo === "admin@demo.cl" && password === "1234") {
                navigate("/admin");
            } else if (correo === "usuario@demo.cl" && password === "5678") {
                navigate("/");
            } else {
                setErrorPassword("Usuario o clave incorrectos");
            }
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
            />
            <CampoFormulario
                etiqueta="Clave:"
                tipo="password"
                nombre="clave"
                valor={password}
                alCambiar={setPassword}
                error={errorPassword}
            />

            <button type="submit" className="btn btn-primary w-100 mt-3 py-2">
                Ingresar
            </button>
        </form>
    );
}

export default FormularioLogin;