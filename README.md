# Salva IA · Landing page

Landing de **Salva IA**: rutinas, nutrición, conversaciones y una red de especialistas para acompañar a mamás en el embarazo y el posparto. _"Tu momento también cuenta."_

Implementada a partir del diseño hecho en Claude Design (`Salva IA.dc.html`).

## Stack

- [React 19](https://react.dev/) + JavaScript (JSX)
- [Vite](https://vite.dev/) como bundler y servidor de desarrollo
- [Tailwind CSS v4](https://tailwindcss.com/) vía `@tailwindcss/vite` (configuración en CSS, sin `tailwind.config.js`)
- Tipografías de Google Fonts: **Plus Jakarta Sans** (texto) y **Caveat** (manuscrita)

## Empezar

Requiere Node.js 20.19+ o 22.12+ (exigido por Vite).

```bash
npm install
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # build de producción (prerenderizado) en dist/
npm run preview   # sirve el build localmente
```

`npm run build` hace tres pasos: build del cliente, build SSR de `src/entry-server.jsx` y `scripts/prerender.js`, que inyecta el HTML ya renderizado en `dist/index.html`. En el navegador React hidrata ese HTML (`hydrateRoot`), así que buscadores y previsualizaciones de redes ven el contenido completo sin ejecutar JavaScript.

## Despliegue en AWS Amplify

El repo ya incluye la configuración:

- **`amplify.yml`**: instala Node 22 (Vite 8 no funciona con Node 18), `npm ci`, `npm run build` y publica `dist/`.
- **`customHttp.yml`**: cabeceras de seguridad (HSTS, nosniff, frame, referrer, permissions) y caché (assets con hash: 1 año; HTML: siempre revalidar; imágenes de `public/`: 1 día).

Pasos:

1. En la consola de Amplify: **Create new app → GitHub →** repo `Salva_IA_web`, rama `main`. Amplify detecta `amplify.yml`.
2. **Environment variables**: añadir `SITE_URL` con la URL final, sin barra al final (p. ej. `https://salvaia.com`). Se usa en la URL canónica, las etiquetas Open Graph, `robots.txt`, `sitemap.xml`, `llms.txt` y los datos estructurados. Si no se define, se usa `https://salvaia.com`.
3. **Domain management**: conectar el dominio propio (Amplify gestiona el certificado HTTPS). Redirigir `www` al dominio principal (o al revés) para tener una sola URL canónica.
4. _(Opcional)_ **Rewrites and redirects**: `/<*>` → `/index.html` con código **404**, para que URLs inexistentes muestren la landing en lugar del error por defecto.
5. Tras el primer despliegue: dar de alta el dominio en **Google Search Console** y enviar `https://<dominio>/sitemap.xml`.

## SEO

Se genera en el build (plugin `salva-seo` en `vite.config.js`):

- HTML prerenderizado con un único `<h1>` y jerarquía de encabezados.
- `<title>`, meta description, canonical, `robots`, `theme-color`.
- Open Graph y Twitter Card con `public/og-image.png` (1200×630).
- Favicon (`favicon.ico`), `icon-192/512.png`, `apple-touch-icon.png` y `site.webmanifest`.
- JSON-LD (`Organization`, `WebSite`, `FAQPage`) construido desde `src/data/content.js`: al editar las FAQ se actualizan solos.
- `robots.txt`, `sitemap.xml` y `llms.txt`.

Lighthouse (móvil, build de producción): **SEO 100 · Accesibilidad 100 · Buenas prácticas 100**. LCP ≈ 0,7 s y CLS 0 con CPU ×4 y 4G.

## Estructura

```
Salva_ia_web/
├── index.html              # HTML base: metadatos SEO, Open Graph, iconos y fuentes
├── amplify.yml             # build en AWS Amplify
├── customHttp.yml          # cabeceras HTTP en Amplify
├── scripts/prerender.js    # inyecta el HTML renderizado en dist/index.html
├── public/
│   ├── logo-dark.png       # logo para fondos claros (loader y menú)
│   ├── logo-rose.png       # logo para fondos oscuros (footer)
│   ├── og-image.png        # imagen para compartir en redes
│   └── favicon.ico, icon-*.png, apple-touch-icon.png, site.webmanifest
└── src/
    ├── main.jsx            # punto de entrada (hidrata el HTML prerenderizado)
    ├── entry-server.jsx    # render a HTML para el prerender
    ├── App.jsx             # composición de secciones y toggles globales
    ├── index.css           # tema de Tailwind (colores, fuentes, animaciones) y utilidades propias
    ├── data/
    │   └── content.js      # TODOS los textos y datos editables
    ├── hooks/
    │   └── motion.js       # scroll, parallax, manchas interactivas, contexto de carga
    └── components/
        ├── Loader.jsx          # cortina de entrada
        ├── CustomCursor.jsx    # cursor personalizado (solo ratón)
        ├── Navbar.jsx
        ├── Hero.jsx            # portada con titular animado y vídeo
        ├── Ticker.jsx          # franja de frases en movimiento
        ├── Services.jsx        # cuatro pilares (tarjetas con inclinación 3D)
        ├── Story.jsx           # "Mi historia"
        ├── Reels.jsx           # vídeos de Instagram
        ├── Shop.jsx            # carrusel de productos (arrastrable)
        ├── Specialists.jsx     # red de especialistas con enlace a WhatsApp
        ├── Reviews.jsx         # testimonios en doble marquesina
        ├── Faq.jsx             # preguntas frecuentes (acordeón)
        ├── Contact.jsx         # formulario que abre WhatsApp
        ├── Footer.jsx          # footer y botón flotante de WhatsApp
        ├── Reveal.jsx          # aparición escalonada al hacer scroll
        ├── Ribbon.jsx          # cinta decorativa que se dibuja y ondula
        ├── Blob.jsx            # mancha de color difuminada
        └── Logo.jsx            # logo con respaldo en texto si falta el PNG
```

## Editar contenido

Casi todo lo que cambia con frecuencia vive en **`src/data/content.js`**:

| Qué | Constante |
| --- | --- |
| Número de WhatsApp (con prefijo de país, sin `+`) | `WHATSAPP_NUMBER` |
| Número tal como se muestra en pantalla | `WHATSAPP_DISPLAY` |
| Email e Instagram | `EMAIL`, `INSTAGRAM_URL` |
| Menú | `navLinks` |
| Frases de la franja | `ticker` |
| Servicios, reels, productos, especialistas | `services`, `reels`, `products`, `specialists` |
| Testimonios y preguntas frecuentes | `reviews`, `faqs` |
| Opciones del formulario | `moments` |

> Si cambias el número de WhatsApp, actualiza **ambas** constantes: `WHATSAPP_NUMBER` (para los enlaces `wa.me`) y `WHATSAPP_DISPLAY` (texto visible).

Los textos largos de secciones concretas (p. ej. "Mi historia") están directamente en su componente.

### Pendientes de contenido real

El diseño deja huecos marcados para material definitivo:

- **Vídeo del hero**: guardar el archivo en `public/` y añadir `src` al `<video>` en `Hero.jsx`.
- **Fotos** de "Mi historia", productos y miniaturas de reels (ahora son patrones de rayas con una etiqueta).
- **Enlaces de compra** de productos (`link: '#'` en `products`) y URL real de Instagram.
- **Nombres reales** de los especialistas.

## Diseño y animaciones

Los colores, fuentes, curvas de easing y keyframes están definidos en el bloque `@theme` de `src/index.css`, así que se usan como clases de Tailwind (`bg-blush`, `text-cocoa`, `font-hand`, `ease-soft`, `animate-bob`…).

Paleta principal:

| Token | Color | Uso |
| --- | --- | --- |
| `cream` | `#FAF6EF` | fondo claro |
| `ink` | `#242B30` | texto y botones |
| `cocoa` | `#8E5751` | acentos |
| `blush` | `#E8BDB8` | fondo rosa |
| `petal` | `#F7E6E3` | tarjetas |
| `lilac`, `peach`, `butter`, `mint`, `sky` | | manchas y tarjetas de color |

Efectos de movimiento:

- **Cortina de entrada** y titular que aparece palabra por palabra.
- **Aparición escalonada** de bloques al entrar en pantalla (`Reveal`).
- **Manchas de color** que cambian de forma, se desplazan con el scroll y siguen al ratón en cada sección (`usePointerBlobs`).
- **Cintas** que se dibujan al entrar en la sección y luego ondulan (`Ribbon`).
- Cursor propio, tarjetas con inclinación 3D, carrusel arrastrable y marquesinas.

Toggles en `src/App.jsx`:

```js
const SHOW_LOADER = true   // cortina de entrada
const CUSTOM_CURSOR = true // cursor personalizado
```

### Accesibilidad

- Con **"reducir movimiento"** activado en el sistema se desactivan las animaciones y las cintas aparecen ya dibujadas.
- Los efectos que dependen del ratón (cursor, manchas interactivas, inclinación) solo se activan con puntero fino; en táctil se omiten.
- Foco visible en todos los elementos interactivos y controles con `aria-label` / `aria-expanded`.

## Aviso

El sitio ofrece acompañamiento y educación; **no sustituye atención médica**.
