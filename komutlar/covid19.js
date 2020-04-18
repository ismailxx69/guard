const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("ms");
const a = require("../ayarlar.json");
const client = new Discord.Client();
exports.run = async (bot, message, args) => {

 

 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if (!kullanıcı) return message.channel.send(' Kullanıcının İdsini Veya Etiketini Girmelisin')
 

 

  let byembed1 = new Discord.RichEmbed()
  .setTitle("Bilgilendirme")
    .setColor("RED")
    .setFooter("Dcs Bot")
    .setDescription(` <@${message.author.id}> **Adlı Kişi ${kullanıcı} Adlı Kişiye Covid 19 Bulaştırdı.** `)

  message.channel.send(byembed1) 

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["covid-19","covid19"],
  permLevel: 0
};
exports.help = {
  name: 'covid-bulaştır',
  description: 'goldver',
  usage: 'goldver'
};
   