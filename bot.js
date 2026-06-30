const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    }
});

client.on('qr', qr => {
    console.log('📱 Scanne ce QR code avec WhatsApp (Appareils connectés → Connecter un appareil) :');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot WhatsApp connecté et prêt !');
});

client.on('message', async message => {
    const msg = message.body.toLowerCase();

    if (msg === 'bonjour') {
        await message.reply('👋 Bonjour ! Comment vas-tu ?');
    } 
    else if (msg.includes('merci')) {
        await message.reply('😊 Avec plaisir !');
    }
    else if (msg === 'heure') {
        const now = new Date();
        await message.reply(`🕐 Il est ${now.getHours()}h${now.getMinutes()}`);
    }
    else if (msg === 'blague') {
        await message.reply('😂 Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau !');
    }
    else if (msg === 'au revoir') {
        await message.reply('👋 À bientôt ! Prends soin de toi.');
    }
    else {
        await message.reply(`🤖 Tu as dit : "${message.body}"`);
    }
});

client.initialize();