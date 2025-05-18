
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
    