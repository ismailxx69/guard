const Discord = require('discord.js');
const db = require('quick.db');

exports.run = function(client, message, args) {
  let uye = message.mentions.users.first() || message.author;

  let bilgi = db.get(`yetkili.${uye.id}.erkek`)
  let kizKayitBilgi = db.get(`yetkili.${uye.id}.kiz`)
 let ban  = db.get(`yetkili.${uye.id}.ban`)
 let mute  = db.get(`yetkili.${uye.id}.mute`)
  const batros = new Discord.RichEmbed()
  .setTitle("Yetkili İstatistik")
  .setColor("RANDOM")
  .setThumbnail(message.guild.iconURL)
  .setDescription(`<a:bellatrix13:741652361579069452>  ${bilgi} **Erkek üyeyi kayıt etmiş. **\n\n <a:bellatrix13:741652361579069452>  ${kizKayitBilgi} **Kadın üyeyi kayıt etmiş.** \n\n <a:bellatrix13:741652361579069452>  ${ban} **Kişiyi banlamış.** \n\n <a:bellatrix13:741652361579069452> ${mute} **Kişiye sustur atmış.** `)
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
  name: "yetkilibilgi",
  description: "yetkili kayit vb istatistik",
  usage: "yi"
};