const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Configuration du client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// QR Code
client.on('qr', qr => {
    console.log('📱 Scanne ce QR code avec WhatsApp :');
    qrcode.generate(qr, { small: true });
});

// Connecté
client.on('ready', () => {
    console.log('✅ Bot WhatsApp connecté !');
});

// Répondre aux messages
client.on('message', async message => {
    const msg = message.body.toLowerCase().trim();

    if (msg === 'bonjour' || msg === 'salut') {
        await message.reply('👋 Bonjour ! Comment vas-tu ?');
    } else if (msg === 'heure') {
        const now = new Date();
        await message.reply(`🕐 Il est ${now.getHours()}h${now.getMinutes()}`);
    } else if (msg === 'blague') {
        await message.reply('😂 Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau !');
    } else if (msg === 'aide') {
        await message.reply('📋 Commandes : bonjour, heure, blague, merci, au revoir');
    } else if (msg.includes('merci')) {
        await message.reply('😊 Avec plaisir !');
    } else if (msg === 'au revoir') {
        await message.reply('👋 À bientôt !');
    } else {
        await message.reply(`🤖 Tu as dit : "${message.body}"`);
    }
});

// Démarrer
client.initialize();
