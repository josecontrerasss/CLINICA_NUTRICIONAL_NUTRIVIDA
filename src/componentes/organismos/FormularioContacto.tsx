import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import { validarNombre, validarCorreo, validarMensaje } from "../../utilidades/validaciones";

function FormularioContacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [errorNombre, setErrorNombre] = useState("");
    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorMensaje, setErrorMensaje] = useState("");

    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const errNombre = validarNombre(nombre);
        const errCorreo = validarCorreo(correo);
        const errMsj = validarMensaje(mensaje);

        setErrorNombre(errNombre);
        setErrorCorreo(errCorreo);
        setErrorMensaje(errMsj);

        if (errNombre === "" && errCorreo === "" && errMsj === "") {
            alert("¡Tu mensaje ha sido enviado con éxito! Nos contactaremos contigo pronto.");
            setNombre("");
            setCorreo("");
            setMensaje("");
        }
    };
    
    return (
        <form onSubmit={manejarEnvio} noValidate>
            <CampoFormulario
                etiqueta="Nombre:"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                alCambiar={setNombre}
                error={errorNombre}
                placeholder="Tu nombre completo"
            />
            <CampoFormulario
                etiqueta="Correo Electrónico:"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
                error={errorCorreo}
                placeholder="ejemplo@correo.cl"
            />

            <div className="mb-3 text-start">
                <label htmlFor="mensaje" className="form-label fw-bold">
                    Comentario o Mensaje:
                </label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className="form-control"
                    placeholder="Escribe tu mensaje aquí..."
                    style={{ height: '120px', resize: 'none' }}
                />
                {errorMensaje && <span className="text-danger" style={{ fontSize: '12px' }}>{errorMensaje}</span>}
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3 py-2">
                Enviar Mensaje
            </button>
        </form>
    );
}

export default FormularioContacto;