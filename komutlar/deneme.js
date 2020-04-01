
const Discord = require("discord.js");
var voiceChannels = voiceChannels
exports.run = function(client, message, args) {
let sunucu = '688523664190472200' //sunucu id
let yeskili= '691250337771814952' //yetkili id
  const mapping = {
  " ": "   ",
 "0": "<a:zero:689080913547886600>",
  "1": "<a:one:689080473434980372>",
  "2": "<a:two:689080536945262613>",
  "3": "<a:three:689080572823339034>",
  "4": "<a:four:689080608667729960>",
  "5": "<a:five:689080649927491618>",
  "6": "<a:six:689080705258618940>",
  "7": "<a:seven:689080746459136012>",
  "8": "<a:eight:689080803874963530>",
  "9": "<a:nine:689080868157128719>",
};
  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
let count = 0;
for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size; 
  let tag = "৳" // tagınız
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