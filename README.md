# 🐾 MICHIS ELX – Gatos en adopción
Diseño y simulación web de protectora para gatos en adopción
Página web de una protectora ficticia de gatos en Elche (Alicante). Proyecto personal realizado durante el ciclo de **Desarrollo de Aplicaciones Web (DAW)** para practicar HTML, CSS y JavaScript sin frameworks.

> Los gatos, nombres y datos son inventados. El formulario no envía información a ningún servidor porque no cuenta con backend.

## Funcionalidades

- Listado de gatos generado dinámicamente con JavaScript a partir de un array de objetos.
- Filtros por sexo y por edad (cachorro, adulto y senior) con contador de resultados.
- Ficha de cada gato en una ventana modal (`<dialog>`) al pulsar su foto, con la imagen ampliada.
- Botón "Quiero adoptarlo" que selecciona el gato en el formulario y hace scroll hasta él.
- Formulario de adopción con validación en el cliente (nombre, email, teléfono español y mensaje).
- Diseño responsive con CSS Grid y Flexbox.

## Tecnologías

- HTML5 semántico
- CSS3 (variables, Grid, Flexbox, media queries)
- JavaScript (ES6): manipulación del DOM, eventos, `filter`, `find`, delegación de eventos y expresiones regulares

## Estructura

```
gatos-adopcion-elche/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── gatos.js   # Datos de los gatos
│   └── main.js    # Lógica: render, filtros y formulario
└── img/           # Fotos de los gatos
```

## Cómo verlo

**Web en vivo:** https://bkareng.github.io/gatos-adopcion-elche/

O clona el repositorio y abre `index.html` en el navegador:

```bash
git clone https://github.com/bkareng/gatos-adopcion-elche.git
cd gatos-adopcion-elche
```


## Posibles mejoras

- Cargar los gatos desde un archivo JSON con `fetch`.
- Añadir un backend (PHP o Node.js) con base de datos para guardar las solicitudes.
- Página de detalle para cada gato.

## Autora

Karen Gineth Becerra Montaño – Estudiante de 2º de DAW en el IES Severo Ochoa (Elche).
