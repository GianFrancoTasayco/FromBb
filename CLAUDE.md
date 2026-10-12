# Form Amor — Birthday Invitation & RSVP App

Aplicación interactiva de invitación y confirmación de asistencia (RSVP) a fiesta de cumpleaños con temática de gatos, animaciones 3D en Three.js y persistencia en tiempo real en Google Firebase Firestore.

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router con Turbopack)
- **UI & Estado**: React 19 (Hooks, Client Components)
- **Estilos**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Gráficos 3D**: Three.js (`three` + `@types/three`)
- **Iconografía**: Lucide React
- **Base de Datos / Backend**: Firebase Firestore (Web SDK v12)

---

## Comandos del Proyecto

```bash
npm run dev      # Inicia el servidor de desarrollo en http://localhost:3000 (0.0.0.0:3000)
npm run build    # Compila la aplicación para producción (Turbopack / Next.js)
npm run start    # Sirve el build de producción
npm run lint     # Ejecuta ESLint (eslint.config.mjs)
npm run test     # Ejecuta las pruebas automatizadas (Vitest / Testing Library)
```

---

## Arquitectura y Estructura de Archivos

```
src/
├── app/
│   ├── layout.tsx         # Root layout con metadata y fuentes
│   ├── page.tsx           # Página principal: Contenedor con Gato CSS + Tarjeta RSVP
│   └── globals.css        # Configuración de Tailwind CSS v4 y animaciones CSS del gato
├── components/
│   └── birthday-form/
│       ├── BirthdayForm.tsx     # Formulario interactivo principal, validaciones y pantalla de éxito
│       ├── CountdownTimer.tsx   # Temporizador con cuenta regresiva en vivo hacia la fiesta
│       ├── Gift3DCube.tsx       # Cubo de regalo interactivo renderizado con Three.js
│       ├── ThreeCatAlcohol.tsx  # Modelo interactivo de gato con botella según nivel de alcohol
│       └── AlcoholLevelCat.tsx  # Slider interactivo de nivel de alcoholismo con preview
└── lib/
    └── firebase.ts        # Configuración del cliente Firebase y funciones de Firestore
```

---

## Capa de Datos: Firebase Firestore

La persistencia de confirmaciones se gestiona íntegramente mediante **Firebase Firestore**.

### 1. Inicialización Singleton
En [`src/lib/firebase.ts`](file:///c:/Users/Gian/Desktop/Form%20Amor/src/lib/firebase.ts) se utiliza el patrón Singleton para evitar reinicializaciones en el entorno SSR de Next.js:
```typescript
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### 2. Colección de Firestore
- **Nombre de colección**: `confirmaciones`
- **Estructura del documento**:
  ```typescript
  export interface BirthdayRsvpPayload {
    nombre: string;              // Nombre del invitado
    alias: string;               // Apodo o alias
    nivelAlcoholismo: number;    // Nivel del 0 al 100 seleccionado en el slider
    comoTerminar: string;        // "Tranquilo" | "Marinado" | "Invicto" | "Desconectado" | "Anestesiado"
    bebidas: string[];           // Lista de bebidas ("Vodka", "Pisko", "Wisky", "Vino")
    aceptoTerminos: boolean;     // Checkbox obligatorio de aceptación
    referenceId: string;         // Código de confirmación único (ej. BDAY-XXXXXX)
    creadoEl: Timestamp;         // serverTimestamp() de Firestore
    fechaEnvio: string;          // ISO string con la fecha local de envío
  }
  ```

### 3. Métodos Exportados en `src/lib/firebase.ts`
- **`saveBirthdayRsvp(data)`**: Inserta un nuevo documento en la colección `confirmaciones` con timestamp del servidor.
- **`getBirthdayRsvps()`**: Consulta todas las confirmaciones ordenadas descendentemente por fecha (`creadoEl`).

### 4. Variables de Entorno (Recomendación de Seguridad)
Para evitar exponer keys directamente en el repositorio, las variables se gestionan preferentemente en `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

---

## Datos Canónicos del Evento

Para mantener consistencia en toda la aplicación, la información oficial del evento es:
- **Fecha y Hora**: Sábado 17 de octubre de 2026, 22:00 hrs (GMT-5 / Hora de Perú).
- **ISO Target**: `2026-10-17T22:00:00`
- **Rango Google Calendar**: `20261017T220000/20261018T050000`
- **Dirección**: Calle De La Arqueología Mz.A - Lt.55, Lima Metropolitana 15057.
- **Enlace de Google Maps**: `https://maps.app.goo.gl/QBzSvE2uMT4kwuC19`
- **Dress Code**: Pijama decente.
- **Aviso**: Prohibido llevar Ron (penalización con shots).

---

## Sistema de Diseño y Estilo

- **Tema**: Dark mode monocromático premium (`bg-[#161616]` en background, tarjetas en blanco puro `bg-white` con tipografía de alto contraste en negro `text-black` y detalles en gris neutro).
- **Animaciones**:
  - Gato interactivo en CSS puro a la izquierda.
  - Escenas Three.js (renderers limpios con control de cleanup de memoria en `useEffect` para evitar memory leaks).
  - Micro-interacciones en botones y checkboxes con feedback visual inmediato.
- **Tailwind v4**: Utiliza `@tailwindcss/postcss` en `postcss.config.mjs`.

---

## Quality Gate (Criterios de Finalización)

Todo cambio en el código debe cumplir con las siguientes validaciones:
1. **TypeScript Estricto**: Cero uso de `any`. Tipado riguroso de formularios, funciones y respuestas de Firebase.
2. **ESLint**: Ejecutar `npm run lint` con cero errores y advertencias.
3. **Tests Automatizados**: Todos los tests deben pasar exitosamente (`npm run test`) con 0 fallos.
4. **Control de Memoria Three.js**: Todo `canvas` o `WebGLRenderer` instanciado debe hacer dispose de geometrías, materiales y texturas al desmontarse el componente (`return () => { renderer.dispose(); ... }`).
5. **Hydration Segura**: Los componentes que dependen de la hora local del navegador (`CountdownTimer`) deben manejar el estado `mounted` para prevenir errores de hidratación entre SSR y el cliente.

---

## Estrategia de Testing (Pruebas Unitarias y de Componentes)

Las pruebas automatizadas cubren los flujos críticos de la aplicación:

### 1. Pruebas del Formulario (`BirthdayForm.test.tsx`)
- **Validaciones de Campos**:
  - `nombre` obligatorio (rechazar espacios en blanco).
  - `alias` obligatorio.
  - Selección de al menos una bebida para llevar.
  - `aceptoTerminos` obligatorio para poder confirmar asistencia.
- **Interacciones de UI**:
  - Selección y deselección de opciones en bebidas y cómo terminar la noche.
  - Comportamiento del slider de nivel de alcoholismo.
  - Estado de carga en el botón durante el envío (`isSubmitting` deshabilitado + spinner).
  - Renderizado correcto del comprobante de confirmación tras un envío exitoso con su código `referenceId`.

### 2. Pruebas de Persistencia Firebase (`firebase.test.ts`)
- Mockear los métodos del SDK de Firestore (`addDoc`, `collection`, `serverTimestamp`) para evitar escrituras reales en producción durante la ejecución de los tests.
- Asegurar que el objeto enviado contenga todos los campos requeridos (`BirthdayRsvpPayload`).
- Validar el manejo correcto de errores cuando la conexión a Firestore falla.

### 3. Pruebas del Temporizador (`CountdownTimer.test.ts`)
- Simular diferentes fechas del sistema para comprobar que el cálculo de `días`, `horas`, `minutos` y `segundos` hacia el 17/10/2026 sea exacto.
- Comprobar que al sobrepasar la fecha objetivo se muestre el estado expirado (*"¡Llegó el gran momento! 🎉"*).

