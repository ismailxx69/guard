const Discord = require('discord.js');
const db = require('quick.db')
module.exports.run = async (bot, message, args, member, client, level) => {
  if(!message.member.roles.has("693660564173357116")) return message.channel.send(`**Kusura Bakma Dostum Buna Yetkin Yok.** `);
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("**Etiket Atmayı Unuttun!**");
  user.addRole('693615826150096968') 
  user.removeRole('696861671225950310') 
const ky = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${user}, ** <a:onay:700188249330810910> kullanıcısına <@&693615826150096968> rolü verildi.** `)
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