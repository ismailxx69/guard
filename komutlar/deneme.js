
const Discord = require("discord.js");
var voiceChannels = voiceChannels
exports.run = function(client, message, args) {
let sunucu = '693604724221542472' //sunucu id
let yeskili= '3693615832776835162' //yetkili id
  const mapping = {
  " ": "   ",
 "0": "<a:zero1:694717620372635668>",
  "1": "<a:one1:694717648910549102>",
  "2": "<a:two1:694717677406519297>",
  "3": "<a:three1:694717707236540426>",
  "4": "<a:four1:694717740136792185>",
  "5": "<a:five1:694717797959335938>",
  "6": "<a:six1:694717837872332902>",
  "7": "<a:seven1:694717867169546331>",
  "8": "<a:eight1:694717902766735460>",
  "9": "<a:nine1:694717939760496690>",
};
  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
let count = 0;
for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size; 
  let tag = "√" // tagınız
    const taglis = `${message.guild.members.filter(m => m.user.username.includes(tag)).size}`    
    let afa = client.guilds.get(sunucu).memberCount
    let kel = message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size
      let i = message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "online").size
    let halil= client.guilds.get(sunucu).roles.get(yeskili)
    let rols = halil.members.size
let rolse =  
    `${rols}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
/*let keban =  
    `${ses}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")*/
      
let toplam =  
    `${afa}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")

let online =  
    `${kel}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
let sex =  
    `${i}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
let tagli =  
    `${taglis}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
let seslide =  
    `${count}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")      
let sunucures = `${message.guild.iconURL}`
const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${message.guild.name} Bilgi`,`${sunucures}`)
        .setDescription(` **Sunucumuzda ${toplam} Kişi Bulunmaktadır**\n\n **Sunucumuzda ${online} Aktif Kişi Bulunmaktadır **\n\n **Sunucumuzda ${sex} Çevrimdışı Kişi Bulunmaktadır** \n\n **Tagımızı Alan ${tagli} Kullanıcı Bulunmakta** \n\n **Ses Kanallarında ${seslide} Kişi Bulunmakta**`)        
        .setThumbnail(message.author.avatarURL) 
        .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL)
    message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "online",
  desscription: "online sayısı"
};
//ROTASIZ DİKER <3