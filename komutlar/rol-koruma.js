const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  
         if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

  
if(args[0] === "kapalı") {
  
      let embed4 = new Discord.RichEmbed()
  .setColor('RED')
.setDescription('Rol Koruma sistemini başarıyla Devre dışı bıraktım.. ')
  message.channel.send(embed4)   

   
 db.delete(`aktifs_${message.guild.id}`)    
  return

}
  
if(args[0] === "açık") {
    
   let embed1 = new Discord.RichEmbed()
  .setColor('GREEN')
.setDescription('Rol Koruma sistemini başarıyla Aktif ettim. ')
message.channel.send(embed1)

db.set(`aktifs_${message.guild.id}`, message.guild.id)   
  return 
}
  
 message.channel.send('bir değer belirtmelisin. `!rol-koruma açık`,`!rol-koruma kapalı`') 
      
  //CodEming / Yasin..
  
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'rol-koruma',
  description: 'taslak', 
  usage: 'rol-koruma'
};