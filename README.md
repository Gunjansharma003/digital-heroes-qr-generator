# ⚡ QR Code Generator

A sleek, modern QR Code Generator built with **React** and **Vite**. Generate QR codes instantly from any text or URL, preview them in real time, and download high-resolution PNGs — all wrapped in a stunning glassmorphism UI with animated gradients.

> Built for [Digital Heroes](https://digitalheroesco.com)

---

## ✨ Features

- **Instant QR Generation** — Create QR codes from any text, URL, or string input
- **High-Res PNG Download** — Export QR codes at 3× pixel ratio for crystal-clear prints
- **Input Validation** — Real-time character counter, empty-input guard, and 2048-char limit
- **Keyboard Shortcut** — Press `Enter` to generate without reaching for the mouse
- **Clear & Reset** — One-click reset to start fresh
- **Toast Notifications** — Visual confirmation on successful download
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile screens
- **Glassmorphism UI** — Frosted-glass cards with backdrop blur and subtle transparency
- **Animated Gradient Background** — Smooth, shifting gradient with floating ambient orbs
- **Micro-Animations** — Fade, slide, scale, and shake effects for a polished experience
- **Accessible** — ARIA labels, roles, keyboard navigation, and screen-reader support
- **SEO Optimized** — Proper meta tags, semantic HTML, and descriptive page title

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library with Hooks (`useState`, `useRef`, `useCallback`) |
| [Vite 8](https://vite.dev/) | Lightning-fast build tool and dev server |
| [qrcode.react](https://www.npmjs.com/package/qrcode.react) | QR code rendering as Canvas elements |
| [html-to-image](https://www.npmjs.com/package/html-to-image) | DOM-to-PNG conversion for downloads |
| Vanilla CSS | Custom design system with CSS variables and glassmorphism |
| [Google Fonts](https://fonts.google.com/) | Inter + Outfit typefaces |

---

## 📦 Installation

**Prerequisites:** [Node.js](https://nodejs.org/) (v18 or higher) and npm

```bash
# 1. Clone the repository
git clone https://github.com/Gunjansharma003/digital-heroes-qr-generator.git

# 2. Navigate to the project directory
cd digital-heroes-qr-generator

# 3. Install dependencies
npm install
```

---

## 🚀 Run Locally

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at **http://localhost:5173/**

---

## 🏗️ Build for Production

Generate an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📖 Usage Instructions

1. **Enter Content** — Type or paste any text, URL, or string into the input field.
2. **Generate** — Click the **Generate** button or press **Enter** to create the QR code.
3. **Preview** — The QR code appears instantly in the preview panel with a smooth animation.
4. **Download** — Click **Download PNG** to save a high-resolution image to your device.
5. **Clear** — Click **Clear** to reset the input and remove the generated QR code.

---

## 🌐 Live Demo

🔗 [View Live Demo](#) *(coming soon)*

---

## 📂 GitHub Repository

🔗 [github.com/Gunjansharma003/digital-heroes-qr-generator](https://github.com/Gunjansharma003/digital-heroes-qr-generator)

---

## 📁 Project Structure

```
digital-heroes-qr-generator/
├── public/
│   └── favicon.svg            # QR-themed favicon
├── src/
│   ├── assets/                # Static assets
│   ├── App.jsx                # Main QR Generator component
│   ├── App.css                # Component styles & animations
│   ├── index.css              # Design system & global styles
│   └── main.jsx               # React entry point
├── index.html                 # HTML template with SEO meta tags
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies & scripts
└── README.md                  # Project documentation
```

---

## 👤 Author

**Gunjan Sharma**

- ✉️ Email: [gunjansharma9971@gmail.com](mailto:gunjansharma9971@gmail.com)
- 🐙 GitHub: [github.com/Gunjansharma003](https://github.com/Gunjansharma003)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <strong>Gunjan Sharma</strong> · Built for <a href="https://digitalheroesco.com">Digital Heroes</a>
</p>
