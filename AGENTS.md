<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Reglas Inquebrantables del Proyecto (MANDATORY AGENT RULES)

Estas reglas son **estrictas, permanentes e inquebrantables**. Ningún agente puede saltárselas bajo ninguna circunstancia al diseñar, crear o refactorizar código en este repositorio.

## 1. Arquitectura Basada en Funcionalidades (Feature-Based Architecture)
- El proyecto **SIEMPRE** debe organizarse por funcionalidades o características de negocio (`src/features/<nombre-feature>/`), nunca como un proyecto plano agrupado únicamente por capas técnicas globales.
- Cada feature debe encapsular de forma cohesiva sus propios elementos:
  - `components/` (componentes visuales exclusivos de la funcionalidad)
  - `hooks/` (lógica de estado y ciclo de vida de la funcionalidad)
  - `services/` o `actions/` (casos de uso, llamadas a API/IA, persistencia)
  - `types/` (contratos, interfaces y modelos de dominio)
  - `utils/` (funciones puras auxiliares de la funcionalidad)
- El directorio `src/shared/` (o `src/core/`) solo debe contener piezas verdaderamente transversales reutilizadas por múltiples funcionalidades (sistema de diseño base, motor de temas, primitivos UI, utilidades globales).
- El directorio `src/app/` (Next.js App Router) debe mantenerse delgado, actuando únicamente como capa de enrutamiento, layouts y composición de features.

## 2. Prohibición Absoluta de Componentes Monolíticos
- **NUNCA** puede existir un componente monolítico.
- Cada componente debe cumplir con el Principio de Responsabilidad Única (SRP): hacer una sola cosa y hacerla bien.
- Ningún componente debe mezclar múltiples secciones independientes de la interfaz ni acumular cientos de líneas. Si un componente supera ~120 líneas o gestiona más de una responsabilidad visual, debe descomponerse inmediatamente en subcomponentes atómicos y componibles.

## 3. Separación Estricta entre Lógica y UI
- **Los componentes de UI (`.tsx`) deben ser puramente declarativos y presentacionales.**
- Está prohibido escribir lógica de negocio compleja, transformaciones de datos pesadas, llamadas directas a servicios externos, validaciones extensas o manejo complejo de estado dentro del cuerpo de un componente visual.
- Toda la lógica de estado e interacción debe vivir en **Custom Hooks** (`use*.ts`), y la lógica de dominio/datos debe vivir en **Servicios**, **Stores** o **Funciones Puras** (`utils/`), inyectándose de forma limpia a la vista.

## 4. Respeto Estricto al Principio DRY (Don't Repeat Yourself)
- Prohibido duplicar lógica de negocio, hooks, estructuras visuales repetitivas, esquemas de validación, constantes o tipos TypeScript.
- Antes de crear un componente, hook, utilidad o tipo nuevo, se debe verificar si ya existe uno equivalente o parametrizable en `src/shared/` o en el feature actual.
- Si un bloque visual o fragmento de lógica se necesita en dos o más lugares, debe extraerse y abstraerse inmediatamente en una pieza reutilizable.

## 5. Sistema Multi-Estilo Visual + Modo Claro y Oscuro Obligatorio
- La interfaz orientada al usuario final debe soportar de forma nativa, dinámica y sin estilos *hardcodeados* **4 estilos visuales distintos**, cada uno con su respectivo **Modo Claro (Light)** y **Modo Oscuro (Dark)** (8 combinaciones totales):
  1. **ArtPop (Pop Art)**: Colores vibrantes de alto contraste, patrones gráficos expresivos (semitonos/puntos), bordes definidos tipo cómic y energía visual audaz.
  2. **Brutalismo (Neo-Brutalism)**: Bordes gruesos y sólidos, sombras duras desplazadas sin difuminar (`hard offset shadows`), geometría cruda, alto impacto tipográfico y estructura directa.
  3. **Minimalismo (Minimalist)**: Espacios en blanco generosos, tipografía limpia, bordes sutiles, ausencia de ruido visual y enfoque absoluto en el contenido.
  4. **Memphis (Memphis Design)**: Formas geométricas dinámicas, patrones juguetones, contraste entre tonos pastel y acentos intensos, bordes decorativos y estética inspirada en el grupo Memphis.
- Todo componente de UI debe consumir **Design Tokens / Variables CSS semánticas** (colores, bordes, radios, sombras, tipografías y texturas de fondo) para que al alternar entre `artpop | brutalism | minimalist | memphis` y entre `light | dark`, toda la aplicación se transforme de manera coherente y automática.

