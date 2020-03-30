const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('BLACK')
.setTitle('» Komut Grupları')
.setTimestamp()
.addField('» KayıtKomutları', '.erkek / .kız')
.addField('» .ban', 'Belirlediğiniz Kişiye Ban Atar')
.addField('» .say', 'Sunucu İstatiklerini Gösterir')
.setFooter('Yardım', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};