const Discord = require("discord.js");//SYLVESTER 35½

exports.run = async (client, message, args) => {
  let tag = "✶"; // tagınız
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
  count += voiceChannel.members.size;
  if(!message.member.roles.has("742045569161363510")) return message.channel.send(`**Kusura Bakma Dostum Buna Yetkin Yok.** `);

const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL) 
    .setThumbnail("https://cdn.discordapp.com/attachments/741633554764660829/741795393116831825/giphy.gif")
    .setDescription(` <a:bellatrix13:741652361579069452>  **Sunucudaki üye sayısı :** __${message.guild.memberCount}__
 <a:bellatrix13:741652361579069452> **Çevrimiçi üye sayısı :** __${message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}__
 <a:bellatrix13:741652361579069452> **Seslideki üye sayısı :** __${count}__
 <a:bellatrix13:741652361579069452> **Tagdaki üye sayısı :** __${message.guild.members.filter(m => m.user.username.includes(tag)).size}__
 <a:bellatrix13:741652361579069452> **Erkek üye sayısı :** __${message.guild.roles.get("742341058704441384").members.size}__
 <a:bellatrix13:741652361579069452> **Kayıtsız üye sayısı :** __${message.guild.roles.get("741641795867246612").members.size}__
 <a:bellatrix13:741652361579069452> **Kız üye sayısı :** __${message.guild.roles.get("741645637086609481").members.size}__
 <a:bellatrix13:741652361579069452> **Aktif üye sayısı :** __${message.guild.members.filter(m => m.presence.status !== "offline").size}__ ***(Anlık)***
`)
    .setColor("#005b94")
    .setFooter(`Aha bak bak ne yazmış gel gel!`,message.author.avatarURL);
    message.channel.send(embed);//SYLVESTER 35½
message.react('')
};



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

//SYLVESTER 35½