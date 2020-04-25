const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if  (!message.member.roles.has("700144704578125920")) return message.reply('Bu komutu kullanmaya yetkin yok');
  
  let member = message.mentions.members.first();
  let isim = args[1];
  let tag = "ㄨ"
  if (!member) return message.channel.send("**Bir Üye Etiketlemelisiniz**");
  if (!isim) return message.channel.send("**Bir İsim Yazmalısınız**");
  member.setNickname(`${tag}  ${isim} `);
  const embed = new Discord.RichEmbed()
    .setColor('#000001')
  .addField(
      `**<a:krmzn:700970912039829544> İsim Başarıyla Değiştirildi **`,
      `\n<a:krmzn:700970912039829544> İsmi Değiştirilen Kullanıcı: ${member.user} \n  <a:krmzn:700970912039829544> Yeni Kullanıcı Adı: \`${tag}  ${isim}  \``
    )     
          .setThumbnail("https://cdn.discordapp.com/attachments/684103541098283046/702794401436532786/ezgif.com-video-to-gif_3.gif")
    
  
  
  
    .setFooter(`ㄨΛURORΛ`)
 
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
  usage: "nick"
};               