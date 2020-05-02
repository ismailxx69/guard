const Discord = require('discord.js');

exports.run = (client, message, args) => {
if(message.channel.id != "703383195776712754") return message.reply("Lütfen <#703383195776712754> kısmına yazınız.")    
    let user;
    
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    
    const avatar = new Discord.RichEmbed()
        .setColor("#005b94")
        .setAuthor("» Buyrun Efendimiz, ")
        .setImage(user.avatarURL)
.setFooter(`${message.author.tag} tarafından istendi`,message.author.avatarURL);    
message.channel.send(avatar)
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["pp"],
  permLevel: `Yetki gerekmiyor.` 
};

exports.help = {
  name: 'avatar',
  category: 'kullanıcı',
  description: 'Belirtilen Kişinin veya Komutu Yazan Kişinin Avatarını Atar.',
  usage: '!avatar <@kişi-etiket> veya +avatar'
};