function navigation () {
  let navButton = document.querySelector('.nav-button');
  let nav = document.querySelector('.navigation');
  let navList = nav.querySelectorAll('.nav-list');
  let navListItem = nav.querySelectorAll('.nav-list__item');
  let navLinks = nav.querySelectorAll('.nav-link');
  let buttonIconOpen = navButton.querySelector('.button-icon--open');
  let buttonIconClose = navButton.querySelector('.button-icon--close');


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

  function initDelay() {
    let delay = 0;
    navListItem.forEach(li => {
      if (li.style.display === 'none') return;
      li.style.setProperty('transition-delay', `${delay}s`);
      delay += 0.05;
      return delay;
    });
  };

  ffunction navAnimation() {
    switch (navButton.getAttribute('aria-label')) {
    // close menu
      case ('Menu expanded'):
        navListItem.forEach(li => li.classList.remove('nav-list__item--expanded'));
        navListItem[navListItem.length-1].addEventListener('transitionend', function() {
          navWrapper.classList.remove('nav-wrapper--expanded');
          navWrapper.classList.add('nav-wrapper--collapsed');
          overlay.classList.remove('overlay--expanded');
        }, {once: true});
        break;

    // open menu
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
    navList.forEach(list => list.setAttribute('aria-hidden', 'false'));
    navLinks.forEach(link => link.removeAttribute('tabIndex'));
  };

  function removeAria() {
    navButton.setAttribute('aria-label', 'Menu collapsed');
    buttonIconOpen.setAttribute('aria-hidden', 'false');
    buttonIconClose.setAttribute('aria-hidden', 'true');
    navList.forEach(list => list.setAttribute('aria-hidden', 'true'));
    navLinks.forEach(link => link.setAttribute('tabIndex', '-1'));
  };

  initDelay();
  userInteraction();
};


document.addEventListener('DOMContentLoaded', function() {
  navigation();
});
