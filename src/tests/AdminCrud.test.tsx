//@vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminServicios from "../paginas/AdminServicios";

test("16. READ: La tabla carga y muestra los servicios iniciales", () => {
    render(<MemoryRouter><AdminServicios /></MemoryRouter>);
    const filas = screen.getAllByTestId("fila-servicio-1");
    expect(filas.length).toBeGreaterThan(0);
    
    const nombres = screen.getAllByTestId("nombre-servicio-1");
    expect(nombres[0].textContent).toBe("Nutrición Deportiva");
});

test("17. CREATE: Permite agregar un nuevo servicio a la lista", () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<MemoryRouter><AdminServicios /></MemoryRouter>);
    
    const inputNombre = screen.getByLabelText("Nombre del Servicio:");
    const inputPrecio = screen.getByLabelText("Valor ($):");
    
    fireEvent.change(inputNombre, { target: { value: "Nutrición Vegana" } });
    fireEvent.change(inputPrecio, { target: { value: "15000" } });

    const botonGuardar = screen.getAllByRole("button", { name: "Guardar Servicio" })[0];
    fireEvent.click(botonGuardar);

    const nuevoServicio = screen.getAllByText("Nutrición Vegana");
    expect(nuevoServicio.length).toBeGreaterThan(0);
});

test("18. UPDATE: Permite editar un servicio existente", () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<MemoryRouter><AdminServicios /></MemoryRouter>);

    const botonesEditar = screen.getAllByTestId("btn-editar-1");
    fireEvent.click(botonesEditar[0]);

    const inputNombre = screen.getByLabelText("Nombre del Servicio:");
    fireEvent.change(inputNombre, { target: { value: "Nutrición Deportiva Avanzada" } });
    
    const botonGuardar = screen.getAllByRole("button", { name: "Guardar Servicio" })[0];
    fireEvent.click(botonGuardar);

    const nombres = screen.getAllByTestId("nombre-servicio-1");
    expect(nombres[0].textContent).toBe("Nutrición Deportiva Avanzada");
});

test("19. DELETE: Permite eliminar un servicio de la tabla", () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<MemoryRouter><AdminServicios /></MemoryRouter>);
 
    const filasAntes = screen.getAllByTestId("fila-servicio-2");
    expect(filasAntes.length).toBeGreaterThan(0);

    const botonesBorrar = screen.getAllByTestId("btn-borrar-2");
    fireEvent.click(botonesBorrar[0]);

    const filasDespues = screen.queryAllByTestId("fila-servicio-2");
    expect(filasDespues.length).toBe(3);
});