const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if  (!message.member.roles.has("687629969673027596")) return message.reply('Bu komutu kullanabilmek için <@&687629969673027596> rolüne sahip olmalısın.');
  const emoji = client.emojis.find(emoji => emoji.name === "tik");
  let member = message.mentions.members.first();
  let isim = args[1];
  let yaş = args[2];
  let tag = "ヤ"
  if (!member) return message.channel.send("**Bir Üye Etiketlemelisiniz**");
  if (!isim) return message.channel.send("**Bir İsim Yazmalısınız**");
  if (!yaş) return message.channel.send("**Bir Yaş Yazmalısınız**");
  member.setNickname(`${tag} ${isim} • ${yaş}`);
  const embed = new Discord.RichEmbed()
    .addField(
      `**<a:ytik:687661631039340554> İsim Başarıyla Değiştirildi **`,
      `\n**<a:ytik:687661631039340554> İsmi Değiştirilen Kullanıcı:** ${member.user} \n **<a:ytik:687661631039340554> Yeni Kullanıcı Adı:** \`${tag} ${isim} | ${yaş}\``
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