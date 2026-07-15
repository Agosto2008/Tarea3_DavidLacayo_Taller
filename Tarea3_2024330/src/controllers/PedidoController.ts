import {
    crearPedido,
    obtenerPedidos,
    obtenerPedidoPorId,
    editarPedido,
    eliminarPedido
} from "../services/PedidoService.js";

// Función para leer un número desde la consola
function leerNumero(prompt: (mensaje: string) => string, mensaje: string): number {
    return Number(prompt(mensaje));
}

// Función para mostrar el menú de opciones de pedidos
function mostrarMenuPedidos(): void {
    console.log("\nPEDIDOS");
    console.log("1. Crear pedido");
    console.log("2. Listar pedidos");
    console.log("3. Buscar pedido");
    console.log("4. Editar pedido");
    console.log("5. Eliminar pedido");
    console.log("0. Regresar");
}

// Función para el menú de creación de un pedido
function crearPedidoMenu(prompt: (mensaje: string) => string): void {
    try {
        const idCliente = leerNumero(prompt, "Ingrese el ID del cliente: ");
        const idProducto = leerNumero(prompt, "Ingrese el ID del producto: ");
        const cantidad = leerNumero(prompt, "Ingrese la cantidad: ");
        const pedido = crearPedido(idCliente, idProducto, cantidad);
        console.log("\nPedido creado correctamente.");
        console.table(pedido);
    } catch (error: any) {
        console.log(error.message);
    }
}

// Función para listar todos los pedidos
function listarPedidos(): void {
    const pedidos = obtenerPedidos();
    if (pedidos.length === 0) {
        console.log("\nNo hay pedidos registrados.");
        return;
    }
    console.table(pedidos);
}

// Función para buscar un pedido por su ID
function buscarPedido(prompt: (mensaje: string) => string): void {
    const id = leerNumero(prompt, "Ingrese el ID del pedido: ");
    const pedido = obtenerPedidoPorId(id);
    if (!pedido) {
        console.log("Pedido no encontrado.");
        return;
    }
    console.table(pedido);
}

// Función para editar la cantidad de un pedido
function editarPedidoMenu(prompt: (mensaje: string) => string): void {
    try {
        const id = leerNumero(prompt, "Ingrese el ID del pedido: ");
        const cantidad = leerNumero(prompt, "Nueva cantidad: ");
        const pedido = editarPedido(id, cantidad);
        console.log("\nPedido actualizado correctamente.");
        console.table(pedido);
    } catch (error: any) {
        console.log(error.message);
    }
}

// Función para eliminar un pedido
function eliminarPedidoMenu(prompt: (mensaje: string) => string): void {
    try {
        const id = leerNumero(prompt, "Ingrese el ID del pedido: ");
        eliminarPedido(id);
        console.log("\nPedido eliminado correctamente.");
    } catch (error: any) {
        console.log(error.message);
    }
}

// Menú principal de pedidos que procesa las opciones seleccionadas
export function menuPedidos(prompt: (mensaje: string) => string): void {
    let opcion = -1;
    while (opcion !== 0) {
        mostrarMenuPedidos();
        opcion = leerNumero(prompt, "Seleccione una opción: ");
        switch (opcion) {
            case 1:
                crearPedidoMenu(prompt);
                break;
            case 2:
                listarPedidos();
                break;
            case 3:
                buscarPedido(prompt);
                break;
            case 4:
                editarPedidoMenu(prompt);
                break;
            case 5:
                eliminarPedidoMenu(prompt);
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