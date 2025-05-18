'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const ThemeProvider = ({
  children,
  attribute = 'class',
  defaultTheme = 'dark'
}: {
  children: React.ReactNode,
  attribute?: string,
  defaultTheme?: 'light' | 'dark'
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Recupera il tema dal localStorage o usa il default
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initialTheme = storedTheme || defaultTheme
    setTheme(initialTheme)
    
    // Applica il tema al documento
    if (attribute === 'class') {
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else {
      document.documentElement.setAttribute(attribute, initialTheme)
    }
    
    setMounted(true)
  }, [attribute, defaultTheme])

  // Evita il flash durante l'idratazione
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Context per il tema
type ThemeContextType = {
  theme: 'light' | 'dark',
  setTheme: (theme: 'light' | 'dark') => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

// Hook per usare il tema
export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
