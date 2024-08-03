import { Telegraf, Markup } from 'telegraf'
import { message } from 'telegraf/filters'
import config from './config/config.js'

const token = config.TELEGRAM_TOKEN;
const webAppUrl = config.WEB_APP_URL;

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
  ctx.reply(
    'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
    Markup.keyboard([
      Markup.button.webApp('Отправить сообщение', `${webAppUrl}/feedback`),
    ])
  )
})

bot.on(message('web_app_data'), async (ctx) => {
    const data = ctx.webAppData.data.json();
    ctx.reply(`Ваше сообщение: ${data?.feedback}` ?? 'empty message');
})

bot.launch()