const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join('...');
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', '⎑-ban-info');
  if (!modlog) return message.reply('`⎑-ban-info` kanalını bulamıyorum.');
  if (reason.length < 1) return message.reply('Ban sebebini yazmalısın.');
  if (message.mentions.users.size < 1) return message.reply('Kimi banlayacağını yazmalısın.').catch(console.error);
if(!message.member.roles.has("729271897254133790")) return message.reply(`Bu komutu kullanabilmen için  yetkiye <@&729271897254133790> sahip olman lazım.`);
  if (!message.guild.member(user).bannable) return message.reply('Yetkilileri banlayamam.'); 
  message.guild.ban(user, 2);

  const embed = new Discord.RichEmbed()
  .setImage(`https://media0.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif?cid=ecf05e476a20dec5fbceba1210fc1b68f21b853c1d28e442&rid=giphy.gif`)
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Ban')
    .addField('Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Sebep', reason);
  
  return guild.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi banlar.',
  usage: 'ban [kullanıcı] [sebep]'
};