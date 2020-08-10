const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const ms = require('ms');

exports.run = async(client, message, args, prefix, ayar, emoji) => {
  // !sesmute @etiket 5m
  let uye = message.mentions.members.first();
  let sure = args[1];
  let sebep = args.slice(2).join(' ');
  let logKanali = "741661572929290312"; // LOG KANALININ ID
  if (!uye || !sure || !sebep) return message.reply('Doğru kullanmalısın!\n' +this.help.usage);
  if (!uye.voiceChannel) return message.reply('Kişi bir ses kanalda değil!');
  if (!uye.voiceChannel.permissionsFor(message.author).has('MUTE_MEMBERS')) return message.reply('Bunu yapman için yeterli izinlere sahip değilsin!');
  uye.setMute(true);
  message.channel.send(`${uye.displayName} adlı üye ses kanalında **${sure}** kadar susturuldu!`);
  client.channels.get(logKanali).send(`${uye} adlı üye ses kanalında **${sure}** kadar, **${sebep}** nedeniyle susturuldu!`);
  setTimeout(() => {
    uye.setMute(false);
    message.channel.send(`${uye.displayName} adlı üyenin ses susturması kaldırıldı!`);
    client.channels.get(logKanali).send(`${uye.displayName} adlı üyenin ses susturması kaldırıldı!`);
  }, ms(sure));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'sesmute', 
  description: 'Sesmute.',
  usage: 'sesmute @üye süre sebep',
  kategori: 'kullanıcı'
};