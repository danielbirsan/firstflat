# FirstFlat

Site bilingv pentru FirstFlat, construit cu React și Vite.

## Dezvoltare locală

Folosește Node.js 22.12 sau mai nou și npm.

```sh
npm ci
npm run dev
```

Pentru build și verificarea variantei de producție:

```sh
npm run build
npm run preview
```

Directorul `dist/` conține fișierele statice de publicat.

## Formularul de acces

Formularul trimite câmpurile existente către Google Forms și afișează pagina locală `#confirmare`. Browserul poate semnala o eroare de rețea, însă Google Forms nu îi permite să citească răspunsul pentru a verifica dacă a înregistrat cererea.
