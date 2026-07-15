# Tarea3_DavidLacayo_Taller
Aqui entregare mi tercer tarea de bimestre 3 sobre taller


Documentación del Módulo de Persistencia

1. ¿Cómo funciona la persistencia?

El sistema utiliza una persistencia en memoria (In-Memory Storage). Esto significa que los datos se almacenan temporalmente dentro de la memoria RAM mientras el proceso de Node.js se encuentra en ejecución. No se guardan de forma permanente en un disco duro o base de datos externa; si el programa se cierra o se reinicia, todos los datos almacenados (productos, clientes y pedidos) se borrarán de forma definitiva.  

2. Archivos Utilizados

Los datos se organizan e importan desde los siguientes tres archivos ubicados en la carpeta data/:  

  -data/ClienteData.ts: Define y exporta el arreglo global de clientes (clientes: Cliente[]).  
 
  -data/ProductoData.ts: Define y exporta el arreglo global de productos (productos: Producto[]).  
  
  -data/PedidoData.ts: Define y exporta el arreglo global de pedidos (pedidos: Pedido[]).  

3. Lectura y Escritura de Datos
Lectura de datos: Se realiza a través de consultas directas a los arreglos usando métodos nativos de JavaScript. Se leen todos los registros mediante funciones que retornan el arreglo completo  (ej. obtenerClientes()), o se busca un elemento específico usando el método .find() para evaluar la coincidencia del identificador id  (ej. obtenerClientePorId(id)).  Escritura de datos:

 -Creación: Se realiza agregando un nuevo objeto estructurado al final del arreglo correspondiente mediante el método .push().  

 -Edición: Se accede por referencia al objeto encontrado dentro del arreglo y se sobrescriben directamente los valores de sus propiedades  (ej. cliente.nombre = nombre).  

 -Eliminación: Se localiza la posición del elemento usando el método .findIndex() y se remueve de forma permanente del arreglo usando el método .splice(indice, 1).  

4. Manejo de Errores

El sistema implementa una gestión de errores robusta utilizando bloques try-catch y la propagación de excepciones personalizadas mediante throw new Error(). Se controlan principalmente los siguientes tipos de fallos:  

 -Errores de Validación: Comprueban que los datos obligatorios no estén vacíos (ej. comprobar que el nombre o teléfono del cliente no se omitan ), o que ciertos campos cumplan con restricciones numéricas lógicas (ej. precios mayores a cero o stock no negativo ).  

 -Errores de Existencia de Recursos: Validan si una entidad solicitada realmente existe en memoria antes de intentar operarla (ej. lanzar "Cliente no encontrado" o "Producto no encontrado" al intentar editarlos, eliminarlos o asociarlos a un pedido ).  

 -Errores de Reglas de Negocio (Stock): Al crear o editar un pedido, se evalúa si la cantidad solicitada supera el stock disponible en inventario ("No hay suficiente stock."). En caso afirmativo, se interrumpe la operación de escritura de forma segura. 