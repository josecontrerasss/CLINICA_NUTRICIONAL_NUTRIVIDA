import { Link } from "react-router-dom";

function Inicio() {
    return (
        <main>
            <section id="inicio" className="container mt-4">
                <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/Imagenes/Carrusel/happyDoctor.jpg" className="d-block w-100 img-carrusel" alt="Nutricionista sonriendo" />
                        </div>
                        <div className="carousel-item">
                            <img src="/Imagenes/Carrusel/happyWoman.jpg" className="d-block w-100 img-carrusel" alt="Paciente feliz" />
                        </div>
                        <div className="carousel-item">
                            <img src="/Imagenes/Carrusel/group.jpg" className="d-block w-100 img-carrusel" alt="Grupo de profesionales" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>

            <br />

            <section className="container text-center mt-5 mb-4">
                <div className="bg-primary text-white p-3 rounded-3 shadow-sm">
                    <h3>Sobre nosotros</h3>
                    <p className="mb-0">En NutriVida te ayudamos a alcanzar tus objetivos de salud con asesoría nutricional personalizada en Temuco.</p>
                </div>
            </section>

            <section id="servicios" className="container my-5">
                <h2 className="text-center mb-4">Nuestros Servicios Destacados</h2>
                <div className="row g-4">
                    <article className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Nutrición Deportiva</h5>
                                <p className="card-text">Mejora tu rendimiento físico con un plan a tu medida.</p>
                                <p className="fw-bold">Valor: $25.000</p>
                                <Link to="/servicios" className="btn btn-primary">Ver catálogo completo</Link>
                            </div>
                        </div>
                    </article>
                    <article className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Control de Peso</h5>
                                <p className="card-text">Logra tu peso ideal de forma saludable y sostenible.</p>
                                <p className="fw-bold">Valor: $20.000</p>
                                <Link to="/servicios" className="btn btn-primary">Ver catálogo completo</Link>
                            </div>
                        </div>
                    </article>
                    <article className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Dieta Vegana</h5>
                                <p className="card-text">Transición segura con todos los nutrientes necesarios.</p>
                                <p className="fw-bold">Valor: $22.000</p>
                                <Link to="/servicios" className="btn btn-primary">Ver catálogo completo</Link>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}

export default Inicio;