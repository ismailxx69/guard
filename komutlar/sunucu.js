const Discord = require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args, prefix, ayar, emoji) => {
  let erkekRolü = "689930803215335514";
  let kızRolü = "689930802682790030";
  let ekipRolü = "689930801999118414";
  const embeddd = new Discord.RichEmbed()
    .setColor("BLUE")
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .setDescription(`
      <a:emoji_20:689080340123484161> Sunucu Toplam Üye: ${message.guild.memberCount} \n<a:emoji_20:689080340123484161> Toplam Aktif Üye: ${
        message.guild.members.filter(b => b.presence.status !== "offline").size
     }  \n<a:emoji_20:689080340123484161> Erkek Üye:  ${
        message.guild.roles.get(erkekRolü).members.size
      } \n<a:emoji_20:689080340123484161> Kız Üye: ${message.guild.roles.get(kızRolü).members.size} \n<a:emoji_20:689080340123484161> Ekip: ${
        message.guild.roles.get(ekipRolü).members.size
      }  \n<a:emoji_20:689080340123484161> Aktif Erkek Üye: ${
        message.guild.roles
          .get(erkekRolü)
          .members.filter(x => x.presence.status !== "offline").size
      }  \n<a:emoji_20:689080340123484161> Aktif Kız Üye: ${
        message.guild.roles
          .get(kızRolü)
          .members.filter(x => x.presence.status !== "offline").size
      }  \n<a:emoji_20:689080340123484161> Aktif Ekip: ${  
        message.guild.roles
          .get(ekipRolü)
          .members.filter(x => x.presence.status !== "offline").size
      } \n<a:emoji_20:689080340123484161> Ses Kanalında Bulunan: ${
        message.guild.members.filter(a => a.voiceChannel).size
      }
    `);
  message.channel.send(embeddd);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["s"],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "Sayım yapar.",
  usage: "says",
};  