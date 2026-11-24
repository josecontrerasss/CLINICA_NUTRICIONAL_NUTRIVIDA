//@vitest-environment jsdom
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminServicios from "../paginas/AdminServicios";

const serviciosIniciales = [
    { id: 1, titulo: "Nutrición Deportiva", precio: 25000, descripcion: "Plan deportivo", imagen: "/Imagenes/Servicios/deportiva.jpg" },
    { id: 2, titulo: "Control de Peso", precio: 20000, descripcion: "Plan control", imagen: "/Imagenes/Servicios/peso.jpg" }
];

beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(window, "confirm").mockReturnValue(true);

    vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, options) => {
        const metodo = options?.method || "GET";

        if (metodo === "GET") {
            return {
                ok: true,
                status: 200,
                json: async () => serviciosIniciales
            } as Response;
        }

        if (metodo === "POST") {
            const body = JSON.parse(options?.body as string);
            return {
                ok: true,
                status: 201,
                json: async () => ({ id: 3, ...body })
            } as Response;
        }

        if (metodo === "PUT") {
            const body = JSON.parse(options?.body as string);
            return {
                ok: true,
                status: 200,
                json: async () => ({ id: 1, ...body })
            } as Response;
        }

        return {
            ok: true,
            status: 200,
            json: async () => ({})
        } as Response;
    });
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

test("16. READ: La tabla carga y muestra los servicios iniciales", async () => {
    render(<MemoryRouter><AdminServicios /></MemoryRouter>);

    const fila = await screen.findByTestId("fila-servicio-1");
    expect(fila).toBeTruthy();

    const nombre = screen.getByTestId("nombre-servicio-1");
    expect(nombre.textContent).toBe("Nutrición Deportiva");
});

test("17. CREATE: Permite agregar un nuevo servicio a la lista", async () => {
    const { container } = render(<MemoryRouter><AdminServicios /></MemoryRouter>);
    await screen.findByTestId("fila-servicio-1");

    const inputNombre = container.querySelector('input[name="tituloServicio"]') as HTMLInputElement;
    const inputPrecio = container.querySelector('input[name="precioServicio"]') as HTMLInputElement;

    fireEvent.change(inputNombre, { target: { value: "Nutrición Vegana" } });
    fireEvent.change(inputPrecio, { target: { value: "15000" } });

    const botonGuardar = screen.getByRole("button", { name: "Guardar Servicio" });
    fireEvent.click(botonGuardar);

    const nuevoServicio = await screen.findByText("Nutrición Vegana");
    expect(nuevoServicio).toBeTruthy();
});

test("18. UPDATE: Permite editar un servicio existente", async () => {
    const { container } = render(<MemoryRouter><AdminServicios /></MemoryRouter>);

    const botonEditar = await screen.findByTestId("btn-editar-1");
    fireEvent.click(botonEditar);

    const inputNombre = container.querySelector('input[name="tituloServicio"]') as HTMLInputElement;
    fireEvent.change(inputNombre, { target: { value: "Nutrición Deportiva Avanzada" } });

    const botonGuardar = screen.getByRole("button", { name: "Guardar Servicio" });
    fireEvent.click(botonGuardar);

    await waitFor(() => {
        expect(screen.getByTestId("nombre-servicio-1").textContent).toBe("Nutrición Deportiva Avanzada");
    });
});

test("19. DELETE: Permite eliminar un servicio de la tabla", async () => {
    render(<MemoryRouter><AdminServicios /></MemoryRouter>);

    const botonBorrar = await screen.findByTestId("btn-borrar-2");
    fireEvent.click(botonBorrar);

    await waitFor(() => {
        expect(screen.queryByTestId("fila-servicio-2")).toBeNull();
    });
});