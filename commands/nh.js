const mojangjs = require('mojangjs');
const Discord = require('discord.js');
const moment = require('moment');

function joinNames(playerNameHistory) {
	let allNames = '';
	for (let i = 0; i < playerNameHistory.length; i++) {
		if (i + 1 !== playerNameHistory.length) {
			allNames += playerNameHistory[i].name + ', ';
		} else {
			allNames += playerNameHistory[i].name;
		}
	}
	return allNames;
}

module.exports = {
    name: 'nh',
    aliases: ['e', 'eeee'],
    description: 'name history command',

    async execute(message, args, bot) {
        if (!args[0]) return message.reply('Please Provide a Valid Player name!')
		mojangjs
			.getUUID(args[0])
			.then(uuid => {
				mojangjs.nameHistory
					.byUUID(uuid)
					.then(namehistory => {
						const playerHistory = new Discord.MessageEmbed()
							.setTitle(`**${args[0]}'s** Name History`)
							.setThumbnail('https://visage.surgeplay.com/face/' + uuid)
                            .setColor(bot.color)
                            .setFooter(bot.footer.text);

						for (
							let i = 0;
							i < (namehistory.length <= 5 ? namehistory.length : 5);
							i++
						) {
							if (namehistory[i].changedToAt === undefined) {
								// the first name registered.
								playerHistory.addField(
									'First Name Registered',
									namehistory[i].name
								);
							} else {
								// all other names.
								playerHistory.addField(
									`Changed on ${moment(
										parseInt(namehistory[i].changedToAt)
									).format('Do MMMM YYYY')}`,
									namehistory[i].name
								);
							}
						}

						if (namehistory.length > 5) {
							playerHistory.addField(
								`${args[0]} has too many names, at ${
									namehistory.length
								} which is more than RichEmbeds can handle.`,
								`All of **${args[0]}'s** names are ${joinNames(namehistory)}`
							);
						}

						message.channel.send(playerHistory);
					})
					.catch(console.error);
			})
			.catch(console.error);
	},
};
