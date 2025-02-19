const Discord = require('discord.js');//SYLVESTER 35½
const db = require('quick.db')

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komudu yalnızca yönetici yetkisi olanlar kullanabilir.')
  const arg = args[0]
  if (!arg) return message.reply('Limit belirlemek için bir sayı girmelisin, ya da özelliği kapatmak için `b!ban-limit kapat` yazmalısın.')

  if (arg == 'kapa' || arg == 'kapat') {
    if (!db.has(`banlimit_${message.guild.id}`)) return message.reply('Bu özellik zaten kapalı.')
    db.delete(`banlimit_${message.guild.id}`)
    message.reply('Özellik başarıyla kapatıldı.')
  }else{
    if (isNaN(Number(arg))) return message.reply('Limiti belirlemek için bir **sayı** girmelisin.')
    db.set(`banlimit_${message.guild.id}`, Number(arg))
    message.reply(`**Ban limiti başarıyla \`${arg.toString()}\` olarak belirlendi. Artık sunucudaki yetkililer maksimum ${arg} kere ban atabileceklerdir.** <a:bellatrix13:741652361579069452> `)
  }

};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['banlimit'],
  permLevel: 0 
};

exports.help = {
  name: 'ban-limit', 
  description: 'Ban Limiti Belirler',
  usage: 'ban'
};