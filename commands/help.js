const Discord = require('discord.js')
const { defaultPrefix } = require('../../config.json');
module.exports = {
    name: 'help',
    aliases: ['e', 'eeee'],
    description: 'Help Command',

    async execute(message, args, bot) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`PixelStats Help`)
        .addFields({
            name: `Prefix`,
            value: `${defaultPrefix}`,
            inline: false
        }, {
            name: `Invite`,
            value: '\`invite>\`',
            inline: false
        },{
            name: `Skywars Stats`,
            value: '\`h!sw <Ign>\`',
            inline: false
        }, {
            name: `Bedwars Stats`,
            value: '\`h!bw <Ign>\`',
            inline: false
        }, {
            name: `Duels Stats`,
            value: '\`h!duels <Ign>\`',
            inline: false
        }, {
            name: `Name History`,
            value: '\`h!nh <Ign>\`',
            inline: false
        }, )
        .setDescription('Bot Made By Nøah#9561 || https://discord.gg/UnDpr2kEpB')
        .setColor(bot.color)
        .setFooter(bot.footer.text)
    message.channel.send(embed).catch(console.error);
    }
}