import { Link } from "react-router-dom";
import FormularioLogin from "../componentes/organismos/FormularioLogin";

function Login() {
    return (
        <main className="container mt-5 flex-grow-1 mb-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-4">
                    <div className="card shadow-sm p-4 text-center">
                        <h1 className="mb-3" style={{ color: '#020931' }}>Login</h1>
                        
                        <FormularioLogin />

                        <div className="mt-4">
                            <p className="mb-1" style={{ fontSize: '14px' }}>
                                ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
                            </p>
                            <Link to="/" style={{ fontSize: '14px' }}>Volver al Inicio</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;