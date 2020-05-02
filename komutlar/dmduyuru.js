const Discord = require("discord.js");
exports.run = async (client, message, args) => {
let tr = args.slice(0).join(" ")
if(!tr) return message.channel.send("Gönderilecek şeyi yaz")
  client.users.forEach(tr2 => {
    tr2.send(tr)
  })
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: "duyuru",
  description: "dm-duyuru",
  usage: "dm-duyuru"
};