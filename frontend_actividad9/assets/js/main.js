/**
* Template Name: iPortfolio
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* Diseñado por: BootstrapMade.com
* Editado por: Alejandro Sanchez-->
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

//Funciones adicionales para validar campos y metodo POST
function saveUser(jsonData) 
{
    let url = "http://localhost:8000/api/usuario/create";

    fetch(url,{method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
            body:JSON.stringify(jsonData),
    }).then(response => {
      console.log(response);
      if(response.status == 201 ){
        alert("Creación Exitosa Usuario !!");
      }else{
        alert("Error en la creación Usuario !!");
      }
    });

}

function validarCampos() 
{
        var camposValidos = true;
        var nombre = document.getElementById("nombre").value;
        var apellido = document.getElementById("apellido").value;
        var tipoDocumentoElement = document.getElementById("tipoDocumento");
        var tipoDocumento = tipoDocumentoElement.options[tipoDocumentoElement.selectedIndex].value;
        var id = document.getElementById("id").value;                  
        var telefono = document.getElementById("telefono").value;
        var email = document.getElementById("email").value;
        var profesion = document.getElementById("profesion").value;
        var rolElement = document.getElementById("rol");
        var rol = rolElement.options[rolElement.selectedIndex].value;
        var mensaje = document.getElementById("mensaje").value;

        if (nombre === "") {
            document.getElementById("error-nombre").textContent = "Por favor, ingrese su nombre.";
            camposValidos = false;
        } else {
            document.getElementById("error-nombre").textContent = "";
        }

        if (apellido === "") {
            document.getElementById("error-apellido").textContent = "Por favor, ingrese su apellido.";
            camposValidos = false;
        } else {
            document.getElementById("error-apellido").textContent = "";
        }

        if (tipoDocumento === "Selecciona tipo documento *") {
            document.getElementById("error-tipoDocumento").textContent = "Por favor, seleccione un tipo de documento.";
            camposValidos = false;
        } else {
            document.getElementById("error-tipoDocumento").textContent = "";
        }

        if (id === "") {
            document.getElementById("error-id").textContent = "Por favor, ingrese su ID.";
            camposValidos = false;
        } else {
            document.getElementById("error-id").textContent = "";
        }

        if (telefono === "") {
            document.getElementById("error-telefono").textContent = "Por favor, ingrese su teléfono.";
            camposValidos = false;
        } else {
          if (telefono.length !== 10) {
              document.getElementById("error-telefono").textContent = "El número debe contener 10 caracteres"; 
            }
            else{
              document.getElementById("error-telefono").textContent = "";
            }
            
        }

        if (email === "") {
            document.getElementById("error-email").textContent = "Por favor, ingrese su email.";
            camposValidos = false;
        } else {
          var expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
          // Comprobar si la cadena coincide con la expresión regular
          if (!expresionRegular.test(email)) {
            document.getElementById("error-email").textContent = "Verifique que sea un correo valido !";
          }
          else{
            document.getElementById("error-email").textContent = "";
          }
        }

        if (profesion === "") {
            document.getElementById("error-profesion").textContent = "Por favor, ingrese su profesión.";
            camposValidos = false;
        } else {
            document.getElementById("error-profesion").textContent = "";
        }

        if (rol === "Selecciona el rol *") {
            document.getElementById("error-rol").textContent = "Por favor, seleccione un rol.";
            camposValidos = false;
        } else {
            document.getElementById("error-rol").textContent = "";
        }
        
        if (camposValidos) {
            var jsonData = {
                "name": nombre,
                "last_name": apellido,
                "id_type": tipoDocumento,
                "id_card": id,
                "phone": telefono,
                "email": email,
                "profession": profesion,
                "role": rol,
                "message":mensaje,
            };

        console.log(jsonData); 
        saveUser(jsonData);
    return true; // Envía el formulario si todos los campos son válidos
    } else {
    return false; // Evita enviar el formulario si hay campos inválidos
    }
 }