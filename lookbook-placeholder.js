// Placeholder per immagini di esempio per la galleria Lookbook
// Questo file verrà sostituito con immagini reali fornite dal brand

// Genera immagini placeholder per test
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');

// Funzione per generare immagini placeholder
function generatePlaceholderImage(index) {
  // Sfondo nero
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Bordo verde neon
  ctx.strokeStyle = '#39FF14';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  
  // Testo D3MAS1ADØ
  ctx.font = 'bold 48px Orbitron, sans-serif';
  ctx.fillStyle = '#39FF14';
  ctx.textAlign = 'center';
  ctx.fillText('D3MAS1ADØ', canvas.width / 2, 100);
  
  // Testo Lookbook
  ctx.font = '36px Orbitron, sans-serif';
  ctx.fillText('LOOKBOOK', canvas.width / 2, 160);
  
  // Numero immagine
  ctx.font = 'bold 120px Orbitron, sans-serif';
  ctx.fillText(index, canvas.width / 2, canvas.height / 2 + 40);
  
  // Testo descrittivo
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText('Urban Luxury Collection', canvas.width / 2, canvas.height - 100);
  
  return canvas.toDataURL('image/jpeg', 0.8);
}

// Sostituisci i percorsi delle immagini con placeholder generati
document.addEventListener('DOMContentLoaded', function() {
  // Verifica se le immagini del lookbook esistono
  const lookbookImages = document.querySelectorAll('.lookbook-gallery img');
  
  if (lookbookImages.length > 0) {
    // Sostituisci solo se le immagini non caricano
    lookbookImages.forEach((img, index) => {
      img.onerror = function() {
        this.src = generatePlaceholderImage(index + 1);
      };
    });
  }
});
