const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

if(!message.member.roles.has("654722889572155402")) return message.channel.send(`Bu komutu kullanabilmen için <@&654722889572155402> yetkiye sahip olman lazım.`);
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send('Hey sen birini kayıt etmen için birisini etiketlemelisin bunu gözden kaçırma!')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  member.addRole('654767619211001889')
  member.removeRole('655722455238967306')
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField(`Erkek olarak kayıt edilmiştir. <:heavy_check_mark: > `, ` <@&654767619211001889> rolü başarıyla verilmiştir. <:heavy_check_mark: >  
   Etiketlediğiniz kişiden başarıyla <@&655722455238967306> rolü başarıyla alınmıştır. <:heavy_check_mark: >`)
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