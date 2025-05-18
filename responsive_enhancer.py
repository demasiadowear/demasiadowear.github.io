#!/usr/bin/env python3
from bs4 import BeautifulSoup
import os
import re

def implement_responsive_enhancements(input_file, output_file):
    """
    Implementa miglioramenti responsive avanzati nel file HTML:
    - Header fluido con CTA sempre accessibili
    - Ottimizzazione per touch su mobile
    - Meta viewport ottimizzato
    - Media queries per tutti i breakpoint
    """
    with open(input_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Parsing HTML
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Aggiungi meta viewport ottimizzato
    head = soup.head
    viewport_meta = soup.find('meta', attrs={'name': 'viewport'})
    if viewport_meta:
        viewport_meta['content'] = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0'
    
    # Aggiungi script per gestione touch
    touch_script = soup.new_tag('script')
    touch_script.string = """
    document.addEventListener('DOMContentLoaded', function() {
      // Migliora esperienza touch su mobile
      const touchElements = document.querySelectorAll('.touch-target');
      touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
          this.classList.add('touch-active');
        });
        el.addEventListener('touchend', function() {
          this.classList.remove('touch-active');
        });
      });
      
      // Header fluido con scroll
      const header = document.querySelector('header');
      let lastScrollTop = 0;
      
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scroll verso il basso
          header.classList.add('header-compact');
        } else {
          // Scroll verso l'alto
          header.classList.remove('header-compact');
        }
        
        lastScrollTop = scrollTop;
      });
      
      // Assicura CTA sempre visibili
      const ctaButtons = document.querySelectorAll('.cta-button');
      if (ctaButtons.length > 0 && window.innerWidth < 768) {
        const ctaContainer = document.createElement('div');
        ctaContainer.className = 'mobile-cta-container';
        document.body.appendChild(ctaContainer);
        
        // Clona il primo CTA button per la versione mobile sticky
        const primaryCta = ctaButtons[0].cloneNode(true);
        primaryCta.classList.add('mobile-sticky-cta');
        ctaContainer.appendChild(primaryCta);
      }
    });
    """
    head.append(touch_script)
    
    # Aggiungi CSS responsive avanzato
    responsive_style = soup.new_tag('style')
    responsive_style.string = """
    /* Responsive CSS avanzato */
    
    /* Base mobile-first */
    body {
      font-size: 16px;
      line-height: 1.5;
      -webkit-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      touch-action: manipulation;
    }
    
    /* Header fluido */
    header {
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: all 0.3s ease;
      padding: 1.5rem 1rem;
      background-color: rgba(0, 0, 0, 0.95);
    }
    
    .header-compact {
      padding: 0.75rem 1rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    /* Miglioramento target touch */
    .touch-target {
      min-height: 44px;
      min-width: 44px;
      padding: 0.5rem;
      cursor: pointer;
    }
    
    .touch-active {
      opacity: 0.7;
    }
    
    /* CTA sempre visibili su mobile */
    .mobile-cta-container {
      display: none;
    }
    
    @media (max-width: 767px) {
      .mobile-cta-container {
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
      }
      
      .mobile-sticky-cta {
        display: block;
        width: 100%;
        padding: 1rem;
        text-align: center;
        background-color: #39FF14;
        color: #000000;
        font-weight: bold;
        border-radius: 4px;
        text-transform: uppercase;
      }
      
      /* Aggiungi padding al body per evitare che il contenuto venga nascosto dal CTA sticky */
      body {
        padding-bottom: 80px;
      }
    }
    
    /* Breakpoint tablet */
    @media (min-width: 768px) and (max-width: 1023px) {
      body {
        font-size: 17px;
      }
      
      header {
        padding: 1.25rem 2rem;
      }
      
      .header-compact {
        padding: 0.75rem 2rem;
      }
    }
    
    /* Breakpoint desktop */
    @media (min-width: 1024px) {
      body {
        font-size: 18px;
      }
      
      header {
        padding: 1.5rem 3rem;
      }
      
      .header-compact {
        padding: 1rem 3rem;
      }
    }
    
    /* Breakpoint large desktop */
    @media (min-width: 1440px) {
      .container {
        max-width: 1320px;
        margin: 0 auto;
      }
    }
    
    /* Ottimizzazioni per orientamento */
    @media (orientation: landscape) and (max-height: 500px) {
      .header {
        padding: 0.5rem 1rem;
      }
      
      .mobile-cta-container {
        padding: 0.5rem;
      }
      
      .mobile-sticky-cta {
        padding: 0.5rem;
      }
    }
    """
    head.append(responsive_style)
    
    # Scrivi il file ottimizzato
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    return True

def create_responsive_css(output_dir):
    """
    Crea un file CSS responsive avanzato separato
    """
    css_content = """
    /* D3MAS1ADØ Responsive CSS */
    
    /* Variabili CSS */
    :root {
      --color-black: #000000;
      --color-neon-green: #39FF14;
      --font-primary: 'Orbitron', sans-serif;
      --font-secondary: 'Arial', sans-serif;
      --header-height-mobile: 60px;
      --header-height-tablet: 70px;
      --header-height-desktop: 80px;
      --transition-fast: 0.2s ease;
      --transition-normal: 0.3s ease;
      --transition-slow: 0.5s ease;
    }
    
    /* Reset e base */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    html {
      font-size: 16px;
      scroll-behavior: smooth;
    }
    
    body {
      font-family: var(--font-primary);
      color: white;
      background-color: var(--color-black);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Grid system responsive */
    .container {
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
    
    .row {
      display: flex;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
    }
    
    .col {
      position: relative;
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
    }
    
    /* Classi di utilità responsive */
    .d-none {
      display: none !important;
    }
    
    .d-block {
      display: block !important;
    }
    
    .d-flex {
      display: flex !important;
    }
    
    /* Spaziatura responsive */
    .mt-1 { margin-top: 0.25rem !important; }
    .mt-2 { margin-top: 0.5rem !important; }
    .mt-3 { margin-top: 1rem !important; }
    .mt-4 { margin-top: 1.5rem !important; }
    .mt-5 { margin-top: 3rem !important; }
    
    .mb-1 { margin-bottom: 0.25rem !important; }
    .mb-2 { margin-bottom: 0.5rem !important; }
    .mb-3 { margin-bottom: 1rem !important; }
    .mb-4 { margin-bottom: 1.5rem !important; }
    .mb-5 { margin-bottom: 3rem !important; }
    
    .py-1 { padding-top: 0.25rem !important; padding-bottom: 0.25rem !important; }
    .py-2 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
    .py-3 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
    .py-4 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
    .py-5 { padding-top: 3rem !important; padding-bottom: 3rem !important; }
    
    .px-1 { padding-left: 0.25rem !important; padding-right: 0.25rem !important; }
    .px-2 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
    .px-3 { padding-left: 1rem !important; padding-right: 1rem !important; }
    .px-4 { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
    .px-5 { padding-left: 3rem !important; padding-right: 3rem !important; }
    
    /* Breakpoint specifici */
    @media (min-width: 576px) {
      .container {
        max-width: 540px;
      }
      
      .d-sm-none {
        display: none !important;
      }
      
      .d-sm-block {
        display: block !important;
      }
      
      .d-sm-flex {
        display: flex !important;
      }
      
      .col-sm-6 {
        flex: 0 0 50%;
        max-width: 50%;
      }
      
      .col-sm-12 {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
    
    @media (min-width: 768px) {
      .container {
        max-width: 720px;
      }
      
      .d-md-none {
        display: none !important;
      }
      
      .d-md-block {
        display: block !important;
      }
      
      .d-md-flex {
        display: flex !important;
      }
      
      .col-md-4 {
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
      }
      
      .col-md-6 {
        flex: 0 0 50%;
        max-width: 50%;
      }
      
      .col-md-8 {
        flex: 0 0 66.666667%;
        max-width: 66.666667%;
      }
      
      .col-md-12 {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
    
    @media (min-width: 992px) {
      .container {
        max-width: 960px;
      }
      
      .d-lg-none {
        display: none !important;
      }
      
      .d-lg-block {
        display: block !important;
      }
      
      .d-lg-flex {
        display: flex !important;
      }
      
      .col-lg-3 {
        flex: 0 0 25%;
        max-width: 25%;
      }
      
      .col-lg-4 {
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
      }
      
      .col-lg-6 {
        flex: 0 0 50%;
        max-width: 50%;
      }
      
      .col-lg-8 {
        flex: 0 0 66.666667%;
        max-width: 66.666667%;
      }
      
      .col-lg-9 {
        flex: 0 0 75%;
        max-width: 75%;
      }
    }
    
    @media (min-width: 1200px) {
      .container {
        max-width: 1140px;
      }
    }
    
    /* Ottimizzazioni touch */
    @media (hover: none) {
      /* Stili specifici per dispositivi touch */
      .touch-target {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* Aumenta dimensione pulsanti per facilità di tocco */
      button, 
      .btn,
      .nav-link,
      .touch-target {
        padding: 0.75rem 1rem;
      }
    }
    
    /* Ottimizzazioni per orientamento */
    @media (orientation: landscape) and (max-height: 500px) {
      /* Stili per dispositivi mobili in landscape con altezza ridotta */
      .header {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      
      .section {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    }
    """
    
    with open(os.path.join(output_dir, 'assets', 'responsive.css'), 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    return True

def main():
    # Directory di input e output
    input_dir = "/home/ubuntu/d3masiado_optimized"
    
    # Implementa miglioramenti responsive
    implement_responsive_enhancements(os.path.join(input_dir, 'index.html'), os.path.join(input_dir, 'index.html'))
    print("HTML responsive avanzato implementato con successo")
    
    # Crea CSS responsive separato
    create_responsive_css(input_dir)
    print("CSS responsive avanzato creato con successo")
    
    print("\nImplementazione responsive avanzato completata con successo!")

if __name__ == "__main__":
    main()
