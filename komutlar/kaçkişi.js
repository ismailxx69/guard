const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const moment = require('moment');

exports.run = async (client, message, params) => {  
  
message.channel.send('<a:emoji_12:689079948274958339> Sunucumuzda __'+message.guild.memberCount+'__ Kişi Vardır')

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say","kaç-kişi"],
  permLevel: 0
};

exports.help = {
  name: 'kk',
  description: 'Sunucunun bilgilerini gönderir.',
  usage: 'kaç-kişiyiz'
}; 