const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let tag = "海"; // tagınız
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
  count += voiceChannel.members.size;
  if(!message.member.roles.has("711213548738576425")) return message.channel.send(`**Kusura Bakma Dostum Buna Yetkin Yok.** `);

const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL) 
    .setThumbnail("https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif~c200")
    .setDescription(`<a:cccc:711280679396311040> **Sunucudaki üye sayısı :** __${message.guild.memberCount}__
<a:cccc:711280679396311040> **Çevrimiçi üye sayısı :** __${message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}__
<a:cccc:711280679396311040> **Seslideki üye sayısı :** __${count}__
<a:cccc:711280679396311040> **Tagdaki üye sayısı :** __${message.guild.members.filter(m => m.user.username.includes(tag)).size}__
<a:cccc:711280679396311040> **Erkek üye sayısı :** __${message.guild.roles.get("711213570158886993").members.size}__
<a:cccc:711280679396311040> **Kayıtsız üye sayısı :** __${message.guild.roles.get("711213606213255200").members.size}__
<a:cccc:711280679396311040> **Kız üye sayısı :** __${message.guild.roles.get("711213570951479356").members.size}__
<a:cccc:711280679396311040> **Aktif üye sayısı :** __${message.guild.members.filter(m => m.presence.status !== "offline").size}__ ***(Anlık)***
`)
    .setColor("#005b94")
    .setFooter(`Kim Bilir Kimler Var Şimdi Kalbinde `,message.author.avatarURL);
    message.channel.send(embed);
message.react('711280679396311040')
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