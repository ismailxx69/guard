const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async(client, message, args) => {
  
  
  const sayi = args[0]
  if (sayi >= 401) return message.reply("En Az `1 - 400` Arasında Bir Tam Sayı Değeri Girmelisiniz.")

  let messages = await message.channel.fetchMessages({
    limit: sayi
  });

     let mesaj = await message.channel.bulkDelete(messages, true);
  
  if (!mesaj.size) {
    return message.reply("En Az `1 - 400` Arasında Bir Tam Sayı Değeri Girmelisiniz.")
  }


    message.reply(`${mesaj.size} Adet Mesaj Başarı İle Uzaya Fırlatıldı. 🚀`)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sil"],
  permLevel: 0
};

exports.help = {
  name: 'sil',
  description: 'Ban limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};