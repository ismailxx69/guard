const Discord = require('discord.js');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('corona')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== '..') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('**Kolonya darbesi! DÖK DÖK DÖK!**')
    .setColor('RANDOM')
    .setTimestamp()
		.setImage(`https://cdn.discordapp.com/attachments/693604724221542475/695632606544396328/giphy.gif`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'corona',
  description: 'Bot Sizi Korkutmaya Çalışır.',
  usage: 'corona'
};
