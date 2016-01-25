$(document).on('ready', function () {

  var $modal = $('#contactModal'),
      $contactForm = $('#contact-form'),
      $btnSend = $('.btn-send');

  $modal.on('shown.bs.modal', function () {
    $('#contact-email').focus();
  });

  $contactForm.on('submit', function (e) {
    e.preventDefault();

    var $email = $('#contact-email'),
        $msg = $('#contact-msg');

    var email = $email.val().trim(),
        msg = $msg.val().trim();

    if ( ! email || ! msg) return alert('Debes completar todos los campos.');

    $.post('https://api.enbitcoins.com/v1/contact?country=argentina', {
      msg: msg,
      email: email
    }).success(function () {
      $email.val('');
      $msg.val('');

      $modal.modal('hide');
    });

  });
});
