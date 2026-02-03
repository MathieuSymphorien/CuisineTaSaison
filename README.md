# Cuisine Ta Saison

Application web pour découvrir les fruits et légumes de saison et des recettes associées.
Application en cours de développement.

### À propos

**Cuisine Ta Saison** propose aux utilisateurs de découvrir quels fruits et légumes sont de saison ainsi qu'à trouver de délicieuses recettes. L'application propose une interface intuitive pour parcourir les aliments et les recettes, avec des filtres avancés. Elle permet aussi aux utilisateurs de proposer des recettes (et des aliments) rendant l'application communautaire. Les propositions doivent passer par une validation d'un admin pour pouvoir être validées.

### Fonctionnalités

**Pour les utilisateurs :**

- Parcourir les fruits et légumes de saison par mois
- Filtrer les aliments par catégorie (fruit, légume, viande, poisson, céréale, épice, produit laitier, autre)
- Rechercher des recettes avec des filtres avancés :
  - Temps de préparation (min/max)
  - Nécessité d'un four
  - Ingrédients à inclure ou exclure
  - Disponibilité saisonnière
- Voir les informations détaillées des aliments et recettes
- Soumettre de nouveaux aliments et recettes pour approbation

**Pour les administrateurs :**

- Authentification sécurisée par JWT
- Approuver ou rejeter les soumissions des utilisateurs
- Gérer le catalogue d'aliments et de recettes
- Modifier les entrées existantes

### Stack technique

| Couche          | Technologie                                  |
| --------------- | -------------------------------------------- |
| Frontend        | Angular 20, TypeScript 5.8, Angular Material |
| Backend         | Spring Boot 3.5, Java 21, Spring Security    |
| Base de données | PostgreSQL 16                                |
| Déploiement     | Docker, Docker Compose, Nginx                |
| Hébergement     | OVH VPS                                      |

### Structure du projet

```
CuisineTaSaison/
├── front/                      # Frontend Angular
│   └── src/app/
│       ├── core/               # Guards, intercepteurs, services de base
│       ├── features/           # Modules fonctionnels (foods, recipes, auth)
│       ├── shared/             # Composants et modèles partagés
│       └── pages/              # Composants de pages
│
├── back/cts/                   # Backend Spring Boot
│   └── src/main/java/com/mathieu/cts/
│       ├── controllers/        # Points d'entrée de l'API REST
│       ├── services/           # Logique métier
│       ├── repositories/       # Couche d'accès aux données
│       ├── entities/           # Entités JPA et DTOs
│       ├── config/             # Configuration sécurité et application
│       └── exceptions/         # Exceptions personnalisées

```

### Points d'entrée de l'API

| Méthode  | Endpoint                        | Description                                             |
| -------- | ------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/foods`                    | Récupérer tous les aliments approuvés (avec filtres)    |
| `GET`    | `/api/foods/seasonal`           | Récupérer les aliments de saison                        |
| `POST`   | `/api/foods`                    | Soumettre un nouvel aliment                             |
| `GET`    | `/api/recipes`                  | Récupérer toutes les recettes approuvées (avec filtres) |
| `POST`   | `/api/recipes`                  | Soumettre une nouvelle recette                          |
| `POST`   | `/api/auth/login`               | Authentification admin                                  |
| `GET`    | `/api/admin/foods/pending`      | Récupérer les aliments en attente (admin)               |
| `PUT`    | `/api/admin/foods/{id}/approve` | Approuver un aliment (admin)                            |
| `DELETE` | `/api/admin/foods/{id}/reject`  | Rejeter un aliment (admin)                              |

### Démarrage

**Prérequis :**

- Node.js 20+
- Java 21
- Maven
- Docker & Docker Compose (optionnel)

**Développement local :**

```bash
# Cloner le dépôt
git clone https://github.com/MathieuSymphorien/CuisineTaSaison.git
cd cuisine-ta-saison

# Backend
cd back/cts
mvn clean package
java -jar ./target/cts-0.0.1-SNAPSHOT.jar

# Frontend (dans un nouveau terminal)
cd front
npm install
ng serve --proxy-config proxy.conf.json
```

**Avec Docker :**

```bash
cp .env.example .env
# Modifier .env avec votre configuration
docker-compose up --build
```

**Variables d'environnement :**

| Variable            | Description                     |
| ------------------- | ------------------------------- |
| `POSTGRES_DB`       | Nom de la base de données       |
| `POSTGRES_USER`     | Nom d'utilisateur de la base    |
| `POSTGRES_PASSWORD` | Mot de passe de la base         |
| `JWT_SECRET`        | Clé secrète pour les tokens JWT |
| `ADMIN_PASSWORD`    | Mot de passe de connexion admin |

---

**Contact :**
mathieusdev@gmail.com
