const Discord = require('discord.js');
const db = require('quick.db')
module.exports.run = async (bot, message, args, member, client, level) => {
  const okey = bot.emojis.find(emoji => emoji.name === "emojiismi");
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if (!message.member.hasPermission("MANAGE_ROLES"))
  if (!message.member.roles.find('name', 'Shawna Empire ')) return message.channel.send('Sen Kendini Ne Sanıyorsun?');
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("**Kanka Ceza Vereceğin Kişinin Etiket, Atmayı Unuttun!**");
  user.addRole('647143181984464932')
  user.removeRole('647106240861962280')
  user.removeRole('647106241314684938')
const codeplus = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${user},adlı kullanıcı başarıyla **cezalandırılmıştır**! `)
        .setColor('00000')
        .setTimestamp()
        message.channel.send(codeplus)
        message.react(okey)
  
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ceza"],
    permLevel: 3
}
exports.help = {
    name: 'jail',
    description: 'taslak',
    usage: 'taslak'
}