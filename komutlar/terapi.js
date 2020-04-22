const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {

    let cm = Math.round(Math.random() * 100);

    let gayembed = new Discord.RichEmbed()
        .setColor("#f442d4")
       .setDescription(`** <a:kelebek:700970912576569374> ㄨΛURORΛ Etkinlik Takvimi** <a:kelebek:700970912576569374> \n\n <a:emoji_3:700155280297689168> 2 Günde 1 normal Doğruluk mu? Cesaret mi? oyunu! \n\n <a:emoji_3:700155280297689168> 4 Günde 1 Vampir Köylü oyunu! \n\n <a:emoji_3:700155280297689168> Her gün 23:00 dan sonra (isteğe bağlı) film keyfi! \n\n <a:emoji_3:700155280297689168> Her gün (isteğe bağlı) karaoke yarışması!`)
    return message.channel.send(gayembed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
  
exports.help = {
  name: 'etkinlik',
  description: 'Acaba Kaç CM',
  usage: 'etkinlik'
};