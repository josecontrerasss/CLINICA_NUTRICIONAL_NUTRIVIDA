import Input from "../atomos/Input";

type Props = {
    etiqueta: string;
    tipo: string;
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
    error?: string;
    placeholder?: string;
}

function CampoFormulario({ etiqueta, tipo, nombre, valor, alCambiar, error, placeholder }: Props) {
    return (
        <div className="mb-3 text-start">
            <label className="form-label fw-bold">
                {etiqueta}
            </label>
            <Input tipo={tipo} nombre={nombre} valor={valor} alCambiar={alCambiar} placeholder={placeholder} />
            {error && <span className="text-danger" style={{ fontSize: '12px' }}>{error}</span>}
        </div>
    );
}

export default CampoFormulario;