const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let kullanıcı = message.author
  let neden = args.join(" ")
 let member = message.mentions.members.first()
  let isim = args.slice(1).join(" ")
  if (!neden) return message.channel.send(`AFK sebebini yazmalısın.`)
  
  db.set(`afk_${kullanıcı.id}`, neden)
  return message.channel.send(`${kullanıcı.tag} \`${neden}\` Sebebiyle AFK Oldu!`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["afk-ol"],
  permLevel: 0
}
//dcs ekibi
exports.help = {
  name: 'afkjsjsjsj',
  description: "AFK Komudu",
  usage: 'afk <neden>'
}