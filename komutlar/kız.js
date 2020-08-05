const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if (!message.member.roles.has('729271901200842763') && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("Black"));
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bir üye etiketlemelisin!').setColor("Black"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let isim = args[1];
      if(!isim) return message.channel.send("Lütfen bir isim girin!").then(m => m.delete(5000));
   let yas = args[2];
      if(!yas) return message.channel.send("Lütfen bir yaş girin!")
  if(message.channel.id !== '729267305191833610') return message.channel.send('Bu Kanalda Komut Sadece <#729267305191833610> Kanalınan Kullanabilirsin.')
await member.setNickname(`⎑ ${isim} | ${yas}`);
  member.addRole("729296895570345985"); //kız rol ıd
  member.removeRole("729299296771637308"); //kayıtsız rol id
  message.react('712860084425981983') //Emojiid
     const kanal = message.guild.channels.find(c => c.id == "731226545435443224") //LOGİD
    const embed1 = new Discord.RichEmbed() 
    .addField(` <a:pnad:729395856683434068> ⎑ lluvia Kingdom`,  `**Hoş geldin  ${member.user}  , <@&729296895570345985> Rolüyle Artık Sende Ailemize Katıldın! Seninle Birlikte \`${member.guild.memberCount}\` Üyeye Ulaştık.** <a:kirmiziguzel:734716553362407455>   `)
    .setColor("RED")
    .setFooter(message.author.tag ,message.author.avatarURL)
    .setTimestamp()
  let embed = new Discord.RichEmbed() 
  .setColor("PİNK")
  .addField(` <a:unlem:733417369447170190> ⎑ lluvia Kayıt işlemi başarılı <a:unlem:733417369447170190> `,  ` ${member.user} **adlı üyeye** <@&729296895570345985>  **rollerini verip ismini**  \` ⎑ ${isim} | ${yas}\` **olarak ayarladım!** <a:kirmiziguzel:734716553362407455> `)                                                                             
  .setFooter(message.author.tag ,message.author.avatarURL)
  .setTimestamp()
  .setImage(`https://cdn.discordapp.com/attachments/729267305191833610/734813098829152346/giphy.gif`)
  return message.channel.send(embed).then(kanal.send(embed1))
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kız" , "k"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}
exports.help = {
  name: 'kız',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'Erkek isim yaş'
} 