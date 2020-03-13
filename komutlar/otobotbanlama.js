const db = require('quick.db');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komut sunucu sahibine özeldir!')
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if (!args[0] || args[0] !== "aç" && args[0] !== "ac" && args[0] !== "kapat") return message.channel.send(`\`aç\` veya \`kapat\` yazmalısın. | **${prefix}oto-botban aç/kapat**`)
  
  if (args[0] == 'aç' || args[0] === "ac") {
    message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`**Oto Bot Ban** Özelliği Başarıyla **Aktifleştirildi!** Artık sunucuya giren botları otomatik olarak **sunucudan yasaklayacağım.**`).setColor("GREEN"));
    db.set(`otobotban_${message.guild.id}`, 'acik')
  }
  if (args[0] == 'kapat') {
    message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`**Oto Bot Ban** Özelliği Başarıyla **Devre Dışı Bırakıldı!** Artık sunucuya giren botları otomatik olarak **sunucudan yasaklamayacağım.**`).setColor("RED"));
    db.delete(`otobotban_${message.guild.id}`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['otobotban'],
  permLevel: 0
};

exports.help = {
  name: 'oto-botban',
  description: 'Sunucuya eklenen botları otomatik olarak sunucudan yasaklar.',
  usage: 'oto-botban aç/kapat',
  kategori: 'yetkili'
};