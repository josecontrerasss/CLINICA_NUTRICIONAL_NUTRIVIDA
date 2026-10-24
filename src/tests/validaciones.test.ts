import { test, expect } from "vitest";
import { validarNombre, validarCorreo, validarPassword, validarRepetirPassword, validarRUT } from "../utilidades/validaciones";

test("1. validarNombre rechaza un nombre vacío", () => {
    expect(validarNombre("")).toBe("El nombre es obligatorio.");
});

test("2. validarNombre acepta un texto válido para el nombre", () => {
    expect(validarNombre("Juan Pérez")).toBe("");
});

test("3. validarCorreo rechaza un correo sin el formato correcto", () => {
    expect(validarCorreo("juan.correo.com")).toBe("Formato de correo inválido.");
});

test("4. validarPassword rechaza contraseñas con menos de 4 caracteres", () => {
    expect(validarPassword("123")).toBe("La contraseña debe tener entre 4 y 10 caracteres.");
});

test("5. validarRepetirPassword falla si la confirmación no coincide con la clave original", () => {
    expect(validarRepetirPassword("1234", "5678")).toBe("Las contraseñas no coinciden.");
});

test("6. validarRUT rechaza un RUN con longitud insuficiente", () => {
    expect(validarRUT("12345")).toBe("El RUN ingresado no es válido (Recuerde: sin puntos ni guion).");
});