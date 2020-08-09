const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let tag = "✩"; // tagınız
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
  count += voiceChannel.members.size;
  if(!message.member.roles.has("741641797352161341")) return message.channel.send(`**Kusura Bakma Dostum Buna Yetkin Yok.** `);

const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL) 
    .setThumbnail("https://cdn.discordapp.com/attachments/741633554764660829/741795393116831825/giphy.gif")
    .setDescription(` <a:bellatrix5:741652269224689725> **Sunucudaki üye sayısı :** __${message.guild.memberCount}__
 <a:bellatrix5:741652269224689725>  **Çevrimiçi üye sayısı :** __${message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}__
<a:001:741810291045826610> <a:001:741810291045826610> <a:001:741810291045826610> <a:001:741810291045826610> <a:001:741810291045826610>
  <a:bellatrix5:741652269224689725>  **Seslideki üye sayısı :** __${count}__
<a:001:741810291045826610> <a:001:741810291045826610> <a:001:741810291045826610> <a:001:741810291045826610> <a:001:741810291045826610>
  <a:bellatrix5:741652269224689725>  **Tagdaki üye sayısı :** __${message.guild.members.filter(m => m.user.username.includes(tag)).size}__
<a:001:741810291045826610> <a:001:741810291045826610> <a:001:741810291045826610> <a:001:741810291045826610> <a:001:741810291045826610>
  <a:bellatrix5:741652269224689725> **Erkek üye sayısı :** __${message.guild.roles.get("741641798073450496").members.size}__
  <a:bellatrix5:741652269224689725> **Kayıtsız üye sayısı :** __${message.guild.roles.get("741641795867246612").members.size}__
 <a:bellatrix5:741652269224689725>**Kız üye sayısı :** __${message.guild.roles.get("741645637086609481").members.size}__
 <a:bellatrix5:741652269224689725>  **Aktif üye sayısı :** __${message.guild.members.filter(m => m.presence.status !== "offline").size}__ ***(Anlık)***
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