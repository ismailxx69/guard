const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  if(!message.member.roles.has(client.ayar.SahipRolüID) && !message.member.roles.has(client.ayar.TeyitYetkilisi)) return message.reply('Bu komutu kullanabilmek için teyit yetkilisi olmalısın!');
  let user = message.mentions.users.first() || client.users.get(args[0])
  if(!user) return message.reply(`**Geçerli bir kişi belirtmelisin!**`).then(x => x.delete(5000))
  let abc = args.slice(1).join(' ')
  if(!abc) return message.reply(`**Geçerli bir isim girmelisin!**`).then(x => x.delete(5000))
  if(abc === "sıfırla" || abc === "reset" || abc === "yenile") {
    await(message.guild.member(user).setNickname(user.username))
    await message.react('✅')
    await message.channel.send(new Discord.RichEmbed().setAuthor("İsim Sıfırlandı!", message.guild.iconURL).setFooter(client.user.username, client.user.avatarURL).setTimestamp().setThumbnail(user.avatarURL).addField('Teyit Bilgileri', `**İsmi Sıfırlanan Kullanıcı:** ${user} \n**Sıfırlayan Yetkili:** ${message.author}`))
   return
  }
  try { 
  await(message.guild.member(user).setNickname(`${abc}`))
  } catch(err) { message.reply('**Belirttiğin isim `32` karakterden uzun olmamalıdır!**') }
  await message.react('✅')
  await message.channel.send(new Discord.RichEmbed().setAuthor("İsim Değiştirildi!", message.guild.iconURL).setFooter(client.user.username, client.user.avatarURL).setTimestamp().setThumbnail(user.avatarURL).addField('Teyit Bilgileri', `**İsmi Değiştirilen Kullanıcı:** ${user} \n**Değiştiren Yetkili:** ${message.author}`))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['nick', 'i'],
  permLevel: 0
};

exports.help = {
  name: 'isim',
  description: 'Etiketlenen kullanıcının ismini belirtildiği gibi yapar.',
  usage: 'isim @etiket/id <isim>',
  kategori: 'yetkili'
};