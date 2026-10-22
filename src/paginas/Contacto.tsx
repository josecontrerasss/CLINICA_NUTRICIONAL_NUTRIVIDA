import FormularioContacto from "../componentes/organismos/FormularioContacto";

function Contacto() {
    return (
        <main className="container mt-5 flex-grow-1 mb-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="card shadow-sm p-4 text-center">
                        <h1 className="mb-3" style={{ color: '#020931' }}>Contacto</h1>
                        <p className="mb-4 text-muted" style={{ fontSize: '14px' }}>
                            Envíanos tus dudas o consultas y te responderemos a la brevedad.
                        </p>
                        <FormularioContacto />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Contacto;