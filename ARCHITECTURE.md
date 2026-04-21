# Arquitectura del Sistema: Puerto TOS

## 📐 Estrategia de Microfrontends
Se implemento **Module Federation** sobre Vite 8. La decisión de usar **React 19** como Singleton asegura que no haya duplicidad de librerías en el cliente, optimizando el tiempo de carga en conexiones de terminal portuaria.

## 📡 Comunicación entre Dominios
Para mantener el desacoplamiento total exigido, se utiliza un **Event Bus** basado en `CustomEvents`.
- **Flujo:** Un cambio en `move-planning` dispara un evento que el `shell` escucha para mostrar notificaciones globales, sin que los MFEs se conozcan entre sí.

## 💾 Capa de Datos (Data Layer)
Se implementó un patrón de **Servicio Asíncrono** en un paquete compartido.
- **Desacoplamiento:** La UI consume promesas, lo que permite cambiar mocks locales por una API real (AWS/GCP) simplemente modificando la implementación del `ContainerService`.
- **Manejo de Estados:** Se gestionan estados de `Loading`, `Error` y `Success` de forma nativa.

## 📈 Escalabilidad y Riesgos
- **De 3 a 10 MFEs:** La arquitectura está lista. Solo se requiere añadir el nuevo remote al `vite.config.ts` del Shell y registrar su ruta.
- **Riesgos:** La naturaleza "bleeding-edge" de Vite 8 y React 19 requiere una gestión estricta de `import type` para evitar errores en el empaquetado de Rolldown.

## ✅ Testing y Calidad
Se utiliza **Vitest** para pruebas unitarias de la lógica de negocio en la capa de datos, asegurando que las actualizaciones de estado de los contenedores sean consistentes y confiables.