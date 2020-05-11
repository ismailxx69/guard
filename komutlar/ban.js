const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
   if(!message.member.roles.has("704647739438268556")) return message.channel.send(`**Kusura Bakma Dostum Buna Yetkin Yok.** `);
    if (!message.guild) { 
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor('RED')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**❌ Bu Komutu Özel Mesajlarda Kullanılamaz!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
 let guild = message.guild
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('**⚠ Kimi Yasaklamak İstediğini Yazmalısın!**').catch(console.error);

      message.guild.ban(user)
  const embed = new Discord.RichEmbed()
    .setColor('RED')
    .setTimestamp()
  .setTitle('✅  `' +  message.author.username + '`  İşlem Başarılı Kullanıcı Sunucudan Yasaklandı!' )
  .setImage(`https://media0.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif?cid=ecf05e476a20dec5fbceba1210fc1b68f21b853c1d28e442&rid=giphy.gif`)
  return message.channel.sendEmbed(embed)
};
}      
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yasakla"],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Seçilen kişiyi banlar',
  usage: ' ban'
};
 