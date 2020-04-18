module.exports.run = async (client, msg, args) => {
  if (!msg.member.hasPermission("KICK_MEMBERS"))
    return msg.channel.send({
      embed: {
        color: Math.floor(Math.random() * (0xffffff + 1)),
        description: "❌ Bu Komutu Kullana Bilmek için `Üyeleri At` Yetkisine Sahip Olmalısın!"
      } //Dcs Ekibi
    });

  let kullanıcı =
    msg.guild.member(msg.mentions.users.first()) || msg.guild.member(args[0]);
  if (!kullanıcı)
    return msg.channel.send({
      embed: {
        color: Math.floor(Math.random() * (0xffffff + 1)),
        description:
          "**❌ | Doğru Kullanım:** `sanane <@kullanıcı>`"
      }
    });

  let rol = msg.guild.roles.find(r => r.name === "Owner Bot | Muted");

  if (!rol || kullanıcı.roles.has(rol))
    return msg.channel.send({
      embed: {
        color: Math.floor(Math.random() * (0xffffff + 1)),
        description: "❌ Bu Kullanıcı Zaten Cezalı Değil!"
      }
    });

  kullanıcı.removeRole(rol);
  msg.channel.send({
    embed: {
      color: Math.floor(Math.random() * (0xffffff + 1)),
      description: `✅ İşlem Başarılı!\n${kullanıcı} Cezan Kaldırıldı!`
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute"],
  permLevel: 0
};
//Dcs Ekibi
exports.help = {
  name: "susturaç",
  description: "İstediğiniz kişinin eğer susturulduysa susturunu açar.",
  usage: "susturaç"
};