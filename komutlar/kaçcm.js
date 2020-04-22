const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {

    let cm = Math.round(Math.random() * 100);

    let gayembed = new Discord.RichEmbed()
        .setColor("#f442d4")
       .setDescription(`<a:krmzn:700970912039829544> Terapi Uzmanları <a:krmzn:700970912039829544> \n\n <a:krmzn:700970912039829544> İsra \n\n <a:krmzn:700970912039829544> Selin \n\n <a:krmzn:700970912039829544> Muhammed `)
    return message.channel.send(gayembed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
  
exports.help = {
  name: 'Terapistler',
  description: 'Acaba Kaç CM',
  usage: 'Terapistler'
};