const Discord = require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args, prefix, ayar, emoji) => {
  let erkekRolü = "680719057934090464";
  let kızRolü = "680719196153184266";
  let ekipRolü = "680725648880435215";
  const embeddd = new Discord.RichEmbed()
    .setColor("BLUE")
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .setDescription(`
      :ok: Sunucu Toplam Üye: ${message.guild.memberCount} \n:ok: Toplam Aktif Üye: ${
        message.guild.members.filter(b => b.presence.status !== "offline").size
     }  \n:ok:  Erkek Üye:  ${
        message.guild.roles.get(erkekRolü).members.size
      } \n:ok: Kız Üye: ${message.guild.roles.get(kızRolü).members.size} \n:ok:  Ekip: ${
        message.guild.roles.get(ekipRolü).members.size
      }   \n:ok:  Aktif Erkek Üye: ${
        message.guild.roles
          .get(erkekRolü)
          .members.filter(x => x.presence.status !== "offline").size
      }  \n:ok:    Aktif Kız Üye: ${
        message.guild.roles
          .get(kızRolü)
          .members.filter(x => x.presence.status !== "offline").size
      } \n:ok:  Aktif Ekip: ${  
        message.guild.roles
          .get(ekipRolü)
          .members.filter(x => x.presence.status !== "offline").size
      } \n:ok:  Ses Kanalında Bulunan: ${
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