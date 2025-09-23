
// Espera a que todo el contenido de la página se cargue
document.addEventListener('DOMContentLoaded', function() {
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

const observerOptions = {
  root: null, // El viewport
  rootMargin: '0px',
  threshold: 0.5 // Se activa cuando el 50% de la sección es visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Quita la clase 'active' de todos los enlaces
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Encuentra el enlace que corresponde a la sección visible
      const activeLink = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
      if (activeLink) {
        // Añade la clase 'active' al enlace correcto
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

// Observa cada una de las secciones
sections.forEach(section => {
  sectionObserver.observe(section);
});
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
