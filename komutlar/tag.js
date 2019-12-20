const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  let yashinu = "Yüce Tagımız **❁**  " //Suncuu tagınız
  await message.author.send(yashinu)
  message.reply(`Sunucu Tagımız; **✸**`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: 'Sunucu tagını gönderir.',
  usage: 'tag',
  kategori: 'sunucu'
};