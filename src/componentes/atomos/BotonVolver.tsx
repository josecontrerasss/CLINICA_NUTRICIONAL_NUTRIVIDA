import { Link } from "react-router-dom";

function BotonVolver() {
    return (
        <Link
            to={`/servicios`}
            className="btn btn-secondary w-100"
        >
            Volver al catálogo
        </Link>
    )
}

export default BotonVolver;