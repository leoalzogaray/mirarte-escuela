# Mirarte - Escuela de Danza

Sitio web de la escuela de danza dirigida por Alejandra Mariño.

## Implementación del Main Loader

Este repositorio incluye una implementación segura del loader principal que muestra la pantalla de carga solo en la página de inicio (home) y elimina/oculta los elementos del loader en otras páginas.

### Archivos agregados

- **js/main-loader.js**: Script que controla el comportamiento del loader
  - Inyecta el loader solo en rutas especificadas (por defecto '/' y '/index.html')
  - Elimina elementos de loader existentes en otras páginas
  - Almacena una bandera de sesión para evitar repetir el loader en la misma sesión

- **styles/loader.css** (opcional): CSS mínimo para #page-loader y [data-main-loader]
  - Estilos de transición y fade-out
  - Animación del spinner (opcional)
  - Nota: Los estilos principales del loader ya existen en `estilos.css`

### Uso

#### Integración en el template global

Incluya los siguientes elementos en el template/footer global de su sitio:

```html
<!-- Opcional: incluir CSS de loader si desea estilos centralizados -->
<link rel="stylesheet" href="styles/loader.css">

<!-- Script del main loader (incluir al final del body o en el footer) -->
<script src="js/main-loader.js"></script>
```

#### HTML del loader

El script espera encontrar un elemento con `id="loader"` en el HTML:

```html
<div id="loader">
  <p>Ajustando el compás...</p>
</div>

<main style="display:none;">
  <!-- Contenido principal -->
</main>
```

### Configuración

El comportamiento del loader se puede configurar editando las constantes en `js/main-loader.js`:

```javascript
// Rutas donde el loader debe mostrarse
const showOnPaths = ['/', '/index.html'];

// Clave de sessionStorage para rastrear si el loader ya fue mostrado
const storageKey = 'mirarteLoaderShown';
```

### Comportamiento

1. **En la página de inicio (primera visita)**:
   - El loader se muestra automáticamente
   - El scroll está deshabilitado mientras carga
   - Después de 1.5 segundos, inicia el fade-out (0.8s)
   - El contenido principal se revela
   - Se guarda una bandera en `sessionStorage` para no repetir en la misma sesión

2. **En la página de inicio (visitas subsecuentes en la misma sesión)**:
   - El loader se elimina inmediatamente
   - El contenido se muestra sin demora

3. **En otras páginas**:
   - Cualquier elemento de loader existente se elimina automáticamente
   - El scroll está habilitado
   - El contenido principal se muestra inmediatamente

### Motivación

Anteriormente, el loader estaba incluido en cada página HTML, causando efectos CSS globales no deseados. Esta implementación centraliza el comportamiento del loader en la página de inicio sin necesidad de modificar múltiples archivos HTML.

### Cambio entre localStorage y sessionStorage

Por defecto, el script usa `sessionStorage`, lo que significa que el loader se mostrará nuevamente si el usuario:
- Cierra y reabre el navegador
- Abre el sitio en una nueva pestaña

Si desea que el loader NO se muestre hasta que el usuario limpie su caché/datos, cambie `sessionStorage` por `localStorage` en el código:

```javascript
// Cambiar de:
sessionStorage.getItem(storageKey)
sessionStorage.setItem(storageKey, 'true')

// A:
localStorage.getItem(storageKey)
localStorage.setItem(storageKey, 'true')
```

### Verificación

Para verificar que todo funciona correctamente:

1. Abra el sitio en una nueva sesión de navegador
2. La página de inicio debe mostrar el loader
3. Navegue a otra página (ej: ballet.html)
4. NO debe aparecer ningún loader
5. Vuelva a la página de inicio en la misma sesión
6. NO debe aparecer el loader (ya fue mostrado)
7. Abra una nueva pestaña o reinicie el navegador
8. El loader debe aparecer nuevamente en la página de inicio

## Estructura del sitio

- `index.html` - Página de inicio
- `estilos.css` - Estilos globales
- `scripts.js` - Scripts globales
- `js/` - Scripts JavaScript
  - `main-loader.js` - Implementación del loader principal
- `styles/` - Estilos adicionales
  - `loader.css` - Estilos de transición del loader (opcional)
- `img/` - Imágenes
- `iconos/` - Iconos
- `audio/` - Archivos de audio

## Páginas

- Ballet (`ballet.html`)
- Danza Árabe (`danza-arabe.html`)
- Danza Aérea (`danza-aerea.html`)
- Espacio/Sala (`espacio.html`)
- DQueruza Milonga (`dqueruza.html`)
- Talleres (`talleres.html`)
- Tango (`tango.html`)
- Teatro (`teatro.html`)
- Contacto (`contacto.html`)

## Autor

Leonardo Alzogaray

## Dedicatoria

"A Alejandra Mariño, por sostener el linaje con ternura, ética y presencia."
