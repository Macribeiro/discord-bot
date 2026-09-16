import {
  sendStartBotMessage,
  sendStopBotMessage,
  helpMessage,
} from "../messages/botMessages.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";

function executeAction(acao) {
  switch (acao) {
    case "sabadaco":
      return sendStartBotMessage();
    case "sabadaço":
      return sendStartBotMessage();
    case "parar":
      return sendStopBotMessage();
    case "ajuda":
      return helpMessage();
    default:
      return "Comando não reconhecido. Use `ajuda` para ver os comandos disponíveis.";
  }
}

function getVoiceChannel(message) {
  return message.member?.voice.channel;
}

export { executeAction, getVoiceChannel };
