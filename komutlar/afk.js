const Discord = require('discord.js');
const db = require('quick.db');


exports.run = async(client, message, args) => {

if(!args[0]) return message.channel.send('Lütfen afk olma sebebinizi yazınız.')
   let member = message.mentions.members.first();
  let isim = args[1];
  let tag = "√"
  if (!member) return message.channel.send("**Bir Üye Etiketlemelisiniz**");
  if (!isim) return message.channel.send("**Bir İsim Yazmalısınız**");
  member.setNickname(`${tag} • ${isim} `);
  const embed = new Discord.RichEmbed() 
  message.channel.send("``" + args[0] + "`` Sebebi ile afk oldunuz!")
  db.set(`afks_${message.author.id}`, args[0])

}

exports.conf = {
enabled: true,
guildOnly: true,
permLevel: 0,
aliases: ['afkol', 'afk-ol'],
kategori: "kullanıcı"

}

exports.help = {
name: "afk",
description: "Sunucuda veya başka bir sunucuda afk olmanızı sağlar ve birisi sizi etiketleyince afk olduğunuzu sebebi ile belirtir.",
usage: "afk <sebep>"

}