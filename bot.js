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



client.on("userUpdate", async (eski, yeni) => {
  var sunucu = client.guilds.get('741633554764660826'); // Buraya Sunucu ID
  var uye = sunucu.members.get(yeni.id);
  var normalTag = "⋆"; // Buraya Normal Tag (Yoksa boş bırakın)
  var ekipTag = "☆"; // Sunucunun Tagı
  var ekipRolü = "741651661679886346"; // Tagın Rol IDsi
  var logKanali = "741661572929290312"; // Loglanacağı Kanalın ID

  if (!sunucu.members.has(yeni.id) || yeni.bot || eski.username === yeni.username) return;
  
  if ((yeni.username).includes(ekipTag) && !uye.roles.has(ekipRolü)) {
    try {
      await uye.addRole(ekipRolü);
      await uye.setNickname((uye.displayName).replace(normalTag, ekipTag));
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.get(logKanali).send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(ekipTag) && uye.roles.has(ekipRolü)) {
    try {
      await uye.removeRoles(uye.roles.filter(rol => rol.position >= sunucu.roles.get(ekipRolü).position));
      await uye.setNickname((uye.displayName).replace(ekipTag, normalTag));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${ekipTag}**`);
      await client.channels.get(logKanali).send(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
    } catch(err) { console.error(err) };
  };
});

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







  
  
  
  
  
  client.on('channelDelete', channel => {
  let kategoriID = channel.parentID;
  channel.clone(this.name, true, true).then(z => {
      let ganal = z.guild.channels.find(name => name.name === z.name)
      ganal.setParent(ganal.guild.channels.find(channel => channel.id === kategoriID))
     ganal.send(`**Bu kanal silindi ve kanal koruma sistemi sayesinde başarıyla tekrardan açıldı! **\n**Kanalın adı, kanalın konusu, kanalın kategorisi, kanalın izinleri başarıyla ayarlandı. **`);
                           
  });
});



var uyarilar = {};

client.on("message", async message => {
  if (!message.guild || !message.member || message.author.bot || !message.content || message.member.hasPermission("ADMINISTRATOR")) return;
  let mesajIcerik = message.content.replace(/[^a-zA-ZığüşöçĞÜŞİÖÇ]+/g, "");
  if (mesajIcerik === mesajIcerik.toUpperCase()) {
    uyarilar[message.author.id] = uyarilar[message.author.id] ? Number(uyarilar[message.author.id])+1 : 1;
    message.delete(200);
    message.channel.send(new Discord.RichEmbed().setDescription(`${message.author} büyük harf kullanmamlısın! (${uyarilar[message.author.id]})`));
    if (uyarilar[message.author.id] >= 5) {
      message.member.addRole('741641795867246612');
      message.author.send(`${message.guild.name} sunucusunda fazla büyük harf kullandığın için susturuldun!`);
      uyarilar[message.author.id] = 0;
      setTimeout(() => {
        message.member.removeRole('741641795867246612');
        message.author.send(`Susturulman bitti artık konuşabilirsin!`);
      }, 5*60*1000);
    };
  };
});



client.on("guildBanAdd", async (guild, user) => {
  let modlog = await db.fetch(`genelmodlog_${guild.id}`);
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Yasaklama")
    .addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)
    .addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)
    .addField("**Yasaklanma sebebi**", `${entry.reason}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)
    .setThumbnail(guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  let modlog = await db.fetch(`genelmodlog_${guild.id}`);
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Yasak kaldırma")
    .addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)
    .addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)
    .setThumbnail(guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

// gelişmiş log

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

// TAG SİSTEMİ OTO EDİTLENECEK


client.on("guildMemberAdd", async member => {
  let otobotban = await db.fetch(`otobotban_${member.guild.id}`);
  if (otobotban) {
    if (member.user.bot) {
      member.guild.ban(member.user, {
        reason: "Otomatik-BotBanlama Koruması "
      });
    }
  }
});




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









client.login(ayarlar.token);



 
////////////////////////////////////////////////////////////////////

  
 
   
       



 ;


 
    
  
client.on("roleUpdate", async function(oldRole, newRole) {
 
   const bilgilendir = await newRole.guild.fetchAuditLogs({type: "ROLE_UPLATE"}).then(hatırla => hatırla.entries.first())
    let yapanad= bilgilendir.executor;
  let idler= bilgilendir.executor.id;
  if(idler === "305943092056293376") return // yapan kişinin id si bu ise bir şey yapma
  if(oldRole.hasPermission("ADMINISTRATOR")) return
 
   setTimeout(() => {

     if(newRole.hasPermission("ADMINISTRATOR")){
   newRole.setPermissions((newRole.permissions-8))   
 }
    
 if(newRole.hasPermission("ADMINISTRATOR")){
 
     if(!client.guilds.get(newRole.guild.id).channels.has("305943092056293376")) return newRole.guild.owner.send(`Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi** Alındı. \Rol: **${newRole.name}**`)//bu id ye sahip kanal yoksa sunucu sahibine yaz

  client.channels.get("741661572929290312").send(`Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi Alındı**. \Rol: **${newRole.name}**`)// belirtilen id ye sahip kanala yaz
 }
      }, 1000)
  });



