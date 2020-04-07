const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setColor('BLACK')
    .setTimestamp()
    .addField('<a:siyah:694927370292822090> **Yapımcım: **', '<a:siyah:694927370292822090> <@650689514842619914> \n <a:siyah:694927370292822090> **Düzenleyicim :** \n <a:siyah:694927370292822090> <@305943092056293376>') // YAPIMCI
    message.channel.sendEmbed(ozelmesajkontrol) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım'],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: 'Yapimcimi Gosterir.',
  usage: 'yapimcim'
};