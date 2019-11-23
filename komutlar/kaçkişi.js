const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const moment = require('moment');

exports.run = async (client, message, params) => {  
  
message.channel.send(''+message.guild.memberCount+' ')

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