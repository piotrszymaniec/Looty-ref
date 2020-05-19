zacznij pisac wstep do readme.md dla looty

czym jest
Looty zostal oddany do uzytku w 2014 roku i od tamtego czasu jest rozwijany.Teraz jest rzadziej - mnostwo prace/itd. Dlatego tez przepraszam z gory ze odpowiedz na issue zgloszone moze trwac parenascie dni.

wyszukiwarka przedmiotow oraz MTX z wszystkich postaci i calego twojego stasha w wybranej danej lidze  ALL your account for selected league, standard, hardcore, st ssf, private leagues, season leagues,  moze jeszcze out of the box. 
Niezmiernie szybka, w mgnieniu oka przetwaza kilkadziesiat tysiecy wpisow. Wiec czy masz 4 zakladki i 1 postac, czy 1000 zakladek i 100 postaci, you are covered. 

co dla ciebie zrobi
zlokalizuje miejsce w ktorym przedmiot sie znajduje ( ten 4 lvl enh ktory gdzies jest na jakiejs postaci) (osobna kolumna)
wyszuka zbroje 6 linkowa o kolorach BBBBG oraz dowolnym 6tym  _ 
poda wartosc wybranego affixu, aktualnie looty obsluguje 1xx affixow i wlasnosci specjalnych - mtx w tym:
z mozliwoscia filtrowania > < >= <=  _._._._._._ NOT ? 
nazwy literowo numeryczne jak lokalizacja, nazwa itp sa obslugiwane prostym wyr reg. 
slowo 2H  will find 2handed,  life will match  cruel jewel of life, and also  life and death reaper or  proliferation something, it doesent matter if you use Small or small, covers all
wielokolumnowy/parametrowe filtrowanie, sila 1, critical strike 19> 

mozesz zapisywac kombinacje filtrow, takze z aktualnie wpisanymi wartosciami (req int < 90) BBGRW. 

wszystko co musisz zrobic to zalogowac sie raz do strony pathofexile.com aby dodatek mogl pobrac dane o twoim POESSID ktorego uzywa do autoryzowania z serverami poe. jesli juz jestes zalogowany to nie musisz, program wspoldzieli pamiec przegladarki dot strone poe

generalne


ofensywne


defensywne

utility
mf %
m speed %

misc
MTXes



flaski
jakie statystyki moze sortowac



disclaimer, poki co looty jest zalezny od mozliwosci polaczenia z serverami, w momencie downtime nie bedzie dzialac

to do corrupted, elder, shaper

algorytm Poliego? inne nazwa czy cos
Dane:
"numTabs":x  pierwsze zapytanie https://www.pathofexile.com/character-window/get-stash-items?accountName=suni3mo&league=Blight&tabIndex=0&tabs=1
45:60:60  limit 45 zapytan w czasie 60 sekund, po jego przekroczeniu czekasz 60s, czyli 15 + 45 
program wykonuje 4 zapytania na sekunde

Szukane
czas dla ktorego mozna wykonac 45 zapytan, w ciagu 60 sekund
metoda zadawania zapytan ktora laduje "wystarczajaco duzo" sporo danych (informacja dla uzytkownika ile bedzie musial czekac do pelnego zaladowania stasha -> Aktualnie w bazie znajduje sie _s_ zakladek, przewidywany czas potrzebny do zaladowania pozostalych 132 _t_)

1 : 3 : 17  - 1 true
                ...
1 : 3 : 18  - true 9:45 index 1/30
... 14 sekund                                      
1 : 3 : 32  - true 45:60 index 24/30
-----------------------------
1 : 3 : 32  - false 46:60
1 : 3 : 32  - false
1 : 3 : 32  - false 
... 28 sekund
1 : 4 : 00  - false 144:60 
-----------------------------
1 : 4 : 00  - 1 true
1 : 4 : 00  - 1 true
1 : 4 : 00  - 1 true



ok req:  x in t1
bad req

time to
ok req: tn - x = wait_time + safe_const_t


safe_const_t = 1s



