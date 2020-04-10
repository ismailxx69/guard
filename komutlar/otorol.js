const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:siyah:694927370292822090> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let rol = message.mentions.roles.first()
  let rolk = message.mentions.channels.first()
  
  
  if (!rol) {
    return message.channel.send(`<a:siyah:694927370292822090> Otorol olarak ayarlamak istediğin rolü etiketlemelisin.`)
    }
  
  if (!rolk) {
    message.channel.send(`<a:siyah:694927370292822090> Otorol kanalını etiketlemelisin.`)
  }
  
  if (!rolk) return;
  
  
  db.set(`otorol_${message.guild.id}`, rol.name)
  db.set(`rolK_${message.guild.id}` ,rolk.name)
  
    message.channel.send(`<a:siyah:694927370292822090> Otorol \`${rol.name}\`, otorol kanalı #${rolk.name} olarak ayarlandı.`)
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['otorol-ayarla', 'oto-rol','otorol','otorolayarla'],
  kategori: 'ayarlar',
    permLevel: 3
}

exports.help = {
    name: 'otorol-ayarla',
    description: 'Sunucuya Girenlere Otomatik Rol Verir.',
    usage: 'otorol-ayarla <@rol> <#kanal>'
}