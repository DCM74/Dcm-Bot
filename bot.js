// ============================================================
// BOT WHATSAPP - VERSION DOCKER POUR RENDER
// ============================================================

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// ============================================================
// 1. CONFIGURATION DU CLIENT (avec Chromium)
// ============================================================
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Configuration pour Render avec Docker
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--disable-software-rasterizer'
        ],
        // Chemin vers Chromium installé dans le conteneur Docker
        executablePath: '/usr/bin/chromium'
    }
});

// ============================================================
// 2. AFFICHAGE DU QR CODE
// ============================================================
client.on('qr', qr => {
    console.log('\n');
    console.log('📱 SCANNE CE QR CODE AVEC WHATSAPP');
    console.log('----------------------------------------');
    console.log('1. Ouvre WhatsApp sur ton téléphone');
    console.log('2. Va dans "Appareils connectés"');
    console.log('3. Clique sur "Connecter un appareil"');
    console.log('4. Scanne ce code :');
    console.log('----------------------------------------');
    qrcode.generate(qr, { small: true });
    console.log('\n');
});

// ============================================================
// 3. CONNEXION RÉUSSIE
// ============================================================
client.on('ready', () => {
    console.log('\n');
    console.log('✅ BOT WHATSAPP CONNECTÉ AVEC SUCCÈS !');
    console.log('📆 Le bot est en ligne 24h/24 sur Render');
    console.log('🤖 Envoie "aide" pour voir les commandes');
    console.log('\n');
});

// ============================================================
// 4. RÉPONSE AUTOMATIQUE AUX MESSAGES
// ============================================================
client.on('message', async message => {
    const msg = message.body.toLowerCase().trim();
    const sender = message.from;

    console.log(`📩 Message reçu de ${sender} : "${message.body}"`);

    try {

        // ----- Commande : AIDE -----
        if (msg === 'aide' || msg === 'help' || msg === 'menu') {
            await message.reply(
                '📋 **COMMANDES DISPONIBLES**\n\n' +
                '• `bonjour` ou `salut` → Salutation\n' +
                '• `heure` → Heure actuelle\n' +
                '• `blague` → Une petite blague\n' +
                '• `merci` → Réponse polie\n' +
                '• `au revoir` ou `bye` → Message de départ\n' +
                '• `aide` ou `menu` → Affiche ce message\n\n' +
                '🔄 D\'autres commandes seront ajoutées bientôt !'
            );
        }

        // ----- Commande : BONJOUR -----
        else if (msg === 'bonjour' || msg === 'salut' || msg === 'hello' || msg === 'hi') {
            await message.reply('👋 Bonjour ! Comment vas-tu ? 😊');
        }

        // ----- Commande : MERCI -----
        else if (msg.includes('merci') || msg.includes('thanks')) {
            await message.reply('😊 Avec plaisir ! N\'hésite pas si tu as d\'autres questions.');
        }

        // ----- Commande : HEURE -----
        else if (msg === 'heure' || msg === 'quelle heure' || msg === 'time') {
            const now = new Date();
            const heures = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            await message.reply(`🕐 Il est ${heures}h${minutes} (heure de Render).`);
        }

        // ----- Commande : BLAGUE -----
        else if (msg === 'blague' || msg === 'joke') {
            const blagues = [
                '😂 Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau !',
                '🤣 Quel est le comble pour un électricien ? Ne pas être au courant !',
                '😄 Que fait une fraise sur un cheval ? Elle fait du strawberry !',
                '😅 Pourquoi les squelettes sont-ils si calmes ? Parce qu\'ils n\'ont pas de nerfs !'
            ];
            const randomBlague = blagues[Math.floor(Math.random() * blagues.length)];
            await message.reply(randomBlague);
        }

        // ----- Commande : AU REVOIR -----
        else if (msg === 'au revoir' || msg === 'bye' || msg === 'à plus') {
            await message.reply('👋 À bientôt ! Prends soin de toi. ✨');
        }

        // ----- Commande : QUI ES-TU ? -----
        else if (msg === 'qui es-tu' || msg === 'présentation') {
            await message.reply(
                '🤖 Je suis **DcmBot**, un assistant WhatsApp automatisé.\n\n' +
                '💻 Je tourne sur Render 24h/24 et 7j/7.\n' +
                '📱 Tu peux m\'envoyer des commandes comme "bonjour", "heure" ou "blague".\n' +
                '🎯 Je suis encore en développement, mais je m\'améliore chaque jour !\n\n' +
                '📋 Tape "aide" pour voir toutes mes commandes.'
            );
        }

        // ----- Commandes personnalisées (modifiables) -----
        else if (msg === 'dev' || msg === 'créateur') {
            await message.reply('👨‍💻 Ce bot a été créé avec ❤️ par DCM Pro !');
        }

        // ----- Message par défaut -----
        else {
            await message.reply(
                `🤖 Je n'ai pas compris "${message.body}".\n\n` +
                '📋 Tape **"aide"** pour voir les commandes disponibles.'
            );
        }

    } catch (error) {
        console.error('❌ Erreur lors du traitement du message :', error);
        await message.reply('⚠️ Désolé, une erreur s\'est produite. Réessaie plus tard.');
    }
});

// ============================================================
// 5. GESTION DES ERREURS
// ============================================================
client.on('error', error => {
    console.error('❌ Erreur du client :', error);
});

client.on('disconnected', (reason) => {
    console.log('🔌 Bot déconnecté :', reason);
});

client.on('auth_failure', () => {
    console.error('❌ Échec de l\'authentification. Scanne à nouveau le QR code.');
});

// ============================================================
// 6. GESTION DES PROMESSES NON GÉRÉES
// ============================================================
process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Promesse non gérée :', reason);
});

// ============================================================
// 7. DÉMARRAGE DU BOT
// ============================================================
console.log('\n');
console.log('🚀 Démarrage du bot WhatsApp...');
console.log('📱 En attente du QR code...');
console.log('\n');

client.initialize();
