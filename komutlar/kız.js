const Discord = require('discord.js');
const db = require('quick.db')
module.exports.run = async (bot, message, args, member, client, level) => {
  if(!message.member.roles.has("700144704578125920")) return message.channel.send(`**Kusura Bakma Dostum Buna Yetkin Yok.** `);
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("**Etiket Atmayı Unuttun!**");
 user.addRole('701400791797334097') 
  user.addRole('700144704565673991') 
  user.removeRole('700144704506953832') 
const ky = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`<a:onay:700188249330810910> **Kayıt Başarılı** \n\n <a:krmzn:700970912039829544> ${user},   kullanıcısının rolü başarıyla değiştirildi.  \n <a:krmzn:700970912039829544> Dilersen **ㄨ** tagımızı alabilirsin. \n <a:kelebek:700970912576569374> Aramıza hoş geldin.  `)
         .setThumbnail("https://cdn.discordapp.com/attachments/684103541098283046/702794401436532786/ezgif.com-video-to-gif_3.gif")
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