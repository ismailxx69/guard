const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let tag = "⎒"; // tagınız
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
  count += voiceChannel.members.size;
  if(!message.member.roles.has("729271914232545331")) return message.channel.send(`**Kusura Bakma Dostum Buna Yetkin Yok.** `);

const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL) 
    .setThumbnail("https://cdn.discordapp.com/attachments/731226545435443224/736052011677777960/giphy.gif")
    .setDescription(`<a:yyldz:729361540469227550> **Sunucudaki üye sayısı :** __${message.guild.memberCount}__
  <a:yyldz:729361540469227550> **Çevrimiçi üye sayısı :** __${message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}__
  <a:yyldz:729361540469227550> **Seslideki üye sayısı :** __${count}__
  <a:yyldz:729361540469227550> **Tagdaki üye sayısı :** __${message.guild.members.filter(m => m.user.username.includes(tag)).size}__
  <a:yyldz:729361540469227550> **Erkek üye sayısı :** __${message.guild.roles.get("729296897424228402").members.size}__
  <a:yyldz:729361540469227550> **Kayıtsız üye sayısı :** __${message.guild.roles.get("729299296771637308").members.size}__
  <a:yyldz:729361540469227550> **Kız üye sayısı :** __${message.guild.roles.get("729296895570345985").members.size}__
  <a:yyldz:729361540469227550> **Aktif üye sayısı :** __${message.guild.members.filter(m => m.presence.status !== "offline").size}__ ***(Anlık)***
`)
    .setColor("#005b94")
    .setFooter(`Aha bak bak ne yazmış gel gel!`,message.author.avatarURL);
    message.channel.send(embed);
message.react('')
};


//<a:mtik:682607222219472944> **Kayıtsız üye sayısı :** __${message.guild.roles.get("661273538329837638").members.size}__
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sayı"],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "Say",
  usage: "say"
};

//<a:ttik:683256762886914053>
//<a:mortik:683258853017649257>