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


client.on("message" , async message => {
  const msg = message;
  if(message.content.startsWith(ayarlar.prefix+"afk")) return; 
  /*db.set(`afkSebep_${message.author.id}_${message.guild.id}`, "Sebep Girilmemiş")
  db.set(`afkKisi_${message.author.id}_${message.guild.id}`, message.author.id)              Bunlar Afk Komutndaki İsimler /// tmm bakalım
  db.set(`afkAd_${message.author.id}_${message.guild.id}`, message.author.username)*/
  
  /*      const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("WoxeBot" , "https://cdn.discordapp.com/avatars/605781334438445057/495a33da25bc54f9c9dd1f5883da7409.png?size=2048")
      .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
       */
  
  let afk = message.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`)
  
  const isim = db.fetch(`afkAd_${message.author.id}_${message.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
   if(message.content.includes(kisi3)){
     const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("lluvia" , "Krallığı")
      .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
   }
 }
  if(message.author.id === kisi){
    const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("lluvia" , "Krallığı")
      .setDescription(`Afk'lıktan Çıktınız`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
   db.delete(`afkSebep_${message.author.id}_${message.guild.id}`)
   db.delete(`afkid_${message.author.id}_${message.guild.id}`)
   db.delete(`afkAd_${message.author.id}_${message.guild.id}`)
    message.member.setNickname(isim)
    
  }
  
})







client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length < 4) return;
  if (!db.fetch(`capslock_${msg.guild.id}`)) return;
  let caps = msg.content.toUpperCase();
  if (msg.content == caps) {
    if (msg.member.hasPermission("BAN_MEMBERS")) return;
    let yashinu =
      msg.mentions.users.first() ||
      msg.mentions.channels.first() ||
      msg.mentions.roles.first();
    if (
      !yashinu &&
      !msg.content.includes("@everyone") &&
      !msg.content.includes("@here")
    ) {
      msg.delete(50);
      return msg.channel
        .sendEmbed(
          new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setColor("RANDOM")
            .setDescription(`${msg.author} Fazla büyük harf kullanmamalısın!`)
        )
        .then(m => m.delete(5000));
    }
  }
});

// Main Dosyası


client.on("roleDelete", async role => {
  let ozellik = await db.fetch(`aktifs_${role.guild.id}`);

  if (!ozellik) return;

  role.guild.createRole({
    name: role.name,
    color: role.color,
    position: role.position,
    permissions: role.permissions
  });
});

client.on("guildMemberAdd", async member => {
  let djstürkiye = await db.get(`forceban_${member.guild.id}`);
  if (djstürkiye && djstürkiye.some(id => `k${member.user.id}` === id)) {
    try {
      await member.guild.owner.user.send(
        new Discord.RichEmbed()
          .setTimestamp()
          .setFooter(client.user.username + " Force Ban", client.user.avatarURL)
          .setDescription(
            `Bir kullanıcı **${member.guild.name}** adlı sunucuna girmeye çalıştı! Force banı olduğu için tekrar yasaklandı. \n**Kullanıcı:** ${member.user.id} | ${member.user.tag}`
          )
      );
      await member.user.send(
        new Discord.RichEmbed()
          .setTimestamp()
          .setFooter(client.user.username + " Force Ban", client.user.avatarURL)
          .setDescription(
            `**${member.guild.name}** sunucusundan force banlı olduğun için yasaklandın!`
          )
      );
      member.ban({ reason: "Forceban" });
    } catch (err) {
      console.log(err);
    }
  }
});




client.login(ayarlar.token);



 
////////////////////////////////////////////////////////////////////

  
 
   
       



 ;


 
    
    client.on('roleDelete', async (role) => {
  
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    const yetkili = await role.guild.members.get(entry.executor.id);
    const eskihali = role.permissions;
          console.log(eskihali)
   if (yetkili.id === "700144704607617038")return;                                                                               
             let embed = new Discord.RichEmbed()
             .setColor("BLACK")
             .setDescription(`<@${yetkili.id}> isimli kişi ${role.id} ID'li rolü sildi ve sahip olduğu tüm rolleri alarak, kendisine <@&700193067193597963> rolünü verdim.`)
             .setTimestamp()
             let roles = role.guild.members.get(yetkili.id).roles.array()
                    try {
                         role.guild.members.get(yetkili.id).removeRoles(roles)
                                                                            
                         }
              catch(err) {
                          console.log(err)
                         }
    setTimeout(function(){
                         role.guild.members.get(yetkili.id).addRole("700144704607617038")
                         role.guild.owner.send(embed)
                         }, 1500);

                  });
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



