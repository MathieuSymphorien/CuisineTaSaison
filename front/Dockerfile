# Étape 1 : Build de l'application Angular
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# Étape 2 : Serveur web pour servir les fichiers statiques
FROM nginx:alpine
# Copie les fichiers depuis le dossier de build (par défaut : /app/dist/<nom-du-projet>)
COPY --from=build /app/dist/first-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
