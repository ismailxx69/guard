const Discord = require("discord.js");
const db = require('quick.db')
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
  

if(!message.member.roles.has('742045573460525156')) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription('Birine jail atmak için <@&742045573460525156> rolüne sahip olmalısın!')
return message.channel.send(embed)
}
let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kişi) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription('Jail atacağın kullanıcıyı etiketle yada id sini belirt!')
return message.channel.send(embed)
}
if(kişi.roles.has('742045573460525156')) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription(`Meslektaşını niye hapis'e atmaya çalışıyorsun?`)
return message.channel.send(embed)
}  
let zaman = args[1]
if(!args[1]) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription(`<@${kişi.id}> adlı kullanıcı ne kadar süre hapiste olucak?`)
return message.channel.send(embed)
}
let sebep = args.join(' ').slice(args[1].length+args[0].length + 1)
if(!sebep) sebep = 'Sebep belirtilmemiş.'
  
const hapis = new Discord.RichEmbed()
.setColor('RED')
.setDescription(`Bir Kullanıcı Cezalıya Atıldı!`)
.setThumbnail(kişi.user.avatarURL)
.addField(`Kullanıcı`, kişi,)
.addField(`Yetkili`, `<@${message.author.id}>`,)
.addField(`Sebebi`, sebep,)
.addField(`Süresi`, zaman.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün'),)
.setTimestamp()

const dm = new Discord.RichEmbed()
.setColor('BLUE')
.setDescription(`**${message.guild.name}** Adlı Sunucuda Cezalıya Atıldın!`)
.addField(`Cezalıya Atan Yetkili`,`<@${message.author.id}>`)
.addField(`Sebebi`, sebep,)
.addField(`Süresi`, zaman.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün'),)

const tahliye = new Discord.RichEmbed()
.setColor('GREEN')
.setDescription(`Bir Kullanıcı Tahliye Oldu!`)
.setThumbnail(kişi.user.avatarURL)
.addField(`**Kullanıcı:**`, kişi,)
.addField(`Yetkili`, `<@${message.author.id}>`,)
.addField(`Sebebi`, sebep,)
.addField(`Süresi`, zaman.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün'),)
.setTimestamp()

const embed2 = new Discord.RichEmbed()
.setColor('GREEN')
.setDescription(`${kişi} adlı kullanıcı \`${zaman}\`lığına hapise yollandı!`)
  
kişi.addRole('742217399037591603');
  db.add(`yetkili.${message.author.id}.jail`, 1);
kişi.roles.forEach(r => {
kişi.removeRole(r.id)
db.set(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )
})  
client.channels.get('741661572929290312').send(hapis)
kişi.send(dm) 
message.channel.send(embed2)
setTimeout(async () =>{
kişi.removeRole('742217399037591603')
client.channels.get('741661572929290312').send(tahliye)
}, ms(zaman));
setTimeout(async () =>{
message.guild.roles.forEach(async r => {
const i = await db.fetch(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}` )
if(i != r.id)  return ;
if(i){kişi.addRole(i)}
})
}, ms(zaman));
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['hapset'],
permLevel: 0
};  
exports.help = {
name: 'jail',
description: 'Bir kullanıcıyı hapise atmaya yarar.',
usage: 'jail'
};