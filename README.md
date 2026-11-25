```
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
```

Full Stack • Cybersecurity • Data • AI


## — Portfolio

Portfolio personnel orienté Full Stack, Cybersécurité, Data & IA.

Ce projet a été conçu pour présenter mon univers technique, mes compétences et les projets sur lesquels je travaille à travers une expérience moderne, immersive et dynamique.

## Stack principale

- React / Vite

- TypeScript

- CSS / Animations avancées

- UI moderne & responsive

- Architecture modulaire

## Domaines

- Développement Full Stack

- Cybersécurité

- Analyse de données

- Intelligence artificielle

- Automatisation & scripting

## Objectif

Créer une identité numérique qui reflète ma vision :

développer des systèmes modernes, performants et sécurisés, tout en gardant une forte approche produit et expérience utilisateur.

## Fonctionnalités

- Interface moderne et animée

- Design inspiré univers cyber / tech

- Sections projets dynamiques

- Responsive mobile & desktop

- Expérience immersive orientée branding personnel

Code source du portfolio (React 19 + TypeScript + Vite 7), déployé sur GitHub Pages.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173/Portfolio/ (le chemin `/Portfolio/` vient de `base` dans `vite.config.ts`).

## Scripts

| Commande          | Rôle                                         |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Serveur de développement avec rechargement   |
| `npm run build`   | Vérification TypeScript + build dans `dist/` |
| `npm run preview` | Sert le build de production en local         |
| `npm run lint`    | ESLint                                       |

## Structure

```
src/
├── App.tsx                  # Assemble les 4 sections (#accueil, #about, #experience, #contact)
├── index.css                # Styles globaux et mise en page des sections
└── components/
    ├── accueil/             # Hero + boutons de navigation + téléchargement du CV
    ├── Animation/           # Fond animé « code qui s'écrit »
    ├── about/               # Sélecteur Cyber / Full stack / Data-IA
    ├── experiences/         # Carte projets + bandeau défilant
    └── contact/             # Email, réseaux, footer
public/
└── cv-charly-brachet.pdf    # CV téléchargeable
```

## Modifier le contenu

- **Projets** : tableau `projects` dans `components/experiences/Experiencescard.tsx`
- **Compétences** : tableau `aboutToggleItems` dans `components/about/About_card.tsx`
- **Liens et email** : `socialLinks` et `email` dans `components/contact/Contact.tsx`
- **CV** : remplacer `public/cv-charly-brachet.pdf` (garder le même nom)

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui compile le projet et publie `dist/` sur GitHub Pages.
