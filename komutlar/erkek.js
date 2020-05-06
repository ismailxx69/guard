const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let kayityetkili = 'KAYIT YETKİLİSİ ID' //KAYIT YETKİLİSİ ID

let verbusem = 'ERKEK ROL ID' //VERİLECEK ROL ID
let albuse = 'KAYITSIZ ROL ID' //ALINACAK ROL ID

let isimön = 'TAG   ' //DEĞİŞTİRİLECEK İSMİN ÖNÜNE GELEN


//TİK İSMİNDE BİR EMOJİNİZ OLMASI LAZIM (Hareketli Olsa Daha Güzel Gözükür)

  if(!message.member.roles.has(kayityetkili)) 
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmasınız.`);
  let member = message.mentions.members.first()
  let isim = args.slice(1).join(" ")
  if (!member) return message.channel.send('Bir Üye Etiketlemelisin💖')
  if (!isim) return message.channel.send('Bir İsim Yazmalısın 💖')

  setTimeout(function(){
  member.setNickname(`${isimön}${isim}`)
  },2000)
  setTimeout(function(){
 
  member.addRole(verbusem)
  },3000)
  setTimeout(function(){
  member.removeRole(albuse)

  },4000)
  
 const emoji = client.emojis.find(emoji => emoji.name === "tik");
 let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
    .setThumbnail("https://cdn.discordapp.com/attachments/703382591121915997/704647902869454898/ezgif-6-2d1f8f7722b7.gif")
  .setDescription(`<:tag:707458120523448382> **Kayıt işlemi Başarılı** <:tag:707458120523448382>
<:tag:707458120523448382> **Kayıt edilen kullanıcı :** **${isimön}${isim}**
<:tag:707458120523448382> **Kayıt işleminde verilen rol :** , <@&${verbusem}>
<:tag:707458120523448382> **Kayıt işleminde alınan rol :** <@&${albuse}>
<:tag:707458120523448382> **Komutu kullanan yetkili** : **${message.author.username}**
`)
  .setFooter(`そ INFECTION`) 
 
message.channel.send(embed)
message.react(emoji)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oyuncu','o'],
  permLevel: 0
}
exports.help = {
  name: 'erkek',
  description: "Erkek kullanıcıları kayıt etme komutu.",
  usage: '!erkek <yeni nick>'
}