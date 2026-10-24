//@vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Servicios from "../paginas/Servicios";
import Contacto from "../paginas/Contacto";
import AdminServicios from "../paginas/AdminServicios";

test("13. Servicios filtra dinámicamente y muestra alerta cuando no hay coincidencias", () => {
    render(
        <MemoryRouter>
            <Servicios />
        </MemoryRouter>
    );
    const inputFiltro = screen.getByPlaceholderText("Buscar servicio por nombre...");
    fireEvent.change(inputFiltro, { target: { value: "Tratamiento Inexistente" } });
    expect(screen.getByText("No se encontraron servicios con ese nombre.")).toBeDefined();
});

test("14. Contacto aplica correctamente las clases del sistema de grillas de Bootstrap", () => {
    const { container } = render(<Contacto />);
    const columnaCentral = container.querySelector(".col-12.col-md-8");
    expect(columnaCentral?.classList.contains("col-12")).toBe(true);
    expect(columnaCentral?.classList.contains("col-md-8")).toBe(true);
});

test("15. AdminServicios renderiza la tabla de mantenedor con la columna de Acciones", () => {
    render(
        <MemoryRouter>
            <AdminServicios />
        </MemoryRouter>
    );
    expect(screen.getByText("Nombre del Servicio")).toBeDefined();
    expect(screen.getByText("Acciones")).toBeDefined();
});