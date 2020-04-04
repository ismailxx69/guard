const Discord = require('discord.js');
const db = require('quick.db')
module.exports.run = async (bot, message, args, member, client, level) => {
  if(!message.member.roles.has("695788842455793736")) return message.channel.send(`**Kusura Bakma Dostum Buna Yetkin Yok.** `);
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("**Etiket Atmayı Unuttun!**");
  user.addRole('695792715811782756') 
  user.removeRole('695788913415028809') 
const ky = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${user}, **kullanıcısına <@&695792715811782756> rolü verildi.** <a:tik:695802304879657072>`)
        .setColor('BLACK')
        .setTimestamp()
        message.channel.send(ky)
  
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek"],
    permLevel: 0
}
exports.help = {
    name: 'erkek', 
    description: 'kayıt',
    usage: 'kayıt' //Dcs Ekibi
}