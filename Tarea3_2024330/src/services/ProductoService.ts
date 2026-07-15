import { Producto } from "../models/ProductoModel.js";
import { productos } from "../data/ProductoData.js";

let siguienteId = 1;

// Función para crear un nuevo producto
export function crearProducto(nombre: string, precio: number, stock: number): Producto {
    try {
        if (!nombre) {
            throw new Error("El nombre es obligatorio.");
        }
        if (precio <= 0) {
            throw new Error("El precio debe ser mayor que 0.");
        }
        if (stock < 0) {
            throw new Error("El stock no puede ser negativo.");
        }
        const producto: Producto = {
            id: siguienteId,
            nombre: nombre,
            precio: precio,
            stock: stock
        };
        productos.push(producto);
        siguienteId++;
        return producto;
    } catch (error) {
        throw error;
    }
}

// Función para retornar todos los productos
export function obtenerProductos(): Producto[] {
    return productos;
}

// Función para buscar un producto por su ID único
export function obtenerProductoPorId(id: number): Producto | undefined {
    return productos.find(function (producto) {
        return producto.id === id;
    });
}

// Función para editar los datos de un producto existente
export function editarProducto(id: number, nombre: string, precio: number, stock: number): Producto {
    try {
        const producto = obtenerProductoPorId(id);
        if (!producto) {
            throw new Error("Producto no encontrado.");
        }
        if (!nombre) {
            throw new Error("El nombre es obligatorio.");
        }
        if (precio <= 0) {
            throw new Error("El precio debe ser mayor que 0.");
        }
        if (stock < 0) {
            throw new Error("El stock no puede ser negativo.");
        }
        producto.nombre = nombre;
        producto.precio = precio;
        producto.stock = stock;
        return producto;
    } catch (error) {
        throw error;
    }
}

// Función para eliminar un producto de la lista
export function eliminarProducto(id: number): boolean {
    try {
        const indice = productos.findIndex(function (producto) {
            return producto.id === id;
        });
        if (indice === -1) {
            throw new Error("Producto no encontrado.");
        }
        productos.splice(indice, 1);
        return true;
    } catch (error) {
        throw error;
    }
}