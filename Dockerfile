# Image officielle Node.js avec Chromium intégré
FROM node:18-bullseye

# Installer Chromium et les dépendances
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Définir le chemin de Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Créer le dossier de l'app
WORKDIR /app

# Copier les fichiers
COPY package*.json ./
COPY bot.js ./
COPY render.yaml ./

# Installer les dépendances
RUN npm install

# Lancer le bot
CMD ["node", "bot.js"]
