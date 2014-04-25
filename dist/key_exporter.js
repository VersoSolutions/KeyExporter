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
        }); 
		} 
		catch (err) {
			alert('incorrect password');
		} 
		
                
    });
});