const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix

exports.run = async (client, message, args) => {
 if (!message.member.roles.has("657552685540835329")) return message.reply('Bu komutu kullanabilmek için \`Bendis Bot Komut\` rolüne sahip olmalısın.');
  message.member.roles.has("605791138619588638")
  let isim = args.slice(1).join(' ');
  let tag = "✧"
  let kullanici = message.mentions.users.first();
  if(!kullanici) return message.reply(`:warning: Lütfen bir kullanıcı giriniz!`)
  if(!isim) return message.reply(`:warning: Lütfen bir kullanıcı adı giriniz!`)
  if(isim.length > 32) return message.reply(`:warning: Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!`)
  message.guild.members.get(kullanici.id).setNickname(`${tag} ${isim}`)
  message.react("655425865710305320")
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['nick'],
    permLevel: 0
}

exports.help = {
    name: 'nick',
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    usage: 'nick @kullanıcı <kullanıcı adı>'
}