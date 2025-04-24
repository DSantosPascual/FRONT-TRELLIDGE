📌 Trellidge – Frontend

En este repositorio encontrarás el frontend de Trellidge, una aplicación tipo Trello que permite la gestión de tareas mediante columnas (categorías) y tarjetas (tareas). Está construida con React + Vite.
Partiendo de un CRUD de tareas básico, hemos ido añadiendo funciones según las necesidades, no solo podemos crear, editar y borrar tareas sino que además podemos crear categorías y mover las tareas dentro de las diferentes categorías, utilizando una extensión de React llamada drag and drop.

🧰 Tecnologías utilizadas

⚛️ React

⚡ Vite

📡 Axios

🎨 CSS modular (por componente)

🚀 ¿Cómo iniciar el proyecto?

Clona el repositorio:
git clone https://github.com/DSantosPascual/FRONT-TRELLIDGE.git
cd FRONT-TRELLIDGE

Instala las dependencias:
npm install

Inicia el entorno de desarrollo:
npm run dev

🎯 Funcionalidades principales

✅ Crear columnas (categorías) personalizadas **Nota: Recomendamos esperar unos segundos si aparece en blanco el navegador al crear la primera categoría**

📝 Añadir tareas en cualquier categoría

✏️ Editar tareas:

Al pinchar en una tarea podemos:

Escribir una descripción de ésta.

Crear un checklist con ítems marcables.

Marcarlas como completadas.

🔀 Reorganizar tareas:

Dentro de la misma categoría (drag & drop)

Entre distintas categorías

🗑️ Eliminar tareas y/o columnas

🎨 Personalizar el fondo del tablero

🗂️ Estructura del proyecto

FRONT-TRELLIDGE/
├── public/ → Archivos estáticos
├── src/
│ ├── components/ → Componentes reutilizables (Task, Category, etc.)
│ ├── styles/ → Estilos específicos por componente
│ ├── App.jsx → Componente raíz de la aplicación
│ └── main.jsx → Punto de entrada principal
└── package.json → Dependencias y scripts del proyecto

🌐 Despliegue

Este proyecto ha sido desplegado utilizando GitHub Pages:
https://dsantospascual.github.io/FRONT-TRELLIDGE/


Este proyecto ha sido creado por:

Dámaso Santos, Adrián Pajuelo y Adrián Garrido.

