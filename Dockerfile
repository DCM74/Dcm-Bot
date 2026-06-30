# Utiliser l'image officielle puppeteer (inclut Chromium)
FROM ghcr.io/puppeteer/puppeteer:latest

# Créer le dossier de l'app
WORKDIR /app

# Copier les fichiers
COPY package*.json ./
COPY bot.js ./

# Installer les dépendances
RUN npm install

# Lancer le bot
CMD ["node", "bot.js"]
