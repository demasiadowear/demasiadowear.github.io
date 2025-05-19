/**
 * Configurazione modulo preorder Tally.so per D3MAS1ADØ
 * 
 * Questo script gestisce l'integrazione del modulo preorder Tally.so
 * e la sua personalizzazione secondo l'identità visiva del brand.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi
    const preorderSection = document.querySelector('#preorder');
    const preorderCta = document.querySelector('.preorder-cta');
    
    // Configurazione Tally.so
    const tallyConfig = {
        formId: 'mKLRJo', // ID placeholder, da sostituire con l'ID effettivo
        title: 'D3MAS1ADØ Preorder',
        fields: {
            nome: {
                required: true,
                label: 'Nome',
                placeholder: 'Il tuo nome'
            },
            email: {
                required: true,
                label: 'Email',
                placeholder: 'La tua email'
            },
            prodotto: {
                required: true,
                label: 'Prodotto',
                type: 'dropdown',
                options: [
                    'INTIFADA Hoodie - €120',
                    'REVOLUCIÓN Crop Top - €89',
                    'LAND OF SMILE T-shirt - €75',
                    'Unidad-31Ø Pants - €110'
                ]
            },
            taglia: {
                required: true,
                label: 'Taglia',
                type: 'dropdown',
                options: ['S', 'M', 'L', 'XL', 'XXL']
            },
            pagamento: {
                required: true,
                label: 'Metodo di pagamento',
                type: 'dropdown',
                options: ['PayPal', 'Revolut', 'Bonifico']
            }
        },
        successMessage: 'Riceverai una mail con le istruzioni per completare l\'acquisto. Ogni capo D3MAS1ADØ è parte di una rivoluzione. Tu ci sei dentro?',
        redirectUrl: 'https://www.demasiadowear.com/preorder-confirmation',
        theme: {
            backgroundColor: '#000000',
            fontColor: '#ffffff',
            buttonColor: '#00ff00',
            buttonTextColor: '#000000',
            font: 'Orbitron, sans-serif'
        }
    };
    
    // Funzione per caricare il modulo Tally.so
    function loadTallyForm() {
        // Creare container per il modulo
        const formContainer = document.createElement('div');
        formContainer.className = 'tally-form-container';
        formContainer.style.display = 'none';
        
        // Aggiungere al DOM
        if (preorderSection) {
            preorderSection.appendChild(formContainer);
        } else {
            document.body.appendChild(formContainer);
        }
        
        // Caricare lo script Tally
        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.onload = function() {
            // Inizializzare il modulo quando lo script è caricato
            if (window.Tally) {
                window.Tally.loadEmbedded({
                    formId: tallyConfig.formId,
                    container: formContainer,
                    hideTitle: false,
                    width: 100,
                    height: 500,
                    customCSS: `
                        .tally-form {
                            font-family: ${tallyConfig.theme.font};
                            background-color: ${tallyConfig.theme.backgroundColor};
                            color: ${tallyConfig.theme.fontColor};
                            border: 1px solid #00ff00;
                            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
                        }
                        .tally-submit-button {
                            background-color: ${tallyConfig.theme.buttonColor} !important;
                            color: ${tallyConfig.theme.buttonTextColor} !important;
                            font-family: ${tallyConfig.theme.font};
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            transition: all 0.3s ease;
                        }
                        .tally-submit-button:hover {
                            box-shadow: 0 0 15px rgba(0, 255, 0, 0.7);
                            transform: translateY(-2px);
                        }
                        .tally-form input, .tally-form select {
                            border: 1px solid #333;
                            background-color: #111;
                            color: #fff;
                            padding: 12px;
                        }
                        .tally-form input:focus, .tally-form select:focus {
                            border-color: #00ff00;
                            box-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
                        }
                    `
                });
            }
        };
        document.body.appendChild(script);
        
        return formContainer;
    }
    
    // Gestire il click sul pulsante preorder
    let formContainer = null;
    if (preorderCta) {
        preorderCta.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Caricare il modulo se non è già stato caricato
            if (!formContainer) {
                formContainer = loadTallyForm();
            }
            
            // Mostrare/nascondere il modulo
            if (formContainer.style.display === 'none') {
                formContainer.style.display = 'block';
                
                // Scrollare fino al modulo
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Cambiare testo del pulsante
                preorderCta.textContent = 'Chiudi modulo';
            } else {
                formContainer.style.display = 'none';
                preorderCta.textContent = 'Preordina ora';
            }
        });
    }
    
    // Configuratore di taglia smart
    function setupSizeConfigurator() {
        // Aggiungere il configuratore dopo il campo taglia
        const sizeHelper = document.createElement('div');
        sizeHelper.className = 'size-helper';
        sizeHelper.innerHTML = `
            <p class="size-helper-title">Non sei sicuro della taglia?</p>
            <div class="size-helper-question">
                <label>Che taglia porti in Zara?</label>
                <select class="zara-size-selector">
                    <option value="">Seleziona...</option>
                    <option value="S">XS</option>
                    <option value="M">S</option>
                    <option value="L">M</option>
                    <option value="XL">L</option>
                    <option value="XXL">XL</option>
                </select>
            </div>
            <p class="size-helper-result"></p>
        `;
        
        // Aggiungere al DOM dopo il caricamento del modulo
        setTimeout(() => {
            const tagliaCampo = document.querySelector('.tally-form [name="taglia"]');
            if (tagliaCampo) {
                tagliaCampo.parentNode.appendChild(sizeHelper);
                
                // Gestire la selezione della taglia Zara
                const zaraSelector = sizeHelper.querySelector('.zara-size-selector');
                const resultText = sizeHelper.querySelector('.size-helper-result');
                
                zaraSelector.addEventListener('change', function() {
                    const selectedSize = this.value;
                    if (selectedSize) {
                        resultText.textContent = `Per D3MAS1ADØ ti consigliamo la taglia ${selectedSize}`;
                        resultText.style.color = '#00ff00';
                        
                        // Selezionare automaticamente la taglia nel modulo
                        if (tagliaCampo.tagName === 'SELECT') {
                            tagliaCampo.value = selectedSize;
                            // Trigger change event
                            const event = new Event('change', { bubbles: true });
                            tagliaCampo.dispatchEvent(event);
                        }
                    } else {
                        resultText.textContent = '';
                    }
                });
            }
        }, 2000); // Attendere il caricamento del modulo
    }
    
    // Inizializzare il configuratore di taglia dopo il caricamento del modulo
    if (preorderCta) {
        preorderCta.addEventListener('click', function() {
            setTimeout(setupSizeConfigurator, 2500);
        });
    }
    
    // Banner sticky "Spedizione gratuita sopra €70"
    function setupStickyBanner() {
        const banner = document.querySelector('.sticky-banner');
        const bannerClose = document.querySelector('.banner-close');
        
        if (banner && bannerClose) {
            // Mostrare il banner dopo 2 secondi
            setTimeout(() => {
                banner.classList.add('visible');
            }, 2000);
            
            // Gestire la chiusura del banner
            bannerClose.addEventListener('click', function() {
                banner.classList.remove('visible');
                
                // Salvare preferenza in localStorage
                localStorage.setItem('bannerClosed', 'true');
            });
            
            // Controllare se il banner è stato chiuso in precedenza
            if (localStorage.getItem('bannerClosed') === 'true') {
                banner.classList.remove('visible');
            }
        }
    }
    
    // Inizializzare il banner sticky
    setupStickyBanner();
});
