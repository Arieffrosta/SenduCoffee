// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

document.addEventListener('click', function (e) {
if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
  shoppingCart.classList.remove('active');
}
});
const shoppingCartButton = document.querySelector('#shopping-cart-button');
const closeCartButton = document.querySelector('#close-cart-button');

shoppingCartButton.onclick = (e) => {
    shoppingCart.classList.toggle('active');
    shoppingCart.classList.toggle('inactive');
    e.preventDefault();
};

closeCartButton.onclick = (e) => {
    shoppingCart.classList.remove('active');
    shoppingCart.classList.add('inactive');
    e.preventDefault();
};

document.addEventListener('click', function (e) {
    if (!shoppingCart.contains(e.target) && !shoppingCartButton.contains(e.target)) {
        shoppingCart.classList.remove('active');
        shoppingCart.classList.add('inactive');
    }
});


// Reservation
(function ($) {
    "use strict";
    
    // Date and Time Picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
      format: 'LT'
    });

    // tombol kembali keatas
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
      }
      else
      {
        $('back-to-top').fadeOut('slow');
      }
    });
    $('.back-to-top').click(function () {
      $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
      return false;
    });
})(jQuery);
