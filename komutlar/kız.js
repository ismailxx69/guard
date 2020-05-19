const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let kayityetkili = '711213560646205481' //KAYIT YETKİLİSİ ID

let verbusem = '711213570951479356' //VERİLECEK ROL ID
let albuse = '711213606213255200' //ALINACAK ROL ID

let isimön = '海   ' //DEĞİŞTİRİLECEK İSMİN ÖNÜNE GELEN


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
 .setThumbnail("https://media.giphy.com/media/d0NnEG1WnnXqg/source.gif")
  .setDescription(`:ballot_box_with_check:**Kayıt işlemi Başarılı** :ballot_box_with_check:
:ballot_box_with_check: **Kayıt edilen kullanıcı :** **${isimön}${isim}**
:ballot_box_with_check: **Kayıt işleminde verilen rol :**  <@&${verbusem}>
:ballot_box_with_check: **Kayıt işleminde alınan rol :** <@&${albuse}>
:ballot_box_with_check: **Komutu kullanan yetkili** : **${message.author.username}**
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
  name: 'kız',
  description: "Erkek kullanıcıları kayıt etme komutu.",
  usage: '!kız <yeni nick>'
}