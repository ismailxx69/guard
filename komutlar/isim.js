const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if  (!message.member.roles.has("695788842455793736")) return message.reply('Bu komutu kullanmaya yetkin yok');
  
  let member = message.mentions.members.first();
  let isim = args[1];
  let yaş = args[2];
  let tag = "✧"
  if (!member) return message.channel.send("**Bir Üye Etiketlemelisiniz**");
  if (!isim) return message.channel.send("**Bir İsim Yazmalısınız**");
  if (!yaş) return message.channel.send("**Bir Yaş Yazmalısınız**");
  member.setNickname(`${tag} ${isim} | ${yaş}`);
  const embed = new Discord.RichEmbed()
    .setColor('#000001')
    .addField(
      `**<a:tik:695802304879657072> İsim Başarıyla Değiştirildi **`,
      `\n**<a:tik:695802304879657072> İsmi Değiştirilen Kullanıcı:** ${member.user} \n **<a:tik:695802304879657072> Yeni Kullanıcı Adı:** \`${tag} ${isim} | ${yaş}\``
    )
    .setFooter(`Talador`)
    .setThumbnail(client.user.avatarURL);
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