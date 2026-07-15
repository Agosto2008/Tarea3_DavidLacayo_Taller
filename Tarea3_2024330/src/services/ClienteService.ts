import { Cliente } from "../models/ClienteModel.js";
import { clientes } from "../data/ClienteData.js";

let siguienteId = 1;

// Función para crear un cliente nuevo
export function crearCliente(nombre: string, telefono: string): Cliente {
    try {
        if (!nombre) {
            throw new Error("El nombre es obligatorio.");
        }
        if (!telefono) {
            throw new Error("El teléfono es obligatorio.");
        }
        const cliente: Cliente = {
            id: siguienteId,
            nombre: nombre,
            telefono: telefono
        };
        clientes.push(cliente);
        siguienteId++;
        return cliente;
    } catch (error) {
        throw error;
    }
}

// Función para retornar todos los clientes
export function obtenerClientes(): Cliente[] {
    return clientes;
}

// Función para buscar un cliente por su ID único
export function obtenerClientePorId(id: number): Cliente | undefined {
    return clientes.find(function (cliente) {
        return cliente.id === id;
    });
}

// Función para editar los datos de un cliente existente
export function editarCliente(id: number, nombre: string, telefono: string): Cliente {
    try {
        const cliente = obtenerClientePorId(id);
        if (!cliente) {
            throw new Error("Cliente no encontrado.");
        }
        if (!nombre) {
            throw new Error("El nombre es obligatorio.");
        }
        if (!telefono) {
            throw new Error("El teléfono es obligatorio.");
        }
        cliente.nombre = nombre;
        cliente.telefono = telefono;
        return cliente;
    } catch (error) {
        throw error;
    }
}

// Función para eliminar un cliente de la lista
export function eliminarCliente(id: number): boolean {
    try {
        const indice = clientes.findIndex(function (cliente) {
            return cliente.id === id;
        });
        if (indice === -1) {
            throw new Error("Cliente no encontrado.");
        }
        clientes.splice(indice, 1);
        return true;
    } catch (error) {
        throw error;
    }
}