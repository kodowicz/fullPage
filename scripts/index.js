(function () {
  const offers = document.querySelectorAll('.offer__picture');
  const isDesktop = window.innerWidth >= 1200;
  let first_value = 0.3;
  let offerRellax;


  function navigation () {
    const navButton = document.querySelector('.nav-button');
    const buttonIconOpen = navButton.querySelector('.button-icon--open');
    const buttonIconClose = navButton.querySelector('.button-icon--close');

    const overlay = document.querySelector('.overlay');

    const nav = document.querySelector('.navigation');
    const navWrapper = nav.querySelector('.nav-wrapper');
    const navList = nav.querySelector('.nav-list');
    const navListItem = nav.querySelectorAll('.nav-list__item');
    const navLinks = nav.querySelectorAll('.nav-link');


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
      navButton.addEventListener('keydown', handleKeydown);
      navButton.addEventListener('click', handleClick);
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
          navListItem.forEach(li => li.classList.remove('nav-list__item--expanded'));

          navListItem[navListItem.length-1].addEventListener('transitionend', function() {
            navWrapper.classList.remove('nav-wrapper--expanded');
            navWrapper.classList.add('nav-wrapper--collapsed');
            overlay.classList.remove('overlay--expanded');
            nav.classList.remove('navigation--expanded');
          }, {once: true});
          break;

          case ('Menu collapsed'):
            nav.classList.add('navigation--expanded');
            overlay.classList.add('overlay--expanded');
            navWrapper.classList.remove('nav-wrapper--collapsed');
            navWrapper.classList.add('nav-wrapper--expanded');

            navWrapper.addEventListener('transitionend', function() {
              navListItem.forEach(li => li.classList.add('nav-list__item--expanded'));
            }, {once: true});
            break;

        default:
          break;
      };
    };

    function addAria() {
      navButton.setAttribute('aria-label', 'Menu expanded');
      buttonIconOpen.setAttribute('aria-hidden', 'true');
      buttonIconClose.setAttribute('aria-hidden', 'false');
      navWrapper.setAttribute('aria-hidden', 'false');
      navLinks.forEach(link => link.removeAttribute('tabIndex'));
    };

    function removeAria() {
      navButton.setAttribute('aria-label', 'Menu collapsed');
      buttonIconOpen.setAttribute('aria-hidden', 'false');
      buttonIconClose.setAttribute('aria-hidden', 'true');
      navWrapper.setAttribute('aria-hidden', 'true');
      navLinks.forEach(link => link.setAttribute('tabIndex', '-1'));
    };

    initDelay();
    userInteraction();
  };

  function rellaxEffect() {
    const images = document.querySelectorAll('.picture');

    if (images.length !== 0) {
      images.forEach(image => image.classList.add('rellax'));

      const rellax = new Rellax('.rellax', {
        speed: 1.7,
        center: true
      });
    };
  };

  function hoverOffer () {
    this.classList.toggle('offer__picture--hover');
  };

  function changeSpeed(rellax) {
    let last_value = first_value;
    rellax.destroy();

    offers.forEach(element => {
      if (!element.classList.contains('offer__picture--hidden')) {
        element.setAttribute('data-rellax-speed', last_value);

        switch (last_value) {
          case (0.3):
          last_value = 0;
          break;

          case (0):
          last_value = -0.3;
          break;

          case (-0.3):
          last_value = 0.3;
          break;

          default:
          break;
        };
      };
    });

    const offerRellax = new Rellax('.offer__picture');
  }

  function offerFilter () {
    const offers = document.querySelectorAll('.offer__picture');
    const inputs = document.querySelectorAll('.inputs__checkbox');
    const offer = document.querySelector('.offer');
    const warning = document.querySelector('.offer__warning');

    inputs.forEach((input) => input.addEventListener('click', function() {
      const regExp = new RegExp(input.value, 'gi');

      if (input.value == 'all') {
        inputs.forEach((input) => {
          if (input.value == 'all') return;
          input.checked = false;
          offers.forEach((offer) => {
            offer.style.display = 'flex';
          })
        });
      }

      switch (input.checked) {
        case true:
          offers.forEach((offer) => {
            if (!offer.getAttribute('data-type').match(regExp)) {
              offer.classList.add('offer__picture--hidden');
              offer.classList.remove('offer__picture');
            };
          });
          break;

        case false:
          offers.forEach((offer) => {
            if (!offer.getAttribute('data-type').match(regExp)) {
              offer.classList.remove('offer__picture--hidden');
              offer.classList.add('offer__picture');
            }
          })
          break;

        default:
          break;
      }

      if (offer.clientHeight == 0) {
        warning.style.display = 'block';
      } else {
        warning.style.display = 'none';
      };

      changeSpeed(offerRellax);
    }));
  };

  if (offers.length !== 0) {
    offerFilter();
  }

  if (isDesktop) {
    rellaxEffect();

    if (offers.length !== 0) {
      offers.forEach(offer => offer.addEventListener('mouseenter', hoverOffer));
      offers.forEach(offer => offer.addEventListener('mouseleave', hoverOffer));

      offerRellax = new Rellax('.offer__picture');
    }
  }

  navigation();
})()
