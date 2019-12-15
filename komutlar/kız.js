const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;
//Yashinu
exports.run = async (client, message, args) => {
  if(!message.member.roles.has(client.ayar.SahipRolüID) && !message.member.roles.has(client.ayar.TeyitYetkilisi)) return message.reply('Bu komutu kullanabilmek için teyit yetkilisi olmalısın!');
  let user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) return message.reply(`**Geçerli bir kişi belirtmelisin!**`).then(x => x.delete(5000));
  await(message.guild.member(user).removeRole(client.ayar.TeyitsizRolü));
  if(message.guild.member(user).roles.has(client.ayar.ErkekÜye)) {
    await(message.guild.member(user).removeRole(client.ayar.ErkekÜye))
  }
  await(message.guild.member(user).addRole(client.ayar.KızÜye));
 
  await message.channel.send(new Discord.RichEmbed().setAuthor("Teyit Yapıldı!", message.guild.iconURL).setFooter(client.user.username, client.user.avatarURL).setTimestamp().setThumbnail(user.avatarURL).addField('Teyit Bilgileri', `**Teyit Edilen Kullanıcı:** ${user} \n**Verilen Rol:** ${message.guild.roles.get(client.ayar.KızÜye)} \n**Teyit Eden Yetkili:** ${message.author}`))

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k', 'woman', 'girl'],
  permLevel: 0
};

exports.help = {
  name: 'kız',
  description: 'Etiketlenen kullanıcıya kız permi verir.',
  usage: 'kız @etiket/id',
  kategori: 'yetkili'
};
