const Discord = require('discord.js');//SYLVESTER 35½
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if (!message.member.roles.has('741641797352161341') && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("Black"));
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bir üye etiketlemelisin!').setColor("Black"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let isim = args[1];
      if(!isim) return message.channel.send("Lütfen bir isim girin!").then(m => m.delete(5000));
   let yas = args[2];
      if(!yas) return message.channel.send("Lütfen bir yaş girin!")
  if(message.channel.id !== '741646195222511660') return message.channel.send('Bu Komutu Sadece <#741646195222511660> Kanalında Kullanabilirsin.')
await member.setNickname(`⋆ ${isim} | ${yas}`);
  member.addRole("741641798073450496"); //erkek rol id,
  member.addRole("741655869854318663");
  member.addRole("741641798874693652");
  member.removeRole("741641795867246612"); //kayıtsız rol id
  message.react('712860084425981983') //Emojiid
     const kanal = message.guild.channels.find(c => c.id == "741633554764660829") //LOGİD
    const embed1 = new Discord.RichEmbed() 
    .addField(`  ✩ Yıldız Savaşları`,  `**Hoş geldin  ${member.user}  , <@&741641798073450496> Rolüyle Artık Sende Ailemize Katıldın! Seninle Birlikte \`${member.guild.memberCount}\` Üyeye Ulaştık.**   `)
    .setColor("RED")
    .setFooter(message.author.tag ,message.author.avatarURL)
    .setTimestamp()
  let embed = new Discord.RichEmbed() 
  .setColor("PİNK")
  .addField(`  ✩ Bellatrix İşlem Başarılı  `,  ` ${member.user} **adlı üyeye** <@&741641798073450496>  **rollerini verip ismini**  \` ⋆ ${isim} | ${yas}\` **olarak ayarladım!**  `)                                                                             
  .setFooter(message.author.tag ,message.author.avatarURL)
  .setTimestamp()
  .setImage(``)
  return message.channel.send(embed).then(kanal.send(embed1))
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek" , "e"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}
exports.help = {
  name: 'erkek',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'Erkek isim yaş'
} //SYLVESTER 35½