const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if  (!message.member.roles.has("693660564173357116")) return message.reply('Bu komutu kullanmaya yetkin yok');
  
  let member = message.mentions.members.first();
  let isim = args[1];
  let tag = "√"
  if (!member) return message.channel.send("**Bir Üye Etiketlemelisiniz**");
  if (!isim) return message.channel.send("**Bir İsim Yazmalısınız**");
  member.setNickname(`${tag} • ${isim} `);
  const embed = new Discord.RichEmbed()
    .setColor('#000001')
    .addField(
      `**<a:siyah:694927370292822090> İsim Başarıyla Değiştirildi **`,
      `\n**<a:siyah:694927370292822090> İsmi Değiştirilen Kullanıcı:** ${member.user} \n **<a:siyah:694927370292822090> Yeni Kullanıcı Adı:** \`${tag} • ${isim}  \``
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