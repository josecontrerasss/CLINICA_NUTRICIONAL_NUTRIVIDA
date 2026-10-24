//@vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../componentes/organismos/Navbar";
import Footer from "../componentes/organismos/Footer";

test("7. Navbar muestra el nombre oficial de la clínica NutriVida", () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
    const logos = screen.getAllByText("NutriVida");
    expect(logos[0]).toBeDefined();
});

test("8. Navbar contiene el botón principal para Reservar Hora", () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
    const botonesReserva = screen.getAllByText("Reservar Hora");
    expect(botonesReserva[0].className).toContain("btn-primary");
});

test("9. Footer renderiza el texto de derechos reservados y ubicación", () => {
    render(<Footer />);
    expect(screen.getByText(/2024 Clínica NutriVida/i)).toBeDefined();
    expect(screen.getByText(/Temuco, Región de La Araucanía/i)).toBeDefined();
});