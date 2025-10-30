# FoodChain Landing Page 🌾🔗

Landing page profesional para FoodChain - Plataforma de trazabilidad alimentaria con blockchain.

## 📁 Estructura del Proyecto

```
landingxd/
│
├── README.md              # 📖 Documentación del proyecto
├── .gitignore             # 🚫 Configuración para Git
│
└── docs/                  # 📂 Directorio principal del proyecto
    │
    ├── html/              # 📄 Archivos HTML
    │   └── index.html    # Página principal del sitio
    │
    ├── css/               # 🎨 Archivos de estilos
    │   └── style.css     # Estilos del sitio
    │
    ├── js/                # ⚙️ Archivos JavaScript
    │   └── main.js       # JavaScript principal (animaciones, i18n, etc.)
    │
    └── i18n/              # 🌍 Archivos de internacionalización
        ├── es.json       # Traducciones en español
        └── en.json       # Traducciones en inglés
```

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
Abre el archivo `docs/html/index.html` en tu navegador.

**Nota**: Para evitar problemas con CORS al cargar los archivos JSON, se recomienda usar un servidor local.

### Opción 2: Servidor local (Recomendado)
Para mejor experiencia, usa un servidor local:

**Con Python 3:**
```bash
python -m http.server 8000
```

**Con Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Con PHP:**
```bash
php -S localhost:8000
```

Luego abre `http://localhost:8000/docs/html/` en tu navegador.

**Importante**: Al usar servidor local, asegúrate de acceder a la ruta `/docs/html/` para que el sitio cargue correctamente.

## 🌍 Internacionalización (i18n)

El sitio soporta múltiples idiomas mediante archivos JSON separados:

- **Español (`es.json`)**: Idioma por defecto
- **Inglés (`en.json`)**: Traducción completa

### Cómo cambiar de idioma:
1. Usa los botones **ES** / **EN** en el header de la página
2. El idioma seleccionado se guarda en `localStorage` para persistir entre sesiones

### Agregar un nuevo idioma:
1. Crea un nuevo archivo en `docs/i18n/` (ej: `fr.json`)
2. Copia la estructura de `es.json` o `en.json`
3. Traduce todas las claves
4. Añade el botón correspondiente en el HTML con `data-lang="fr"`

## ✨ Características

- 🎨 **Diseño Moderno**: UI/UX profesional con animaciones suaves
- 📱 **Responsive**: Adaptado a todos los dispositivos
- 🌐 **Multiidioma**: Soporte para español e inglés
- ⚡ **Animaciones GSAP**: Transiciones y efectos fluidos con ScrollTrigger
- 🎯 **Smooth Scroll**: Navegación suave con Lenis
- 🔧 **Organización Modular**: Código limpio y bien estructurado

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño y animaciones
- **JavaScript (Vanilla)** - Lógica e interactividad
- **GSAP + ScrollTrigger** - Animaciones avanzadas
- **Lenis** - Smooth scrolling
- **Lucide Icons** - Iconografía moderna

## 📝 Notas Importantes

1. **Rutas relativas**: Todos los archivos usan rutas relativas para máxima portabilidad
2. **localStorage**: El idioma seleccionado se guarda localmente
3. **Fallback**: Si falla la carga de un idioma, automáticamente carga español
4. **Sin dependencias npm**: Todo funciona con CDNs, sin necesidad de instalar paquetes

## 🎯 Rutas Importantes

- Página principal: `docs/html/index.html`
- Estilos: `docs/css/style.css`
- JavaScript: `docs/js/main.js`
- Traducciones: `docs/i18n/*.json`

## 📧 Contacto

Para más información sobre FoodChain, visita el sitio web o contacta con el equipo de desarrollo.

---

**© 2025 FoodChain. Todos los derechos reservados.**
