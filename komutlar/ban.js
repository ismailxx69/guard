const Discord = require("discord.js"); 
exports.run = async (client, message, args) => {
const db = require('quick.db');
  
    if(!message.member.roles.has('742045569454702624')) return message.reply('Yetersiz yetki.')      

  let logs = message.guild.channels.find("name", "log");
  if(!logs) return message.channel.send("Bu Komutu Kullana Bilmek İçin *log** Adında Bir Kanal Açmalısın");

  
 let kürşat2 = message.mentions.users.first()  
  if(!kürşat2) return message.reply("Lütfen Kullanıcı Etiketle");

  let kürşat = args.join(" ");
  if(!kürşat) kürşat = "Sebep Belirtilmedi.";

  message.guild.member(kürşat2).ban(kürşat);
db.add(`yetkili.${message.author.id}.ban`, 1);
  let logsEmbed = new Discord.RichEmbed() 
  .setTitle("Kullanıcı Banlandı")
  .setFooter("Developed by SYLVESTER")
  .setColor("#ff0000")
  .setTimestamp()
  .addField("Banlanan Kişi:", `${kürşat2}, ID: ${kürşat2.id}`)
  .addField("Sebep:", kürşat)
  .addField("Yetkili:", `${message.author}, ID: ${message.author.id}`)
  .addField("Zaman:", message.createdAt)
  .addField("Kanal:", message.channel)
  
  logs.send(logsEmbed);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'ban',
  category: 'moderasyon',
    description: 'İstediğiniz Kişiyi Banlarsınız',
    usage: '.ban'
}