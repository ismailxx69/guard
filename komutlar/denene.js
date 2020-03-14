const Discord = require('discord.js');

exports.run = (client, message, args) => {
  var tagdakiler = 0;
  let tag = "ꏪ";
  message.guild.members.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler+1
    }
  })
  message.channel.send("<a:kus:688079319121133583> Black Deneme Yetkilisi Bilgi \n\n<a:ok:688079594821255201> 2 Günlük Bir Deneme Süreciniz. \n\n<a:ok:688079594821255201> 2 Gün İçerisinde 10 Saat  Mikrofonunuz Açık Seslide Durmanız Lazım \n\n<a:ok:688079594821255201> 2 Gün İçerisinde Metin Kanallarına 400 Adet Mesaj Yazmanız Gerek \n\n<a:ok:688079594821255201> 2 Gün İçerisindr Bunları YapmaSanız Yetkiniz Alınır. \n\n@everyone")
  const Discord = require('discord.js');


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tagdakilerisay","tagsay"]
};

exports.help = {
  name: 'denemnxndjxxjjxe',
  description: 'Tagdaki Kullanıcıları Sayar!',
  usage: 'Tag Sayar Fyukas'
};   