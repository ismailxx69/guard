const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let kanallar = await db.get(`kanalengel_${message.guild.id}`)
  let kanal = message.mentions.channels.first() || message.channel;
  
  if(args[0] === "liste") {
    message.channel.send(new Discord.RichEmbed().setAuthor(client.user.username + " Kanal Engel", client.user.avatarURL).setColor("RANDOM").setFooter(message.guild.name, message.guild.iconURL).setTimestamp().addField('Belirlenen Kanallar', kanallar ? kanallar.map(x => "<#"+x.slice(1)+">").join('\n') + "\n\nBu kanallarda bu bot çalışmayacak." : "Bulunmuyor!"))
    return
  } // LİSTE BİTİŞ
  
  if(kanallar && kanallar.some(id => `k${kanal.id}` === id)) {
    db.delete(`kanalengel_${message.guild.id}`, `k${kanal.id}`)
      kanallar.forEach(v => {
      if (!v.includes(`k${kanal.id}`)) {
        db.push(`kanalengel_${message.guild.id}`, v)
      }
      })
    message.channel.send(`${kanal} kanalında artık bot çalışacak!`)
  } else {
    db.push(`kanalengel_${message.guild.id}`, `k${kanal.id}`)
    message.channel.send(`${kanal} kanalında artık bot çalışmayacak!`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kanal-engel'],
  permLevel: 0,
};

exports.help = {
  name: 'kanalengel',
  description: 'Artık belirlenen kanallarda bot çalışmaz.',
  usage: 'kanalengel #kanal/liste',
  kategori: 'yetkili'
};