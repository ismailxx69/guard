const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
//Yashinu Akame Owner
exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply('Bu komutu kullanabilmek için `Sunucuyu Yönet` iznine sahip olmalısın!');
  let yashinu = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  let djsturkiye = await db.fetch(`capslock_${message.guild.id}`)
  if (djsturkiye) {
    db.delete(`capslock_${message.guild.id}`)
    message.channel.send(`<a:siyah:694927370292822090> **Capslock engelleme sistemi kapatıldı!**`)
  }
 
  if (!djsturkiye) {
    db.set(`capslock_${message.guild.id}`, 'acik')
    message.channel.send(`<a:siyah:694927370292822090> **Capslock engelleme sistemi aktifleştirildi!** `)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['caps-engel', 'capslock'],
  permLevel: 0
};

exports.help = {
  name: 'caps-engel',
  description: 'Fazla büyük harf kullanımını engeller.',
  usage: 'capslock-engel',
  kategori: 'sunucu'
};