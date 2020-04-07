const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => { 
  
  
  let member = message.guild.members.get(message.author.id)

  
  if(!message.member.hasPermissions("BAN_MEMBERS")) return message.reply('Bu komutu kullanmak için yeterli yetkiye sahip değilsin.')

let user = message.mentions.users.first() || message.guild.members.get(args[0])

if(!user) return message.reply('Lütfen bir kullanıcı belirt.')

if(user.id === message.author.id) return message.reply('Kendini muteliyemezsin.')

if(user.bot) return   

 let süre = args[1] 
  
if(isNaN(süre)) return message.reply('Lütfen sayı birimi gir')  
 
if(süre < 5) return message.reply('Lütfen 5 den büyük sayı birimi gir.')   
  let neden = args.slice(2).join(" ") // anlam kaymasi oluyor calismaz 
 if(!neden) return message.reply('Bir neden gir')
  
  
  
  let muterol = "696528639545835521" 
  let log = "696528862577819718" 
  
  // avatarURL
 // iconURL
 
 
 
 let embed = new Discord.RichEmbed()
 .setTitle('Mute Atıldı')
 .setAuthor(message.author.avatarURL, message.author.username) 
 .setDescription(`Bir kullanıcı **${süre}** dakika susturuldu.`)
 .addField("Mutelenen Kullanıcı", `Kullanıcı: ${user.username} \n\n ID: ${user.id}`)
 .addField("Yetkili", `Yetkili: ${message.author.username} \n\n ID: ${message.author.id}`)
 .addField("Mute Bilgisi", `Süre: ${süre} dakika \n\n Neden: ${neden}`)
 .setFooter(client.user.username, client.user.avatarURL)
 .setColor("RED")
 .setTimestamp()
 client.channels.get(log).send(embed)
 

 message.channel.send(`<@!${user.id}> Adlı kullanıcı **${süre}** dakika boyunca susturuldu.`) // eninde sonunda + kullanan yasine yakiyoruz.
  
 message.guild.members.get(user.id).addRole('696528639545835521') 
 message.guild.members.get(user.id).removeRole('694593638889423000') 
 
  
  
 let mutesüresi = süre*60000
  
  
 db.set(`mutesüresi_${user.id}_${message.guild.id}`, mutesüresi)
 
 
  user.send(`**${message.guild.name}** sunucusundan **${süre}** dakika boyunca **${neden}** sebebiyle susturuldun.Mute'ni açmak için  yetkililere yazabilirisn.`)
 

  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description: 'taslak', 
  usage: 'sustur'
};
