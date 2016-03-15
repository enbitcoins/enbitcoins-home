$(document).on('ready', function () {

  var apiUrl = 'https://api.enbitcoins.com/v1';

  var $modal = $('#contactModal'),
      $contactForm = $('#contact-form'),
      $btnSend = $('.btn-send'),
      $countrySelector = $('.country-selector');


  $.getJSON(apiUrl + '/ticker', function (data) {
    data.forEach(function (item) {
      var html = '<div class="col-xs-12 col-md-3"><a href="https://' + item.country.slug + '.enbitcoins.com" title="' + item.country.name + '" class="country-link" target="_blank"><img src="/img/flag-' + item.country.slug + '.png" alt="' + item.country.name + '"><span>' + item.country.name + '</span><br><small>(' + item.country.code + ' ' + item.btc + ')</small></a></div>';
      $countrySelector.append(html);
    });
  });

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

    $.post(apiUrl + '/contact?country=argentina', {
      msg: msg,
      email: email
    }).success(function () {
      $email.val('');
      $msg.val('');

      $modal.modal('hide');
    });

  });
});
