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
        .setDescription(`<a:onay:700188249330810910> **Kayıt işlemi sonucu** \n\n <a:krmzn:700970912039829544> ${user}, **  kullanıcısının rolü başarıyla değiştirildi. **  \n <a:krmzn:700970912039829544> **Dilersen ㄨ tagımızı alabilirsin.** \n <a:krmzn:700970912039829544> ㄨΛURORΛ **Ekibi; İyi eğlenceler**`)
       .setThumbnail("https://media.giphy.com/media/JQvFzbikYei9fETSL2/giphy.gif")
.setImage(`https://cdn.discordapp.com/attachments/684103541098283046/702799959057236008/ezgif.com-video-to-gif_4.gif`)
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