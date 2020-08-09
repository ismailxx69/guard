const Discord = require('discord.js');//SYLVESTER 35½
const client = new Discord.Client();

exports.run = (client, message) => {

    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor("36393F")
    .setTimestamp()
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setDescription(' **İşte beni yapan şahsiyet** <@305943092056293376> <a:bellatrix12:741652344692801536> ');
    message.channel.send(ozelmesajkontrol)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım','yapımcı','yapımcılarım','yapımcılar',],
  permLevel: 0
};

exports.help = {
  name: 'yapımcı',
  description: 'Yapımcımı Gosterir.',
  usage: 'yapımcım'
};//SYLVESTER 35½