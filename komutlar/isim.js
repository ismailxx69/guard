const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if  (!message.member.roles.has("700144704578125920")) return message.reply('Bu komutu kullanmaya yetkin yok');
  
  let member = message.mentions.members.first();
  let isim = args[1];
  let tag = "ㄨ"
  if (!member) return message.channel.send("**Bir Üye Etiketlemelisiniz**");
  if (!isim) return message.channel.send("**Bir İsim Yazmalısınız**");
  member.setNickname(`${tag} • ${isim} `);
  const embed = new Discord.RichEmbed()
    .setColor('#000001')
    .addField(
      `**<a:onay:700188249330810910> İsim Başarıyla Değiştirildi **`,
      `\n**<a:onay:700188249330810910> İsmi Değiştirilen Kullanıcı:** ${member.user} \n **<a:onay:700188249330810910> Yeni Kullanıcı Adı:** \`${tag}  ${isim}  \``
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