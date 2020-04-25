	const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
      if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('')
    let user = message.mentions.users.first() || client.users.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user
  let mod = message.author.tag
 let tag = " ㄨ "
  let nick = args[1];
  let yas = parseInt(args[2]);
  let rol = message.guild.roles.find(r => r.name === "xd");
 if(!args[0] || args[0] === "") return message.reply(`Kullanım: a!kayıt <kullanıcı> <isim> <yaş>`)
 if(nick >0 || nick <5) return message.reply(`Geçerli bir isim girin`)
  if(!yas || 65< args[2]) return message.reply(`Gerçek Yaşını Yazmalısın!`)
   message.guild.member(user).setNickname(tag + nick + yas);
   message.guild.member(user).addRole(rol);
   
  
   var kayıt = new Discord.RichEmbed()
   .setTitle("Kayıt Başarılı")
   .setColor("GREEN")
    .setThumbnail(user.avatarURL)
   .setDescription(`Rol Verildi: ${rol}\nVerilen Tag: ${tag}`)
    .setFooter(`Kayıt Etiren Mod: ${mod}`)
   message.channel.send(kayıt);
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtol"],
  permLevel: 0
};
module.exports.help = {
  name: 'kayıt',
  description: '',
  usage: 'kayıt <kullanıcı> <isim> <yaş>'
};