const Discord = require('discord.js');
const db = require('quick.db');

exports.run = function(client, message, args) {
  let uye = message.mentions.users.first() || message.author;

  let bilgi = db.get(`yetkili.${uye.id}.erkek`)
  let kizKayitBilgi = db.get(`yetkili.${uye.id}.kiz`)
 let ban = bilgi.ban || 0;
  const batros = new Discord.RichEmbed()
  .setTitle("Kayıt İstatistik")
  .setColor("RANDOM")
  .setDescription(`<a:kirmizitik:742061635665133609>  ${bilgi} **Erkek üyeyi kayıt etmiş. **\n <a:kirmizitik:742061635665133609> ${kizKayitBilgi} **Kadın üyeyi kayıt etmiş.** \n <a:kirmizitik:742061635665133609> ${ban} **Kişiyi banlamış.**`)
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