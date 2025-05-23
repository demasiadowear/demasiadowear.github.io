// Unidad-310 JavaScript per D3MAS1ADØ
document.addEventListener('DOMContentLoaded', function() {
  // Elementi per l'area privata Unidad-310
  const unidadButton = document.querySelector('.unidad-button');
  const unidadModal = document.querySelector('.unidad-modal');
  const unidadClose = document.querySelector('.unidad-close');
  const unidadForm = document.querySelector('.unidad-form');
  const unidadPassword = document.querySelector('#unidad-password');
  const unidadSubmit = document.querySelector('.unidad-submit');
  const unidadError = document.querySelector('.unidad-error');
  
  // Password per accesso area privata
  const correctPassword = 'd3masiado2025';
  
  // Funzione per aprire il modal
  function openUnidadModal() {
    if (unidadModal) {
      unidadModal.classList.add('active');
      document.body.classList.add('modal-open');
      
      // Focus sul campo password
      if (unidadPassword) {
        setTimeout(() => {
          unidadPassword.focus();
        }, 300);
      }
    }
  }
  
  // Funzione per chiudere il modal
  function closeUnidadModal() {
    if (unidadModal) {
      unidadModal.classList.remove('active');
      document.body.classList.remove('modal-open');
      
      // Reset del form
      if (unidadForm) {
        unidadForm.reset();
      }
      
      // Nascondi messaggio di errore
      if (unidadError) {
        unidadError.style.display = 'none';
      }
    }
  }
  
  // Gestione click sul pulsante Unidad-310
  if (unidadButton) {
    unidadButton.addEventListener('click', function(e) {
      e.preventDefault();
      openUnidadModal();
    });
  }
  
  // Gestione click sul pulsante di chiusura
  if (unidadClose) {
    unidadClose.addEventListener('click', function(e) {
      e.preventDefault();
      closeUnidadModal();
    });
  }
  
  // Chiusura modal cliccando fuori
  if (unidadModal) {
    unidadModal.addEventListener('click', function(e) {
      if (e.target === unidadModal) {
        closeUnidadModal();
      }
    });
  }
  
  // Gestione invio form
  if (unidadForm) {
    unidadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const password = unidadPassword.value.trim();
      
      if (password === correctPassword) {
        // Password corretta, reindirizza all'area privata
        localStorage.setItem('unidad-310-auth', 'true');
        window.location.href = '/unidad-310/index.html';
      } else {
        // Password errata, mostra errore
        if (unidadError) {
          unidadError.style.display = 'block';
          unidadError.textContent = 'Password non valida. Riprova.';
        }
        
        // Shake animation
        unidadForm.classList.add('shake');
        setTimeout(() => {
          unidadForm.classList.remove('shake');
        }, 500);
      }
    });
  }
  
  // Chiudi modal con ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && unidadModal && unidadModal.classList.contains('active')) {
      closeUnidadModal();
    }
  });
});
