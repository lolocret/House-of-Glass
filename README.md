# House of Glass — Guide et API Moon

Expérience interactive en Three.js avec un compagnon “Lune” qui répond via une API locale (Gemini/OpenAI) et un fallback hors-ligne partagé.

## Démarrage rapide
```bash
npm install
npm run dev:server   # sert l'app et l'API sur http://localhost:3000
```
Ouvre ensuite `http://localhost:3000` dans le navigateur.

## Variables d’environnement (.env)
```
GEMINI_API_KEY=...   # clé Google Generative Language API
# ou OPENAI_API_KEY=... si tu veux ce provider
```
Si aucune clé n’est fournie ou si l’API échoue, le bot répond avec le fallback local.

## API Moon
- Endpoint : `POST /api/moon`
- Body : `{"question": "texte libre"}`
- Réponse : `{"answer": "réponse en français"}` (toujours 200, même en fallback).

Test rapide :
```bash
curl -X POST http://localhost:3000/api/moon \
  -H "Content-Type: application/json" \
  -d '{"question":"test"}'
```

## Front (main.js)
- L’endpoint est lu via `data-moon-api` sur `<body>` (défaut `/api/moon`). Mettre `local` pour forcer l’offline.
- En cas d’erreur API ou d’absence d’endpoint, le front bascule sur les réponses locales (`moonReplies.json`).
- `startExperience()` initialise la scène et doit être déclenchée après un geste utilisateur (bouton Entrer).

## Fichiers clés
- `server.js` : backend Express, appels Gemini/OpenAI, fallback commun.
- `moonReplies.json` : déclencheurs + réponses de secours (partagé front/back).
- `main.js` : scène Three.js, navigation, chat Moon côté client.
- `style.css` : styles et HUD.

## Notes
- Aucune dépendance réseau n’est nécessaire si tu gardes `data-moon-api="local"` ou sans clé.
- Le compagnon répond en français, concis (1–3 phrases), centré sur les données perso, la navigation et les protections (RGPD, réglages).***
