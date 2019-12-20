const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

if(!message.member.roles.has("640536536156209188")) return message.channel.send(`Bu komutu kullanabilmen için <@&640536536156209188> yetkiye sahip olman lazım.`);
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send('Hey sen birini kayıt etmen için birisini etiketlemelisin bunu gözden kaçırma!')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  member.addRole('640536543601098763')
  member.removeRole('640554932163969036')
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField(`Kadın olarak kayıt edilmiştir. <:heavy_check_mark: > `, ` <@&657553104488759298> rolü başarıyla verilmiştir. <:heavy_check_mark: >  
   Etiketlediğiniz kişiden başarıyla <@&657553238412886016> rolü başarıyla alınmıştır. <:heavy_check_mark: >`)
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
  name: 'kadın',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'kayıt isim yaş'
}


// Positive Sunar