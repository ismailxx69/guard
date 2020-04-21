const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const moment = require('moment');

exports.run = (client, message, args) => {
  var tagdakiler = 0;
  let tag = "ㄨ";
  message.guild.members.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler+1
    }
  })
  message.channel.send("  **Tagımızda __` " + tagdakiler + " `__ Üye Var.** ")

exports.run = async (client, message, params) => {  
  
message.channel.send(' **<a:onay:700188249330810910> Sunucumuzda  __'+message.guild.memberCount+'__ Kişi Vardır** ')

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say","kaç-kişi"],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'Sunucunun bilgilerini gönderir.',
  usage: 'kaç-kişiyiz'
}; 