# 🔗 URL Shortener - Professional Edition

A **beautiful, modern, and professional** URL shortening service built with Next.js, TypeScript, and Prisma. Features a stunning UI with smooth CSS animations, comprehensive analytics, and enterprise-grade Docker deployment.

## ✨ **Features**

- **🎨 Beautiful Modern UI**: Stunning design with smooth CSS animations and gradients
- **⚡ Lightning Fast**: Optimized performance with Next.js 15 and Turbopack
- **📊 Analytics Dashboard**: Track clicks, view statistics, and monitor performance
- **🔒 Enterprise Ready**: Production-grade Docker setup with health checks
- **📱 Responsive Design**: Works perfectly on all devices
- **🔄 Real-time Updates**: Live statistics and instant feedback
- **🎯 Smart URL Handling**: Duplicate prevention and validation
- **📈 Click Tracking**: Monitor engagement and performance
- **🌐 Production Ready**: Automatic domain detection for live URLs

## 🚀 **Tech Stack**

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, CSS Animations
- **Backend**: Next.js API Routes, Prisma ORM, RESTful APIs
- **Database**: SQLite (development) / PostgreSQL (production)
- **Deployment**: Docker, Docker Compose, Health Checks
- **Styling**: Modern gradients, glassmorphism, responsive design

## 📋 **Requirements**

- Node.js 18+ 
- npm or yarn
- Docker & Docker Compose (for production)

## 🛠️ **Quick Start**

### **Development Mode**
```bash
# Clone and install
git clone <your-repo-url>
cd url-shortener
npm install

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### **Production with Docker**
```bash
# Deploy with one command
./deploy.sh

# Or manually
docker-compose up -d
```

## 🚀 **Deploy no Vercel (RECOMENDADO)**

### **1. Push para GitHub**
```bash
git add .
git commit -m "URL Shortener Professional Edition"
git push origin main
```

### **2. Conectar ao Vercel**
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório do GitHub
4. Configure as variáveis de ambiente:

```env
# Optional: Override domain detection
# NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
# 
# If not set, the app automatically detects the domain
DATABASE_URL=your-database-url
```

### **3. Deploy Automático**
- ✅ O Vercel fará deploy automático
- ✅ URLs funcionarão com seu domínio real
- ✅ Sem mais localhost!

## 🐳 **Docker Deployment**

### **Development Environment**
```bash
docker-compose up -d
```

### **Production Environment**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### **Custom Deployment**
```bash
# Build image
docker build -t url-shortener .

# Run container
docker run -p 3000:3000 -e DATABASE_URL="file:./dev.db" url-shortener
```

## 🌐 **API Endpoints**

### **POST /api/shorten**
Creates a new shortened URL with validation.

**Request:**
```json
{
  "url": "https://example.com/very-long-url"
}
```

**Response:**
```json
{
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very-long-url",
  "shortUrl": "https://your-domain.vercel.app/abc123"
}
```

### **GET /:code**
Redirects to original URL and tracks clicks.

### **GET /api/urls**
Returns comprehensive URL analytics.

## 🎨 **UI Features**

- **Smooth Animations**: CSS-powered transitions and effects
- **Glassmorphism Design**: Modern glass-like effects
- **Gradient Backgrounds**: Beautiful color schemes
- **Responsive Layout**: Mobile-first design approach
- **Interactive Elements**: Hover effects and micro-interactions
- **Loading States**: Elegant loading animations
- **Error Handling**: User-friendly error messages

## 🚀 **Deployment Options**

### **Vercel (RECOMENDADO)**
- ✅ **Deploy automático** com GitHub
- ✅ **Domínio real** (sem localhost)
- ✅ **SSL gratuito** e CDN global
- ✅ **Escalabilidade automática**
- ✅ **Zero configuração**

### **Docker Production**
- **Health Checks**: Automatic monitoring
- **SQLite**: Simple file-based database
- **Production Ready**: Optimized for deployment

### **Other Platforms**
- **Netlify**: Serverless deployment
- **AWS**: ECS/Fargate with Docker
- **Railway**: Simple container deployment

## 🔧 **Environment Variables**

```env
# Development
DATABASE_URL="file:./dev.db"

# Production (Vercel)
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
DATABASE_URL="your-production-database-url"
NODE_ENV="production"
```

## 📁 **Project Structure**

```
src/
├── app/
│   ├── api/                    # API endpoints
│   ├── [code]/                 # Redirect handler
│   ├── globals.css             # Global styles + animations
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── UrlShortener.tsx        # Main form (elegant)
│   └── UrlStats.tsx            # Analytics table
├── prisma/
│   └── schema.prisma           # Database schema
├── Dockerfile                  # Production Docker
├── docker-compose.yml          # Development setup
├── docker-compose.prod.yml     # Production setup
├── vercel.json                 # Vercel configuration
└── deploy.sh                   # Deploy script
```

## 🧪 **Testing**

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Docker testing
docker-compose up -d
curl http://localhost:3000/api/urls
```

## 🔒 **Security Features**

- **Rate Limiting**: API protection against abuse
- **Input Validation**: URL format validation
- **SQL Injection Protection**: Prisma ORM safety
- **Security Headers**: XSS, CSRF protection
- **Environment Isolation**: Separate dev/prod configs

## 📊 **Performance Features**

- **Next.js 15**: Latest performance optimizations
- **Turbopack**: Fast development builds
- **Standalone Output**: Optimized Docker images
- **CSS Animations**: Hardware-accelerated effects
- **Health Checks**: Automatic monitoring

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🙏 **Acknowledgments**

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with CSS3 animations
- Database management with [Prisma](https://prisma.io/)

---

**Built with ❤️ and 🎨 by [Your Name]**

*Professional URL shortening service for modern businesses*
