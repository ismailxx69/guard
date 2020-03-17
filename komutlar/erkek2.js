const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

if(!message.member.roles.has("688527280611262466")) return message.reply(`Bu komutu kullanabilmen için <@&688527280611262466> yetkiye sahip olman lazım.`);
  let kullanıcı = message.mentions.users.first()
  if (!isim) return message.channel.send("**Bir İsim Yazmalısın**");
  if (!yaş) return message.channel.send("**Bir Yaş Yazmalısınız**");
  if (!member) return message.channel.send('**Bir Üye Etiketlemelisin**')
  let isim = args[1];
  let yas = args[2];
  let tag = "†"
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  member.setNickname(`${tag} ${isim} • ${yas}`)
  member.addRole('688528847364292608')
  member.removeRole('688527158016081989')
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField(`<a:tik1:688697405708828706> Erkek olarak kayıt edilmiştir.`, `<a:tik1:688697405708828706> Etijetlediğiniz Kişiden başarıyla <@&688528847364292608> rolü verilmiştir.
  <a:tik1:688697405708828706> Etiketlediğiniz kişiden başarıyla <@&688527158016081989> rolü başarıyla alınmıştır.`)
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
  name: 'erkek2',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'kayıt isim yaş'
}


// Positive Sunar