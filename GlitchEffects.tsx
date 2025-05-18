'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Componente per l'effetto glitch sul testo
export const GlitchText = ({ 
  text, 
  className = '',
  intensity = 'medium' // 'low', 'medium', 'high'
}: { 
  text: string, 
  className?: string,
  intensity?: 'low' | 'medium' | 'high'
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  // Configurazione dell'intensità dell'effetto
  const intensityConfig = {
    low: {
      frequency: 0.3,
      duration: 0.8,
      offset: 2
    },
    medium: {
      frequency: 0.5,
      duration: 0.5,
      offset: 3
    },
    high: {
      frequency: 0.8,
      duration: 0.3,
      offset: 5
    }
  }
  
  const config = intensityConfig[intensity]
  
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Testo originale */}
      <span className="relative z-10">{text}</span>
      
      {/* Effetto glitch - solo quando hover o sempre attivo per intensità alta */}
      <AnimatePresence>
        {(isHovered || intensity === 'high') && (
          <>
            {/* Primo strato glitch */}
            <motion.span
              className="absolute top-0 left-0 text-dem-white opacity-70 z-0"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                textShadow: '1px 0 #fff'
              }}
              animate={{
                x: [0, -config.offset, config.offset, 0],
                y: [0, config.offset, -config.offset, 0]
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                times: [0, 0.33, 0.66, 1]
              }}
              exit={{ opacity: 0 }}
            >
              {text}
            </motion.span>
            
            {/* Secondo strato glitch */}
            <motion.span
              className="absolute top-0 left-0 text-dem-white opacity-70 z-0"
              style={{ 
                clipPath: 'polygon(0 45%, 100% 45%, 100% 100%, 0 100%)',
                textShadow: '-1px 0 #fff'
              }}
              animate={{
                x: [0, config.offset, -config.offset, 0],
                y: [0, -config.offset, config.offset, 0]
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                times: [0, 0.33, 0.66, 1],
                delay: 0.1
              }}
              exit={{ opacity: 0 }}
            >
              {text}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Componente per l'effetto glitch sulle immagini
export const GlitchImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  intensity = 'medium' // 'low', 'medium', 'high'
}: {
  src: string,
  alt: string,
  width: number,
  height: number,
  className?: string,
  intensity?: 'low' | 'medium' | 'high'
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  // Configurazione dell'intensità dell'effetto
  const intensityConfig = {
    low: {
      frequency: 0.3,
      duration: 1.5,
      offset: 3,
      opacity: 0.3
    },
    medium: {
      frequency: 0.5,
      duration: 1,
      offset: 5,
      opacity: 0.5
    },
    high: {
      frequency: 0.8,
      duration: 0.7,
      offset: 8,
      opacity: 0.7
    }
  }
  
  const config = intensityConfig[intensity]
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Immagine originale */}
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        className="relative z-10 w-full h-auto"
      />
      
      {/* Effetti glitch */}
      <AnimatePresence>
        {(isHovered || intensity === 'high') && (
          <>
            {/* Canale rosso */}
            <motion.img
              src={src}
              alt=""
              width={width}
              height={height}
              className="absolute top-0 left-0 w-full h-auto z-0"
              style={{ 
                mixBlendMode: 'multiply',
                filter: 'url(#redChannel)',
                opacity: config.opacity
              }}
              animate={{
                x: [0, -config.offset, config.offset, 0],
                y: [0, config.offset/2, -config.offset/2, 0]
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut'
              }}
              exit={{ opacity: 0 }}
            />
            
            {/* Canale blu */}
            <motion.img
              src={src}
              alt=""
              width={width}
              height={height}
              className="absolute top-0 left-0 w-full h-auto z-0"
              style={{ 
                mixBlendMode: 'multiply',
                filter: 'url(#blueChannel)',
                opacity: config.opacity
              }}
              animate={{
                x: [0, config.offset, -config.offset, 0],
                y: [0, -config.offset/2, config.offset/2, 0]
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay: 0.1
              }}
              exit={{ opacity: 0 }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* SVG Filters */}
      <svg width="0" height="0" className="absolute">
        <filter id="redChannel">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
          />
        </filter>
        <filter id="blueChannel">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
          />
        </filter>
      </svg>
    </div>
  )
}

// Componente per l'effetto neon glow
export const NeonText = ({
  text,
  className = '',
  color = 'white', // 'white', 'green'
  intensity = 'medium' // 'low', 'medium', 'high'
}: {
  text: string,
  className?: string,
  color?: 'white' | 'green',
  intensity?: 'low' | 'medium' | 'high'
}) => {
  // Configurazione dell'intensità dell'effetto
  const intensityConfig = {
    low: {
      blur: '2px',
      spread: '1px'
    },
    medium: {
      blur: '5px',
      spread: '2px'
    },
    high: {
      blur: '10px',
      spread: '4px'
    }
  }
  
  const colorConfig = {
    white: {
      primary: '#FFFFFF',
      glow: 'rgba(255, 255, 255, 0.8)'
    },
    green: {
      primary: '#39FF14',
      glow: 'rgba(57, 255, 20, 0.8)'
    }
  }
  
  const config = intensityConfig[intensity]
  const selectedColor = colorConfig[color]
  
  const textShadow = `0 0 ${config.blur} ${selectedColor.glow}, 0 0 ${config.spread} ${selectedColor.primary}`
  
  return (
    <motion.span
      className={`font-orbitron ${className}`}
      style={{ 
        color: selectedColor.primary,
        textShadow
      }}
      animate={{
        textShadow: [
          textShadow,
          `0 0 ${parseInt(config.blur) * 1.5}px ${selectedColor.glow}, 0 0 ${parseInt(config.spread) * 1.5}px ${selectedColor.primary}`,
          textShadow
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }}
    >
      {text}
    </motion.span>
  )
}
