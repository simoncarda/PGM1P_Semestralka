const statsHrac = {jmeno: "hrac1", zivoty: 3, penezenka: 0, cenaZivota: 1, sazka: 0, body: 0, vyhranePenize: 0};
const statsBot = {body: 0};
const karty = {};

function naplnitPenezenku() {
    let input = Number(document.getElementById("inputPenezenka").value);
    if ((input>0) && (Number.isInteger(input))) {
        statsHrac.penezenka += input;
        statsHrac.cenaZivota = input/3;
        
        document.getElementById("inputPenezenka").disabled = true;
        document.getElementById("tlacitkoPenezenka").disabled = true;

        document.getElementById("inputSazka").disabled = false;
        document.getElementById("tlacitkoSazka").disabled = false;

        document.getElementById("konecHry").disabled = false;
        aktualizovat();    
    } else{
        alert("Tímto svou peněženku nenaplníš!")
    }
}
function vsadit() {
    let input = Number(document.getElementById("inputSazka").value);
    if ((input <= statsHrac.penezenka) && (input > 0) && (Number.isInteger(input))) {
        statsHrac.sazka = input;
        statsHrac.penezenka -= statsHrac.sazka;
        document.getElementById("inputSazka").disabled = true;
        document.getElementById("tlacitkoSazka").disabled = true;
        document.getElementById("vzitKartu").disabled = false;

        document.getElementById("konecHry").disabled = true;
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
    statsHrac.body += karty.hrac[karty.hrac.length - 1].body;
    alert("Vytáhl jste si kartu: " + karty.hrac[karty.hrac.length - 1].nazev);
    aktualizovat(karty.hrac, "karta");
    document.getElementById("hracMaDost").disabled = false;

    //check, jestli hrac neprohral/nevyhral
    if ((karty.hrac[0].body == 11) && (karty.hrac[1].body == 11)) {
        //vyhodnoceni (hrac vyhral)
        vyhodnoceni("hrac");
        document.getElementById("vzitKartu").disabled = true;
    }else if (statsHrac.body > 21) {
        //vyhodnoceni (hrac prohral)
        vyhodnoceni("bank");
        document.getElementById("vzitKartu").disabled = true;
    }
}
function hracMaDost() {
    document.getElementById("vzitKartu").disabled = true;
    document.getElementById("hracMaDost").disabled = true;
    document.getElementById("kartyBank").innerHTML = "Karty bankéře:"
    //zde dobírá bankéř
    while (statsBot.body < 16) {
        presunoutKartu(karty.balicek, karty.bot);
        statsBot.body += karty.bot[karty.bot.length - 1].body;
    }
    aktualizovat(karty.bot, "kartaBank");

    //kontrola prohry/výhry
    if ((karty.bot[0].body == 11) && (karty.bot[1].body == 11)) {
        //vyhodnoceni (bot vyhral)
        vyhodnoceni("bank");
    }else if (statsBot.body > 21) {
        //vyhodnoceni (bot prohral)
        vyhodnoceni("hrac");
    }else if (statsHrac.body > statsBot.body) {
        //vyhodnoceni (hrac vyhral)
        vyhodnoceni("hrac");
    }else if (statsHrac.body < statsBot.body) {
        //vyhodnoceni (hrac prohral)
        vyhodnoceni("bank");
    }else if (statsHrac.body == statsBot.body) {
        //nevyhral nikdo, sazky se vraci
        vyhodnoceni("nikdo");
    } else{
        alert("error ve vyhodnoceni");
    }
}

function vyhodnoceni(tenKdoVyhral) {
    document.getElementById("hracMaDost").disabled = true;
    //Podle toho kdo vyhrál se upraví stav hry, zde se přičítají/odečítají peníze!!!
    if (tenKdoVyhral == "hrac") {
        statsHrac.vyhranePenize += statsHrac.sazka * 2;
        statsHrac.sazka = 0;
        document.getElementById("historie").innerHTML += "Výhra<br>"
        alert("Výhra! Dvojnásobek vsazených peněz se Vám přičítá k vyhraným penězům.");
    }else if(tenKdoVyhral == "bank"){
        let ztraceneZivoty = statsHrac.sazka/statsHrac.cenaZivota;
        statsHrac.zivoty -= ztraceneZivoty;
        statsHrac.sazka = 0;
        document.getElementById("historie").innerHTML += "Prohra<br>"
        alert("Prohra! Ztrácíte svou sázku.");
    }else if(tenKdoVyhral == "nikdo"){
        statsHrac.vyhranePenize += Number(statsHrac.sazka);
        statsHrac.sazka = 0;
        document.getElementById("historie").innerHTML += "Remíza<br>"
        alert("Remíza! Vsazené peníze jsou přičteny k vyhraným penězům, Váš vklad se nezvětšil.");
    }

    aktualizovat(karty.hrac, "karta");
    aktualizovat(karty.bot, "kartaBank");

    if ((statsHrac.zivoty != 0) || (statsHrac.vyhranePenize != 0)) {
        document.getElementById("dalsiKolo").disabled = false;
        document.getElementById("konecHry").disabled = false;
    }else {
        alert("Došly vám finance, odcházíte z podniku!");
    }
}

function dokoupitZivot() {
    statsHrac.vyhranePenize -= statsHrac.cenaZivota;
    statsHrac.zivoty += 1;
    statsHrac.penezenka += statsHrac.cenaZivota;
    alert("Dokoupil jste jeden zivot, nyní máte " + statsHrac.zivoty);
    if (statsHrac.zivoty == 3) {
        document.getElementById("dokoupitZivot").disabled = true;
    }
    aktualizovat();
}
function dalsiKolo() {
    softReset();
    document.getElementById("dalsiKolo").disabled = true;
}
function konecHry() { //Když hráč zvolí možnost odejít z podniku po konci kola
    if (confirm("Opravdu si přejede ukončit hru?") == true) {
        let vyhra = statsHrac.penezenka + statsHrac.vyhranePenize;
        alert("Gratuluji, z podniku jste si odnesl " + vyhra + " peněz");
        document.getElementById("konecHry").disabled = true;
        hardReset();
        document.getElementById("inputPenezenka").disabled = true;
        document.getElementById("tlacitkoPenezenka").disabled = true;
        document.getElementById("dokoupitZivot").disabled = true;
    }
}

//přesouvá karty mezi poli
function presunoutKartu(odkud, kam) {
    let poziceOdkud = odkud.length - 1;

    kam.push(odkud[poziceOdkud]);
    let poziceKam = kam.length - 1;
    odkud.pop();
}
function novyBalicek() { //vytvoření a zamíchání nového balíčku
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

function aktualizovat(ruka, kdo) { //parametry nejsou nutné, jen jsou třeba pro vykreslení karet
    let procento = statsHrac.penezenka/(statsHrac.cenaZivota*3); //kolik procent zivotu je v penezence
    if (procento > 0.67) { //aktualizuje počet zbývajících životů na základě stavu peněženky
        statsHrac.zivoty = 3;
    }else if(procento > 0.34){
        statsHrac.zivoty = 2;
    }else if(procento > 0){
        statsHrac.zivoty = 1;
    }else{
        statsHrac.zivoty = 0;
    }
    //vykreslí životy
    let canvas=document.getElementById("zivoty");
    let ctx=canvas.getContext("2d");
    ctx.clearRect(0, 0, 150, 30);
    for (let i = 0; i < statsHrac.zivoty; i++) {
        ctx.beginPath();   
        ctx.arc(25 + (i * 50), 15, 15, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.strokeStyle="black";
        ctx.stroke();
        ctx.fill();   
    }

    //aktualizace udaju
    document.getElementById("infoPenezenka").innerHTML = "Peněženka: " + statsHrac.penezenka;
    document.getElementById("infoSazka").innerHTML = "Sázka: " + statsHrac.sazka;
    document.getElementById("vyhranePenize").innerHTML = "Vyhrané peníze: " + statsHrac.vyhranePenize;
    document.getElementById("bodyHrace").innerHTML = "Body hráče: " + statsHrac.body;
    if ((statsHrac.vyhranePenize >= statsHrac.cenaZivota) && (statsHrac.zivoty < 3)) {
        document.getElementById("dokoupitZivot").disabled = false;
    }else {        
        document.getElementById("dokoupitZivot").disabled = true;
    }
    
    //zobrazí vytažené karty (pokud jsou zadané do parametru)
    if (ruka != undefined) {
        for (let i = 0; i < ruka.length; i++) {
            let img = document.getElementById(kdo + i);
            img.src = ruka[i].image;
            img.alt = ruka[i].nazev;
            img.title = img.alt;
            img.height = "90";
            img.width = "60";
        }
    }
}

function softReset() { //resetuje karty, body a tlačítka
    document.getElementById("inputPenezenka").disabled = true;
    document.getElementById("tlacitkoPenezenka").disabled = true;
    document.getElementById("inputSazka").disabled = false;
    document.getElementById("tlacitkoSazka").disabled = false;
    document.getElementById("vzitKartu").disabled = true;
    document.getElementById("hracMaDost").disabled = true;
    document.getElementById("dalsiKolo").disabled = true;
    document.getElementById("konecHry").disabled = true;

    //smaže karty ze stolu
    for (let i = 0; i < 13; i++) {
        let img = document.getElementById("karta" + i);
        img.src = "";
        img.alt = "";
        img.title = "";
        img.width = "";
        img.heigth = "";
    }
    for (let i = 0; i < 13; i++) {
        let img = document.getElementById("kartaBank" + i);
        img.src = "";
        img.alt = "";
        img.title = "";
        img.width = "";
        img.heigth = "";
    }

    delete karty.balicek;
    delete karty.bot;
    delete karty.hrac;
    statsBot.body = 0;
    statsHrac.body = 0;
    aktualizovat()
}
function hardReset() { //resetuje navic všechny staty hrace
    softReset();
    document.getElementById("inputPenezenka").disabled = false;
    document.getElementById("tlacitkoPenezenka").disabled = false;
    document.getElementById("inputSazka").disabled = true;
    document.getElementById("tlacitkoSazka").disabled = true;

    document.getElementById("historie").innerHTML = "Historie výher a proher:<br>";

    statsHrac.zivoty = 3;
    statsHrac.penezenka = 0;
    statsHrac.cenaZivota = 1;
    statsHrac.sazka = 0;
    statsHrac.vyhranePenize = 0;
    aktualizovat();
}