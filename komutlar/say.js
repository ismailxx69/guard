const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let tag = "そ"; // tagınız
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;


const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL) 
    .setThumbnail(client.user.avatarURL)
    .setDescription(`<a:ttik:706096419572023307> **Sunucudaki üye sayısı :** __${message.guild.memberCount}__
<a:ttik:706096419572023307> **Çevrimiçi üye sayısı :** __${message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}__
<a:ttik:706096419572023307> **Seslideki üye sayısı :** __${count}__
<a:ttik:706096419572023307> **Tagdaki üye sayısı :** __${message.guild.members.filter(m => m.user.username.includes(tag)).size}__
<a:ttik:706096419572023307> **Erkek üye sayısı :** __${message.guild.roles.get("700144704565673990").members.size}__
<a:ttik:706096419572023307> **Kayıtsız üye sayısı :** __${message.guild.roles.get("700144704506953832").members.size}__
<a:ttik:706096419572023307> **Kız üye sayısı :** __${message.guild.roles.get("700144704565673991").members.size}__
<a:ttik:706096419572023307> **Aktif üye sayısı :** __${message.guild.members.filter(m => m.presence.status !== "offline").size}__ ***(Anlık)***
`)
    .setColor("#005b94")
    .setFooter(`Matematiğim iyidir <3`,message.author.avatarURL);
    message.channel.send(embed);
message.react('706096419572023307')
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