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
    const [enviando, setEnviando] = useState(false);

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (enviando) return;

        const errNombre = validarNombre(nombre);
        const errCorreo = validarCorreo(correo);
        const errMsj = validarMensaje(mensaje);

        setErrorNombre(errNombre);
        setErrorCorreo(errCorreo);
        setErrorMensaje(errMsj);

        if (errNombre !== "" || errCorreo !== "" || errMsj !== "") {
            return;
        }

        setEnviando(true);

        try {
            const respuesta = await fetch("http://localhost:8082/api/contactos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombreCompleto: nombre.trim(),
                    correo: correo.trim(),
                    mensaje: mensaje.trim(),
                }),
            });

            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }

            alert("¡Tu mensaje ha sido enviado con éxito! Nos contactaremos contigo pronto.");
            setNombre("");
            setCorreo("");
            setMensaje("");
        } catch (error) {
            console.error("Error al enviar el contacto:", error);
            alert("No se pudo enviar el mensaje. Verifique que el servidor esté activo.");
        } finally {
            setEnviando(false);
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

            <button type="submit" className="btn btn-primary w-100 mt-3 py-2" disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar Mensaje"}
            </button>
        </form>
    );
}

export default FormularioContacto;