# ORSC Website

Operations Research Society Club Website - Built with Vite

## 🚀 Quick Start

### Development Server
Start the development server with hot reload:
```bash
npm run dev
```
Then open http://localhost:5173 in your browser.

### Build for Production
Create an optimized production build:
```bash
npm run build
```
This creates a `dist/` folder with:
- Minified CSS and JavaScript
- Optimized assets
- Production-ready files

### Preview Production Build
Test the production build locally:
```bash
npm run preview
```

## 📦 What Vite Does

Vite automatically:
- ✅ **Minifies** all CSS and JavaScript
- ✅ **Optimizes** images and assets
- ✅ **Bundles** code for production
- ✅ **Hot reload** during development
- ✅ **Tree-shaking** to remove unused code
- ✅ **Code splitting** for faster loading

## 🛠️ Development Workflow

1. **During Development**:
   ```bash
   npm run dev
   ```
   - Edit files in the root directory
   - Changes auto-refresh in browser
   - Fast hot module replacement (HMR)

2. **Before Deployment**:
   ```bash
   npm run build
   ```
   - Vite creates optimized `dist/` folder
   - All files minified and optimized
   - Ready for production

3. **Deploy**:
   - Upload everything in the `dist/` folder to your web host
   - That's it! 🎉

## 📊 Performance Benefits

Vite's build typically achieves:
- **CSS**: 40-60% smaller
- **JavaScript**: 30-50% smaller  
- **Images**: Automatically optimized
- **Load time**: Significantly faster

## 🌐 Deployment

After running `npm run build`, deploy the `dist/` folder to:
- **GitHub Pages**: Use the `dist/` folder
- **Netlify**: Point to `dist/` as publish directory
- **Vercel**: Auto-detects Vite projects
- **Any hosting**: Upload contents of `dist/`

## 📝 Project Structure

```
orsc-website/
├── index.html          # Main HTML file
├── main.css           # Main styles
├── main.js            # Main JavaScript
├── particles.js       # Particle animation
├── enhanced.js        # Enhanced features
├── css/               # Design system CSS
├── assets/            # Images and icons
├── dist/              # Production build (generated)
└── package.json       # Dependencies
```

## 🔧 Installation

If you clone this repo, install dependencies:
```bash
npm install
```

Then start developing:
```bash
npm run dev
```