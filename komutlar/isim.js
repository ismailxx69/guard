const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if  (!message.member.roles.has("KAYIT YETKİLİSİ ID")) return message.reply('Bu komutu kullanmaya yetkin yok');
  
  let member = message.mentions.members.first();
  let isim = args[1];
  let tag = "TAG"
  if (!member) return message.channel.send("**Bir Üye Etiketlemelisiniz**");
  if (!isim) return message.channel.send("**Bir İsim Yazmalısınız**");
  member.setNickname(`${tag}  ${isim} `);
  const embed = new Discord.RichEmbed()
    .setColor('#000001')
  .addField(
      `**<a:krmzn:700970912039829544> İsim Başarıyla Değiştirildi **`,
      `\n<a:krmzn:700970912039829544> İsmi Değiştirilen Kullanıcı: ${member.user} \n  <a:krmzn:700970912039829544> Yeni Kullanıcı Adı: \`${tag}  ${isim}  \``
    )     
          .setThumbnail("https://cdn.discordapp.com/attachments/703382591121915997/704647902869454898/ezgif-6-2d1f8f7722b7.gif")
    
  
  
  
    .setFooter(`そ INFECTION`)
 
  message.channel.send(embed);
};

exports.conf = {
  enabled: true, 
  guildOnly: true,
  aliases: ["nick", "isim"],
  permLevel: 0
};
exports.help = {
  name: "nick",
  description: "Birinin nickini değiştirir.",
  usage: "nick" //Edit by AidenZ
};               