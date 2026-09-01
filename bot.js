import "dotenv/config"; // Carrega seu arquivo .env automaticamente sem require
import { Client, GatewayIntentBits, PermissionsBitField } from "discord.js";

import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const ESabado = new Date().getDay() === 2;

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

  const mensagemNormalizada = message.content.toLowerCase();

  if (
    mensagemNormalizada === "sabadaco" ||
    mensagemNormalizada === "sabadaço"
  ) {
    console.log("Comando recebido. Verificando canal de voz...");

    const voiceChannel = message.member?.voice.channel;

    if (!voiceChannel) {
      return message.channel.send(
        "Você precisa estar em um canal de voz para ouvir o Kasino!",
      );
    }

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfDeafen: false,
        selfMute: false,
      });

      const player = createAudioPlayer();
      const resource = createAudioResource("./kasino_no_sabadaco.mp3", {
        inlineVolume: true,
      });

      resource.volume.setVolume(0.01);

      player.on(AudioPlayerStatus.Idle, () => {
        console.log("Áudio finalizado. Desconectando do canal de voz...");

        connection.destroy();
      });

      player.on("error", (error) => {
        console.error(`[Erro no Player]: ${error.message}`);
        connection.destroy();
      });

      if (ESabado) {
        connection.subscribe(player);
        player.play(resource);

        message.channel.send("𝘈𝘷𝘪𝘴𝘰: 𝘢𝘣𝘢𝘪𝘹𝘦 𝘰 𝘷𝘰𝘭𝘶𝘮𝘦 𝘥𝘰 𝘣𝘰𝘵");

        message.channel.send("🎵 **VAI KASINÃO!** 🎵");
      } else {
        message.channel.send(
          "NUM É SÁBADO AINDA, ANIMAL. ESPERA CHEGAR O DIA PRA TOCAR",
        );
      }
    } catch (error) {
      console.error("Erro ao conectar no canal de voz:", error);
    }
  }
});

client.login(process.env.TOKEN);
