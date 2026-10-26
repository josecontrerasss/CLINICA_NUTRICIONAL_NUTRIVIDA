function Nosotros() {
    return (
        <main className="flex-grow-1 bg-light py-4">
            <section id="nosotros" className="container my-5">
                
                {/* Nueva sección: ¿Quiénes somos? con diseño de Tarjeta Dividida */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-10">
                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                            <div className="row g-0">
                                <div className="col-md-4 bg-primary text-white d-flex flex-column justify-content-center align-items-center p-4">
                                    <h2 className="fw-bold text-center">Clínica NutriVida</h2>
                                    <p className="lead text-center mb-0 mt-2">Salud y bienestar en Temuco</p>
                                </div>
                                
                                <div className="col-md-8 p-5 bg-white text-start">
                                    <h3 className="mb-4 text-primary fw-bold">¿Quiénes somos?</h3>
                                    <p className="text-secondary" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                                        <strong>NutriVida</strong> es una clínica de nutrición y dietética fundada en 2016 en Temuco, Región de La Araucanía. Somos cuatro nutricionistas y atendemos alrededor de 60 pacientes por semana, la mayoría derivados por su médico tratante o recomendados por otro paciente.
                                    </p>
                                    <p className="text-secondary mb-0" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                                        Trabajamos con controles periódicos cada 15 días o cada mes, porque el cambio de hábitos necesita seguimiento y no una única consulta. En cada sesión registramos peso, talla, circunferencia de cintura y otros indicadores, y ajustamos el plan según lo que muestran los datos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="subtitulo mb-4 text-center fw-bold text-dark">Nuestro equipo Clínico</h2>
                <div className="card-group mb-5 shadow-sm rounded-4 overflow-hidden">
                    <div className="card border-0 border-end">
                        <img src="/Imagenes/Doctores/doktor1.jpg" className="card-img-top" alt="Nutricionista Diego Sepúlveda" style={{ objectFit: 'cover', height: '250px' }} />
                        <div className="card-body text-center bg-white">
                            <h5 className="card-title fw-bold">Diego Sepúlveda</h5>
                            <p className="card-text text-muted">Nutrición deportiva</p>
                        </div>
                    </div>
                    <div className="card border-0 border-end">
                        <img src="/Imagenes/Doctores/doktor3.jpg" className="card-img-top" alt="Nutricionista Carolina Muñoz" style={{ objectFit: 'cover', height: '250px' }} />
                        <div className="card-body text-center bg-white">
                            <h5 className="card-title fw-bold">Carolina Muñoz</h5>
                            <p className="card-text text-muted">Pérdida de peso</p>
                        </div>
                    </div>
                    <div className="card border-0 border-end">
                        <img src="/Imagenes/Doctores/doktor2.jpg" className="card-img-top" alt="Nutricionista Andrés Painemal" style={{ objectFit: 'cover', height: '250px' }} />
                        <div className="card-body text-center bg-white">
                            <h5 className="card-title fw-bold">Andrés Painemal</h5>
                            <p className="card-text text-muted">Enfermedades metabólicas</p>
                        </div>
                    </div>
                    <div className="card border-0">
                        <img src="/Imagenes/Doctores/doktor4.jpg" className="card-img-top" alt="Nutricionista Paula Riquelme" style={{ objectFit: 'cover', height: '250px' }} />
                        <div className="card-body text-center bg-white">
                            <h5 className="card-title fw-bold">Paula Riquelme</h5>
                            <p className="card-text text-muted">Alimentación vegetariana</p>
                        </div>
                    </div>
                </div>

                <h2 className="subtitulo mb-4 text-center fw-bold text-dark mt-5">Nuestro equipo desarrollador</h2>
                <div className="row g-4 justify-content-center">
                    <article className="col-md-5 col-lg-4">
                        <div className="card h-100 text-center shadow-sm border-0 rounded-4">
                            <div className="card-body p-4">
                                <h5 className="card-title text-primary fw-bold">José Contreras</h5>
                                <p className="card-text text-secondary mb-0">Desarrollador Frontend</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}

export default Nosotros;