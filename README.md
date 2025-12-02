# Guide d’installation débutants (macOS / Windows)

## 0. Prérequis (5 min)
1) Installe Node.js (version LTS) depuis https://nodejs.org (suivre l’installeur comme un logiciel classique).  
2) Ouvre un terminal :  
   - macOS : Applications > Utilitaires > Terminal  
   - Windows : Démarrer > taper “cmd” ou “PowerShell”  
3) Vérifie que Node est bien là :  
   `node -v` puis `npm -v`  
   Si des numéros s’affichent, c’est OK.

## Option A — Sans git (téléchargement ZIP)
1) Télécharge le ZIP : sur GitHub, bouton vert « Code » > Download ZIP.  
2) Dézippe : fais un double-clic sur le ZIP et ouvre le dossier `House-of-Glass`.  
3) Ouvre un terminal DANS ce dossier :  
   - macOS : clic droit dans le dossier > Services > « Nouveau Terminal dans le dossier » (ou ouvre Terminal et `cd` jusqu’au dossier).  
   - Windows : clic droit > « Ouvrir dans le terminal » (ou PowerShell dans le dossier).  
4) Installe les dépendances (attends la fin, cela peut prendre 1–2 minutes) :  
   `npm install`  
5) Crée le fichier `.env` (dans le dossier) et ajoute ta clé privée :  
   `GEMINI_API_KEY=VOTRE_CLE_ICI`  
   Ne partage pas cette clé. Sauvegarde.  
6) Lance l’appli :  
   `npm start`  
   Tu dois voir une ligne type `App running on http://localhost:3000`.  
7) Ouvre ton navigateur sur `http://localhost:3000`, clique sur « Entrer ».

## Option B — Avec git clone (si git installé)
1) Vérifie/installe git : https://git-scm.com/downloads  
2) Clone le dépôt :  
   `git clone https://github.com/lolocret/House-of-Glass.git`  
3) Entre dans le dossier :  
   `cd House-of-Glass`  
4) Installe les dépendances :  
   `npm install`  
5) Crée `.env` avec ta clé (ne la publie pas) :  
   `GEMINI_API_KEY=VOTRE_CLE_ICI`  
6) Lance :  
   `npm start`  
7) Navigue sur `http://localhost:3000` et clique sur « Entrer » pour démarrer House of Glass et discuter avec Moon.

## Dépannage rapide
- `npm` introuvable : rouvre le terminal après l’installation ou réinstalle Node.js (LTS).  
- Port 3000 déjà utilisé : ferme l’appli en cours ou crée `.env` avec `PORT=3001`, puis relance `npm start`.  
- Clé manquante/invalide : corrige `.env`, sauvegarde, relance `npm start` (sans clé, Moon répond en mode local).  
- Page blanche ou erreur JS : recharge la page (Ctrl/Cmd + R) et vérifie la console du navigateur.  
- Si rien ne s’affiche dans le terminal : assure-toi d’être dans le bon dossier (le répertoire contenant `package.json`).
