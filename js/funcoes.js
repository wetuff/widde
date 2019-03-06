
$(function ($) {

    $("#frmContato").submit(function (e) {
        e.preventDefault();

        if ($.trim($("#txtEmail").val()).length == '') {
            $("#vldMessage").html("<span>Informe seu e-mail.</span>");
            $("#txtEmail").focus();
            return false;
        }
        if ($.trim($("#txtEmail").val()).length != '') {
            if (isValidEmailAddress($.trim($("#txtEmail").val()))) {
                var formdata = $(this).serialize();
                $("#btnEnviar").hide();
                $("#vldMessage").css({ "display": "inline-table" });

                // Send the event to Google Analytics and
                // resubmit the form once the hit is done.
                gtag('event', 'Envio de formulário', {
                    'event_callback': function () {
                        console.log("foi");
                        $.ajax({
                            type: "POST",
                            url: "envio.php",
                            data: formdata,
                            success: OnCompletePostContato
                        });
                        return false;
                    }
                });

            }
            else {
                $("#vldMessage").html("<span class='erro'>E-mail inválido.</span>");
                setTimeout(function () {
                    $("#btnEnviar").show();
                    $("#vldMessage").removeAttr("style");
                }, 3000);
                return false;
            }
        }
    });
});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

function OnCompletePostContato(result) {
    $("#vldMessage").html("<span class='sucesso'>Inscrição realizada com sucesso.</span>");
}