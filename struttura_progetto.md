# Struttura del Progetto Next.js per D3MAS1ADØ

Questo documento descrive la struttura delle cartelle e dei file per il progetto Next.js del sito D3MAS1ADØ, seguendo le best practices per un'applicazione e-commerce moderna con integrazione CMS headless.

## Struttura Principale

```
D3MASIADO-website/
├── public/               # File statici accessibili pubblicamente
│   ├── fonts/            # Font Orbitron e sans-serif grotesk
│   ├── images/           # Immagini statiche
│   │   ├── logo/         # Logo D3MAS1ADØ (versioni varie)
│   │   ├── lana/         # Immagini di Lana
│   │   └── ui/           # Elementi UI statici
│   └── favicon.ico       # Favicon del sito
│
├── src/                  # Codice sorgente dell'applicazione
│   ├── app/              # App Router di Next.js
│   │   ├── layout.tsx    # Layout principale
│   │   ├── page.tsx      # Homepage
│   │   ├── shop/         # Sezione shop
│   │   │   ├── page.tsx  # Pagina principale shop
│   │   │   ├── [collection]/
│   │   │   │   └── page.tsx  # Pagina collezione
│   │   │   └── product/
│   │   │       └── [slug]/
│   │   │           └── page.tsx  # Pagina prodotto
│   │   ├── manifesto/    # Sezione manifesto
│   │   │   └── page.tsx  # Pagina manifesto
│   │   ├── lookbook/     # Sezione lookbook
│   │   │   └── page.tsx  # Pagina lookbook
│   │   ├── unidad-310/   # Area riservata
│   │   │   └── page.tsx  # Pagina login area riservata
│   │   └── about/        # Sezione about/contatti
│   │       └── page.tsx  # Pagina about/contatti
│   │
│   ├── components/       # Componenti React riutilizzabili
│   │   ├── ui/           # Componenti UI base
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   ├── layout/       # Componenti di layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   ├── shop/         # Componenti specifici per lo shop
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── AddToCart.tsx
│   │   │   └── ...
│   │   ├── lookbook/     # Componenti per il lookbook
│   │   │   ├── Gallery.tsx
│   │   │   └── ...
│   │   ├── manifesto/    # Componenti per il manifesto
│   │   │   ├── ScrollableText.tsx
│   │   │   └── ...
│   │   ├── unidad310/    # Componenti per area riservata
│   │   │   ├── Login.tsx
│   │   │   └── ...
│   │   └── chatbot/      # Componenti per Lana AI chatbot
│   │       ├── ChatBox.tsx
│   │       ├── ChatMessage.tsx
│   │       └── ...
│   │
│   ├── lib/              # Librerie e utility
│   │   ├── sanity/       # Configurazione e client Sanity
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── config.ts
│   │   ├── stripe/       # Configurazione Stripe
│   │   │   ├── client.ts
│   │   │   └── checkout.ts
│   │   ├── paypal/       # Configurazione PayPal
│   │   │   └── client.ts
│   │   ├── analytics/    # Configurazione analytics
│   │   │   ├── ga4.ts
│   │   │   └── meta-pixel.ts
│   │   └── utils/        # Utility generiche
│   │       ├── animations.ts
│   │       ├── formatters.ts
│   │       └── ...
│   │
│   ├── hooks/            # Custom React hooks
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   └── ...
│   │
│   ├── store/            # State management (Zustand)
│   │   ├── cartStore.ts
│   │   ├── uiStore.ts
│   │   └── ...
│   │
│   ├── styles/           # Stili globali e configurazione Tailwind
│   │   ├── globals.css
│   │   └── ...
│   │
│   └── types/            # TypeScript type definitions
│       ├── product.ts
│       ├── collection.ts
│       └── ...
│
├── sanity/              # Configurazione Sanity Studio
│   ├── schemas/         # Schemi dati Sanity
│   │   ├── product.ts
│   │   ├── collection.ts
│   │   ├── manifesto.ts
│   │   ├── lookbook.ts
│   │   ├── unidad310.ts
│   │   └── index.ts
│   ├── desk/           # Configurazione dashboard Sanity
│   │   └── structure.ts
│   └── sanity.config.ts # Configurazione principale Sanity
│
├── .env                 # Variabili d'ambiente (non committate)
├── .env.example         # Template variabili d'ambiente
├── .eslintrc.json      # Configurazione ESLint
├── .gitignore          # File ignorati da Git
├── next.config.js      # Configurazione Next.js
├── package.json        # Dipendenze e script
├── postcss.config.js   # Configurazione PostCSS
├── tailwind.config.js  # Configurazione Tailwind CSS
└── tsconfig.json       # Configurazione TypeScript
```

## Dipendenze Principali

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "@sanity/client": "^6.4.0",
    "@sanity/image-url": "^1.0.2",
    "@stripe/stripe-js": "^2.1.0",
    "@paypal/react-paypal-js": "^8.1.3",
    "zustand": "^4.4.1",
    "tailwindcss": "^3.3.3",
    "postcss": "^8.4.29",
    "autoprefixer": "^10.4.15",
    "clsx": "^2.0.0",
    "tailwind-merge": "^1.14.0"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "@types/react": "^18.2.21",
    "@types/node": "^20.6.0",
    "eslint": "^8.49.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.3"
  }
}
```

## Configurazione Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Modalità scura nativa
  theme: {
    extend: {
      colors: {
        'dem-black': '#000000',
        'dem-white': '#FFFFFF',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #000, 0 0 20px #000' },
          '100%': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #000, 0 0 40px #000' },
        },
      },
    },
  },
  plugins: [],
}
```

## Configurazione Next.js

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Per le immagini da Sanity
  },
  experimental: {
    serverActions: true, // Per le azioni server di Next.js
  },
}

module.exports = nextConfig
```

## Configurazione Sanity

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './desk/structure'

export default defineConfig({
  name: 'D3MASIADO',
  title: 'D3MAS1ADØ Admin',
  projectId: 'your-project-id', // Da sostituire con l'ID progetto Sanity
  dataset: 'production',
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      // Componenti personalizzati per Sanity Studio
    },
  },
})
```

## Stili Globali

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-dem-black text-dem-white font-grotesk;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-orbitron;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 font-orbitron uppercase transition-all duration-300;
  }
  
  .btn-primary {
    @apply btn bg-dem-white text-dem-black hover:bg-opacity-80;
  }
  
  .btn-secondary {
    @apply btn border border-dem-white text-dem-white hover:bg-dem-white hover:text-dem-black;
  }
  
  .glitch-effect {
    @apply relative;
  }
  
  .glitch-effect::before,
  .glitch-effect::after {
    @apply content-[''] absolute top-0 left-0 w-full h-full;
  }
  
  .glitch-effect::before {
    @apply text-dem-white opacity-70 animate-glitch;
    clip: rect(44px, 450px, 56px, 0);
  }
  
  .glitch-effect::after {
    @apply text-dem-white opacity-70 animate-glitch;
    clip: rect(44px, 450px, 56px, 0);
    animation-delay: 0.5s;
  }
}

/* Font imports */
@font-face {
  font-family: 'Orbitron';
  src: url('/fonts/Orbitron-Regular.woff2') format('woff2'),
       url('/fonts/Orbitron-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Orbitron';
  src: url('/fonts/Orbitron-Bold.woff2') format('woff2'),
       url('/fonts/Orbitron-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Regular.woff2') format('woff2'),
       url('/fonts/SpaceGrotesk-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Bold.woff2') format('woff2'),
       url('/fonts/SpaceGrotesk-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

## Componenti Base

### Layout Principale

```tsx
// src/app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatBot from '@/components/chatbot/ChatBox'
import { Analytics } from '@/components/Analytics'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'D3MAS1ADØ - L\'unico modo che conosciamo',
  description: 'Sito ufficiale del brand D3MAS1ADØ, urban-luxury multiculturale',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatBot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Header Component

```tsx
// src/components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Manifesto', href: '/manifesto' },
    { name: 'Lookbook', href: '/lookbook' },
    { name: 'Unidad-31Ø', href: '/unidad-310' },
    { name: 'About', href: '/about' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dem-black bg-opacity-90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="relative">
          <motion.div
            className="glitch-effect"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Image 
              src="/images/logo/logo-white.svg" 
              alt="D3MAS1ADØ Logo" 
              width={150} 
              height={40} 
              className="h-10 w-auto"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`font-orbitron text-sm uppercase tracking-wider hover:opacity-70 transition-opacity ${
                pathname === item.href ? 'text-dem-white' : 'text-dem-white/70'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-dem-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-dem-black absolute w-full"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`font-orbitron text-sm uppercase tracking-wider hover:opacity-70 transition-opacity ${
                    pathname === item.href ? 'text-dem-white' : 'text-dem-white/70'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <ThemeToggle />
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header
```

## Prossimi Passi

1. Inizializzare il progetto Next.js con la struttura definita
2. Configurare Tailwind CSS con il tema personalizzato
3. Implementare i componenti base UI
4. Configurare Sanity CMS e definire gli schemi
5. Sviluppare le pagine principali e i componenti specifici
6. Integrare le animazioni con Framer Motion
7. Implementare le funzionalità e-commerce e di tracking
