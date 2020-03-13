const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

if(!message.member.roles.has("688056135336460307")) return message.reply(`Bu komutu kullanabilmen için <@&688056135336460307> yetkiye sahip olman lazım.`);
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send('Hey sen birini kayıt etmen için birisini etiketlemelisin bunu gözden kaçırma!')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  member.addRole('688079811754721316')
  member.removeRole('688071408588161101')
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField(`<a:kus:688079319121133583> Erkek olarak kayıt edilmiştir.`, `<a:kus:688079319121133583> Etijetlediğiniz Kişiden başarıyla <@&688079811754721316> rolü verilmiştir.
  <a:kus:688079319121133583> Etiketlediğiniz kişiden başarıyla <@&688071408588161101> rolü başarıyla alınmıştır.`)
  .setThumbnail(client.user.avatarURL)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`)
  return message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
}

exports.help = {
  name: 'erkek',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'kayıt isim yaş'
}


// Positive Sunar