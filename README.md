# Sistemas de Gestión de Colecciones - Comparador de Plataformas

## Descripción

Este proyecto es una interfaz web diseñada para facilitar la comparación entre diferentes plataformas o sistemas de gestión de colecciones. Permite a los usuarios seleccionar dos plataformas de una lista y visualizar una tabla comparativa detallada de sus características, atributos y logos.

El diseño es responsive, adaptándose a diversos tamaños de pantalla (móvil, tablet, escritorio) y está construido con un enfoque modular utilizando CSS moderno, incluyendo el sistema de capas (`@layer`) para una gestión optimizada de los estilos.

## Demo en Vivo

Puedes ver una demostración en vivo del proyecto aquí: [Sistemas de Gestión de Colecciones - Demo](https://apoyoconectate.github.io/SistemasGestionColecciones/)

## Objetivo del Proyecto

El objetivo principal es ofrecer una herramienta visual e intuitiva para que los usuarios puedan tomar decisiones informadas al elegir un sistema de gestión de colecciones, presentando la información relevante de forma clara y concisa.

## Características Principales

- **Comparación Dinámica:** Selección de dos plataformas a través de menús desplegables.
- **Tabla Comparativa:** Renderizado automático de una tabla con atributos y logos de las plataformas seleccionadas.
- **Diseño Responsive:** Interfaz optimizada para visualización en ordenadores de escritorio, tablets y dispositivos móviles.
- **Interfaz Clara:** Foco en la legibilidad y facilidad de uso.
- **CSS Moderno:** Uso de capas CSS (`@layer`), variables CSS (Custom Properties), Flexbox y Grid para el layout.

## Tecnologías Utilizadas

- **HTML5**
- **CSS3**
  - Capas CSS (`@layer`) para la gestión de la cascada y especificidad.
  - Variables CSS (Custom Properties) para temas y consistencia (ej. colores, fuentes, espaciados).
  - Flexbox y CSS Grid para la maquetación.
  - Media Queries para el diseño responsive.
- **JavaScript:** Para la lógica de la interfaz, la carga de datos de las plataformas, la actualización dinámica de la tabla de comparación y la interacción del usuario.
- **Fuentes:**
  - Roboto (variable, cargada localmente desde `/assets/font/`).

## Estructura de los Estilos (CSS)

El proyecto adopta un enfoque modular y organizado para los estilos CSS utilizando la característica `@layer`. Esto permite un control preciso sobre la cascada y la especificidad, facilitando el mantenimiento y la escalabilidad.

El archivo principal `assets/css/master.css` define el orden de las capas y luego importa los diferentes módulos CSS, asignándolos a sus respectivas capas:

1.  `@layer reset, root, base, grid, text, spacers, button, utilities, mobileGrid, tooltip, responsive;`

    - Define el orden de precedencia de las capas principales.

2.  **Importaciones de Módulos:**

    - `reset.css` (capa `reset`): Normalización de estilos del navegador.
    - `root.css` (capa `root`): Definición de variables CSS globales (colores, tipografía, configuración del grid, etc.). Incluye la importación de `font.css`.
    - `base.css` (capa `base`): Estilos fundamentales para elementos HTML (body, main, nav, footer).
    - `grid.css` (capa `grid`): Sistema de rejilla principal para el layout.
    - `grid-movil.css` (capa `mobileGrid`): Ajustes responsivos específicos para la rejilla en dispositivos móviles y tablets.
    - `text.css` (capa `text`): Estilos para la tipografía (encabezados, párrafos, listas) y clases de utilidad textual.
    - `spacers.css` (capa `spacers`): Clases de utilidad para márgenes y paddings.
    - `button.css` (capa `button`): Estilos para botones.
    - `utilities.css` (capa `utilities`): Clases de utilidad diversas (bordes, elementos responsivos, visibilidad).
    - `tooltip.css` (capa `tooltip`): Estilos para el componente de tooltip.
    - `responsive.css` (capa `responsive`): Media queries generales y ajustes responsivos para diferentes componentes y breakpoints.

3.  `@layer master { ... }`
    - Una capa final con la mayor precedencia (entre las definidas explícitamente en `master.css`) para estilos específicos de la aplicación, overrides y personalizaciones finales (ej. imagen de fondo, estilos para `select`, `.logos`, etc.).

Este sistema de capas asegura que los estilos base tengan menor precedencia que los componentes, y estos a su vez menor precedencia que las utilidades o los overrides específicos de la capa `master`.

## Cómo Empezar

Para ejecutar este proyecto localmente:

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/ApoyoConectaTE/SistemasGestionColecciones.git
    ```

2.  **Navega al directorio del proyecto:**

    ```bash
    cd SistemasGestionColecciones
    ```

3.  **Abre el archivo principal:**
    Abre el archivo `index.html` (o el archivo HTML principal de tu proyecto) en tu navegador web preferido.

## Uso de la Interfaz de Comparación

1.  Al cargar la página, verás dos menús desplegables.
2.  Selecciona la primera plataforma/producto que deseas comparar del primer menú.
3.  Selecciona la segunda plataforma/producto del segundo menú.
4.  Una vez que ambas selecciones se hayan realizado, aparecerá automáticamente una tabla debajo de los menús. Esta tabla mostrará los logos de las plataformas seleccionadas y una comparación de sus atributos.
5.  Si cambias tu selección en cualquiera de los menús desplegables, la tabla se actualizará en tiempo real para reflejar los nuevos productos elegidos.
6.  Si solo una o ninguna plataforma está seleccionada, se mostrará un mensaje indicando que se deben seleccionar dos plataformas para la comparación.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1.  Haz un Fork del proyecto.
2.  Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la Branch (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---

Hecho con ❤️ por Jova1091
