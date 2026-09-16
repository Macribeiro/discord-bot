import {
  sendStartBotMessage,
  sendVoiceChannelConnectionErrorMessage,
  sendStopBotMessage,
  helpMessage,
  voluemWarningMessage,
  sendVoiceErrorMessage,
} from "../messages/botMessages.js";

import { executeAction, getVoiceChannel } from "./actions.js";
import { initializeBot } from "../index.js";

function startBot(client) {
  client.on("messageCreate", async function (message) {
    const mensagemNormalizada = executeAction(message.content.toLowerCase());
    const voiceChannel = getVoiceChannel(message);

    if (mensagemNormalizada === executeAction(mensagemNormalizada)) {
      message.channel.send(sendStartBotMessage());

      if (!voiceChannel) {
        return message.channel.send(sendVoiceChannelConnectionErrorMessage());
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

        connection.subscribe(player);

        const createResource = () => {
          const res = createAudioResource("./kasino_no_sabadaco.mp3", {
            inlineVolume: true,
          });
          res.volume.setVolume(1.0);
          return res;
        };

        player.on("error", (error) => {
          console.error(`[Erro no Player]: ${error.message}`);
          connection.destroy();
        });

        player.on(AudioPlayerStatus.Idle, () => {
          player.play(createResource());
        });

        player.play(createResource());

        message.channel.send(voluemWarningMessage());
      } catch (error) {
        message.channel.send(sendVoiceErrorMessage());
        console.error(sendVoiceErrorMessage(), error);
      }
    } else if (
      mensagemNormalizada === "parar" ||
      mensagemNormalizada === "para sa porra de música"
    ) {
      session.player.stop();
    }
  });
}

export { startBot };
