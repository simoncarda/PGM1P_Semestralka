let balicek=[];
let rukaHrace=[];
let rukaPocitace=[];
let bodyHrace = 0;
let bodyPocitace=0;

let vsazeno = 0;
let zivotyHrace = 3;
let penezenka = 0;
let cenaZivota = 0;

//fce pro naplnění peněženky, zapíše požadovanou hodnotu do proměnné "peněženka", zobrazí ji (penezenkaDisplay), vypočte cenu jednoho života (uloží do "cenaZivota"), uzamkne/uvolní potřebaná tlačítka 
function naplnitPenezenku() {
    let input = document.getElementById("inputPenezenka").value;
    if (input>0) {
        penezenka = input;

        cenaZivota = input/3;
        
        document.getElementById("inputPenezenka").disabled = true;
        document.getElementById("tlacitkoPenezenka").disabled = true;

        document.getElementById("inputSazka").disabled = false;
        document.getElementById("tlacitkoSazka").disabled = false;

        aktualizovatHodnoty();        
    } else{
        alert("Tímto svou peněženku nenaplníš!")
    }
}

//funkce pro vsázení, zapíše hodnotu sázky do proměnné "vsazeno" a uzamkne/uvolní potřebná tlačítka
function vsadit() {
    let input = document.getElementById("inputSazka").value;
    if (input <= penezenka && input>0) {
        vsazeno = input;
        penezenka-=vsazeno;

        document.getElementById("inputSazka").disabled = true;
        document.getElementById("tlacitkoSazka").disabled = true;
        
        document.getElementById("vzitKartu").disabled = false;
        novyBalicek();
        rozdatDveKarty();
        aktualizovatHodnoty();
    } else{
        alert("Toto vsadit nemůžeš!");
    }
}

//Na začátku kola rozdá každému hráči 2 karty
function rozdatDveKarty() {
    for (let i = 0; i < 2; i++) {
        rukaHrace.push(balicek[balicek.length-1]);
        balicek.pop();
        let hodnota = zjistiHodnotuKarty(rukaHrace[rukaHrace.length-1]);
        bodyHrace += Number(hodnota);
    }
    for (let i = 0; i < 2; i++) {
        rukaPocitace.push(balicek[balicek.length-1]);
        balicek.pop();
        let hodnota = zjistiHodnotuKarty(rukaPocitace[rukaPocitace.length-1]);
        bodyPocitace += Number(hodnota);
    }
    vypsat(rukaHrace);
    aktualizovatHodnoty();
}

//naplní pole "balicek[]" objekty s hodnotami "barva" a "hodnota"
function naplnitBalicek() {
    let barvy=["kul", "srdc", "žalud", "list"];
    let hodnoty=["spodek", "svršek", "král", 7, 8, 9, 10, "eso"];
    for (let i = 0; i < barvy.length; i++) {
        for (let j = 0; j < hodnoty.length; j++) {
            let karta={barva: barvy[i], hodnota: hodnoty[j]};
            balicek.push(karta);
        }
    }
}

//---dočasná fce pro výpis balíčku---
function vypsat(x) {
    let text = "";
    for (let i = 0; i < x.length; i++) {
        text += `${i+1} ${x[i].barva} ${x[i].hodnota} \n`;
    }
    console.log(text);
}

//vrátí pole zpracované jako string
function returnPoleString(pole) {
    let text = "";
    for (let i = 0; i < pole.length; i++) {
        text += `${pole[i].barva} ${pole[i].hodnota} <br>`;
    }
    return text
}

//Fisher-Yates algoritmus pro míchání balíčku 
function zamichatBalicek() {
    let currentIndex = balicek.length;
    //dokud zbývají v balíčku karty k míchání
    while (currentIndex != 0) {
        //vyber náhodný objekt z pole
        let randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex--;

        //prohoď ho s aktuálním objektem v poli
        [balicek[currentIndex], balicek[randomIndex]] = [balicek[randomIndex], balicek[currentIndex]];
    }
    
}

//tato funkce vytvoří a zamíchá nový balíček ---PRO TESTOVACÍ ÚČELY HO I VYPÍŠE---
function novyBalicek() {
    naplnitBalicek();
    zamichatBalicek();
    vypsat(balicek);
}

function tahyPocitace() {
    while (bodyPocitace<14) {
        rukaPocitace.push(balicek[balicek.length-1]);
        balicek.pop();
        let hodnota = zjistiHodnotuKarty(rukaPocitace[rukaPocitace.length-1]);
        bodyPocitace += Number(hodnota);
    }
}
//aktivováním této funkce si hráč lízne kartu, která je přidána do "rukaHrace" (na poslední místo). Hráči se aktualizuje celková hodnota karet v ruce. Informace o líznuté kartě jsou vypsány v alertu.
function vzitKartu() {
    let dalsiKartu=true;
   
    //z balíčku se vytáhne poslední karta (počítejme, že první karta je na spodku balíčku) a přenese se do ruky hráče (tedy na vršek jeho osobního balíčku), (NOVÁ KARTA JE VŽDY NA KONCI POLE)
    rukaHrace.push(balicek[balicek.length-1]);
    balicek.pop();
    let hodnota = zjistiHodnotuKarty(rukaHrace[rukaHrace.length-1]);
    
    //alerty na taženou kartu
    switch (rukaHrace[rukaHrace.length-1].hodnota) {
        case "spodek":
            alert("Vytáhl jste si " + rukaHrace[rukaHrace.length-1].barva + "ový spodek. Tato karta má hodnotu " + hodnota);
            break;
        case "svršek":
            alert("Vytáhl jste si " + rukaHrace[rukaHrace.length-1].barva + "ový svršek. Tato karta má hodnotu " + hodnota);
            break;
        case "král":
            alert("Vytáhl jste si " + rukaHrace[rukaHrace.length-1].barva + "ového krále. Tato karta má hodnotu " + hodnota);
            break;
        case "eso":
            alert("Vytáhl jste si " + rukaHrace[rukaHrace.length-1].barva + "ové eso. Tato karta má hodnotu " + hodnota);
            break;
        case 7:
            alert("Vytáhl jste si " + rukaHrace[rukaHrace.length-1].barva + "ovou sedmu. Tato karta má hodnotu " + hodnota);
            break;
        case 8:
            alert("Vytáhl jste si " + rukaHrace[rukaHrace.length-1].barva + "ovou osmu. Tato karta má hodnotu " + hodnota);
            break;
        case 9:
            alert("Vytáhl jste si " + rukaHrace[rukaHrace.length-1].barva + "ovou devítku. Tato karta má hodnotu " + hodnota);
            break;
        case 10:
            alert("Vytáhl jste si " + rukaHrace[rukaHrace.length-1].barva + "ovou desítku. Tato karta má hodnotu " + hodnota);
            break;            
        default:
            alert("error, něco se pokazilo");
            break;
    }

    //hodnota karty se přičte k celkové hodnotě karet, které má hráč v ruce 
    bodyHrace += Number(hodnota);
    vypsat(rukaHrace);
    aktualizovatHodnoty();
}

//zjistí hodnotu karty (nutno zadat pole a místo, ve kterém se v poli karta nachází), ---NOVÁ KARTA JE VŽDY NA KONCI POLE---
function zjistiHodnotuKarty(pole) {
    let vysledek;
    switch (pole.hodnota) {
        case "spodek":
            vysledek = 1;
            break;   
        case "svršek":
            vysledek = 1;
            break;
        case "král":
            vysledek = 2;
            break;
        case "eso":
            vysledek = 11;
            break;
        case 7:
            vysledek = 7;
            break;
        case 8:
            vysledek = 8;
            break;
        case 9:
            vysledek = 9;
            break;
        case 10:
            vysledek = 10;
            break;
        default:
            vysledek = undefined;
            break;
    }
    return vysledek;
}

//spocita celkovou hodnotu karet v poli
function spoctiBody(pole) {
    let body=0;
    for (let i = 0; i < pole.length; i++) {
        body += Number(zjistiHodnotuKarty(pole[i]));
    }
    return body;
}

//aktualizuje všechny hodnoty na stránce (aby ten kod byl hezčí)
function aktualizovatHodnoty() {
    document.getElementById("zivotyHraceDisplay").innerHTML = "Počet životů: "+zivotyHrace;
    document.getElementById("penezenkaDisplay").innerHTML ="Peněženka: "+penezenka;
    document.getElementById("vsazenoDisplay").innerHTML = "Vsazeno: "+vsazeno;

    document.getElementById("bodyHraceDisplay").innerHTML="Body hráče: "+bodyHrace;
    document.getElementById("kartyHraceDisplay").innerHTML="Karty hráče: <br>"+returnPoleString(rukaHrace);
    document.getElementById("bodyPocitaceDisplay").innerHTML="Body počítače: "+bodyPocitace;
}
