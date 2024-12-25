const statsHrac = {jmeno: "hrac1", zivoty: 3, penezenka: 0, cenaZivota: 0, sazka: 0, body: 0};
const statsBot = {body: 0};
const karty = {};

function naplnitPenezenku() {
    let input = Number(document.getElementById("inputPenezenka").value);
    if (input>0) {
        statsHrac.penezenka += input;
        statsHrac.cenaZivota += input/3;
        alert("Nakoupil jste 3 životy, cena jednoho života je: " + statsHrac.cenaZivota);
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
    } else{
        alert("Toto vsadit nemůžeš!");
    }
}
function vzitKartu() {
    if (karty.balicek == undefined) {
        karty.balicek = novyBalicek();
        karty.hrac = [];
        karty.bot = [];
        //banker dostane první kartu (pokud ji už nemá), která zůstává hráči skryta
        presunoutKartu(karty.balicek, karty.bot);
        statsBot.body += karty.bot[karty.bot.length - 1].body;
    }
    //hráč dobírá dle libosti
    presunoutKartu(karty.balicek, karty.hrac);
    alert("Vytáhl jste si kartu: " + karty.hrac[karty.hrac.length - 1].nazev);
    statsHrac.body += karty.hrac[karty.hrac.length - 1].body;
    aktualizovat(karty.hrac, "karta");
    document.getElementById("hracMaDost").disabled = false;

    //check, jestli hrac neprohral/nevyhral
    if (karty.hrac[0].body == karty.hrac[1].body == 11) {
        //vyhodnoceni (hrac vyhral)
    }else if (statsHrac.body > 21) {
        //vyhodnoceni (hrac prohral)
    }
}
function hracMaDost() {
    document.getElementById("vzitKartu").disabled = true;
    document.getElementById("kartyBank").innerHTML = "Karty bankéře:"
    while (statsBot.body < 14) {
        presunoutKartu(karty.balicek, karty.bot);
        statsBot.body += karty.bot[karty.bot.length - 1].body;
    }
    aktualizovat(karty.bot, "kartaBank");
    //kontrola prohry/výhry
    if (karty.bot[0].body == karty.bot[1].body == 11) {
        //vyhodnoceni (bot vyhral)
    }else if (statsBot.body > 21) {
        //vyhodnoceni (bot prohral)
    }else if (statsHrac.body > statsBot.body) {
        //vyhodnoceni (hrac vyhral)
    }else if (statsHrac.body < statsBot.body) {
        //vyhodnoceni (hrac prohral)
    }else if (statsHrac.body == statsBot.body) {
        //nevyhral nikdo, sazky se vraci
    }
}
function vyhodnoceni(tenKdoVyhral) {
    if (tenKdoVyhral == "hrac") {
        statsHrac.penezenka += statsHrac.sazka * 2;
        alert("Vyhrál jsi!! K vyhraným penězům se ti přičítá " + statsHrac.sazka * 2)
    }else if(tenKdoVyhral == "bank"){
        statsHrac.zivoty -= statsHrac.sazka/statsHrac.cenaZivota;
    }else {
        statsHrac.penezenka += statsHrac.sazka;
    }

}
//přesouvá karty mezi poli
function presunoutKartu(odkud, kam) {
    let poziceOdkud = odkud.length - 1;

    kam.push(odkud[poziceOdkud]);
    let poziceKam = kam.length - 1;
    odkud.pop();
}
function novyBalicek() {
    const balicek=[];
    const barvy=["kul", "srdc", "žalud", "list"];
    const hodnoty=["spodek", "svršek", "král", "sedmička", "osmička", "devítka", "desítka", "eso"]; //8x1 + 4x2 + 1x7
    const body=[1,1,2,7,8,9,10,11];
    const sklonovani = ["ový", "ový", "ový", "ová", "ová", "ová", "ová", "ové"];
    //naplní balíček kartami
    for (let i = 0; i < barvy.length; i++) {
        for (let j = 0; j < hodnoty.length; j++) {
            let nazev = barvy[i] + sklonovani[j] + " " + hodnoty[j]; //vytvoří kartě český název
            let pracNazev = barvy[i] + " " + hodnoty[j] + ".jpg"; //vytvoří název, pod kterým je obrázek dané karty uložen
            const karta={nazev: nazev, body: Number(body[j]), image: `img/${pracNazev}`};
            balicek.push(karta);
        }
    }
    //míchání balíčku
    let currentIndex = balicek.length;
    //dokud zbývají v balíčku karty k míchání
    while (currentIndex != 0) {
        //vyber náhodný objekt z pole
        let randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex--;
        //prohoď ho s aktuálním objektem v poli
        [balicek[currentIndex], balicek[randomIndex]] = [balicek[randomIndex], balicek[currentIndex]];
    }
    return balicek;
}
//dočasná - výpis pole
function vypsat(x) {
    let text = "";
    for (let i = 0; i < x.length; i++) {
        text += `${i+1} ${x[i].nazev} ${x[i].body} ${x[i].image}\n`;
    }
    console.log(text);
}

function aktualizovat(rukaHrac, kdo) {
    //vykreslí životy
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
    //zobrazí vytažené karty (pokud jsou zadané do parametru)
    if (rukaHrac != undefined) {
        for (let i = 0; i < rukaHrac.length; i++) {
            let img = document.getElementById(kdo + i);
            img.src = rukaHrac[i].image;
            img.alt = rukaHrac[i].nazev;
            img.title = img.alt;
            img.height = "90";
            img.width = "60";
        }
    }
    //aktualizace udaju
    document.getElementById("infoPenezenka").innerHTML = "Peněženka: " + statsHrac.penezenka;
    document.getElementById("infoSazka").innerHTML = "Sázka: " + statsHrac.sazka;
}