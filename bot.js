// ============================================================
// BOT WHATSAPP VERSION RENDER (avec Chromium intégré)
// ============================================================

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Création du client avec configuration spéciale Render
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // ============================================
        // CONFIGURATION POUR RENDER
        // ============================================
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ],
        executablePath: '/usr/bin/chromium' // Chemin vers Chromium installé sur Render
    }
});

// ------------------------------------------------------------
// AFFICHAGE DU QR CODE
// ------------------------------------------------------------
client.on('qr', qr => {
    console.log('📱 SCANNE CE QR CODE AVEC WHATSAPP :');
    console.log('   1. Ouvre WhatsApp sur ton téléphone');
    console.log('   2. Va dans "Appareils connectés"');
    console.log('   3. Clique sur "Connecter un appareil"');
    console.log('   4. Scanne ce code :');
    qrcode.generate(qr, { small: true });
});

// ------------------------------------------------------------
// CONNEXION RÉUSSIE
// ------------------------------------------------------------
client.on('ready', () => {
    console.log('✅ BOT WHATSAPP CONNECTÉ ET PRÊT !');
    console.log('📆 Le bot est en ligne 24h/24 sur Render');
});

// ------------------------------------------------------------
// RÉPONSE AUTOMATIQUE AUX MESSAGES
// ------------------------------------------------------------
client.on('message', async message => {
    const msg = message.body.toLowerCase().trim();

    console.log(`📩 Message reçu : "${message.body}"`);

    // Commande : bonjour
    if (msg === 'bonjour' || msg === 'salut') {
        await message.reply('👋 Bonjour ! Comment vas-tu ?');
    }

    // Commande : merci
    else if (msg.includes('merci')) {
        await message.reply('😊 Avec plaisir ! N\'hésite pas si tu as d\'autres questions.');
    }

    // Commande : heure
    else if (msg === 'heure' || msg === 'quelle heure') {
        const now = new Date();
        const heures = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        await message.reply(`🕐 Il est ${heures}h${minutes} (heure de Render).`);
    }

    // Commande : blague
    else if (msg === 'blague') {
        await message.reply('😂 Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau !');
    }

    // Commande : au revoir
    else if (msg === 'au revoir' || msg === 'bye') {
        await message.reply('👋 À bientôt ! Prends soin de toi.');
    }

    // Commande : aide
    else if (msg === 'aide' || msg === 'help') {
        await message.reply(
            '📋 **Commandes disponibles :**\n\n' +
            '• bonjour → Salutation\n' +
            '• heure → Donne l\'heure\n' +
            '• blague → Une petite blague\n' +
            '• merci → Réponse polie\n' +
            '• au revoir → Message de départ\n' +
            '• aide → Affiche ce message'
        );
    }

    // Réponse par défaut pour tout autre message
    else {
        await message.reply(`🤖 Je n'ai pas compris "${message.body}".\nTape "aide" pour voir les commandes disponibles.`);
    }
});

// ------------------------------------------------------------
// GESTION DES ERREURS
// ------------------------------------------------------------
client.on('error', error => {
    console.error('❌ Erreur du client :', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Promesse non gérée :', reason);
});

// ------------------------------------------------------------
// DÉMARRAGE DU BOT
// ------------------------------------------------------------
console.log('🚀 Démarrage du bot WhatsApp...');
client.initialize();
