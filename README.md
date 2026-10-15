# Customer Dashboard

SvelteKit 2 + Svelte 5 (runes) + TypeScript. Muestra una lista de clientes obtenida desde una API REST, con filtro por estado, búsqueda, diseño responsive y un modal de detalle.

## Requisitos

- Node.js >= 20
- npm

## Ejecutar

```bash
npm install
npm run dev        # http://localhost:5173
```

Otros scripts:

```bash
npm test           # pruebas unitarias (Vitest)
npm run check      # verificación de tipos (svelte-check)
npm run build      # build de producción
```

## API mock

Endpoint interno de SvelteKit: `GET /api/customers` (latencia simulada de 700 ms).

Para probar los casos no felices, agrega un parámetro a la URL de la página:

- `/?fail=1`: la API responde 500 y se muestra el estado de error con el botón "Reintentar".
- `/?empty=1`: la API responde `[]` y se muestra el estado de lista vacía.

## Funcionalidades

- Lista de clientes (nombre, email, estado, fecha de registro).
- Filtro por estado: Todos, Activos, Pendientes, Bloqueados.
- Búsqueda por nombre o email (ignora mayúsculas y tildes).
- Componente reutilizable `StatusBadge`.
- Estados de loading, error de API y lista vacía.
- Responsive: tabla en desktop, tabla con menos columnas en tablet, tarjetas en mobile.
- Botón "Ver detalle" que abre un modal con los datos del cliente.

## Estructura

```
src/
  routes/
    +page.svelte              composición de la página
    api/customers/+server.ts  endpoint REST mock
  lib/
    features/customers/
      domain/      tipos, lógica pura de filtrado, interfaz del repositorio
      data/        implementación HTTP del repositorio
      state/       store reactivo con runes
      components/  StatusBadge, SearchInput, StatusFilter, CustomerTable,
                   CustomerCardList, CustomerList, CustomerDetailModal
    shared/        estados genéricos (Loading/Error/Empty) y formateadores
    server/        datos mock
    styles/        variables de diseño y CSS global
```

## Decisiones técnicas

- **Arquitectura por feature y capas**: dominio (TypeScript puro), datos, estado y UI. Las dependencias apuntan hacia el dominio.
- **SOLID**: filtrado, acceso a datos, estado y presentación están separados. El store depende de la interfaz `CustomerRepository` (inversión de dependencias), por lo que los tests usan repositorios falsos y se puede cambiar la fuente de datos sin tocar la UI.
- **Store con runes (clase)**: `$state` y `$derived` mantienen la lista filtrada siempre sincronizada, sin efectos manuales.
- **Responsive con CSS**: los mismos datos se presentan como tabla o tarjetas según el breakpoint.
- **`<dialog>` nativo** para el detalle: foco atrapado, cierre con Esc y fondo inerte sin librerías.
- **CSS plano con variables**: sin dependencias adicionales; Tailwind no es necesario para este tamaño.
- **Accesibilidad**: inputs con etiqueta, filtro como grupo de radios, `role="status"` y `role="alert"`, soporte de `prefers-reduced-motion`.
- **SvelteKit 2 fijado** para mantener compatibilidad con Node 20/22.
