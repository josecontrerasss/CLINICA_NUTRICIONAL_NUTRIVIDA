//@vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import FormularioContacto from "../componentes/organismos/FormularioContacto";
import FormularioLogin from "../componentes/organismos/FormularioLogin";
import FormularioRegistro from "../componentes/organismos/FormularioRegistro";

test("10. FormularioContacto muestra error en pantalla si el correo está vacío al intentar enviar", () => {
    render(<FormularioContacto />);
    fireEvent.click(screen.getByRole("button", { name: "Enviar Mensaje" }));
    expect(screen.getByText("El correo es obligatorio.")).toBeDefined();
});

test("11. FormularioLogin muestra mensaje de error si se intenta ingresar sin contraseña", () => {
    render(
        <MemoryRouter>
            <FormularioLogin />
        </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("ejemplo@correo.cl"), { target: { value: "usuario@demo.cl" } });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
    expect(screen.getByText("La contraseña es obligatoria.")).toBeDefined();
});

test("12. FormularioRegistro incluye el selector desplegable para el Tipo de Usuario", () => {
    render(
        <MemoryRouter>
            <FormularioRegistro />
        </MemoryRouter>
    );
    expect(screen.getByText("Seleccione un rol...")).toBeDefined();
    expect(screen.getByText("Paciente")).toBeDefined();
    expect(screen.getByText("Administrador")).toBeDefined();
});