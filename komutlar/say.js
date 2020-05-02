const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let tag = "ꑕ"; // tagınız
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;

  
const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL) 
    .setThumbnail(client.user.avatarURL)
    .setDescription(`<a:mtik:702961744573759518> **Sunucudaki üye sayısı :** __${message.guild.memberCount}__
<a:mtik:702961744573759518> **Çevrimiçi üye sayısı :** __${message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}__
<a:mtik:702961744573759518> **Seslideki üye sayısı :** __${count}__
<a:mtik:702961744573759518> **Tagdaki üye sayısı :** __${message.guild.members.filter(m => m.user.username.includes(tag)).size}__
<a:mtik:702961744573759518> **Erkek üye sayısı :** __${message.guild.roles.get("702905915032207483").members.size}__
<a:mtik:702961744573759518> **Kız üye sayısı :** __${message.guild.roles.get("700144704565673991").members.size}__
<a:mtik:702961744573759518> **Aktif üye sayısı :** __${message.guild.members.filter(m => m.presence.status !== "offline").size}__ ***(Anlık)***
`)
    .setColor("#005b94")
    .setFooter(`Kerem'den iyi sayarım, o kim köpek lan ? `,message.author.avatarURL);
    message.channel.send(embed);
message.react('661300851117260850')
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