const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require("quick.db");
const request = require("request");
const ms = require("parse-ms");
const express = require("express");
const http = require("http");
const app = express();
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
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
    } catch (e){
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
    } catch (e){
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
    } catch (e){
      reject(e);
    }
  });
};



app.listen(process.env.PORT);
app.get("/", (request, response) => {
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 5000);


// EDİTLE MUSTAFA
client.ayar = {
  "SunucuID": "Sunucunuzun ID",
  "SahipRolüID": "Sunucu sahibinin rolünün ID",
  "TeyitYetkilisi": "Teyit yetkilisi rolünün ID",
  "TeyitsizRolü": "Teyitsiz kişilerin rol ID",
  "TeyitKanal": "Sunucuya katılan kişilerin teyit edileceği kanalın ID",
  "ErkekÜye": "Erkek üyelere verilecek rolün ID",
  "KızÜye": "Kız üyelere verilecek rolün ID",
  "SohbetKanalID": "Sunucunuzun genel chat kanalının ID"
}


client.on("guildMemberAdd", async(member) => {
  try {
    await(member.addRole(client.ayar.TeyitsizRolü))
    await client.channels.get(client.ayar.TeyitKanal).send(`Sunucuya hoş geldin ${member}, seninle **${member.guild.memberCount}** kişiyiz! \n<@&${client.ayar.TeyitYetkilisi}> rolündeki yetkililer seninle ilgilenecektir.`)
  } catch(err) { }
})
// EDİT AT MUSTAFA

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Aleyküm selam,  hoş geldin ^^'); 
		} else {
		msg.reply('Aleyküm selam, hoş geldin ^^');
		}
	}
});


client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"));
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"));
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"));
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > sunucupaneli) {
      await db.set(`sunucupanel_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try {
      if(toplamuye) { toplamuye.setName(`Toplam Üye • ${member.guild.memberCount}`) }
      if(toplamaktif) { toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`) }
      if(botlar) { botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`) }
      if(rekoraktif) { rekoraktif.setName(`Rekor Aktiflik • ${sunucupaneli}`) }
   } catch(e) { };
  }
});
//Yashinu (Akame Owner)
client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"));
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"));
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"));
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > sunucupaneli) {
      await db.set(`sunucupanel_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try {
      if(toplamuye) { toplamuye.setName(`Toplam Üye • ${member.guild.memberCount}`) }
      if(toplamaktif) { toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`) }
      if(botlar) { botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`) }
      if(rekoraktif) { rekoraktif.setName(`Rekor Aktiflik • ${sunucupaneli}`) }
   } catch(e) { };
  }
});



client.on("guildBanAdd", async(guild, user) => {
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
  let yashinubanlimit = await db.fetch(`banlimit_${guild.id}`)
  let yashinukullanıcıban = await db.fetch(`banlimitkullanici_${guild.id}_${entry.executor.id}`)
  
    if(yashinubanlimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        if(entry.executor.bot) return
        await db.add(`banlimitkullanici_${guild.id}_${entry.executor.id}`, 1)
        //client.channels.get("LOG KANAL ID").send(`\`${user.id}\` - \`${user.tag}\` kişisi ${entry.executor} tarafından **${entry.reason ? entry.reason : "girilmedi"}** nedeni ile yasaklandı! \n${entry.executor} Banları: ${yashinukullanıcıban}`)
        //LOG Kanal varsa yukarıdaki satıra gerekli yere ID girip // kaldırabilirsiniz.
        if(yashinukullanıcıban >= yashinubanlimit) {
          //client.channels.get("LOG KANAL ID").send(`${entry.executor} kişisi ban limiti doldurdu ve rolü alındı!`)
          // LOG kanal varsa yukarıdaki satıra gerekli yere ID girip // kaldırabilirsiniz.
          try {
            guild.member(entry.executor).roles.filter(a => a.hasPermission('BAN_MEMBERS')).forEach(x => guild.member(entry.executor).removeRole(x.id))
            guild.owner.user.send(`Sunucundan bir yetkili ban limitine ulaştı ve ban yetkisi olan rolleri alındı! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)
          } catch(err) { }
          db.delete(`banlimitkullanici_${guild.id}_${entry.executor.id}`)
        }
      }
    }
})
// KAYIT KANALINDA REKLAM YAPILDIĞINDA MESAJ ATAR
client.on("message", async message => {
  var kayıt = await db.fetch(`${message.guild.id}.ayarlar.kayıt`);
  if (!kayıt) return;

  if (message.member.hasPermission("ADMINISTRATOR")) return;

  if (/(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(message.content)) {
    client.fetchInvite(message.content).then(invite => {
      var embed = new Discord.RichEmbed()
        .setTitle("Davet Linki Gönderildi")
        .addField("Sunucu Adı", invite.guild.name)
        .addField("Üye Sayısı",invite.guild.members.filter(m => m.user.presence.status === "online").size +"/" +invite.guild.memberCount)
        .addField("Kullanıcı", message.author.tag)
        .addField("Kanal", message.channel)
        .addField("Mesaj İçeriği", message.content)
        .setColor(client.ayarlar.renk);

      client.channels.get(kayıt).send(embed);
    });
  }
});


// GELİŞMİŞ LOG

client.on("messageDelete", async message => {
  let modlog = await db.fetch(`genelmodlog_${message.guild.id}`);
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField("**Eylem**", "Mesaj Silme")
  .addField("**Mesajın sahibi**", `<@${message.author.id}> === **${message.author.id}**`)
  .addField("**Mesajı silen kişi**", `<@${entry.executor.id}>`)
  .addField("**Mesaj**", `${message.content}`)
  .setTimestamp()
  .setFooter(`Sunucu: ${message.guild.name} - ${message.guild.id}`, message.guild.iconURL)
  .setThumbnail(message.guild.iconURL)
  .setColor("RANDOM")
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let modlog = await db.fetch(`genelmodlog_${oldMessage.guild.id}`);
  let embed = new Discord.RichEmbed()
  .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL)
  .addField("**Eylem**", "Mesaj Düzenleme")
  .addField("**Mesajın sahibi**", `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`)
  .addField("**Eski Mesajı**", `${oldMessage.content}`)
  .addField("**Yeni Mesajı**", `${newMessage.content}`)
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter(`Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`, oldMessage.guild.iconURL)
  .setThumbnail(oldMessage.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
});

client.on("channelCreate", async(channel) => {
let modlog = await db.fetch(`genelmodlog_${channel.guild.id}`);
  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  let kanal;
  if (channel.type === "text") kanal = `<#${channel.id}>`
  if (channel.type === "voice") kanal = `\`${channel.name}\``
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Kanal Oluşturma")
  .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)
  .addField("**Oluşturduğu Kanal**", `${kanal}`)
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL)
  .setThumbnail(channel.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
  })

client.on("channelDelete", async(channel) => {
let modlog = await db.fetch(`genelmodlog_${channel.guild.id}`);
  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Kanal Silme")
  .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)
  .addField("**Silinen Kanal**", `\`${channel.name}\``)
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL)
  .setThumbnail(channel.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
  })

client.on("channelUpdate", async(oldChannel, newChannel) => {
let modlog = await db.fetch(`genelmodlog_${oldChannel.guild.id}`);
  const entry = await oldChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Kanal Güncelleme")
  .addField("**Güncelleyen Kişi**", `<@${entry.executor.id}>`)
  .addField("**Güncellenmeden önceki kanal ismi**", `\`${oldChannel.name}\``)
  .addField("**Güncellendikten sonraki kanal ismi**", `\`${newChannel.name}\``)
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter(`Sunucu: ${oldChannel.guild.name} - ${oldChannel.guild.id}`, oldChannel.guild.iconURL)
  .setThumbnail(oldChannel.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
  })

client.on("roleCreate", async(role) => {
let modlog = await db.fetch(`genelmodlog_${role.guild.id}`);
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Rol Oluşturma")
  .addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)
  .addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)
  .setTimestamp()
  .setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)
  .setColor("RANDOM")
  .setThumbnail(role.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
  })

client.on("roleDelete", async(role) => {
let modlog = await db.fetch(`genelmodlog_${role.guild.id}`);
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Rol Silme")
  .addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)
  .addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)
  .setTimestamp()
  .setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)
  .setColor("RANDOM")
  .setThumbnail(role.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
  })

client.on("roleUpdate", async(oldRole, newRole) => {
  let modlog = await db.fetch(`genelmodlog_${oldRole.guild.id}`);
  const entry = await oldRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Rol Güncelleme")
  .addField("**Rolü güncelleyen kişi**", `<@${entry.executor.id}>`)
  .addField("**Güncellenen rol**", `<@&${oldRole.id}>`)
  .addField("**Güncellenmeden önceki rol ismi**", `\`${oldRole.name}\``)
  .addField("**Güncellendikten sonraki rol ismi**", `\`${newRole.name}\``)
  .setColor("RANDOM")
  .setTimestamp()
  .setFooter(`Sunucu: ${oldRole.guild.name} - ${oldRole.guild.id}`, oldRole.guild.iconURL)
  .setThumbnail(oldRole.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
})

client.on("emojiCreate", async(emoji) => {
  let modlog = await db.fetch(`genelmodlog_${emoji.guild.id}`);
  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Emoji Oluşturma")
  .addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)
  .addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)
  .setThumbnail(emoji.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
})
  client.on("emojiDelete", async(emoji) => {
  let modlog = await db.fetch(`genelmodlog_${emoji.guild.id}`);
  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Emoji Silme")
  .addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)
  .addField("**Silinen emoji**", `${emoji}`)
  .setTimestamp()
  .setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)
  .setColor("RANDOM")
  .setThumbnail(emoji.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {
  let modlog = await db.fetch(`genelmodlog_${oldEmoji.guild.id}`);
  const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Emoji Güncelleme")
  .addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)
  .addField("**Güncellenmeden önceki emoji**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)
  .addField("**Güncellendikten sonraki emoji**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)
  .setThumbnail(oldEmoji.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
})

client.on("guildUpdate", async(oldGuild, newGuild) => {
  let modlog = await db.fetch(`genelmodlog_${oldGuild.id}`);
  const entry = await oldGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Sunucu Güncelleme")
  .addField("**Sunucuyu güncelleyen kişi**", `<@${entry.executor.id}>`)
  .addField("**Güncellenmeden önceki sunucu özellikleri**", `**İsim:** \`${oldGuild.name}\`\n**Bölge:** \`${oldGuild.region.toUpperCase()}\`\n**Güvenlik seviyesi:** \`${oldGuild.verificationLevel}\``)
  .addField("**Güncellendikten sonraki sunucu özellikleri**", `**İsim:** \`${newGuild.name}\`\n**Bölge:** \`${newGuild.region.toUpperCase()}\`\n**Güvenlik seviyesi:** \`${newGuild.verificationLevel}\``)
  .setTimestamp()
  .setFooter(`Sunucu: ${oldGuild.name} - ${oldGuild.id}`, oldGuild.iconURL)
  .setColor("RANDOM")
  .setThumbnail(oldGuild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
})

client.on("voiceStateUpdate", async(oldMember, newMember) => {
let modlog = await db.fetch(`genelmodlog_${oldMember.guild.id}`);
 let embed = new Discord.RichEmbed()
.setAuthor(oldMember.user.username, oldMember.user.avatarURL)
 .addField("**Eylem**", "Ses kanalına girme/değiştirme")
 .addField("**Kanal değiştiren kişi**", `<@${oldMember.id}>`)
 .addField("**Şu anki bulunduğu kanal**", `${newMember.voiceChannel.name} - ${newMember.voiceChannel.id}`) 
 .setTimestamp()
  .setFooter(`Sunucu: ${oldMember.guild.name} - ${oldMember.guild.id}`, oldMember.guild.iconURL)
  .setColor("RANDOM")
  .setThumbnail(oldMember.guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
})

client.on("guildBanAdd", async(guild, user) => {
let modlog = await db.fetch(`genelmodlog_${guild.id}`);
  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Yasaklama")
  .addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)
  .addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)
  .addField("**Yasaklanma sebebi**", `${entry.reason}`)
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)
  .setThumbnail(guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
})

client.on("guildBanRemove", async(guild, user) => {
let modlog = await db.fetch(`genelmodlog_${guild.id}`);
  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setAuthor(entry.executor.username, entry.executor.avatarURL)
  .addField("**Eylem**", "Yasak kaldırma")
  .addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)
  .addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)
  .setThumbnail(guild.iconURL)
  client.channels.get(modlog).sendEmbed(embed)
})

// gelişmiş log

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);