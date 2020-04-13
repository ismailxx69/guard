const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (!db.fetch(`küfürE_${message.channel.id}`)) {
  return message.reply(`**Küfür Engel Zaten Bu Kanalda Kapalı!**  ${client.emojis.get("693615832776835162")}`)
}
  db.delete(`küfürE_${message.channel.id}`)
  message.reply(`**Küfür Engel Özelliği Başarılı Bir Şekilde Bu Kanalda Kapatıldı** ${client.emojis.get("693615832776835162")}`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'küfürkapat',
  description: 'sayaç', 
  usage: 'sayaç'
};