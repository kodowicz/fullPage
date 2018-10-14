(function () {
  const offers = document.querySelectorAll('.offer__picture');
  const inputs = document.querySelectorAll('.inputs__checkbox');
  const offer = document.querySelector('.offer');
  const warning = document.querySelector('.offer__warning');

  const offerRellax = new Rellax('.offer__picture');

  inputs.forEach((input) => input.addEventListener('click', function() {
    let last_value = '0.5';
    changeSpeed(offerRellax, last_value);

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
          }
        })
        break;

      case false:
        offers.forEach((offer) => {
          if (!offer.getAttribute('data-type').match(regExp)) {
            offer.classList.remove('offer__picture--hidden');
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
  }));


  function changeSpeed(rellax, value) {
      rellax.destroy();

      offers.forEach(element => {

        if (element.classList.contains('offer__picture--hidden')) {
          element.setAttribute('data-rellax-speed', '0');
          console.log(element)
        } else {
          element.setAttribute('data-rellax-speed', value);
          console.log(element);

          switch (value) {
            case (0.5):
              value = 0;
              break;

            case (0):
              value = -0.5;
              break;

            case (-0.5):
              value = 0.5;
              break;

            default:
              break;
          };
          console.log(value);
          return value;
        };
      });
      const offerRellax = new Rellax('.offer__picture');
  }
})()
