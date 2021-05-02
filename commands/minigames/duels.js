const Discord = require('discord.js')

module.exports = {
    name: 'duels',
    aliases: ['e', 'eeee'],
    description: 'Bedwars duels',

    async execute(message, args, bot) {
        if (!args.length) return message.reply('Please enter a Valid Player Name!')
        const player = await bot.getPlayer(args[0])
        console.log(args)
        if (!player) return
        if (!player.displayname) return
        if (!player.stats || !player.stats.Duels) return
        const Duels = player.stats.Duels;
        const embed = new Discord.MessageEmbed()
            .setThumbnail(`https://minotar.net/helm/${player.uuid}/100.png`)
            .setTitle(`${player.displayname}`)
            .addFields({
                name: `Wins`,
                value: (Duels.wins || 0).toLocaleString(),
                inline: true
            }, {
                name: `Losses`,
                value: (Duels.losses || 0).toLocaleString(),
                inline: true
            }, {
                name: `Kills`,
                value: (Duels.kills || 0).toLocaleString(),
                inline: true
            }, {
                name: `Deaths`,
                value: (Duels.deaths || 0).toLocaleString(),
                inline: true
            },{
                name: `Coins`,
                value: (Duels.coins || 0).toLocaleString(),
                inline: true
            }, 
            )
            .setDescription('Bot Made By Nøah#9561 || https://discord.gg/UnDpr2kEpB')
            .setColor(bot.color)
            .setFooter(bot.footer.text)
        message.channel.send(embed).catch(console.error);
    }

}