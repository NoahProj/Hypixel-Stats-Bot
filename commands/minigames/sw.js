
const Discord = require('discord.js')

module.exports = {
    name: 'sw',
    aliases: ['e', 'eeee'],
    description: 'Skywars Stats',

    async execute(message, args, bot) {
        if (!args.length) return message.reply('Please enter a Valid Player Name!')
        const player = await bot.getPlayer(args[0]) 
        console.log(args)
        if (!player) return
        if (!player.displayname) return
        if (!player.stats || !player.stats.SkyWars) return

        const Skywars = player.stats.SkyWars;

        function getSwLevel(xp) {
            const xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
            if (xp >= 15000) {
              return (xp - 15000) / 10000 + 12;
            } else {
              for (var i = 0; i < xps.length; i++) {
                if (xp <= xps[i]) {
                  return i + (xp - xps[i - 1]) / (xps[i] - xps[i - 1]);
                }
              }
            }
          }
          let level
          let star
          if (!Skywars.skywars_experience) {
            level = 1.00
            star = "⋆"
          } else {
            level = getSwLevel(Skywars.skywars_experience || 0).toFixed(2)
            levelFormatted = Skywars.levelFormatted || "⋆"
            star = levelFormatted.replace(/1|2|3|4|5|6|7|8|9|0|a|b|c|d|e|f|k|r|l|§/g, "")
          }

        const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://minotar.net/helm/${player.uuid}/100.png`)
        .setTitle(`${player.displayname}`)
        .addFields({
            name: `Star`,
            value: `\`${level || 1}${star}\``,
            inline: true
        }, {
            name: `Wins`,
            value: `\`${(Skywars.wins || 0).toLocaleString()} \``,
            inline: true
        }, {
          name: `Losses`,
          value: `\`${(Skywars.losses || 0).toLocaleString()} \``,
          inline: true
        }, {
          name: `Coins`,
          value: `\`${(Skywars.coins || 0).toLocaleString()} \``,
          inline: true
        }, {
            name: `Kills`,
            value: `\`${(Skywars.kills || 0).toLocaleString()}\``,
            inline: true
        }, {
            name: `Deaths`,
            value: `\`${(Skywars.deaths || 0).toLocaleString()}\``,
            inline: true
        }, {
          name: `Heads`,
          value: `\`${(Skywars.heads || 0).toLocaleString()}\``,
          inline: true
        }, {
          name: `Souls`,
          value: `\`${(Skywars.souls || 0).toLocaleString()}\``,
          inline: true
        }, {
          name: `Shards`,
          value: `\`${(Skywars.shards || 0).toLocaleString()}\``,
          inline: true
        }, {
          name: `Opals`,
          value: `\`${(Skywars.update_opals_prestige || 0).toLocaleString()}\``,
          inline: true
        }, {
          name: `Most kill game`,
          value: `\`${(Skywars.most_kills_game || 0).toLocaleString()}\``,
          inline: true
        }, {
          name: `Total Ranked Kills`,
          value: `\`${(Skywars.kills_ranked || 0).toLocaleString()}\``,
          inline: true
        }, {
          name: `Cosmetic Tokens`,
          value: `\`${(Skywars.cosmetic_tokens || 0).toLocaleString()}\``,
          inline: true
        }, {
          name: `Loot Boxes Opened`,
          value: `\`${(Skywars.SkyWars_openedChests|| 0).toLocaleString()}\``,
          inline: true
        },)
        .setDescription('Bot Made By Nøah#9561 || https://discord.gg/UnDpr2kEpB')
        .setColor(bot.color)
        .setFooter(bot.footer.text)
        message.channel.send(embed).catch(console.error);
    },
};