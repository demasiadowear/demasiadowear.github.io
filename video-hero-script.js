/**
 * D3MAS1ADØ Video Hero Script
 * 
 * Questo script gestisce il video hero in loop nella homepage
 * Caratteristiche:
 * - Autoplay muto
 * - Loop continuo
 * - Precaricamento per performance ottimale
 * - Fallback per browser che non supportano video
 * - Effetto glitch sul testo sovrapposto
 */

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi
    const heroVideo = document.querySelector('.hero-video');
    const heroTitle = document.querySelector('.hero-title');
    const heroCta = document.querySelector('.hero-cta');
    
    // Funzione per gestire il caricamento del video
    function setupHeroVideo() {
        if (heroVideo) {
            // Assicurarsi che il video sia muto per l'autoplay
            heroVideo.muted = true;
            
            // Gestire l'evento di caricamento
            heroVideo.addEventListener('loadeddata', function() {
                // Rimuovere la classe preload dal body quando il video è caricato
                document.body.classList.remove('preload');
                
                // Aggiungere classe per animazioni
                setTimeout(() => {
                    heroTitle.classList.add('active');
                    setTimeout(() => {
                        heroCta.classList.add('active');
                    }, 800);
                }, 500);
            });
            
            // Gestire errori di caricamento
            heroVideo.addEventListener('error', function() {
                console.error('Errore nel caricamento del video hero');
                // Mostrare fallback
                document.querySelector('.hero-video-container').classList.add('video-fallback');
                document.body.classList.remove('preload');
            });
            
            // Tentare di riprodurre il video
            heroVideo.play().catch(function(error) {
                console.warn('Autoplay non supportato:', error);
                // Mostrare controlli se l'autoplay fallisce
                heroVideo.controls = true;
                document.body.classList.remove('preload');
            });
        }
    }
    
    // Effetto glitch sul testo hero
    function setupGlitchEffect() {
        if (heroTitle) {
            // Intensità dell'effetto glitch
            let glitchIntensity = 0;
            
            // Funzione per applicare l'effetto glitch
            function applyGlitch() {
                // Variare l'intensità casualmente
                glitchIntensity = Math.random() * 10;
                
                if (glitchIntensity > 9.7) {
                    // Glitch forte
                    heroTitle.style.textShadow = `
                        ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 255, 0, 0.7),
                        ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(255, 0, 0, 0.7)
                    `;
                    heroTitle.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                } else if (glitchIntensity > 9) {
                    // Glitch medio
                    heroTitle.style.textShadow = `
                        ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 rgba(0, 255, 0, 0.5),
                        ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 rgba(255, 0, 0, 0.5)
                    `;
                    heroTitle.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
                } else {
                    // Nessun glitch
                    heroTitle.style.textShadow = '0 0 10px rgba(0, 255, 0, 0.7)';
                    heroTitle.style.transform = 'translate(0, 0)';
                }
                
                // Programmare il prossimo glitch
                setTimeout(applyGlitch, 50 + Math.random() * 200);
            }
            
            // Avviare l'effetto glitch
            applyGlitch();
            
            // Aumentare l'intensità del glitch al passaggio del mouse
            heroTitle.addEventListener('mouseover', function() {
                glitchIntensity = 9.5;
            });
            
            // Ripristinare l'intensità normale quando il mouse esce
            heroTitle.addEventListener('mouseout', function() {
                glitchIntensity = 0;
            });
        }
    }
    
    // Effetto hover sul CTA
    function setupCtaEffect() {
        if (heroCta) {
            heroCta.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#00ff00';
                this.style.color = '#000000';
                this.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.7)';
            });
            
            heroCta.addEventListener('mouseout', function() {
                this.style.backgroundColor = 'transparent';
                this.style.color = '#00ff00';
                this.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.3)';
            });
        }
    }
    
    // Inizializzare tutto
    setupHeroVideo();
    setupGlitchEffect();
    setupCtaEffect();
});
