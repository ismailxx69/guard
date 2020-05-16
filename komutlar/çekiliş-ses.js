const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  if (!message.member.voiceChannel || !message.member.hasPermission("711213548138659840") || message.member.voiceChannel.members.size === 1) return;
  let mesaj = await message.channel.send('Çekiliş yapılıyor...');
  setTimeout(() => {
    mesaj.edit(new Discord.RichEmbed().setDescription(`Çekilişi kazanan kişi: ${message.member.voiceChannel.members.filter(a => a.id !== message.author.id).random()}`));
  }, 5000);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ses-çekiliş',
  description: 'Ses çekilişi.',
  usage: 'ses-çekiliş',
  kategori: 'kullanıcı'
};