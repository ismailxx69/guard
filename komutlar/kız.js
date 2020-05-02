const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let kayityetkili = '700144704578125920' //KAYIT YETKİLİSİ ID

let verbusem = '700144704565673991' //VERİLECEK ROL ID
let albuse = '700144704506953832' //ALINACAK ROL ID

let isimön = 'そ ' //DEĞİŞTİRİLECEK İSMİN ÖNÜNE GELEN


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
  .setDescription(`✅ Kayıt işlemi Başarılı ✅

**Kayıt edilen kullanıcı :** ${isimön}${isim}

**Kayıt işleminde verilen rol :**  <@&${verbusem}>

**Kayıt işleminde alınan rol :** <@&${albuse}>
`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
  .setImage("https://37.media.tumblr.com/f1d867e7b7771f57ccf325a13630ce29/tumblr_n3zeepZMFm1ttv14wo1_r1_250.gif")
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
  name: 'kız',
  description: "Erkek kullanıcıları kayıt etme komutu.",
  usage: '!kız <yeni nick>'
}