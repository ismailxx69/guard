const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let yetki = new Discord.RichEmbed()
    .setTitle("Yetersiz Yetki")
    .setDescription("Bu komutu kullanmak için `Kullanıcıları Banla` yetkisine sahip olmalısın.")
    .setFooter("✸ Zedestergon Empire", client.user.avatarURL)
    .setColor("RED")
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
  let yoküye = new Discord.RichEmbed()
    .setTitle("Geçersiz Kullanım")
    .setDescription("Komutu yanlış kullandınız.\nHata: Banlamak istediğiniz kullanıcıyı etiketleyin.")
    .setFooter("✸ Zedestergon Empire", client.user.avatarURL)
    .setColor("RED")
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
  let yoksebep = new Discord.RichEmbed()
    .setTitle("Geçersiz Kullanım")
    .setDescription("Komutu yanlış kullandınız.\nHata: Bir sebep belirtmelisiniz.")
    .setFooter("✸ Zedestergon Empire", client.user.avatarURL)
    .setColor("RED")
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
  let banlanamaz = new Discord.RichEmbed()
    .setTitle("Yetersiz Yetki")
    .setDescription("Bu kullanıcıyı banlayamam.\nNedenler: Banlamak istediğiniz kullanıcının rolü benden yüksek olabilir, aynı role sahip olabiliriz veya bu kişi ben olabilirim.")
    .setFooter("✸ Zedestergon Empire", client.user.avatarURL)
    .setColor("RED")
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(yetki)
  let üye = message.mentions.members.first();
  let sebep = args.slice(1).join(" ");
  let banlandın = new Discord.RichEmbed()
    .setTitle("Banlandın")
    .setDescription(`**${message.guild.name}** adlı sunucudan **${sebep}** sebebiyle banlandın.`)
    .setFooter("✸ Zedestergon Empire", client.user.avatarURL)
    .setColor("RED")
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
  let başarılı = new Discord.RichEmbed()
    .setTitle("Başarılı")
    .setDescription(`**${üye}** adlı kişi başarıyla **${sebep}** sebebiyle banlandı.`)
    .setFooter("✸ Zedestergon Empire", client.user.avatarURL)
    .setColor("GREEN")
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
  if(!üye) {
    message.channel.send(yoküye)
  }
  else if (!message.guild.member(üye).bannable) return message.channel.send(banlanamaz);
  else if(!sebep)
    message.channel.send(yoksebep)
  else {
    üye.send(banlandın).then(banlandı => {
      message.guild.ban(üye)
      message.channel.send(başarılı)
    })
      
    

  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'ban',
  description: 'Botun pingini gösterir.',
  usage: 'ping'
};
   