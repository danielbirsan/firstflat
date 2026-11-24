# FirstFlat

Landing page static în română și engleză, cu temă deschisă implicită și opțiune de temă întunecată. Pornește serverul din rădăcina
proiectului cu `python3 -m http.server 8000 --bind 127.0.0.1`.

## Formularul de acces

Formularul trimite rolul, numele și adresa de e-mail direct către
Google Forms. Pagina de răspuns de la Google confirmă dacă cererea a fost
acceptată. Formularul Google trebuie să accepte răspunsuri publice și să
permită trimiterea celor trei câmpuri fără alte întrebări obligatorii.

## Analiză de trafic

Pentru rapoarte agregate, setează ID-ul fluxului web GA4 (`G-…`) în
metadatele `firstflat-ga4` din `index.html`. Dacă ID-ul lipsește, pagina păstrează
atribuirea doar în sesiunea browserului, după acord, și nu încarcă GA4.

Pentru linkurile de campanie folosește parametri ca
`?utm_source=instagram&utm_medium=social&utm_campaign=lansare`. Folosește nume
de campanie fără date personale. După consimțământ, GA4 primește evenimentul
`page_view` și, la trimiterea cererii, `access_continue`. Al doilea
măsoară încercarea de trimitere către Google Forms. Răspunsurile trimise se urmăresc în
Google Forms. Dezactivează măsurarea îmbunătățită pentru clicuri externe și
interacțiuni cu formulare în fluxul GA4 dacă folosești evenimentele explicite ale
paginii.
