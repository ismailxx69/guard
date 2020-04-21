const Discord = require('discord.js');
const db = require('quick.db')
module.exports.run = async (bot, message, args, member, client, level) => {
  if(!message.member.roles.has("700144704578125920")) return message.channel.send(`**Kusura Bakma Dostum Buna Yetkin Yok.** `);
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("**Etiket Atmayı Unuttun!**");
  user.addRole('700144704565673991') 
  user.removeRole('700144704506953832') 
const ky = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${user}, **<a:krmzn:700970912039829544> kullanıcısına <@&700144704565673991> rolü verildi** `)
       .setThumbnail("https://media.giphy.com/media/JQvFzbikYei9fETSL2/giphy.gif")
        .setColor('RED')
        .setTimestamp()
        message.channel.send(ky)
  
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kız"],
    permLevel: 0
}
exports.help = {
    name: 'kız', 
    description: 'kayıt',
    usage: 'kayıt' //Dcs Ekibi
}