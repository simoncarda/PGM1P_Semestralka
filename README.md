Karetní hra oko

Povinně volitelné: 
  Obrázky karet
  Nákup životů
  Historie výher a proher

Ovládání: 
  -Vlevo nahoře Jsou vykreslovány životy (červené kružnice)
  -Indikátor "Peněženka: xxx" značí částku, se kterou hráč přišel do podniku (tu si určuje sám)
  -Indikátor "Sázka: xxx" značí částku, kterou hráč v tomto kole vsadil ze své peněženky
  -Indikátor "Vyhrané peníze: xxx" značí částku, kterou hráč během svého hraní vyhrál. Za tuto částku si může dokupovat životy. 
  -Input pole s placeholderem "Zadejte částku", vedle kterého se nachází tlačítko "Vložit do peněženky" slouží k zadání částky, se kterou hráč do podniku přišel (hodnotou jeho peněženky).
  -Tlačítko "Vložit do peněženky" vloží obnos do peněženky, čímž hráč vstoupí do podniku a může začít hrát. (V tento moment si hráč své rozhodnutí ke gamblingu stále může rozmyslet a odejít z podniku)
  -Input pole s placeholderem "Zadejte sázku" a k němu přidružené tlačítko "Vsadit" slouží k vsazení částky zadané do inputu. Tato částka je pak odečtena z penženky, pokud je třeba, je odečten i život a hráč má možnost si vzít kartu. V tento moment je také vytvořen a zamíchán balíček s kartami. Hráč již nemá možnost odejít z podniku, musí hrát.
  -Tlačítko "Vzít kartu" Hráči předá z balíčku jednu kartu, pod nadpiskem "Karty hráče" se karta zobrazí. Hráč je také upozorněn na to, jakou kartu si vytáhl a jsou mi přičteny body, které se zobrazují za indikátorem "Body hráče: xxx". Pokud hráč při tahání karet přesáhne hodnotu 21, hra je vyhodnocena. Pokud vytáhne při prvních dvou tazích tzv. "královské oko", vyhrává.
  -Tlačítko "Už mám dost karet" hráč využije, pokud již nechce nabírat další karty. Po jeho stisknutí dobírá ke svým kartám bankéř, jeho karty jsou odhaleny a hra vyhodnocena. Hráč je upozorněn, zda vyhrál (vyhrává i sázku bankéře, který ho při sázení musel dorovnat), prohrál (Jeho sázka propadá bankéři), nebo zda hra neskončila remízou (Jeho sázka se mu vrací, přičítá se mezi vyhrané peníze).
  -Tlačítko "Další kolo" odstartuje další kolo, pokud má hráč stále co sázet.
  -Tlačítko "Ukončit hru a odejít z podniku" umožňuje hráči vzít své vyrané peníze a peněženku a odejít z podniku. Hra tímto končí a hráči je oznámeno, kolik peněz si odnáší.
  -Tlačítko "Dokoupit jeden život" se hráči zpřístupní, pokud má z čeho nakupovat životy. Pokud ho klikne, z vyhraných peněz se mu odečte částka dopovídající jednomu životu a život se mu přidá.
  -Tlačítko "RESET" uvede celou hru do původního stavu, tedy jako by hráč do podniku nikdy nepřišel.
  -Pod tlačítkem "RESET" se nachází historie výher a proher (přpadně remíz).

Postup hry:
  Hráč určuje, kolik má peněz (tím se předem vypočte, kolik stojí jeden život, životy jsou hned vykresleny)
  Hráč vsází
  Vytvořit balíček, zamíchat balíček (pole objektlů)
  vytvořit pole pro hráč karty
  Dát bankéři (počítači) první kartu
  Dát hráči první kartu
  Hráč dobírá dle libosti
  pokud hráč při dobírání prohrál, hra je vyhodnocena --> další kolo nebo konec hry
  Hráč přestává dobírat (buď má přes 21, nebo oko, nebo sám usoudil, že má dost)
  Bankéřovy karty jsou odkryty 
  Bankéř dobírá dle scriptu (braná karta je vždy odkryta)
  Herní skore je porovnáno a je určen vítěz
  Vítěz bere sázky a ukládá je do vyhraných peněz
  Pokud hráč prohrál, jsou mu adekvátně odečteny životy
  Pokud mu došly životy, jeho hra končí (na tuto skutečnost je upozorněn)
  Hráč může libovolně dokupovat životy, pokud jich nemá plný počet
  Hráč odchází, nebo hraje dál (musí znovu vsadit)