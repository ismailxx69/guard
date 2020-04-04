const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if (!message.member.roles.has('696018120166473790') && !message.member.hasPermission('İSTEYE BAGlİ')) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!') .setColor("random"));
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed() .setDescription('Bir üye etiketlemen gerekiyor!').setColor("Black"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let reason = args.slice(1).join(" ")
      if(!reason) return message.channel.send("Lütfen Bir Sebep Yazınız.").then(m => m.delete(5000));
          message.react("EMOJİ ID");
  message.guild.members.get(member.id).roles.forEach(r => {
message.guild.members.get(member.id).removeRole(r) //DCS EKİPİ

   
})
  member.addRole('696019077642190898')
     const kanal = message.guild.channels.find(c => c.id == "695795662922449027") // DCS EKİPİ
    const embed1 = new Discord.RichEmbed() 
    .setDescription(`${kullanıcı} Kişisi **${reason}** Sebebiyle Jaile Atıldı!`)
    .setColor("RED")
    .setFooter(message.author.tag , message.author.avatarURL)
    .setTimestamp()
  // DCS EKİPİ
  
  let embed = new Discord.RichEmbed() 
  .setDescription(`${kullanıcı} Adlı Kişisine <@&696019077642190898> Rolü Verildi! \n Sebeb: **${reason}** `) 
  .setImage('')
  .setFooter(`Justice is the basis of property..`)
  .setTimestamp()
  return message.channel.send(embed).then(kanal.send(embed1)).then(m => m.delete(5000000));
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ceza","cezalandır"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'jail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebebe'
}
   