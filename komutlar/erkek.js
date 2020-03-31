const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async (client, message, args) => {

if(!message.member.roles.has("689930799964880946")) return message.channel.send(`Bu komutu kullanabilmek için <@&689930799964880946> yetkisine sahip olmasınız. <a:unlem:689081736088649768>`);
  let isim = args[1];
  let yas = args[2];
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send('Kullanıcıyı etiketlemeyi unuttun kanka.  <a:unlem:689081736088649768>')
  if (!isim) return message.channel.send('İsim Yazmayı Unuttun Kanka <a:unlem:689081736088649768>')
  if (!yas) return message.channel.send('Yaş Yazmayı Unuttun Kanka <a:unlem:689081736088649768>')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)      
  member.setNickname(`❃ ${isim} • ${yas}`)
  member.addRole('689930803215335514')
  member.removeRole('689930804301791276')
  let embed = new Discord.RichEmbed()
  message.react("689080340123484161")
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
}

exports.help = {
  name: 'erkek',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'kayıt isim yaş'
}