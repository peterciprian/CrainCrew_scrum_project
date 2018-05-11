Cél: Webáruház:
##Általános
* NodeJs-restAPI
* express - lesz egy blueprint, ezt kell pullolni és kidolgozni
* login-logout meglesz, bővíteni kell majd.
* MongoDB
* kliensoldalon Angular(5)
* pug/html szabadon választható
* .eslintrc 100%-ban! ami a gyökérben van
* cleancode
* css: .stylelintrc - gyökérben
* css: BEM metodka4
* nem kell dokumentáció, csak a jsDoc szerinti szabályokat kell követni, hogy lehessen egy html dokumentációt kenerálni
* reszponzivitás: 2 nézet: mobil, desktop
* tesztek: kell.

##
* felhasználók nyilvántartása
    *   eltérő jogkörrel (admin, user)
* termékek nyilvántartása
    * értékelések írása/hozzászólás (csak ha már megvette)
    * termékek kategorizálása
* rendelések nyilvántartása
    * admin oldalról listázható, modosítható, törölhető, user csak létrehozni tud
* admin felület
    * statisztikák
    * vásárlók CRUD
    * rendelések CRUD
* user profilpage
    * adatok modosítása (cím, telefon stb) (ezek a rendeléshez kellenek)
* publikus oldalak?:
    * index: legfrissebb 10 termék, +kategóriák
    * minden termékhez termékoldal
    * terméket a felhasználó a kosárba tudja rakni
    * kosároldalról a rendelést véglegesíteni tudja
    * kapcsolat: google map beszúrása: markerrel
    * nodemail package segítségével email küldés funkció