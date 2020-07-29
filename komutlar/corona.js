const Discord = require('discord.js');

exports.run = (client, message, params) => {
   if(!message.member.roles.has("729271914232545331")) return message.channel.send(`**Kusura Bakma Dostum Buna Yetkin Yok.** `);
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('corona')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== '..') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('İyice temizlen seni virüslü.!')
    .setColor('RANDOM')
    .setTimestamp()
		.setImage(`https://cdn.discordapp.com/attachments/700226408940830781/700910328300437545/giphy.gif`)
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
