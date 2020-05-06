const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  message.delete(3000)
  try {
    
    const embed = new Discord.RichEmbed()
    .setTitle(`__TOPLAM KOMUT SAYISI__`)
    .setDescription(`** ${message.guild.name} ** **sunucusunda \ntoplam**  __**${client.commands.size}**__ **komut var!**`)
    .setColor("#ff0000")
    .setThumbnail('')
    .setTimestamp()
    .setFooter(message.author.username , message.author.avatarURL)

    return message.channel.send({embed});
    
    message.channel.send();
  } catch (err) {
    message.channel.send('Lütfen biraz bekle ve sonra tekrar dene.\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'komutlar',
  description: 'Bottaki toplam komut sayısını verir',
  usage: 'komutlar'
};