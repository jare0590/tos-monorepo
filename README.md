# ⚓ Puerto TOS - Control Hub 2026

Plataforma de gestión portuaria de alta densidad diseñada para la **Estrategia de Desempeño 2026**. Este sistema utiliza una arquitectura de Microfrontends (MFE) para centralizar la inteligencia operativa, la gestión de patio y la planificación táctica en una sola interfaz fluida. El diseño busca una estetica de "Centro de control" tratando de evitar la fatiga visual del operador usando el layout fluido y contenedores centrados.

## 🚀 Tecnologías Core
- **React 19.2.5**: Utilizado como Singleton para garantizar un árbol de renderizado único y eficiente.
- **Vite 8 + Rolldown**: El motor de empaquetado más moderno, optimizado para el rendimiento del monorepo.
- **Tailwind CSS 4**: Sistema de diseño de alta densidad con un layout "Fluid" que aprovecha el 100% del monitor.
- **TypeScript**: Contratos tipados estrictos en todo el flujo de datos.

## 🏗️ Estructura del Monorepo (pnpm)
- `apps/shell`: El orquestador principal y contenedor del sistema.
- `apps/yard-ops`: MFE de Gestión de Patio e Inventario.
- `apps/move-planning`: MFE de Planificación y Movimientos (Drag & Drop).
- `apps/analytics`: Dashboard de KPIs en tiempo real (Recharts).
- `packages/ui-config`: Librería de componentes y sistema de diseño compartido.
- `packages/data-layer`: Capa de servicios y mocks asíncronos desacoplada de la UI.

## 🛠️ Instalación y Ejecución
1. Clonar el repo.
2. Instalar dependencias: `pnpm install`
3. Correr en desarrollo: `pnpm dev`
4. Ejecutar tests: `pnpm test`

## 🌐 Despliegue
- **URL Shell:** [Tu URL de Vercel aquí]