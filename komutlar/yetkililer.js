const Discord = require('discord.js');
const embed = new Discord.RichEmbed()

exports.run = async (client, message) => {
 message.delete()
  var str = ''
for(var i = 0; i < message.guild.members.size; i++) {
   if(message.guild.members.array()[i].hasPermission("ADMINISTRATOR") && message.guild.members.array()[i].presence.status === "dnd" && !message.guild.members.array()[i].user.bot) {
      str += `<a:onay:700188249330810910> ${message.guild.members.array()[i].user.tag}\n`
    }
    else if(message.guild.members.array()[i].hasPermission("ADMINISTRATOR") && message.guild.members.array()[i].presence.status === "online" && !message.guild.members.array()[i].user.bot){
      str += `<a:onay:700188249330810910> ${message.guild.members.array()[i].user.tag}\n`
    }
    else if(message.guild.members.array()[i].hasPermission("ADMINISTRATOR") && message.guild.members.array()[i].presence.status === "idle" && !message.guild.members.array()[i].user.bot){
      str += `<a:onay:700188249330810910> ${message.guild.members.array()[i].user.tag}\n`
    }
      else if (message.guild.members.array()[i].hasPermission("ADMINISTRATOR") && message.guild.members.array()[i].presence.status === "offline" && !message.guild.members.array()[i].user.bot){
      str += `<a:onay:700188249330810910> ${message.guild.members.array()[i].user.tag}\n`
    }
}

  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${message.guild.name} - Sunucu Yöneticileri`)
  .setDescription(str.replace(message.guild.owner.user.tag, `**${message.guild.owner.user.tag} - [Sunucu Sahibi]**`))
  .setThumbnail("https://cdn.discordapp.com/attachments/684103541098283046/702794401436532786/ezgif.com-video-to-gif_3.gif")
  .setFooter("NOT: Bu komut sunucudaki \"Yönetici\" iznine sahip kullanıcıları listeler.")
message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['staffs'],
  permLevel: 0,
  kategori: "sunucu"
};

exports.help = {
  name: 'yöneticiler',
  category: 'sunucu',
  description: 'Bulunduğunuz sunucudaki yetkilileri çevrimiçi, çevrımdışı/görünmez, rahatsız etmeyin ve boşta modlarında olup olmadıklarını göstererek listeler. (Yönetici yetkisine sahip kullanıcıları yetkili olarak sayar.)',
  usage: 'yetkililer'
};