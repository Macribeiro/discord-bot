function sendStartBotMessage() {
  return "Comando recebido. Verificando canal de voz...";
}

function sendVoiceChannelConnectionErrorMessage() {
  return "Você precisa estar em um canal de voz para ouvir o Kasino!";
}

function sendVoiceErrorMessage() {
  return "Erro ao conectar ao canal de voz";
}

function sendStopBotMessage() {
  return "Comando recebido. Parando a música...";
}

function helpMessage() {
  return "Comandos disponíveis:\n- `sabadaco` ou `sabadaço`: Inicia a reprodução da música.\n- `parar`: Para a reprodução da música.\n- `ajuda` ou `help`: Caso tenha algum problema, favor reporta no [Repositório do Bot](https://github.com/Macribeiro/discord-bot)*.";
}

function voluemWarningMessage() {
  return "Aviso: abaixe o 𝘷𝘰𝘭𝘶𝘮𝘦 do bot";
}

export {
  sendStartBotMessage,
  sendVoiceChannelConnectionErrorMessage,
  sendStopBotMessage,
  helpMessage,
  voluemWarningMessage,
  sendVoiceErrorMessage,
};
