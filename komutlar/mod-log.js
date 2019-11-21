const Discord = require("discord.js");
const db = require("quick.db");
const a = require("../ayarlar.json");

exports.run = async (client, message, args, params, modlog) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username).setDescription("**Bu komutu kullanmak için `YÖNETİCİ` izni gerekli!").setColor("#ff3030"));
  if (!args[0])return 
  message.channel.send(new Discord.RichEmbed().setDescription("**Parametreler eksik!**").addField("__**Doğru kullanım**__",`${a.prefix}modlog ayarla \`#kanaletiketi\`\n**veya**\n${a.prefix}modlog sıfırla`).setColor("#ff3030"));
  if (args[0] === "ayarla") {
    let anan = message.mentions.channels.first();
    if (!anan)return 
    message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username).setDescription("**Kanal etiketi eksik dostum!**").addField("__**Doğru kullanım**__",`${a.prefix}modlog ayarla \`#kanaletiketi\``).setColor("#ff3030"));
    await db.set(`genelmodlog_${message.guild.id}`, `${anan.id}`);
    message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username).setDescription(`**Moderasyon Log kanalı başarıyla <#${anan.id}> olarak ayarlandı!**`)).setColor("#73f700")}
  if (args[0] === "sıfırla") {
    await db.delete(`genelmodlog_${message.guild.id}`);
    let m3rt = new Discord.RichEmbed().setAuthor(message.author.username).setDescription("**Moderasyon Log kanalı başarıyla sıfırlandı!**")
    message.channel.send(m3rt)}
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["modlog", "ml", "modlogkanal"],
  permLevel: 0
};

exports.help = {
  name: "mod-log",
  description: "Moderasyon logu kanalını ayarlar.",
  usage: "!mod-log <ayarla #kanal> veya !mod-log <sıfırla>"
};