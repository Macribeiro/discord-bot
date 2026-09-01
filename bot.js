require("dotenv").config();
const { Client, GatewayIntentBits, messageLink } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
  ],
});

client.once("ready", () => {
  console.log(`${client.user.tag}`);
});

client.on("messageCreate", async function (message) {
  if (
    message.content.includes(
      message.mentions.roles.find((cargo) => cargo.name === "Mod"),
    )
  ) {
    message.react("⚠️");

    await message.startThread({
      name: `Reclamação #${Math.floor(Math.random() * 99999)}`,
      autoArchiveDuration: 60,
      reason: `${message.content}`,
    });

    message.thread.join(`${message.thread.id}`);
    message.thread.send({
      content: `*Data de Abertura: ${new Date().toISOString().split("T")[0]} 
      ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}*\n
      Olá, ${message.author.toString()}! 
        \nRecebemos a sua reclamação e estamos com um time para analisá-la.\n
        \n\nMotivo do contato: ${message.content}\n\n
        *Lembrando que este bot está em W.I.P (Work In Progress). Caso tenha algum problema, favor reporta no [Repositório do Bot](https://github.com/Macribeiro/discord-bot)*`,
      allowedMentions: { repliedUser: true },
    });
    console.log(
      `Created thread: ${message.thread.name} | ${message.thread.id}`,
    );
  }

  if (message.content.match(/ajuda/i) && !message.thread) {
    message.channel.send(
      `*Caso tenha algum problema, favor reporta no [Repositório do Bot](https://github.com/Macribeiro/discord-bot)*`,
    );
  }
});

client.login(process.env.TOKEN);
