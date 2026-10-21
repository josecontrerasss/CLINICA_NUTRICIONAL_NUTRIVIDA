function Nosotros() {
    return (
        <main className="flex-grow-1">
            <section id="nosotros" className="container text-center my-5">
                <div className="bg-primary text-white p-4 rounded-3 mb-4 shadow-sm">
                    <h2>Sobre nosotros</h2>
                    <p className="mb-0">En NutriVida te ayudamos a alcanzar tus objetivos de salud con asesoría nutricional personalizada en Temuco.</p>
                </div>

                <div className="mb-5 text-start px-md-5">
                    <h2 className="titulo text-center mb-3">¿Quiénes somos?</h2>
                    <p className="text-muted">
                        NutriVida es una clínica de nutrición y dietética fundada en 2016 en Temuco, Región de La Araucanía. Somos cuatro nutricionistas y atendemos alrededor de 60 pacientes por semana, la mayoría derivados por su médico tratante o recomendados por otro paciente.
                        Trabajamos con controles periódicos cada 15 días o cada mes, porque el cambio de hábitos necesita seguimiento y no una única consulta. En cada sesión registramos peso, talla, circunferencia de cintura y otros indicadores, y ajustamos el plan según lo que muestran los datos.
                    </p>
                </div>

                <h2 className="subtitulo mb-4">Nuestro equipo Clínico</h2>
                <div className="card-group mb-5 shadow-sm">
                    <div className="card">
                        <img src="/Imagenes/Doctores/doktor1.jpg" className="card-img-top" alt="Nutricionista Diego Sepúlveda" style={{ objectFit: 'cover', height: '250px' }} />
                        <div className="card-body">
                            <h5 className="card-title">Diego Sepúlveda</h5>
                            <p className="card-text">Nutrición deportiva</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="/Imagenes/Doctores/doktor3.jpg" className="card-img-top" alt="Nutricionista Carolina Muñoz" style={{ objectFit: 'cover', height: '250px' }} />
                        <div className="card-body">
                            <h5 className="card-title">Carolina Muñoz</h5>
                            <p className="card-text">Pérdida de peso</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="/Imagenes/Doctores/doktor2.jpg" className="card-img-top" alt="Nutricionista Andrés Painemal" style={{ objectFit: 'cover', height: '250px' }} />
                        <div className="card-body">
                            <h5 className="card-title">Andrés Painemal</h5>
                            <p className="card-text">Enfermedades metabólicas</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="/Imagenes/Doctores/doktor4.jpg" className="card-img-top" alt="Nutricionista Paula Riquelme" style={{ objectFit: 'cover', height: '250px' }} />
                        <div className="card-body">
                            <h5 className="card-title">Paula Riquelme</h5>
                            <p className="card-text">Alimentación vegetariana</p>
                        </div>
                    </div>
                </div>

                <h2 className="subtitulo mb-4">Nuestro equipo desarrollador</h2>
                <div className="row g-4 justify-content-center">
                    <article className="col-md-5 col-lg-4">
                        <div className="card h-100 text-center shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-primary">José Contreras</h5>
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