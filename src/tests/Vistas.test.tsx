//@vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Servicios from "../paginas/Servicios";
import Contacto from "../paginas/Contacto";
import AdminServicios from "../paginas/AdminServicios";

beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [
            {
                id: 1,
                titulo: "Nutrición Deportiva",
                precio: 25000,
                descripcion: "Plan deportivo",
                imagen: "/Imagenes/Servicios/deportiva.jpg"
            }
        ]
    } as Response);
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

test("13. Servicios filtra dinámicamente y muestra alerta cuando no hay coincidencias", async () => {
    render(
        <MemoryRouter>
            <Servicios />
        </MemoryRouter>
    );

    await screen.findByText("Nutrición Deportiva");

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

test("15. AdminServicios renderiza la tabla de mantenedor con la columna de Acciones", async () => {
    render(
        <MemoryRouter>
            <AdminServicios />
        </MemoryRouter>
    );

    expect(await screen.findByText("Nombre del Servicio")).toBeDefined();
    expect(screen.getByText("Acciones")).toBeDefined();
});