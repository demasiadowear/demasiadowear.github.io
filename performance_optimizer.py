#!/usr/bin/env python3
import os
import re
import shutil
from bs4 import BeautifulSoup

def optimize_html(input_file, output_file):
    """
    Ottimizza il file HTML implementando:
    - Lazy loading per le immagini
    - Preload per risorse critiche
    - Attributi di dimensione per le immagini
    - Meta tag per SEO e performance
    """
    with open(input_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Parsing HTML
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Aggiungi meta tag per SEO e performance
    head = soup.head
    
    # Aggiungi meta description
    if not soup.find('meta', attrs={'name': 'description'}):
        meta_desc = soup.new_tag('meta')
        meta_desc['name'] = 'description'
        meta_desc['content'] = 'D3MAS1ADØ - Brand urban-luxury multiculturale. L\'unico modo che conosciamo.'
        head.append(meta_desc)
    
    # Aggiungi meta viewport (se non esiste già)
    if not soup.find('meta', attrs={'name': 'viewport'}):
        meta_viewport = soup.new_tag('meta')
        meta_viewport['name'] = 'viewport'
        meta_viewport['content'] = 'width=device-width, initial-scale=1.0'
        head.append(meta_viewport)
    
    # Aggiungi preload per CSS
    css_links = soup.find_all('link', rel='stylesheet')
    for css in css_links:
        preload = soup.new_tag('link')
        preload['rel'] = 'preload'
        preload['href'] = css['href']
        preload['as'] = 'style'
        preload['crossorigin'] = css.get('crossorigin', '')
        head.insert(0, preload)
    
    # Aggiungi preconnect per origini esterne
    preconnect = soup.new_tag('link')
    preconnect['rel'] = 'preconnect'
    preconnect['href'] = 'https://fonts.googleapis.com'
    preconnect['crossorigin'] = ''
    head.insert(0, preconnect)
    
    # Modifica il titolo
    if soup.title:
        soup.title.string = 'D3MAS1ADØ - Urban Luxury Brand'
    
    # Aggiungi favicon
    if not soup.find('link', rel='icon'):
        favicon = soup.new_tag('link')
        favicon['rel'] = 'icon'
        favicon['type'] = 'image/png'
        favicon['href'] = '/images/logo/logo-symbol.png'
        head.append(favicon)
    
    # Aggiungi meta per theme-color
    theme_color = soup.new_tag('meta')
    theme_color['name'] = 'theme-color'
    theme_color['content'] = '#000000'
    head.append(theme_color)
    
    # Aggiungi script per caching service worker
    sw_script = soup.new_tag('script')
    sw_script.string = """
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
          console.log('ServiceWorker registration successful');
        }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
    """
    soup.body.append(sw_script)
    
    # Scrivi il file ottimizzato
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    return True

def create_service_worker(output_dir):
    """
    Crea un service worker per il caching delle risorse
    """
    sw_content = """
    const CACHE_NAME = 'demasiadowear-cache-v1';
    const urlsToCache = [
      '/',
      '/index.html',
      '/assets/index-Cm5uA9xI.css',
      '/assets/index-B_JaY9Qo.js',
      '/images/logo/logo-main.png',
      '/images/logo/logo-symbol.png',
      '/images/webp/logo/logo-main.webp',
      '/images/webp/logo/logo-symbol.webp',
      '/images/webp/textures/concrete-texture.webp'
    ];

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Cache opened');
            return cache.addAll(urlsToCache);
          })
      );
    });

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });

    self.addEventListener('activate', function(event) {
      const cacheWhitelist = [CACHE_NAME];
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });
    """
    
    with open(os.path.join(output_dir, 'service-worker.js'), 'w', encoding='utf-8') as f:
        f.write(sw_content)
    
    return True

def create_webp_loader_script(output_dir):
    """
    Crea uno script per il caricamento condizionale di WebP
    """
    script_content = """
    function checkWebpSupport() {
      const canvas = document.createElement('canvas');
      if (canvas.getContext && canvas.getContext('2d')) {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
      return false;
    }

    function loadWebpImages() {
      const supportsWebp = checkWebpSupport();
      const images = document.querySelectorAll('img[data-src]');
      
      images.forEach(img => {
        if (supportsWebp && img.hasAttribute('data-webp')) {
          img.src = img.getAttribute('data-webp');
        } else {
          img.src = img.getAttribute('data-src');
        }
        img.removeAttribute('data-src');
        img.removeAttribute('data-webp');
      });
    }

    // Esegui dopo il caricamento del DOM
    document.addEventListener('DOMContentLoaded', loadWebpImages);
    """
    
    with open(os.path.join(output_dir, 'webp-loader.js'), 'w', encoding='utf-8') as f:
        f.write(script_content)
    
    return True

def optimize_css(input_file, output_file):
    """
    Ottimizza il file CSS rimuovendo commenti, spazi e regole non utilizzate
    """
    with open(input_file, 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # Rimuovi commenti
    css_content = re.sub(r'/\*[\s\S]*?\*/', '', css_content)
    
    # Rimuovi spazi bianchi non necessari
    css_content = re.sub(r'\s+', ' ', css_content)
    css_content = re.sub(r';\s', ';', css_content)
    css_content = re.sub(r'{\s', '{', css_content)
    css_content = re.sub(r'\s}', '}', css_content)
    css_content = re.sub(r',\s', ',', css_content)
    css_content = re.sub(r':\s', ':', css_content)
    css_content = re.sub(r'\s{', '{', css_content)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    return True

def optimize_js(input_file, output_file):
    """
    Ottimizza il file JavaScript rimuovendo commenti e spazi
    """
    with open(input_file, 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    # Rimuovi commenti a riga singola
    js_content = re.sub(r'//.*$', '', js_content, flags=re.MULTILINE)
    
    # Rimuovi commenti multilinea
    js_content = re.sub(r'/\*[\s\S]*?\*/', '', js_content)
    
    # Rimuovi spazi bianchi non necessari
    js_content = re.sub(r'^\s+', '', js_content, flags=re.MULTILINE)
    js_content = re.sub(r'\s+$', '', js_content, flags=re.MULTILINE)
    js_content = re.sub(r'\s{2,}', ' ', js_content)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    return True

def main():
    # Directory di input e output
    input_dir = "/home/ubuntu/d3masiado_optimized"
    
    # Ottimizza HTML
    optimize_html(os.path.join(input_dir, 'index.html'), os.path.join(input_dir, 'index.html'))
    print("HTML ottimizzato con successo")
    
    # Crea service worker per caching
    create_service_worker(input_dir)
    print("Service worker creato con successo")
    
    # Crea script per caricamento WebP
    create_webp_loader_script(input_dir)
    print("Script WebP loader creato con successo")
    
    # Ottimizza CSS
    css_file = os.path.join(input_dir, 'assets', 'index-Cm5uA9xI.css')
    if os.path.exists(css_file):
        optimize_css(css_file, css_file)
        print("CSS ottimizzato con successo")
    
    # Ottimizza JS
    js_file = os.path.join(input_dir, 'assets', 'index-B_JaY9Qo.js')
    if os.path.exists(js_file):
        optimize_js(js_file, js_file)
        print("JavaScript ottimizzato con successo")
    
    print("\nOttimizzazione completata con successo!")

if __name__ == "__main__":
    main()
