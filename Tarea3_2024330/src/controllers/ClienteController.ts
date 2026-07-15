import {
    crearCliente,
    obtenerClientes,
    obtenerClientePorId,
    editarCliente,
    eliminarCliente
} from "../services/ClienteService.js";

// Función para leer un número desde la consola
function leerNumero(prompt: (mensaje: string) => string, mensaje: string): number {
    return Number(prompt(mensaje));
}

// Función para mostrar el menú de opciones de clientes
function mostrarMenuClientes(): void {
    console.log("\nCLIENTES");
    console.log("1. Crear cliente");
    console.log("2. Listar clientes");
    console.log("3. Buscar cliente");
    console.log("4. Editar cliente");
    console.log("5. Eliminar cliente");
    console.log("0. Regresar");
}

// Función para el menú de creación de un cliente
function crearClienteMenu(prompt: (mensaje: string) => string): void {
    try {
        const nombre = prompt("Ingrese el nombre: ");
        const telefono = prompt("Ingrese el teléfono: ");
        const cliente = crearCliente(nombre, telefono);
        console.log("\nCliente creado correctamente.");
        console.table(cliente);
    } catch (error: any) {
        console.log(error.message);
    }
}

// Función para listar todos los clientes
function listarClientes(): void {
    const clientes = obtenerClientes();
    if (clientes.length === 0) {
        console.log("\nNo hay clientes registrados.");
        return;
    }
    console.table(clientes);
}

// Función para buscar un cliente por su ID
function buscarCliente(prompt: (mensaje: string) => string): void {
    const id = leerNumero(prompt, "Ingrese el ID del cliente: ");
    const cliente = obtenerClientePorId(id);
    if (!cliente) {
        console.log("Cliente no encontrado.");
        return;
    }
    console.table(cliente);
}

// Función para editar los datos de un cliente
function editarClienteMenu(prompt: (mensaje: string) => string): void {
    try {
        const id = leerNumero(prompt, "Ingrese el ID del cliente: ");
        const nombre = prompt("Nuevo nombre: ");
        const telefono = prompt("Nuevo teléfono: ");
        const cliente = editarCliente(id, nombre, telefono);
        console.log("\nCliente actualizado correctamente.");
        console.table(cliente);
    } catch (error: any) {
        console.log(error.message);
    }
}

// Función para eliminar un cliente
function eliminarClienteMenu(prompt: (mensaje: string) => string): void {
    try {
        const id = leerNumero(prompt, "Ingrese el ID del cliente: ");
        eliminarCliente(id);
        console.log("\nCliente eliminado correctamente.");
    } catch (error: any) {
        console.log(error.message);
    }
}

// Menú principal de clientes que procesa las opciones seleccionadas
export function menuClientes(prompt: (mensaje: string) => string): void {
    let opcion = -1;
    while (opcion !== 0) {
        mostrarMenuClientes();
        opcion = leerNumero(prompt, "Seleccione una opción: ");
        switch (opcion) {
            case 1:
                crearClienteMenu(prompt);
                break;
            case 2:
                listarClientes();
                break;
            case 3:
                buscarCliente(prompt);
                break;
            case 4:
                editarClienteMenu(prompt);
                break;
            case 5:
                eliminarClienteMenu(prompt);
                break;
            case 0:
                console.log("Regresando al menú principal...");
                break;
            default:
                console.log("Opción inválida.");
                break;
        }
    }
}

