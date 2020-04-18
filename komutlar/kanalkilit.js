const Discord = require('discord.js')
const ms = require('ms');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    
  if(!message.member.roles.has("700144704607617038")) return message.channel.send(`Bu komutu kullanabilmek için \Güzel yetkiye sahip olmalısınız.`);
  
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.channel.send(`Bir süre belirtmelisin kanka \n Örnek : \`${prefix}kilit 5m\``);

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.send(`Kanalın kilidi açıldı.`);
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
    
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send(`Kanal kilitlendi. Süre : ${ms(ms(time))}`).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send(`**Kanalın kilidi açıldı.**`)).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kanalkilit', 'kilit'],
  permLevel: 0
};

exports.help = {
  name: 'kanalkilit',
  description: 'Komutu kullandığınız kanalı belirttiğiniz süre kilitler.',
  usage: 'kanalkilit <süre>'
};
