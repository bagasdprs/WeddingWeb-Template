const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
}

const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
}

window.addEventListener('load', () => {
  let galleryContainer = select('.gallery-container');
  if (galleryContainer) {
    let galleryIsotope = new Isotope(galleryContainer, {
      itemSelector: '.gallery-item',
    });

    let galleryFilters = select('#gallery-filters li', true);

    on(
      'click',
      '#gallery-filters li',
      function (e) {
        e.preventDefault();
        galleryFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        galleryIsotope.arrange({
          filter: this.getAttribute('data-filter'),
        });
        galleryIsotope.on('arrangeComplete', function () {
          AOS.refresh();
        });
      },
      true
    )
  }
})