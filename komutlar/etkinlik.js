const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setColor('BLACK')
    .setTimestamp()
    .addField('** <a:kelebek:700970912576569374> ㄨΛURORΛ Etkinlik Takvimi** <a:kelebek:700970912576569374> \n\n <a:emoji_3:700155280297689168> 2 Günde 1 normal Doğruluk mu? Cesaret mi? oyunu! \n\n <a:emoji_3:700155280297689168> 4 Günde 1 Vampir Köylü oyunu! \n\n <a:emoji_3:700155280297689168> Her gün 23:00 dan sonra (isteğe bağlı) film keyfi! \n\n <a:emoji_3:700155280297689168> Her gün (isteğe bağlı) karaoke yarışması!') // YAPIMCI
    message.channel.sendEmbed(ozelmesajkontrol) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım'],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: 'Yapimcimi Gosterir.',
  usage: 'yapimcim'
};