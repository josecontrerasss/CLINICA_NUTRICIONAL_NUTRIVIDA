type Props = {
    tipo: string;
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
    placeholder?: string;
}

function Input({ tipo, nombre, valor, alCambiar, placeholder }: Props) {
    return (
        <input
            type={tipo}
            id={nombre}
            name={nombre}
            value={valor}
            onChange={(e) => alCambiar(e.target.value)}
            className="form-control"
            placeholder={placeholder}
        />
    );
}

export default Input;