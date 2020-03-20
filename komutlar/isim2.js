const Discord = require('discord.js');
exports.run = (client, message, args) => { //komut dosyasının içindeki bileşenler
  
  
  let kullanıcı = message.mentions.users.first()
let yetkili = message.member.user.username;
let kanal = message.channel.id;
  var hata1 = new Discord.RichEmbed()
  .setTitle('**Hata** :warning:')
  .setDescription('Lütfen ismi belirlenecek kullanıcıyı seçin.')
  .setFooter('!isim @kullanıcı <isim>')
  .setColor('RED')
  
  
    var hata2 = new Discord.RichEmbed()
  .setTitle('**Hata** :warning:')
  .setDescription('Lütfen **'+kullanıcı+'** adlı kullanıcıya verilecek ismi belirtin.')
  .setFooter('!isim @kullanıcı <isim>')
  .setColor('RED')
      var hata3 = new Discord.RichEmbed()
  .setTitle('**Hata** :warning:')
  .setDescription('**"isim"** adlı komutu kullanabilmek için,"Kullanıcıları Yönet" yetkisine sahip olman gerekiyor')
  .setColor('RED')
     

  if(!kullanıcı) return message.channel.sendEmbed(hata1)
  if(!args[1]) return message.channel.sendEmbed(hata2)
  
        var başarılı = new Discord.RichEmbed()
  .setTitle('**Başarılı!** :white_check_mark:')
  .setDescription('**'+kullanıcı + '** Adlı kullanıcı nın ismi,**'+args[1]+'** Olarak değiştirme talebi özelden kullanıcıya gönderildi.Lütfen onaylamasını bekleyin.')
  .setColor('RED')
  
        message.channel.sendEmbed(başarılı)
        
  var onay = new Discord.RichEmbed()
  .setColor('GREEN')
  .setTitle('selam,'+kullanıcı.username)
.setDescription(message.guild.name + ' Sunucusunda **'+yetkili+'** Adlı yetkili tarafından,isminiz **'+args[1]+'** yapılmak istiyor onaylıyorsanız aşağıdaki emojiye dokunun.')  
  kullanıcı.send(onay).then(async function (sentEmbed) {
const emojiArray = [":tik1:"];
            const filter = (reaction, user) => emojiArray.includes(reaction.emoji.name) && user.id === kullanıcı.id;
            await sentEmbed.react(emojiArray[0]).catch(function () { });
            var reactions = sentEmbed.createReactionCollector(filter, {
                time: 30000
            });
reactions.on("end", () => sentEmbed.edit("İşlemi iptal ettim"));
    reactions.on("collect", async function (reaction) {
                if (reaction.emoji.name === ":tik1:") {

message.guild.member(kullanıcı).setNickname(args[1]);
          kullanıcı.send('işlem onaylandı,Onayınız için teşekkür ederiz')  

    var tamam = new Discord.RichEmbed()
  .setColor('GREEN')
  .setTitle('**İşlem Başarılı!** ✅')
.setDescription('**'+kullanıcı.username + '** Adlı kullanıcı,**' + message.member.user.username + '** Tarafından verilen, **' + args[1] + '** İsmini özelden Kabul etti! ')  
   .setFooter('kullanıcının ismi değiştirildi.')
 message.channel.sendEmbed(tamam)
    }
    })
})
      
  
  };
exports.conf = {
  enabled: true,  //
  guildOnly: false, 
  aliases: [], //
  permLevel: 0 //
};

exports.help = {
  name: 'isim', 
  description: 'isim ayarla', 
  usage: 'isim' 
};