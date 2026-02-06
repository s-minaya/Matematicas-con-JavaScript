# 🌸 Matematicas con JavaScript

Una mini-suite de calculadoras matemáticas y estadísticas, nacida del curso "Taller Práctico de JavaScript: Matemáticas y estadística Básica" en Platzi, pero con algunos extra. He convertido ejemplos estáticos en herramientas interactivas: el usuario introduce datos, guarda en `localStorage`, crea sus propios cupones, resetea formularios y más.

**Pequeño resumen:** este proyecto te ayuda a practicar y usar operaciones matemáticas y estadísticas desde la web, con interfaces limpias y responsivas.

## 📚 Tabla de contenidos

- [Descripción](#descripción)
- [Instalación / Requisitos](#instalación--requisitos)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades--features)
- [Créditos / Agradecimientos](#créditos--agradecimientos)

## 1️⃣ Descripción

Es una colección de pequeñas calculadoras (descuentos, geometría, salarios, estadísticas, análisis, etc.) pensadas para que el usuario pueda introducir sus propios datos y obtener resultados instantáneos. Surgió como ejercicio del curso de Platzi, pero lo expandí: maqueté la interfaz, añadí persistencia con `localStorage`, botones de reset, creación y gestión de cupones personalizados, y lógica más robusta para cálculos reales.

## 2️⃣ Instalación / Requisitos

Requisitos mínimos:

- Node.js (>= 14)
- npm o yarn

Pasos:

```bash
# clona el repo (o descarga los archivos)
git clone https://github.com/s-minaya/Matematicas-con-JavaScript.git
cd Matematicas-con-JavaScript

# instala dependencias
npm install

# arranca el servidor de desarrollo (Vite)
npm run dev
```

## 3️⃣ Uso

1. Ejecuta `npm run dev` y se abrirá la URL.
2. Usa el menú para elegir la calculadora que quieras (Descuentos, Geometría, Salarios, Estadísticas, Análisis...). También puedes hacer click al pequeño compañero que aparece, a ver qué se cuenta.
3. Introduce tus valores en los formularios; los resultados se calculan al instante.
4. Puedes crear y guardar cupones personalizados desde la sección de descuentos.
5. Usa el botón `Reset` para limpiar los campos; los datos guardados en `localStorage` no se perderán a menos que lo elimines manualmente.

Ejemplo rápido:

- Entrar a "Descuentos", escribir un precio y un porcentaje, o usar un cupón creado por ti.
- Pulsar calcular y ver el resultado al instante.

## 4️⃣ Funcionalidades / Features

- Interfaz responsiva y accesible.
- Formularios interactivos para introducir datos por el usuario.
- Cálculos de: descuentos, áreas y perímetros, salarios (promedios, porcentajes), estadísticas básicas (media, mediana, moda...), y más.
- Creación, edición y eliminación de cupones personalizados.
- Persistencia con `localStorage` para que tus cupones y datos preferidos se mantengan.
- Botones de `Reset` para limpiar formularios fácilmente.
- Uso de SASS/SCSS para estilos modulares.
- Estructura con Vite para desarrollo rápido y recarga en caliente.

## 5️⃣ Capturas y ejemplos

Compañero con el que puedes interactuar:

![GIF de ejemplo mostrando la app](/public/images/companion.gif)

## 6️⃣ Créditos / Agradecimientos

- Inspirado y comenzado desde el curso: **Platzi — Taller Práctico de JavaScript: Matemáticas y estadística Básica**.
- Gracias a las librerías y recursos usados (Vite, iconos, imágenes libres, etc.).

## 7️⃣ Autora

Creado por **Sofía Minaya**.

👉 Puedes ver el proyecto funcionando **[aquí](https://s-minaya.github.io/Matematicas-con-JavaScript/)**.
