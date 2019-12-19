const Discord = require('discord.js');

exports.run = function(client, message) {
 
  var role = message.guild.roles.find(role => role.name === "Normie"); // JS Rolünün Tam Isminin Yazin
  var role2 = message.guild.roles.find(role => role.name === "🧻Members") // kanka burda hata verirse ) nin sağına ; koy
  if (message.member.roles.has(role.id)) return message.channel.send("**⛔ Zaten bu role sahipsin!**")
  message.member.addRole(role);
  message.member.removeRole(role2);
  message.channel.send(`**JavaScript rolün başarıyla verildi!**`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['discord.js','javascript'],
  permLevel: 0
};

exports.help = {
  name: 'erkek',
  description: 'JavaScript kanallarına erişim sağlar.',
  usage: 'erkek'
};
