require("dotenv").config();
const { Telegraf } = require("telegraf");
const Markup = require("telegraf/markup");
const Certificate = require("./schemas/certificate");
const mongoose = require("mongoose");
const mail = require("./mail")

mongoose.connect("mongodb://localhost/spacebot", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

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
    Markup.keyboard(["🎉 Gerar Certificado"]).resize().oneTime().extra()
  );
});

bot.hears("🎉 Gerar Certificado", async (ctx) => {
  const certificate = await Certificate.findOne({
    username: ctx.chat.username,
  });

  if (!certificate)
    await Certificate.create({
      username: ctx.chat.username,
      downloads: 1,
    });

  if (certificate) {
    if (certificate.downloads >= 3) {
      return ctx.reply(
        "Você excedeu o número de downloads por mês. Tente no próximo"
      );
    } else {
      certificate.downloads++;
      certificate.save()
    }
  }

  mail.sendMail({
    from: '"Spacebot 👻" <foo@example.com>',
    to: "bar@example.com, baz@example.com",
    subject: "Token do certificado gerado pelo bot da Spcaedevs 👌",
    template: 'generate_certificate'
  })

  ctx.reply(
    "Certificado gerado com sucesso! Um e-mail foi enviado com um token."
  );
});

bot.launch();
