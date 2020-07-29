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
    .addField(` ⎑ Cehenneme Hoş Geldin  `, `**Hoş geldin  ${member.user}  , <@&729296895570345985> Rolüyle Artık Sende Ailemize Katıldın! Seninle Birlikte \`${member.guild.memberCount}\` Üyeye Ulaştık.**  `)
    .setColor("RED")
    .setFooter(message.author.tag ,message.author.avatarURL)
    .setTimestamp()
  let embed = new Discord.RichEmbed() 
  .setColor("PİNK")
  .addField(`⎑ lluvia Kayıt işlemi başarılı`, ` ${member.user} **adlı üyeye** <@&729296895570345985>  **rollerini verip ismini**  \` ⎑ ${isim} | ${yas}\` **olarak ayarladım!**`)                                                                             
  .setFooter(message.author.tag ,message.author.avatarURL)
  .setTimestamp()
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
  usage: 'Kız isim yaş'
} 