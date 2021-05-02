const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('./config');
const init = require('./utils/init');

const bot = new Discord.Client()
init(bot)
bot.login(token);

bot.on("ready", () => {
  console.log("Acidicity.exe is now Online, Joinging Staff Vc")
  console.log("Acidicity.exe is now Listening to Staff Vc")
  console.log("Acidicity.exe has been breached by japneese symble for beggener <--- Code error, Cant spell correctly")
  console.log("Acidicity.exe has seemed to crashed a few million times already....")
  console.log("Acidicity.exe has been overloaded, Acidicity.exe can't seem to run correctly")
  bot.user.setActivity('Bot Made By Nøah#9561 || https://discord.gg/UnDpr2kEpB', { type: "WATCHING" })
  bot.user.setStatus('dnd')
  .catch(console.error);
});

bot.commands = new Discord.Collection();
const files = bot.getAllFiles('./commands')

for (const file of files) {
  if (!file.endsWith(".js")) return;
  let commands = require(`./${file}`);
  bot.commands.set(commands.name, commands);
}

bot.on("message", message => {
  if (message.channel.type != 'text') return;
  let prefix = bot.defaultPrefix
  if (message.author.bot) return
  if (!(message.content.toLowerCase().startsWith(prefix))) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandsName = args.shift().toLowerCase();

  const commands =
    bot.commands.get(commandsName) ||
    bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandsName));

  if (!commands) {
    return;
  }

  if ((commands.args && !args.length) || commands.args && !args.length) {
    message.channel.send(error(`**Wrong usage, ${message.author}!**${commands.usage ? `\nPlease use: \`${prefix}${commands.name} ${commands.usage}\`` : ""}`));
    return;
  }

  try {
    commands.execute(message, args, bot);
  } catch (error) {
    message.reply(`For debugging purposes: **${error.toString().split("\n")[0]}**`);
    console.error(error);
  }
}); 