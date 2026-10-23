/* ==========================================================================
   ORANGE FC RECIFE — main.js
   Comportamentos gerais do site: menu mobile, filtros da galeria,
   lightbox de fotos e simulação de envio do formulário de contato.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Filtros da galeria ---------- */
  var filterButtons = document.querySelectorAll('.gallery-filters button');
  var galleryItems = document.querySelectorAll('.gallery-grid [data-category]');
  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var category = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var match = category === 'todos' || item.getAttribute('data-category') === category;
          item.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Lightbox da galeria ---------- */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImage = lightbox.querySelector('.ph');
    var lbCaption = lightbox.querySelector('.lightbox__caption');
    var lbClose = lightbox.querySelector('.lightbox__close');

    document.querySelectorAll('.gallery-grid [data-caption]').forEach(function (item) {
      item.addEventListener('click', function () {
        var caption = item.getAttribute('data-caption');
        if (lbCaption) lbCaption.textContent = caption || '';
        if (lbImage) {
          var span = lbImage.querySelector('span');
          if (span) span.textContent = caption || '';
        }
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- Formulário de contato (demonstração, sem backend) ---------- */
  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var feedback = document.querySelector('#contact-feedback');
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = 'Mensagem enviada! Este formulário é apenas uma demonstração — conecte-o a um serviço de e-mail ou backend para receber os envios de verdade.';
      }
      contactForm.reset();
    });
  }

});
