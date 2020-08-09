const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");

const chalk = require("chalk");
const fs = require("fs");

const moment = require("moment");
const db = require("quick.db");
const request = require("request");
const ms = require("parse-ms");
const express = require("express");
const http = require("http");
const app = express();

require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};



app.listen(process.env.PORT);
app.get("/", (request, response) => {
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`);
}, 1000 * 60 * 3);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const { RichEmbed } = require("discord.js")
client.on("message", async message => {
    if(!message.guild) return
    if (message.member.hasPermission('MANAGE_GUILD')) return;
    if (message.mentions.users.size >= 3) {
      if (message.deletable) message.delete();
      message.channel.send(`Hey ${message.author}, sürekli birilerini etiketlemek kötüdür. ${message.author} bir daha devam etme. ${message.author} ${message.author} ${message.author}`)
        message.author.send(`Hey ${message.author}, sürekli birilerini etiketlemek kötüdür. ${message.author} bir daha devam etme. ${message.author} ${message.author} ${message.author}`)
      }
})


client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`)  
          if (i == 'acik') {
              const reklam = ["discord.app", "discord.gg", "discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                    
                    let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setFooter('Reklam engellendi.', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription(" SYLVESTER Reklam sistemi, " + `***${msg.guild.name}***` + " adlı sunucunuzda reklam yakaladım.")
                    .addField('Reklamı yapan kişi', 'Kullanıcı: '+ msg.author.tag +'\nID: '+ msg.author.id, true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`${msg.author}, **Reklam Yapmak Yasak Bunu Bilmiyormusun!**`).then(msg => msg.delete(25000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });

client.on("guildBanAdd", async (guild, user) => {
  if (!db.has(`banlimit_${guild.id}`)) return;
  let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
  if (logs.entries.first().executor.bot) return;
  const kisi = logs.entries.first().executor
  const member = guild.members.get(kisi.id)
  if (member.hasPermission('ADMINISTRATOR')) return;
  let banlimit = db.fetch(`banlimit_${guild.id}`)
  if (isNaN(banlimit)) return;
  banlimit = banlimit + 1
  if (!db.has(`bansayi_${member.id}_${guild.id}`)) {
    if (banlimit == 1) {
      var array = member.roles.filter(role => role.name !== "@everyone").array()
      for (const role of array) {
        member.removeRole(role.id)
      }
    }else{
      db.set(`bansayi_${member.id}_${guild.id}`, 1)
    }
  }else{
    const bansayisi = db.fetch(`bansayi_${member.id}_${guild.id}`) + 1
    if (bansayisi >= banlimit) {
      db.delete(`bansayi_${member.id}_${guild.id}`)
      var array = member.roles.filter(role => role.name !== "@everyone").array()
      for (const role of array) {
        member.removeRole(role.id)
      }
    }else{
      db.add(`bansayi_${member.id}_${guild.id}`, 1)
    }
  }
})

client.on("message", async msg => {
  let küfür = await db.fetch(`küfür_${msg.guild.id}`)
    if (küfür == "açık") {
        const küfür2 = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq", "annesiz",];
        if (küfür2.some(word => msg.content.includes(word))) {
          msg.delete();
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                  msg.delete();
            }
               var embed = new Discord.RichEmbed()
               .setColor("BLUE")
               .setDescription("**Burda Argolu Kelimeler Kullanamazsın**")
               
               msg.channel.send(embed).then(msg => msg.delete(3000));
            }
          }
      }) 


client.on('message', async message => {
  
const otocevap1 = new RegExp(/(^sa$|^sea$|^selamın aleyküm$|^slm$|^Selam$|^selam$|^Selamun aleyküm$|^Selamun Aleyküm$|^Sea$|^Selamke$|^Selams)/gi);
if (otocevap1.test(message.content) == true) {
message.reply('  **Aleyküm selam hoş geldin, umarım keyifli bir sohbet olur.**. ');
} 
  
   
   
    const otocevap3 = new RegExp(/(^!tag$|^tag$)/gi);
    if (otocevap3.test(message.content) == true) {
    message.channel.send('**✩   ᵇᵉˡˡᵃᵗʳᶤˣ **')
      
      
      
    }
});




client.on('userUpdate', async user => {
  let sunucuid = "741633554764660826"; //Buraya sunucunuzun IDsini yazın
  let tag = "ᵇᵉˡˡᵃᵗʳᶤˣ"; //Buraya tagınızı yazın
  let rol = "741651661679886346"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.get(sunucuid).channels.find(x => x.name == 'tagrol-log'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.get(sunucuid).members.get(user.id);
  if (!member) return;
  if (!member.roles.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.addRole(rol)
      const tagalma = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını aldığından dolayı <@&${rol}> rolünü kazandı.`)
      .setTimestamp()
      channel.send(tagalma)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.removeRole(rol)
      const tagsilme = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını sildiğinden dolayı <@&${rol}> rolünü kaybetti.`)
      .setTimestamp()
      channel.send(tagsilme)
    }
  }
});

  
  
  
  
  
  client.on('channelDelete', channel => {
  let kategoriID = channel.parentID;
  channel.clone(this.name, true, true).then(z => {
      let ganal = z.guild.channels.find(name => name.name === z.name)
      ganal.setParent(ganal.guild.channels.find(channel => channel.id === kategoriID))
     ganal.send(`**Bu kanal silindi ve kanal koruma sistemi sayesinde başarıyla tekrardan açıldı! **\n**Kanalın adı, kanalın konusu, kanalın kategorisi, kanalın izinleri başarıyla ayarlandı. **`);
                           
  });
});



var uyarilar = {};






// TAG SİSTEMİ OTO EDİTLENECEK







client.on('guildMemberAdd', (member) => {
    const guild = member.guild;


 let sChannel = member.guild.channels.find(c => c.name === 'bot-koruma')

    if(member.user.bot !==true){

    } 
    else {

    sChannel.send(`**SYLVESTER Guard bot koruma sistemi **
Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Banlandı
Banlanan Bot: **${member.user.tag}**
@everyone`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
  }  
  });
//////////////////SUNUCU BOT KORUMA SONU/////////////////// !  ✩ rєч sчlvєstєr ᵇᵉˡˡᵃᵗʳᶤˣ ಡ#0107

client.login(ayarlar.token);
 ;
   //////////////////ULTRA GELİŞMİŞ ROL KORUMA BAŞI/////////////////// !  ✩ rєч sчlvєstєr ᵇᵉˡˡᵃᵗʳᶤˣ ಡ#0107
  
client.on('guildMemberUpdate', async (oldMember, newMember) => {
let guild = oldMember.guild || newMember.guild;
  
    let chimp = await guild.fetchAuditLogs({type: 'MEMBER_ROLES_UPDATE'});
  
    if(chimp) {
      
let asd = []

oldMember.roles.forEach(c => {
if(!newMember.roles.has(c.id)) {
require('quick.db').delete(`${guild.id}.${c.id}.${oldMember.id}`)
}
})
newMember.roles.forEach(c => {
if(!oldMember.roles.has(c.id)) {
require('quick.db').set(`${guild.id}.${c.id}.${newMember.id}`, 'eklendi')
}
  
})
    
    }
})

client.on('roleDelete', async role => {
let guild = role.guild;
  
  let e = await guild.fetchAuditLogs({type: 'ROLE_DELETE'});
  let member = guild.members.get(e.entries.first().executor.id);
  //if(member.hasPermission("ADMINISTRATOR")) return;
        
  let mention = role.mentionable;
  let hoist = role.hoist;
  let color = role.hexColor;
  let name = role.name;
  let perms = role.permissions;
  let position = role.position;
  role.guild.createRole({
    name: name,
    color: color,
    hoist: hoist,
    position: position,
    permissions: perms,
    mentionable: mention
  }).then(async rol => {
    
  guild.members.forEach(async u => {
  const dat = await require('quick.db').fetch(`${guild.id}.${role.id}.${u.id}`)
  if(dat) {

  guild.members.get(u.id).addRole(rol.id)
  }
    
  })
client.channels.get('741661572929290312').send(new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setTitle(`Bir rol silindi!`)
.setDescription(`${rol.name} isimli rol ${member} tarafından silindi ve bende tekrardan rolü oluşturdum, önceden role sahip olan tüm kişilere rolü geri verdim.`))
  })
  
})
//////////////////ULTRA GELİŞMİŞ ROL KORUMA SONU///////////////////!  ✩ rєч sчlvєstєr ᵇᵉˡˡᵃᵗʳᶤˣ ಡ#0107


//////////////////HOŞ GELDİN MESAJI BAŞI//////////////////////////!  ✩ rєч sчlvєstєr ᵇᵉˡˡᵃᵗʳᶤˣ ಡ#0107



client.on(`guildMemberAdd`, async member => {
var maze = new Discord.RichEmbed()
.setColor("GREEN")
.setTitle("<a:bellatrix5:741652269224689725> ***___Bir Yıldız'a ayak bastın!___*** <a:bellatrix5:741652269224689725>")
.setThumbnail(member.user.avatarURL)
.setImage("https://cdn.discordapp.com/attachments/741633554764660829/741795393116831825/giphy.gif")
.setDescription("  Hoşgeldin, "+ member +" \n\n   "+ member.guild.memberCount+" Kişi Arasında Sende Varsın. \n\n **ᵇᵉˡˡᵃᵗʳᶤˣ** Tagını Alarak İçeriye Girebilirsin.   ")
.addField(`:id: Üye ID:`, `${member.id}`, true)
.addField(`:octagonal_sign: Üye Adı`, `${member}`, true)
client.channels.get("741646195222511660").send(maze) 
});

//////////////////HOŞ GELDİN MESAJI SONU///////////////////!  ✩ rєч sчlvєstєr ᵇᵉˡˡᵃᵗʳᶤˣ ಡ#0107