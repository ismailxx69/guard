const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('BLACK')
.setTitle('» Komut Grupları')
.setTimestamp()
.addField('» KayıtKomutları', '**v!erkek** / **v!kız** <a:siyah:694927370292822090>')
.addField('» KayıtKomutları', '**v!nick** <a:siyah:694927370292822090>')
.addField('» v!ban', '**Belirlediğiniz Kişiye Ban Atar** <a:siyah:694927370292822090>')
.addField('» v!say', '**Sunucu İstatiklerini Gösterir** <a:siyah:694927370292822090> ')
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