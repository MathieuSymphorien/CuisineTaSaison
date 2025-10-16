# Utilise une image officielle OpenJDK
FROM eclipse-temurin:17-jdk-jammy

# Déclare le port d'écoute
EXPOSE 8080

# Copie le fichier JAR construit
COPY target/*.jar app.jar

# Lance l'application
ENTRYPOINT ["java", "-jar", "/app.jar"]
