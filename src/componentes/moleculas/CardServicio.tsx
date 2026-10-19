import BotonDetalle from "../atomos/BotonDetalle";


interface CardProps {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

function CardServicio({ id, titulo, descripcion, precio, imagen }: CardProps) {
    return (
        <div className="card shadow-sm" style={{ width: '18rem' }}>
            <img 
                src={imagen} 
                className="card-img-top" 
                alt={titulo} 
                style={{ height: '200px', objectFit: 'cover' }} 
            />
            <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text text-muted mb-2">{descripcion}</p>
                <p className="fw-bold text-primary fs-5 mb-3">${precio.toLocaleString('es-CL')}</p>
                
                <div className="mt-auto">
                    <BotonDetalle id={id} />
                </div>
            </div>
        </div>
    );
}

export default CardServicio;