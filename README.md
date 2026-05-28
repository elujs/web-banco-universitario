# 🏦 Web Banco Universitario

Este repositorio contiene el código fuente de la plataforma web institucional de **Banco Universitario**, un ecosistema financiero digital diseñado específicamente para la comunidad académica. El proyecto está construido bajo una arquitectura moderna, modular y escalable.

---

## 🚀 Tecnologías Utilizadas

* **Framework:** [Vue 3](https://vuejs.org/) (Composition API con el estándar moderno `<script setup>`)
* **Herramienta de Construcción:** [Vite](https://vitejs.dev/) (Entorno ultrarrápido para bundling)
* **Estilos y Maquetación:** [Tailwind CSS v3](https://tailwindcss.com/) (Framework utilitario para interfaces ágiles)
* **Iconografía:** [Lucide Vue Next](https://lucide.dev/) (Paquete de vectores limpios e institucionales)

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:
* [Node.js](https://nodejs.org/) (Versión LTS recomendada)
* [Git](https://git-scm.com/)
* **Editor Recomendado:** [Visual Studio Code](https://code.visualstudio.com/) junto con la extensión oficial **Vue - Official (Volar)**.

---

## 📦 Instalación y Configuración (Paso a Paso)

Sigue estos pasos abriendo una terminal o consola en tu entorno local:

### 1. Clonar el repositorio
Descarga una copia exacta del código fuente desde GitHub a tu máquina:
```bash
git clone [https://github.com/elujs/web-banco-universitario](https://github.com/elujs/web-banco-universitario)
```

### 2. Acceder al directorio del proyecto
```bash
cd web-banco-universitario
```

### 3. Instalar dependencias
```bash
Descarga las librerías del proyecto (Vue, Tailwind, Lucide, etc.) especificadas en el archivo package.json:
npm install
```

### 4. Levanta el servidor local con soporte de recarga en caliente (Hot Module Replacement):
```bash
npm run dev
```
### Nota: La consola te proveerá un enlace (normalmente http://localhost:5173/). Ábrelo en tu navegador para interactuar con la aplicación en tiempo real.

📂 Estructura y Arquitectura del Proyecto
```bash
  src/
├── assets/                  # Recursos estáticos (Logos, imágenes, mockups)
│   └── dashboard-mockup.png # Vista previa de la banca en línea
├── components/              # Módulos de interfaz de usuario reutilizables
│   ├── Navbar.vue           # Barra de navegación superior integrada
│   ├── Hero.vue             # Banner principal con smartphone CSS y tarjeta Visa 3D
│   ├── Servicios.vue        # Sección de servicios operacionales (2 columnas)
│   ├── SolucionesFinancieras.vue # Módulo tecnológico con tarjetas minimalistas
│   └── Nosotros.vue         # Sección institucional con sistema de acordeón
├── views/                   # Vistas principales de la aplicación
│   └── HomeInstitucional.vue # Contenedor y ensamblador de la Landing Page
├── App.vue                  # Componente raíz de la aplicación
└── main.js                  # Punto de entrada JavaScript (Instancia y configuración de Vue)
```