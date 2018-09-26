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
        }, {once: true});
        break;

        case ('Menu collapsed'):
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


document.addEventListener('DOMContentLoaded', function() {
  navigation();
});
