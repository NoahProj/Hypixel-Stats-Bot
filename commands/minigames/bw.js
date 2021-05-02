const Discord = require('discord.js')
module.exports = {
    name: 'bw',
    aliases: ['e', 'eeee'],
    description: 'Bedwars Stats',

    async execute(message, args, bot) {
        if (!args.length) return message.reply('Please enter a Valid Player Name!')
        const player = await bot.getPlayer(args[0])
        console.log(args)
        if (!player) return
        if (!player.displayname) return
        if (!player.stats || !player.stats.Bedwars) return

        const Bedwars = player.stats.Bedwars;
        const EASY_LEVELS = 4;
        const EASY_LEVELS_XP = 7000;
        const XP_PER_PRESTIGE = 96 * 5000 + EASY_LEVELS_XP;
        const LEVELS_PER_PRESTIGE = 100;
        const HIGHEST_PRESTIGE = 10;

        function expToNextLevel(level) {
            if (level == 0) return 0;

            var respectedLevel = getLevelRespectingPrestige(level);
            if (respectedLevel > EASY_LEVELS) {
                return 5000;
            }

            switch (respectedLevel) {
                case 1:
                    return 500;
                case 2:
                    return 1000;
                case 3:
                    return 2000;
                case 4:
                    return 3500;
            }
            return 5000;
        }

        function getLevelRespectingPrestige(level) {
            if (level > HIGHEST_PRESTIGE * LEVELS_PER_PRESTIGE) {
                return level - HIGHEST_PRESTIGE * LEVELS_PER_PRESTIGE;
            } else {
                return level % LEVELS_PER_PRESTIGE;
            }
        }
        const getBedwarsLevel = exp => {
            var prestiges = Math.floor(exp / XP_PER_PRESTIGE);
            var level = prestiges * LEVELS_PER_PRESTIGE;
            var expWithoutPrestiges = exp - (prestiges * XP_PER_PRESTIGE);

            for (let i = 1; i <= EASY_LEVELS; ++i) {
                var expForEasyLevel = expToNextLevel(i);
                if (expWithoutPrestiges < expForEasyLevel) {
                    break;
                }
                level++;
                expWithoutPrestiges -= expForEasyLevel;
            }
            //returns players bedwars level, remove the Math.floor if you want the exact bedwars level returned
            return level + Number((expWithoutPrestiges / 5000).toFixed(2))
        }

        const embed = new Discord.MessageEmbed()
            .setThumbnail(`https://minotar.net/helm/${player.uuid}/100.png`)
            .setTitle(`${player.displayname}`)
            .addFields({
                name: `Star`,
                value: `${getBedwarsLevel(Bedwars.Experience) || 1}`,
                inline: true
            }, {
                name: `Wins`,
                value: (Bedwars.wins_bedwars || 0).toLocaleString(),
                inline: true
            }, {
                name: `Kills`,
                value: (Bedwars.kills_bedwars || 0).toLocaleString(),
                inline: true
            }, {
                name: `Deaths`,
                value: (Bedwars.deaths_bedwars || 0).toLocaleString(),
                inline: true
            }, {
                name: `Final Kills`,
                value: (Bedwars.final_kills_bedwars || 0).toLocaleString(),
                inline: true
            }, {
                name: `Final Deaths`,
                value: (Bedwars.final_deaths_bedwars || 0).toLocaleString(),
                inline: true
            }, {
                name: `Beds Broken`,
                value: (Bedwars.beds_broken_bedwars || 0).toLocaleString(),
                inline: true
            }, {
                name: `Beds Lost`,
                value: (Bedwars.beds_lost_bedwars || 0).toLocaleString(),
                inline: true
            }, {
                name: `Coins`,
                value: (Bedwars.coins || 0).toLocaleString(),
                inline: true
            })
            .setDescription('Bot Made By Nøah#9561 || https://discord.gg/UnDpr2kEpB')
            .setColor(bot.color)
            .setFooter(bot.footer.text)
        message.channel.send(embed).catch(console.error);

    }
}