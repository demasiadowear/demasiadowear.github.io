#!/usr/bin/env python3
from PIL import Image
import os
import sys

def convert_to_webp(input_path, output_path, quality=80):
    """
    Converte un'immagine in formato WebP con la qualità specificata.
    Restituisce le dimensioni originali e ottimizzate.
    """
    try:
        img = Image.open(input_path)
        
        # Salva in formato WebP
        img.save(output_path, 'WEBP', quality=quality)
        
        # Calcola le dimensioni dei file
        original_size = os.path.getsize(input_path)
        webp_size = os.path.getsize(output_path)
        
        # Calcola la percentuale di riduzione
        reduction = (1 - webp_size / original_size) * 100
        
        return {
            'original_size': original_size,
            'webp_size': webp_size,
            'reduction_percent': reduction
        }
    except Exception as e:
        print(f"Errore nella conversione di {input_path}: {e}")
        return None

def process_directory(input_dir, output_dir, quality=80):
    """
    Processa tutte le immagini in una directory e le converte in WebP.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    results = []
    
    for root, _, files in os.walk(input_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                # Costruisci i percorsi
                rel_path = os.path.relpath(root, input_dir)
                input_path = os.path.join(root, file)
                
                # Crea la directory di output se non esiste
                output_subdir = os.path.join(output_dir, rel_path)
                if not os.path.exists(output_subdir):
                    os.makedirs(output_subdir)
                
                # Costruisci il percorso di output
                output_filename = os.path.splitext(file)[0] + '.webp'
                output_path = os.path.join(output_subdir, output_filename)
                
                # Converti l'immagine
                result = convert_to_webp(input_path, output_path, quality)
                if result:
                    result['input_path'] = input_path
                    result['output_path'] = output_path
                    results.append(result)
    
    return results

if __name__ == "__main__":
    # Directory di input e output
    input_dir = "/home/ubuntu/d3masiado_optimized/images"
    output_dir = "/home/ubuntu/d3masiado_optimized/images/webp"
    
    # Qualità WebP (0-100)
    quality = 80
    
    # Processa le immagini
    results = process_directory(input_dir, output_dir, quality)
    
    # Stampa i risultati
    total_original = sum(r['original_size'] for r in results)
    total_webp = sum(r['webp_size'] for r in results)
    total_reduction = (1 - total_webp / total_original) * 100 if total_original > 0 else 0
    
    print(f"\nRisultati ottimizzazione immagini:")
    print(f"Immagini processate: {len(results)}")
    print(f"Dimensione originale totale: {total_original / 1024:.2f} KB")
    print(f"Dimensione WebP totale: {total_webp / 1024:.2f} KB")
    print(f"Riduzione totale: {total_reduction:.2f}%")
    
    # Stampa dettagli per ogni immagine
    print("\nDettagli per immagine:")
    for r in results:
        print(f"{os.path.basename(r['input_path'])}: {r['original_size'] / 1024:.2f} KB -> {r['webp_size'] / 1024:.2f} KB ({r['reduction_percent']:.2f}% riduzione)")
