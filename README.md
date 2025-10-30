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
    │   └── main.js       # JavaScript principal (animaciones e interacciones)
```

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
Abre el archivo `docs/html/index.html` en tu navegador.

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

## ✨ Características

- 🎨 **Diseño Moderno**: UI/UX profesional con animaciones suaves
- 📱 **Responsive**: Adaptado a todos los dispositivos
- ⚡ **Animaciones GSAP**: Transiciones y efectos fluidos con ScrollTrigger
- 🎯 **Smooth Scroll**: Navegación suave nativa sin dependencias externas
- 🔧 **Organización Modular**: Código limpio y bien estructurado

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño y animaciones
- **JavaScript (Vanilla)** - Lógica e interactividad
- **GSAP + ScrollTrigger** - Animaciones avanzadas
- **Lucide Icons** - Iconografía moderna

## 📝 Notas Importantes

1. **Rutas relativas**: Todos los archivos usan rutas relativas para máxima portabilidad
2. **Sin dependencias npm**: Todo funciona con CDNs, sin necesidad de instalar paquetes
3. **Animaciones optimizadas**: GSAP + ScrollTrigger se refrescan automáticamente tras cambios de tamaño

## 🎯 Rutas Importantes

- Página principal: `docs/html/index.html`
- Estilos: `docs/css/style.css`
- JavaScript: `docs/js/main.js`

## 📧 Contacto

Para más información sobre FoodChain, visita el sitio web o contacta con el equipo de desarrollo.

---

**© 2025 FoodChain. Todos los derechos reservados.**
