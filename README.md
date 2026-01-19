# Linekode - Site Web de Formation en Développement Web

Site web moderne et responsive pour Linekode, une école de formation en développement web basée à Dakar, Sénégal.

**🎓 5ème Cohorte en cours !**

## 🚀 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec animations
- **JavaScript (Vanilla)** - Interactivité sans framework
- **Font Awesome** - Icônes élégantes

## 📋 Fonctionnalités

- ✅ Page d'accueil avec présentation de l'école
- ✅ Catalogue de 6 formations détaillées
- ✅ Page À propos avec l'histoire et l'équipe
- ✅ Formulaire de contact fonctionnel
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Navigation fluide avec menu mobile
- ✅ Animations au scroll
- ✅ Compteurs animés pour les statistiques

## 🛠️ Installation

**Aucune installation nécessaire !** Le site utilise uniquement HTML, CSS et JavaScript vanilla.

### Option 1 : Ouvrir directement
Ouvrez simplement le fichier `index.html` dans votre navigateur.

### Option 2 : Serveur local (recommandé)
Pour éviter les problèmes CORS, utilisez un serveur local :

**Avec Python 3 :**
```bash
cd "/Users/Apple/Desktop/site pour linekode"
python3 -m http.server 8000
```
Puis ouvrez http://localhost:8000

**Avec PHP :**
```bash
cd "/Users/Apple/Desktop/site pour linekode"
php -S localhost:8000
```

**Avec l'extension VS Code "Live Server" :**
Clic droit sur `index.html` → "Open with Live Server"

## 📁 Structure du Projet

```
linekode-website/
├── index.html              # Page d'accueil
├── formations.html         # Page des formations
├── about.html             # Page à propos
├── contact.html           # Page de contact
├── css/
│   └── style.css          # Tous les styles CSS
├── js/
│   └── script.js          # Toute la logique JavaScript
└── README.md              # Documentation
```

## 🎨 Personnalisation

### Couleurs

Les couleurs principales sont définies dans `css/style.css` avec des variables CSS :

```css
:root {
    --primary-600: #0284c7;
    --primary-700: #0369a1;
    /* Modifier ces valeurs pour changer les couleurs */
}
```

### Contenu

**Formations :** Modifier le HTML dans `formations.html`
- Chaque formation est dans une `div.course-card`
- Modifier les titres, descriptions, prix et compétences

**Témoignages :** Modifier dans `index.html`
- Section `.testimonials-section`
- Chaque témoignage est dans une `div.testimonial-card`

**Équipe :** Modifier dans `about.html`
- Section `.team-section`
- Chaque membre est dans une `div.team-member`

**Contact :** Modifier dans `contact.html`
- Informations de contact dans `.contact-info-card`
- FAQ dans `.faq-item`

## 📱 Responsive Design

Le site est entièrement responsive avec 3 breakpoints :
- 📱 **Mobile** : < 768px
- 📱 **Tablette** : 768px - 1024px
- 💻 **Desktop** : > 1024px

## ✨ Fonctionnalités JavaScript

- **Menu mobile** : Navigation responsive avec animation
- **Formulaire de contact** : Validation et message de succès
- **Animations au scroll** : Éléments qui apparaissent progressivement
- **Compteurs animés** : Statistiques qui s'animent
- **Navbar sticky** : Barre de navigation qui reste visible
- **Smooth scroll** : Défilement fluide pour les ancres

## 🌐 Déploiement

Le site peut être déployé sur n'importe quel hébergeur web :

### Netlify (Gratuit)
1. Glissez-déposez tout le dossier sur netlify.com/drop
2. Votre site est en ligne !

### GitHub Pages (Gratuit)
1. Créez un repository GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans les paramètres

### Hébergement traditionnel
Uploadez tous les fichiers via FTP sur votre hébergeur web.

## 🎯 Pages du Site

- **index.html** : Page d'accueil avec hero, statistiques, fonctionnalités et témoignages
- **formations.html** : Catalogue complet des 6 formations avec détails
- **about.html** : Mission, valeurs, historique et équipe
- **contact.html** : Formulaire de contact, informations et FAQ

## 📄 Licence

© 2024 Linekode. Tous droits réservés.

## 📍 Localisation

**Linekode Sénégal**
- 📧 Email: contact@linekode.sn
- 📞 Téléphone: +221 77 123 45 67
- 📍 Adresse: Plateau, Dakar, Sénégal

## 🤝 Support

Pour toute question ou support, contactez-nous à contact@linekode.sn

---

**Note :** Ce site est entièrement fonctionnel et prêt à l'emploi. Aucune dépendance externe n'est requise (sauf Font Awesome chargé via CDN).
