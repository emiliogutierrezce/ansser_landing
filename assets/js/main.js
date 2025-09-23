
// Espera a que todo el contenido de la página se cargue
document.addEventListener('DOMContentLoaded', function() {

  const header = document.querySelector('.site-header');

  // Si no encuentra el header, no hace nada
  if (!header) return;

  // Función para manejar el scroll
  const handleScroll = () => {
    // Si el scroll vertical es mayor a 50px
    if (window.scrollY > 50) {
      // Añade la clase .scrolled al header
      header.classList.add('scrolled');
    } else {
      // Si no, la quita
      header.classList.remove('scrolled');
    }
  };

  // Escucha el evento de scroll en la ventana
  window.addEventListener('scroll', handleScroll);

});
