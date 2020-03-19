const Discord = require('discord.js');
const db = require('quick.db');


exports.run = async (client, message, args) => {

  let hata = new Discord.RichEmbed()
  .setColor(`#000001`)
  .setDescription(`Bu komutu kullanabilmek için <@&689930799964880946> rolüne sahip olmalısın.`)
  .setFooter(`${message.author.tag}`, message.author.avatarURL)
    if (!message.member.roles.has('689930799964880946')) return message.channel.send(hata)(() => message.react('680049992538259468'));

  let kişi = message.mentions.users.first()
  if (!kişi) return message.react('')
  let member = message.guild.member(kişi)

  if(!member.roles.has(`689930799964880946`)) { //layıtkı
    member.addRole(`689930803215335514`) //kayıtlı 
    member.removeRole(`689930804301791276`) //kayıtsız
    let kayıt = new Discord.RichEmbed()
    .setColor(`#000001`)
    .setDescription(`${kişi} adlı kullanıcı <@&689930803215335514> olarak kaydedildi.`)
    .setFooter(`${message.author.tag}`, message.author.avatarURL)
    return message.channel.send(kayıt)(() => message.react('680049992731459604'));
  } else {
    member.addRole(`689930804301791276`) // kayıtsız
    member.removeRole(`689930803215335514`) //kayıtlı
    let kayıt = new Discord.RichEmbed()
    .setColor(`#000001`)
    .setDescription(`${kişi} adlı kullanıcının <@&689930804301791276> kaydı geri alındı.`)
    .setFooter(`${message.author.tag}`, message.author.avatarURL)
    return message.channel.send(kayıt)(() => message.react('680049992731459604'));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'erkek',
};