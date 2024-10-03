## Documentación del Proceso de Aprendizaje

### Resumen

Durante el desarrollo de este proyecto utilizando Express.js, aprendí muchas cosas cómo configurar y trabajar con el framework para implementar un CRUD similar al que había creado previamente en Laravel. El enfoque principal fue replicar las funcionalidades de creación, lectura, actualización y eliminación (CRUD) de productos, implementando validaciones de datos utilizando express-validator, de manera similar a cómo se hizo en Laravel con Validator::make. Esto me permitió ver las diferencias entre ambos frameworks y cómo adaptarse a nuevas herramientas rápidamente.

### Recursos

- Documentación Oficial de Express.js: Fue mi principal referencia para la configuración del servidor, rutas y manejo de solicitudes.

- Documentación Oficial de Sequelize: Me ayudó a conectar la aplicación con MySQL y manejar los modelos de la base de datos.

- Express Validator: Para la implementación de validaciones en las solicitudes HTTP.

- Nodemon: Herramienta que facilita el desarrollo al reiniciar automáticamente el servidor cuando hay cambios en los archivos.

### Desafíos y Soluciones:

El principal desafío que encontré durante el desarrollo fue que los datos previamente creados en Laravel también aparecían en mi proyecto de Express.js, ya que ambos compartían la misma base de datos y la misma tabla de productos. Este problema ocurrió debido a la sincronización de la tabla en Sequelize, que estaba eliminando y recreando la tabla con cada inicio del servidor.

Para solucionar este problema, eliminé la opción force: true en la función sequelize.sync(). Esto permitió que Express.js utilizara la tabla existente sin eliminar los datos creados por Laravel, resolviendo así el conflicto de datos entre ambos frameworks.