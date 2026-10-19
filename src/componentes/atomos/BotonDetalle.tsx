import { Link } from "react-router-dom";

interface BotonProps {
    id: number;
}

function BotonDetalle({id}: BotonProps) {
    return (
        <Link
            to={`/servicio/${id}`}
            className="btn btn-outline-primary"
        >
            Ver detalle
        </Link>
    )
}

export default BotonDetalle;