const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

if(!message.member.roles.has("687629969673027596")) return message.channel.send(`Bu komutu kullanabilmen için <@&687629969673027596> yetkiye sahip olman lazım.`);
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send('Hey sen birini kayıt etmen için birisini etiketlemelisin bunu gözden kaçırma!')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  member.addRole('687630992873488485')
  member.removeRole('687628675042377755')
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField(`Erkek olarak kayıt edilmiştir. <:heavy_check_mark: > `, ` <@&687630992873488485> rolü başarıyla verilmiştir. <:heavy_check_mark: >  
   Etiketlediğiniz kişiden başarıyla <@&687628675042377755> rolü başarıyla alınmıştır. <:heavy_check_mark: >`)
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