require("dotenv").config();
const { Telegraf } = require("telegraf");
const Markup = require("telegraf/markup");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    `🎈 Olá, seja bem-vindo ao canal oficial da Spacedevs ${ctx.chat.username}`
  );
});

bot.help((ctx) => {
  ctx.reply(
    "Digite /start para mensagens de boas-vindas ou digite /certificado para entrar no menu!"
  );
});

bot.command("certificado", (ctx) => {
  ctx.reply(
    "O que você deseja fazer?",
    Markup.keyboard(["🎉 Gerar Certificado", "🩱 Sair", "Mandar um oi"]).resize().oneTime().extra()
  );
});

bot.launch();
