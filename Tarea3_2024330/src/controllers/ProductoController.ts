import {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    editarProducto,
    eliminarProducto
} from "../services/ProductoService.js";

// Función para leer un número desde la consola
function leerNumero(prompt: (mensaje: string) => string, mensaje: string): number {
    return Number(prompt(mensaje));
}

// Función para mostrar el menú de opciones de productos
function mostrarMenuProductos(): void {
    console.log("\nPRODUCTOS");
    console.log("1. Crear producto");
    console.log("2. Listar productos");
    console.log("3. Buscar producto");
    console.log("4. Editar producto");
    console.log("5. Eliminar producto");
    console.log("0. Regresar");
}

// Función para el menú de creación de un producto
function crearProductoMenu(prompt: (mensaje: string) => string): void {
    try {
        const nombre = prompt("Ingrese el nombre: ");
        const precio = leerNumero(prompt, "Ingrese el precio: ");
        const stock = leerNumero(prompt, "Ingrese el stock: ");
        const producto = crearProducto(nombre, precio, stock);
        console.log("\nProducto creado correctamente.");
        console.table(producto);
    } catch (error: any) {
        console.log(error.message);
    }
}

// Función para listar todos los productos
function listarProductos(): void {
    const productos = obtenerProductos();
    if (productos.length === 0) {
        console.log("\nNo hay productos registrados.");
        return;
    }
    console.table(productos);
}

// Función para buscar un producto por su ID
function buscarProducto(prompt: (mensaje: string) => string): void {
    const id = leerNumero(prompt, "Ingrese el ID del producto: ");
    const producto = obtenerProductoPorId(id);
    if (!producto) {
        console.log("Producto no encontrado.");
        return;
    }
    console.table(producto);
}

// Función para editar los datos de un producto
function editarProductoMenu(prompt: (mensaje: string) => string): void {
    try {
        const id = leerNumero(prompt, "Ingrese el ID del producto: ");
        const nombre = prompt("Nuevo nombre: ");
        const precio = leerNumero(prompt, "Nuevo precio: ");
        const stock = leerNumero(prompt, "Nuevo stock: ");
        const producto = editarProducto(id, nombre, precio, stock);
        console.log("\nProducto actualizado correctamente.");
        console.table(producto);
    } catch (error: any) {
        console.log(error.message);
    }
}

// Función para eliminar un producto
function eliminarProductoMenu(prompt: (mensaje: string) => string): void {
    try {
        const id = leerNumero(prompt, "Ingrese el ID del producto: ");
        eliminarProducto(id);
        console.log("\nProducto eliminado correctamente.");
    } catch (error: any) {
        console.log(error.message);
    }
}

// Menú principal de productos que procesa las opciones seleccionadas
export function menuProductos(prompt: (mensaje: string) => string): void {
    let opcion = -1;
    while (opcion !== 0) {
        mostrarMenuProductos();
        opcion = leerNumero(prompt, "Seleccione una opción: ");
        switch (opcion) {
            case 1:
                crearProductoMenu(prompt);
                break;
            case 2:
                listarProductos();
                break;
            case 3:
                buscarProducto(prompt);
                break;
            case 4:
                editarProductoMenu(prompt);
                break;
            case 5:
                eliminarProductoMenu(prompt);
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