const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = 'SEU_TOKEN_AQUI'; // <-- COLE SEU TOKEN AQUI

client.once('ready', () => {
    console.log(`✅ CalangoBot online como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const args = message.content.trim().split(/ +/g);
    const comando = args[0].toLowerCase();

    if (comando === '!produtos') {
        const embed = new EmbedBuilder()
            .setTitle('🛒 Produtos disponíveis')
            .setDescription('Confira nossos produtos:\n\n**1. Robux**\n**2. Contas Premium**\n**3. Scripts/Exploits**\n\nDigite `!comprar nome-do-produto` para iniciar a compra.')
            .setColor('Green');
        message.channel.send({ embeds: [embed] });
    }

    if (comando === '!comprar') {
        const produto = args.slice(1).join(' ');
        if (!produto) {
            return message.reply('❌ Use: `!comprar nome-do-produto`');
        }
        message.reply(`✅ Pedido iniciado para: **${produto}**\nUm atendente irá te chamar em breve!`);
    }

    if (comando === '!ajuda') {
        const embed = new EmbedBuilder()
            .setTitle('📘 Ajuda - Calango Shop')
            .setDescription('Comandos disponíveis:\n\n`!produtos` – Ver lista de produtos\n`!comprar [produto]` – Iniciar compra\n`!ajuda` – Ver comandos de ajuda')
            .setColor('Blue');
        message.channel.send({ embeds: [embed] });
    }
});

client.login(TOKEN);
