const Discord = require('discord.js');
let rolid = "700144704506953832"; // BURAYA KULLANICININ TÜM ROLLERİ ALINDIKTAN SONRA VERİLECEK ROLÜN İDSİNİ YAZIN YAZMAZSANIZ TÜM ROLLERİ ALIR SADECE. 

exports.run = async (client, message, args) => {
 if(!message.member.roles.has("700144704578125920")) return message.channel.send(`Yeterli yetki bulunmamakta.`)
  let kişi = message.mentions.users.first();
    message.react('706096419572023307')
    let reason = args.slice(1).join(' ');
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(member.hasPermission("ADMINISTRATOR")) return message.reply("Yöneticileri teyite atamazsın!").then(msg => msg.delete(9000))  
  if(message.author.id === member.user.id) return message.reply("Kendini teyite atamazsın.!").then(msg => msg.delete(9000))   
 if(!member) return message.channel.send("**Lütfen kullanıcıyı etiketleyiniz veya idsini yazınız.**");
    if (reason.length < 1) return message.channel.send("Lütfen sebep belirtin.")
    if(rolid.match(/(\d{17,19})/g)) {
    member.roles.forEach(role => member.removeRole(role));
    await member.addRole(rolid);
}
    else member.roles.forEach(role => member.removeRole(role));

const embed = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL) 
.setTitle('そ INFECTION | Teyite Atılma')
.setThumbnail(member.user.avatarURL)    
.setColor("#005b94")
.setTimestamp()
.addField('**Yetkili :**',`<@${message.author.id}> | ID: ${message.author.id} `) 
.addField('**Teyite Atılan Kullanıcı :**' , `<@${kişi.id}> | ID: ${kişi.id}`)
.addField('**Verilen Rol :**', `**${rolid.match(/(\d{17,19})/g) ? ` ${message.guild.roles.get(rolid)} rolü verildi.**` : 'alındı.**'}`)
.addField('**Atılma Sebebi :**', "```" + reason + "```")
.setImage('RESİM LİNK EKLE')
client.channels.get("7706103285664448542").send(embed) //logun atılacağı yer 

  

};
   
   //if(message.author.id === member.user.id) return message.reply("Kendini jaile atamazsın.!").then(msg => msg.delete(9000))  

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["hapset"],
    permLevel: 0
};

exports.help = {
    name: "teyitat",
    description: 'Birini jaillersiniz.',
    usage: 'jail <kullanıcı>'
};
 ////`${message.author.username}#${message.author.discriminator}`)