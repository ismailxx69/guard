const Discord = require("discord.js");

module.exports.run = async (client, message) => {
  let üyesayi = message.guild.memberCount;
    let botlar = message.guild.members.filter(m => m.user.bot).size;
    let kullanıcılar = üyesayi - botlar;
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .addField(` Toplam Kişi <a:sag:711280703849103421>`, üyesayi, true)
  .addField(` Toplam Kullanıcı <a:sag:711280703849103421>`, kullanıcılar, true)
  .addField(` Botlar <a:sag:711280703849103421>`, botlar, true)
  .addField(` Aktif <a:sag:711280703849103421>`, `${message.guild.members.filter(o => o.presence.status === 'online').size} `, true)
  .addField(` Boşta Üyeler <a:sag:711280703849103421>`, `${message.guild.members.filter(i => i.presence.status === 'idle').size} `, true)
  .addField(` Rahatsız Modda Üyeler <a:sag:711280703849103421>`, `${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size} `, true)
  .addField(` İnaktif Üyeler <a:sag:711280703849103421>`, `${message.guild.members.filter(off => off.presence.status === 'offline').size} `, true)
  
  
.setFooter(client.user.username, client.user.avatarURL)

  message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "üye-durum",
  description: "üye-durum",
  usage: "üye-durum"
};
