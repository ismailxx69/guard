const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("ms");
const a = require("../ayarlar.json");
const client = new Discord.Client();
exports.run = async (bot, message, args) => {
  
  let owners = ['305943092056293376']
if(!owners.includes(message.author.id)) return message.channel.send(' `Bu Komutu Sadece Sahibim Kullanabilir`');

  
  
 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  

  if (!kullanıcı) return message.channel.send(' Kullanıcının İdsini Veya Etiketini Girmelisin')
 

   
  

  
 if(message.guild.members.has(kullanıcı)) message.guild.members.get(kullanıcı).addRole('697942232468292047');
    

  
 

  let byembed1 = new Discord.RichEmbed()
  .setTitle("Bilgilendirme")
    .setColor("RED")
    .setFooter("")
    .setDescription(` ${kullanıcı} Adlı Kişi  Vip Rolü  Verildi** \n Vip Rolü  Veren Kişi ; ${owners}`)
     
  
  
  message.channel.send(byembed1) 
  
   
    

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["vip-ver"],
  permLevel: 0
};
exports.help = {
  name: 'vip',
  description: 'goldver',
  usage: 'goldver'
};