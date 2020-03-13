const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if  (!message.member.roles.has("688056135336460307")) return message.reply('Bu komutu kullanabilmek için <@&688056135336460307> rolüne sahip olmalısın.');
  const emoji = client.emojis.find(emoji => emoji.name === "mtik");
  let member = message.mentions.members.first();
  let isim = args[1];
  let yaş = args[2];
  let tag = "ꏪ"
  if (!member) return message.channel.send("**Bir Üye Etiketlemelisiniz**");
  if (!isim) return message.channel.send("**Bir İsim Yazmalısınız**");
  if (!yaş) return message.channel.send("**Bir Yaş Yazmalısınız**");
  member.setNickname(`${tag} ${isim} | ${yaş}`);
  const embed = new Discord.RichEmbed()
    .addField(
      `**<a:kus:688079319121133583> İsim Başarıyla Değiştirildi **`,
      `\n**<a:kus:688079319121133583> İsmi Değiştirilen Kullanıcı:** ${member.user} \n **<a:kus:688079319121133583> Yeni Kullanıcı Adı:** \`${tag} ${isim} | ${yaş}\``
    )
    .setFooter(`Literary`)
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