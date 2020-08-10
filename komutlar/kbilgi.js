const Discord = require('discord.js');
const db = require('quick.db');

exports.run = function(client, message, args) {
  let uye = message.mentions.users.first() || message.author;

  let bilgi = db.get(`yetkili.${uye.id}.erkek`)
  let kizKayitBilgi = db.get(`yetkili.${uye.id}.kiz`)
  let ban = bilgi.ban || 0;
  const batros = new Discord.RichEmbed()
  .setTitle("Yetkili İstatistik")
  .setColor("RANDOM")
  .setDescription(`<Erkek kayıt: ${bilgi}\nKız Kayıt: ${kizKayitBilgi}\nBan Sayısı: ${ban}`)
  .setTimestamp()
  message.channel.send(batros)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yi"],
  permLevel: 0,
  premium: false
};

exports.help = {
  name: "kayıtbilgi",
  description: "yetkili kayit vb istatistik",
  usage: "yi"
};