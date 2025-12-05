# 🍎 Cuisine Ta Saison

Application web pour découvrir les fruits et légumes de saison et des recettes associées.

## 🧱 Stack technique

- Angular 18
- Spring Boot 3
- PostgreSQL 16
- Docker + Docker Compose
- Hébergement : OVH VPS

## 🚀 Lancer le projet

```bash
git clone https://github.com/tonCompte/cuisine-ta-saison.git
cd cuisine-ta-saison
cp .env.example .env
docker-compose up --build
```

java -jar .\target\cts-0.0.1-SNAPSHOT.jar  
mvc clean package
ng serve --proxy-config proxy.conf.json
mvn clean install
