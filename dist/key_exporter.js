$(document).ready(function () {

    $('#extract').on('click', function (e) {
        e.preventDefault();
        $('#cardData').trigger('submit');
    });

    $('#cardData').on('submit', function (e) {
        e.preventDefault();

        var privateInfo = $('#privateInfo').val();
        var password = $('#password').val();
        var card = Verso.Card.parsePrivate(privateInfo);

        if (!card) {
			alert('Your private info is incorrect');
            //$('#errorMessages').val("test");

            return false;
        }

        try {
          var encSeed = card.getEndpoints(password, undefined, function (eps) {
            $('#privateKey').val(eps[0].getPrivateCheck());
            console.log(eps[0].getPrivateCheck());
            jQuery('#qrcode').qrcode(eps[0].getPrivateCheck());
        });
    }
    catch (err) {
      console.log(err);
      alert('incorrect password');
    }


    });
});
