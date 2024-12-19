const statsHrac = {jmeno: "hrac1", zivoty: 3, penezenka: 0, cenaZivota: 0, sazka: 0, body: 0};

function naplnitPenezenku() {
    let input = Number(document.getElementById("inputPenezenka").value);
    if (input>0) {
        statsHrac.penezenka += input;
        statsHrac.cenaZivota += input/3;

        document.getElementById("inputPenezenka").disabled = true;
        document.getElementById("tlacitkoPenezenka").disabled = true;

        document.getElementById("inputSazka").disabled = false;
        document.getElementById("tlacitkoSazka").disabled = false;
        aktualizovat();    
    } else{
        alert("Tímto svou peněženku nenaplníš!")
    }
}
function vsadit() {
    let input = document.getElementById("inputSazka").value;
    if (input <= statsHrac.penezenka && input > 0) {
        statsHrac.sazka = input;
        statsHrac.penezenka -= statsHrac.sazka;
        document.getElementById("inputSazka").disabled = true;
        document.getElementById("tlacitkoSazka").disabled = true;
        document.getElementById("vzitKartu").disabled = false;
        aktualizovat();

/*         novyBalicek();
        rozdatDveKarty();
        aktualizovatHodnoty(); */
    } else{
        alert("Toto vsadit nemůžeš!");
    }
}
function novyBalicek(params) {
    
}

function aktualizovat() {
    let canvas=document.getElementById("zivoty");
    let ctx=canvas.getContext("2d");
    for (let i = 0; i < statsHrac.zivoty; i++) {
        ctx.beginPath();   
        ctx.arc(25 + (i * 50), 15, 15, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.strokeStyle="black";
        ctx.stroke();
        ctx.fill();   
    }
    document.getElementById("infoPenezenka").innerHTML = "Peněženka: " + statsHrac.penezenka;
    document.getElementById("infoSazka").innerHTML = "Sázka: " + statsHrac.sazka;
}