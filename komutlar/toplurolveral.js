  const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komut sunucu sahibine özeldir!')
  if(!args[0] && args[0] !== "ver" && args[0] !== "al") return message.channel.send('Yapılacak işlemi belirtmelisin! \n**Doğru Kullanım:** `${prefix}toplu-rol ver @rol \n`${prefix}toplu-rol al @rol')

  let rol = message.mentions.roles.first() || message.guild.roles.get(args[1]) || message.guild.roles.find(rol => rol.name === args.slice(1).join(' '));

  if(args[0] === "ver") {
    if (!rol) return message.channel.send(`Herkese verilecek olan rolü belirtmelisin! \n**Doğru Kullanım:** \`${prefix}toplu-rol ver @rol\``)
    await message.guild.members.forEach(u => {
    u.addRole(rol)
   })
   message.channel.send('Belirtilen rol herkese verildi!')
   return 
  }// VER BİTİŞ
  
  if(args[0] === "al") {
    if (!rol) return message.channel.send(`Herkesten alınacak olan rolü belirtmelisin! \n**Doğru Kullanım:** \`${prefix}toplu-rol al @rol\``)
   await message.guild.members.forEach(u => {
    u.removeRole(rol)
   })
   message.channel.send('Belirtilen rol herkesten alındı!')
   return
  } // AL BİTİŞ
};

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: ['toplurol'],
    permLevel: 0
};

exports.help = {
  name: 'toplu-rol',
  description: 'Belirttiğiniz rolü herkese verir/alır.',
  usage: 'toplu-rol ver/al @rol',
  kategori: 'yetkili'
};