const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (db.fetch(`küfürE_${message.channel.id}`)) {
  return message.reply(`**Küfür Engel Zaten Bu Kanalda Aktif!**  ${client.emojis.get("683592842924261415")}`)
}
  db.set(`küfürE_${message.channel.id}`, "aktif")
  message.reply(`**Bu Özellik Sadece Bu Kanalda Aktif!** ${client.emojis.get("305943092056293376")}`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'küfüraç',
  description: 'sayaç', 
  usage: 'sayaç'
};