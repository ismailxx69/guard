const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  if(!message.member.roles.has(client.ayar.SahipRolüID) && !message.member.roles.has(client.ayar.TeyitYetkilisi)) return message.reply('');
  let user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) return message.reply(`**Etiket Atmayı Unuttun**`).then(x => x.delete(5000));
  await(message.guild.member(user).removeRole(client.ayar.TeyitsizRolü));
  if(message.guild.member(user).roles.has(client.ayar.KızÜye)) {
    await(message.guild.member(user).removeRole(client.ayar.KızÜye))
  }
  await(message.guild.member(user).addRole(client.ayar.ErkekÜye));
  
  await message.channel.send(new Discord.RichEmbed().setAuthor("Başarıyla Teyit Yapıldı!", message.guild.iconURL).setFooter(client.user.username, client.user.avatarURL).setTimestamp().setThumbnail(user.avatarURL).addField('Teyit Bilgileri', `**Teyit Edilen Kullanıcı:** ${user} \n**Verilen Rol:** ${message.guild.roles.get(client.ayar.ErkekÜye)} \n**Teyit Eden Yetkili:** ${message.author}`))
  await client.channels.get(client.ayar.SohbetKanalID).send(`Beyleer Bayanlaar ${user} Aramıza Katıldı Hemen Selamlayın Ayıp Olmasın :blush:`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e', 'man', 'boy'],
  permLevel: 0
};

exports.help = {
  name: 'erkek',
  description: 'Etiketlenen kullanıcıya erkek permi verir.',
  usage: 'erkek @etiket/id',
  kategori: 'yetkili'
};