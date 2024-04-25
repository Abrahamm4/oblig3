function kjopBillett() {
    // Reset previous error messages
    $(".error-message").text("");

    // Get input values
    const film = $("#velgFilm").val();
    const antall = $("#antall").val();
    const fornavn = $("#navn").val();
    const etternavn = $("#etterNavn").val();
    const telefon = $("#telefon").val();
    const epost = $("#epost").val();

    // Validate input
    let isValid = true;

    if (!film) {
        $("#filmError").text("Velg en film");
        isValid = false;
    }

    if (!antall || antall <= 0) {
        $("#antallError").text("Angi et gyldig antall billetter");
        isValid = false;
    }

    if (!fornavn) {
        $("#navnError").text("Fyll inn fornavn");
        isValid = false;
    }

    if (!etternavn) {
        $("#etterNavnError").text("Fyll inn etternavn");
        isValid = false;
    }

    if (!telefon) {
        $("#telefonError").text("Fyll inn telefonnummer");
        isValid = false;
    } else if (!/^[0-9]{8}$/.test(telefon)) {
        $("#telefonError").text("Ugyldig telefonnummer (8 siffer påkrevd)");
        isValid = false;
    }

    if (!epost) {
        $("#epostError").text("Fyll inn e-postadresse");
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(epost)) {
        $("#epostError").text("Ugyldig e-postadresse");
        isValid = false;
    }

    // If all inputs are valid, proceed with ticket purchase
    if (isValid) {
        const billett = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefon: telefon,
            epost: epost
        };


        $.post("/kjopBillett", billett, function() {
            hentAlleBilletter();
        });

        // Clear the form fields after submission
        $("#velgFilm").val("");
        $("#antall").val("");
        $("#navn").val("");
        $("#etterNavn").val("");
        $("#telefon").val("");
        $("#epost").val("");
    }
}

function hentAlleBilletter() {
    $.get("/hentAlleBilletter", function(billetter) {
        formaterBillettData(billetter);
    });
}

function formaterBillettData(billetter) {
    let ut = "<table class='table table-striped'><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefon</th><th>E-post</th></tr>";
    for (const billett of billetter) {
        ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall + "</td><td>" + billett.fornavn + "</td>" +
            "<td>" + billett.etternavn + "</td><td>" + billett.telefon + "</td><td>" + billett.epost + "</td></tr>";
    }
    ut += "</table>";
    $("#billeter").html(ut);
}

function slettAlleBilletter() {
    $.get("/slettAlleBilletter", function() {
        hentAlleBilletter();
    });
}
