(function () {
  const body = document.getElementsByTagName('body')[0];
  const bookPicture = document.querySelector('.book__picture');
  const offers = document.querySelectorAll('.offer__picture');
  const picture = document.querySelector('.header__picture');
  const isDesktop = window.innerWidth >= 1200;
  const isTablet = window.innerWidth >= 1024;
  let firstValue = 0.3;
  let offerRellax;
  let bookRellax;

  body.classList.add('js-enabled');

  function navigation () {
    let isOpen = false;
    const navButton = document.querySelector('.nav-button');
    const buttonIconOpen = navButton.querySelector('.button-icon--open');
    const buttonIconClose = navButton.querySelector('.button-icon--close');

    const header = document.querySelector('.site-header');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navListItem = document.querySelectorAll('.nav-list__item');
    const navLinks = document.querySelectorAll('.nav-link');

    if (window.innerWidth >= 768) {
      header.classList.add('site-header--expanded');
      navListItem.forEach(li => li.classList.add('nav-list__item--expanded'));
    };

    function initDelay() {
      let delay = 0;
      navListItem.forEach(li => {
        if (li.style.display === 'none') return;
        li.style.setProperty('transition-delay', `${delay}s`);
        delay += 0.05;
        return delay;
      });
    };

    function userInteraction() {
      if (window.innerWidth >= 768) {
        isOpen = true;
        handleScroll();

        navLinks.forEach(link => link.addEventListener('focusin', function() {
          expandAnimation();
          removeAria();
        }))
      };

      navButton.addEventListener('keydown', handleKeydown);
      navButton.addEventListener('click', handleClick);
    };

    function handleScroll () {
      let startScroll = window.scrollY;

      window.addEventListener('scroll', function () {
        let currentScroll = window.scrollY;

        if (currentScroll > startScroll) {
          collapsAnimation();
          removeAria();
        } else {
          expandAnimation();
          addAria();
        }

        startScroll = window.scrollY;
      });
    };


    function handleKeydown (event) {
      if (event.keyCode === 27) {
        navAnimation();
        removeAria();
      };
    };

    function handleClick(event) {
      switch (navButton.getAttribute('aria-label')) {
        case ('Menu expanded'):
          navAnimation();
          removeAria();
          break;

        case ('Menu collapsed'):
          navAnimation();
          addAria();
          break;

        default:
          break;
      };
    };

    function navAnimation() {
      switch (navButton.getAttribute('aria-label')) {
        case ('Menu expanded'):
          collapsAnimation();
          addAria();
          break;
        case ('Menu collapsed'):
          expandAnimation();
          removeAria();
          break;
        default:
          break;
      };
    };

    function expandAnimation () {
      if (isOpen) return;
      isOpen = true;

      header.classList.add('site-header--expanded');

      header.addEventListener('transitionend', function() {
        if (isOpen) {
          navListItem.forEach(li => li.classList.add('nav-list__item--expanded'));
        } else {
          header.classList.remove('site-header--expanded');
        };
      }, {once: true});

    };

    function isHidden(el) {
      const style = window.getComputedStyle(el);
      return style.opacity == 0;
    }

    function collapsAnimation () {
      const lastListItem = navListItem[navListItem.length - 1];
      if (!isOpen) return;
      isOpen = false;

      if (isHidden(lastListItem)) {
        header.classList.remove("site-header--expanded");
      }

      navListItem.forEach(li => li.classList.remove('nav-list__item--expanded'));

      lastListItem.addEventListener('transitionend', function() {
        if (!isOpen) {
          header.classList.remove('site-header--expanded');
        }
      }, {once: true});
    };

    function addAria() {
      navButton.setAttribute('aria-label', 'Menu expanded');
      buttonIconOpen.setAttribute('aria-hidden', 'true');
      buttonIconClose.setAttribute('aria-hidden', 'false');
      navWrapper.setAttribute('aria-hidden', 'false');
    };

    function removeAria() {
      navButton.setAttribute('aria-label', 'Menu collapsed');
      buttonIconOpen.setAttribute('aria-hidden', 'false');
      buttonIconClose.setAttribute('aria-hidden', 'true');
      navWrapper.setAttribute('aria-hidden', 'true');
    };

    initDelay();
    userInteraction();
  };

  function form() {
    const submitButton = document.querySelector('.form__button');
    const formInputs = document.querySelectorAll('.form__input');
    const caution = document.querySelector('.form__caution');
    const message = document.querySelector('.form__submited');
    let hasValue = [];

    submitButton.addEventListener('click', function(event) {
      hasValue = [];
      event.preventDefault();

      formInputs.forEach((input) => hasValue.push(input.value));

      if (hasValue.some((value) => value === "" || value === " ")) {
        caution.style.setProperty('display', 'block');
      } else {
        caution.style.setProperty('display', 'none');
        message.classList.add('form__submited--submited');

        formInputs.forEach((input) => input.setAttribute('disabled', ''));
      }

      formInputs.forEach((input) => {
        if (input.value === "" || input.value === " ") {
          let label = input.parentNode.querySelector('.form__label');
          label.style.setProperty('color', 'red');
          input.classList.add('focused')
        }
      });
    });


    formInputs.forEach(input => input.addEventListener('change', function () {
      hasValue = [];

      if (input.value == "" || input.value === " ") {
        this.classList.remove('focused');
      } else {
        let label = input.parentNode.querySelector('.form__label');
        label.style.setProperty('color', '#3399FF');
        this.classList.add('focused');
      };

      formInputs.forEach((input) => hasValue.push(input.value));

      if (hasValue.every((value) => value !== "")) {
        caution.style.setProperty('display', 'none');
      }

    }));
  };

  function rellaxEffect() {
    const images = document.querySelectorAll('.picture');
    const titles = document.querySelectorAll('.title');

    if (bookPicture !== null) {
      bookPicture.classList.add('rellax--book');
      bookRellax = new Rellax('.rellax--book', {
        speed: 2.2,
        center: true
      });
    };

    if (images.length !== 0) {
      images.forEach(image => image.classList.add('rellax'));
      const rellax = new Rellax('.rellax', {
        speed: 2.2,
        center: true
      });
    };

    if (window.location.pathname === '/plant-shop/assortment.html') return;

    titles.forEach(title => title.classList.add('rellax--title'));
    const rellax = new Rellax('.rellax--title', {
      speed: -0.7,
      center: true
    });
  };

  function hoverOffer () {
    if (isTablet && !isDesktop) {
      const grid = document.querySelector('.offer-grid');
      offers.forEach((offer) => offer.classList.remove('offer__picture--hover'));

      grid.addEventListener('click', function (event) {
        if (event.target.matches('.figure__subtitle')) return;
        offers.forEach((offer) => offer.classList.remove('offer__picture--hover'));
      });
    };

    this.classList.toggle('offer__picture--hover');
  };

  function changeSpeed (rellax) {
    const offer = document.querySelector('.offer__picture');

    if (offer !== null) {
      rellax.destroy();
      const offerRellax = new Rellax('.offer__picture');
    }
  }

  function hideElements () {
    let lastValue = firstValue;

    offers.forEach(element => {
      if (!element.classList.contains('offer__picture--hidden')) {
        element.setAttribute('data-rellax-speed', lastValue);

        switch (lastValue) {
          case (0.3):
          lastValue = 0;
          break;

          case (0):
          lastValue = -0.3;
          break;

          case (-0.3):
          lastValue = 0.3;
          break;

          default:
          break;
        };
      };
    });
  };

  function changeBookRellax (rellax) {
    rellax.destroy();

    const bookRellax = new Rellax('.rellax--book', {
      speed: 1.7,
      center: true
    });
  };

  function offerFilter () {
    const offers = document.querySelectorAll('.offer__picture');
    const inputs = document.querySelectorAll('.inputs__checkbox');
    const offer = document.querySelector('.offer');
    const warning = document.querySelector('.offer__warning');
    const checkboxAll = document.querySelector('.inputs__checkbox[value=all]');

    let checkedList = [];
    let dataType;

    inputs.forEach((input) => input.addEventListener('click', function() {

      switch (input.checked) {
        case true:
          checkedList.push(input.value);
          offers.forEach((offer) => {
            dataType = offer.getAttribute('data-type');
            if (!checkedList.every((check) => dataType.match(new RegExp(check)))) {
              offer.classList.add('offer__picture--hidden');
              offer.classList.remove('offer__picture');
            } else {
              offer.classList.remove('offer__picture--hidden');
              offer.classList.add('offer__picture');
            };
          });
          break;

        case false:
          checkedList.splice(checkedList.indexOf(input.value), 1);
          offers.forEach((offer) => {
            dataType = offer.getAttribute('data-type');
            if (!checkedList.every((check) => dataType.match(new RegExp(check)))) {
              offer.classList.add('offer__picture--hidden');
              offer.classList.remove('offer__picture');
            } else {
              offer.classList.remove('offer__picture--hidden');
              offer.classList.add('offer__picture');
            };
          });
          break;

        default:
          break;
      }


      if (input == checkboxAll) {
        inputs.forEach((input) => {
          if (input.value == 'all') return;
          input.checked = false;
          checkedList = [];

          offers.forEach((offer) => {
            offer.classList.remove('offer__picture--hidden');
            offer.classList.add('offer__picture');
          });
        });
      } else {
        checkboxAll.checked = false;
      };


      if (offer.clientHeight == 0) {
        warning.style.display = 'block';
      } else {
        warning.style.display = 'none';
        if (isTablet) {
          changeBookRellax(bookRellax);
        };
      };

      hideElements();

      if (isTablet) {
        changeSpeed(offerRellax);
        changeBookRellax(bookRellax);
      };
    }));
  };


  navigation();

  if (isDesktop) {
    rellaxEffect();
  };

  if (window.location.pathname === '/plant-shop/contact.html') {
    form();
  };

  if (window.location.pathname === '/plant-shop/assortment.html') {
    offerFilter();

    if (isTablet && !isDesktop) {
      offers.forEach(offer => offer.addEventListener('click', hoverOffer));
    };

    if (isDesktop) {
      offers.forEach(offer => offer.addEventListener('mouseenter', hoverOffer));
      offers.forEach(offer => offer.addEventListener('mouseleave', hoverOffer));

      offerRellax = new Rellax('.offer__picture');
    };
  };

})()
