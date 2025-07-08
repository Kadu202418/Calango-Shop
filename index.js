const { Client, GatewayIntentBits, EmbedBuilder, Collection } = require('discord.js');
const TOKEN = 'SEU_TOKEN_AQUI'; // Coloque seu token aqui

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Loja de Robux simulada
const robuxStore = [
  { id: 1, name: "100 Robux", price: 10 },
  { id: 2, name: "500 Robux", price: 45 },
  { id: 3, name: "1000 Robux", price: 80 },
  { id: 4, name: "2500 Robux", price: 180 }
];

// Simples "estoque" (não persistente)
let soldItems = [];

client.once('ready', () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const prefix = "!";
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Comando para mostrar loja
  if (command === 'loja') {
    const embed = new EmbedBuilder()
      .setTitle('🛒 Loja de Robux - Calango Shop')
      .setDescription('Confira os pacotes disponíveis para compra!')
      .setColor('#00FF00')
      .setFooter({ text: 'Use !comprar <id> para comprar um pacote.' });

    robuxStore.forEach(item => {
      embed.addFields({ name: `${item.id} - ${item.name}`, value: `Preço: R$${item.price.toFixed(2)}`, inline: false });
    });

    message.channel.send({ embeds: [embed] });
  }

  // Comando para comprar um pacote
  else if (command === 'comprar') {
    if (args.length === 0) {
      return message.reply('❌ Por favor, informe o ID do pacote que deseja comprar.\nUse `!loja` para ver os pacotes.');
    }

    const id = parseInt(args[0]);
    const item = robuxStore.find(i => i.id === id);

    if (!item) {
      return message.reply('❌ Pacote não encontrado. Use `!loja` para ver os pacotes disponíveis.');
    }

    // Aqui você pode adicionar lógica para verificar saldo do usuário, etc.
    // Por enquanto, só simula a compra:
    soldItems.push({ userId: message.author.id, item });

    const embed = new EmbedBuilder()
      .setTitle('✅ Compra realizada!')
      .setDescription(`Você comprou **${item.name}** por **R$${item.price.toFixed(2)}**.`)
      .setColor('#00AAFF')
      .setFooter({ text: 'Obrigado pela compra na Calango Shop!' });

    message.channel.send({ embeds: [embed] });
  }

  // Comando para mostrar ajuda
  else if (command === 'help' || command === 'ajuda') {
    const embed = new EmbedBuilder()
      .setTitle('📜 Comandos do Bot Calango Shop')
      .setColor('#FFA500')
      .addFields(
        { name: '!loja', value: 'Mostra os pacotes de Robux disponíveis para compra.' },
        { name: '!comprar <id>', value: 'Compra o pacote de Robux pelo ID informado.' },
        { name: '!ajuda', value: 'Mostra essa mensagem de ajuda.' }
      )
      .setFooter({ text: 'Calango Shop' });

    message.channel.send({ embeds: [embed] });
  }
});

client.login(TOKEN);
