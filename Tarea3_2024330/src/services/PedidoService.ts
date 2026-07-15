import { Pedido } from "../models/PedidoModel.js";
import { pedidos } from "../data/PedidoData.js";
import { obtenerClientePorId } from "./ClienteService.js";
import { obtenerProductoPorId } from "./ProductoService.js";

let siguienteId = 1;

// Función para crear un nuevo pedido y restar del stock del producto
export function crearPedido(idCliente: number, idProducto: number, cantidad: number): Pedido {
    try {
        const cliente = obtenerClientePorId(idCliente);
        if (!cliente) {
            throw new Error("Cliente no encontrado.");
        }
        const producto = obtenerProductoPorId(idProducto);
        if (!producto) {
            throw new Error("Producto no encontrado.");
        }
        if (cantidad <= 0) {
            throw new Error("La cantidad debe ser mayor que 0.");
        }
        if (cantidad > producto.stock) {
            throw new Error("No hay suficiente stock.");
        }
        const pedido: Pedido = {
            id: siguienteId,
            idCliente: idCliente,
            idProducto: idProducto,
            cantidad: cantidad
        };
        producto.stock -= cantidad;
        pedidos.push(pedido);
        siguienteId++;
        return pedido;
    } catch (error) {
        throw error;
    }
}

// Función para retornar todos los pedidos
export function obtenerPedidos(): Pedido[] {
    return pedidos;
}

// Función para buscar un pedido por su ID único
export function obtenerPedidoPorId(id: number): Pedido | undefined {
    return pedidos.find(function (pedido) {
        return pedido.id === id;
    });
}

// Función para actualizar la cantidad de un pedido y reajustar el stock
export function editarPedido(id: number, cantidad: number): Pedido {
    try {
        const pedido = obtenerPedidoPorId(id);
        if (!pedido) {
            throw new Error("Pedido no encontrado.");
        }
        const producto = obtenerProductoPorId(pedido.idProducto);
        if (!producto) {
            throw new Error("Producto no encontrado.");
        }
        // Restaurar temporalmente el stock anterior para evaluar la nueva cantidad
        producto.stock += pedido.cantidad;
        if (cantidad <= 0) {
            throw new Error("La cantidad debe ser mayor que 0.");
        }
        if (cantidad > producto.stock) {
            // Revertir el stock a como estaba antes si falla la validación
            producto.stock -= pedido.cantidad;
            throw new Error("No hay suficiente stock.");
        }
        pedido.cantidad = cantidad;
        producto.stock -= cantidad;
        return pedido;
    } catch (error) {
        throw error;
    }
}

// Función para eliminar un pedido y regresar la cantidad al stock del producto
export function eliminarPedido(id: number): boolean {
    try {
        const indice = pedidos.findIndex(function (pedido) {
            return pedido.id === id;
        });
        if (indice === -1) {
            throw new Error("Pedido no encontrado.");
        }
        const pedido = pedidos[indice];
        if (!pedido) {
            throw new Error("Pedido no encontrado.");
        }
        const producto = obtenerProductoPorId(pedido.idProducto);
        if (producto) {
            producto.stock += pedido.cantidad;
        }
        pedidos.splice(indice, 1);
        return true;
    } catch (error) {
        throw error;
    }
}