const Discord = require('discord.js');

exports.run = async (client, message, args) => {

  var user = message.author;
  var role = message.mentions.roles.firts();
  var lvl = args[1];
  
  if(!role) return message.channel.send("bir rol belirtin.");
  if(!lvl) return message.channel.send("bir seviye belirtin.");
  if()

};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'seviye-ödül', 
  description: 'Belirtilen seviyeye gelince kullanıcıya verilecek rolleri belirler.',
  usage: 'seviye-ödül <@ödül_rolü> <seviye>'
};