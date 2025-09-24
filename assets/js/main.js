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

  const solutionCards = document.querySelectorAll('.solution-card');

  solutionCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // -10 to 10 degrees
      const rotateY = ((x - centerX) / centerX) * 10; // -10 to 10 degrees

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  const stepsWrapper = document.querySelector('.steps-wrapper');

  const stepObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stepsWrapper.classList.add('is-animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (stepsWrapper) {
    stepObserver.observe(stepsWrapper);
  }

  const statsSection = document.querySelector('.stats-section');
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateStat = (element) => {
    const finalValue = element.innerText;
    const match = finalValue.match(/(\+?)(\d+)(.*)/);
    if (!match) return;

    const prefix = match[1] || '';
    const number = parseInt(match[2], 10);
    const suffix = match[3] || '';
    
    let current = 0;
    const increment = number / 100; // Animate over 100 steps
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;

    element.innerText = prefix + current + suffix;

    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        clearInterval(timer);
        element.innerText = finalValue;
      } else {
        element.innerText = prefix + Math.ceil(current) + suffix;
      }
    }, stepTime);
  };

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(animateStat);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) {
    statObserver.observe(statsSection);
  }
});