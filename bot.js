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

// UPTİME DOCTORA EKLE

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

client.ayar = {
  SunucuID: "693604724221542472",
  SunucuTAG: "√",
  SahipRolüID: "693615832776835162",
  EkipRolü: "693615827135496262",
  EkipMesajKanalı: "696823598244954112"
};

client.on("guildMemberAdd", async member => {
  try {
    await member.addRole(client.ayar.TeyitsizRolü);
    await client.channels
      .get(client.ayar.TeyitKanal)
      .send(
        `<a:hyper:655810715503951893> Selam ${member} **Zedestergon Krallığına** Hoşgeldin!Senin ile Birlikte**__${member.guild.memberCount}__** Kişiyiz! \n<@&${client.ayar.TeyitYetkilisi}> rolündeki yetkililer seninle ilgilenecektir.`
      );
  } catch (err) {}
});
// EDİT AT JOSTMAN

client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("<a:sar:695305057075462147> **Aleyküm Selam Hoşgeldin**. <a:sar:695305057075462147>");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "!tag") {
    msg.channel.send("**✧**");
  }
});




client.on("guildBanAdd", async (guild, user) => {
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  let yashinubanlimit = await db.fetch(`banlimit_${guild.id}`);
  let yashinukullanıcıban = await db.fetch(
    `banlimitkullanici_${guild.id}_${entry.executor.id}`
  );

  if (yashinubanlimit) {
    if (entry.executor.id !== guild.owner.user.id) {
      if (entry.executor.bot) return;
      await db.add(`banlimitkullanici_${guild.id}_${entry.executor.id}`, 1);
      //client.channels.get("LOG KANAL ID").send(`\`${user.id}\` - \`${user.tag}\` kişisi ${entry.executor} tarafından **${entry.reason ? entry.reason : "girilmedi"}** nedeni ile yasaklandı! \n${entry.executor} Banları: ${yashinukullanıcıban}`)
      //LOG Kanal varsa yukarıdaki satıra gerekli yere ID girip // kaldırabilirsiniz.
      if (yashinukullanıcıban >= yashinubanlimit) {
        //client.channels.get("LOG KANAL ID").send(`${entry.executor} kişisi ban limiti doldurdu ve rolü alındı!`)
        // LOG kanal varsa yukarıdaki satıra gerekli yere ID girip // kaldırabilirsiniz.
        try {
          guild
            .member(entry.executor)
            .roles.filter(a => a.hasPermission("BAN_MEMBERS"))
            .forEach(x => guild.member(entry.executor).removeRole(x.id));
          guild.owner.user.send(
            `**Sunucundan bir yetkili ban limitine ulaştı ve ban yetkisi olan rolleri alındı! İşte bilgileri** => \n\n\`Kullanıcı:\`  ${
              entry.executor
            } | ${
              entry.executor.id
            } \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(
              entry.executor.createdAt
            ).format("DD/MM/YYYY | HH:mm:ss")} • **Sunucu:** ${moment(
              guild.member(entry.executor).joinedAt
            ).format("DD/MM/YYYY | HH:mm:ss")}`
          );
        } catch (err) {}
        db.delete(`banlimitkullanici_${guild.id}_${entry.executor.id}`);
      }
    }
  }
});
// KAYIT KANALINDA REKLAM YAPILDIĞINDA MESAJ ATAR

// GELİŞMİŞ LOG

client.on("messageDelete", async message => {
  let modlog = await db.fetch(`genelmodlog_${message.guild.id}`);
  const entry = await message.guild
    .fetchAuditLogs({ type: "MESSAGE_DELETE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField("**Eylem**", "Mesaj Silme")
    .addField(
      "**Mesajın sahibi**",
      `<@${message.author.id}> === **${message.author.id}**`
    )
    .addField("**Mesajı silen kişi**", `<@${entry.executor.id}>`)
    .addField("**Mesaj**", `${message.content}`)
    .setTimestamp()
    .setFooter(
      `Sunucu: ${message.guild.name} - ${message.guild.id}`,
      message.guild.iconURL
    )
    .setThumbnail(message.guild.iconURL)
    .setColor("RANDOM");
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let modlog = await db.fetch(`genelmodlog_${oldMessage.guild.id}`);
  let embed = new Discord.RichEmbed()
    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL)
    .addField("**Eylem**", "Mesaj Düzenleme")
    .addField(
      "**Mesajın sahibi**",
      `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`
    )
    .addField("**Eski Mesajı**", `${oldMessage.content}`)
    .addField("**Yeni Mesajı**", `${newMessage.content}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`,
      oldMessage.guild.iconURL
    )
    .setThumbnail(oldMessage.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("channelCreate", async channel => {
  let modlog = await db.fetch(`genelmodlog_${channel.guild.id}`);
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());
  let kanal;
  if (channel.type === "text") kanal = `<#${channel.id}>`;
  if (channel.type === "voice") kanal = `\`${channel.name}\``;
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Kanal Oluşturma")
    .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)
    .addField("**Oluşturduğu Kanal**", `${kanal}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL
    )
    .setThumbnail(channel.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("channelDelete", async channel => {
  let modlog = await db.fetch(`genelmodlog_${channel.guild.id}`);
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Kanal Silme")
    .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)
    .addField("**Silinen Kanal**", `\`${channel.name}\``)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL
    )
    .setThumbnail(channel.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
  let modlog = await db.fetch(`genelmodlog_${oldChannel.guild.id}`);
  const entry = await oldChannel.guild
    .fetchAuditLogs({ type: "CHANNEL_UPDATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Kanal Güncelleme")
    .addField("**Güncelleyen Kişi**", `<@${entry.executor.id}>`)
    .addField("**Güncellenmeden önceki kanal ismi**", `\`${oldChannel.name}\``)
    .addField(
      "**Güncellendikten sonraki kanal ismi**",
      `\`${newChannel.name}\``
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${oldChannel.guild.name} - ${oldChannel.guild.id}`,
      oldChannel.guild.iconURL
    )
    .setThumbnail(oldChannel.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("roleCreate", async role => {
  let modlog = await db.fetch(`genelmodlog_${role.guild.id}`);
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Rol Oluşturma")
    .addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)
    .addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)
    .setTimestamp()
    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )
    .setColor("RANDOM")
    .setThumbnail(role.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("roleDelete", async role => {
  let modlog = await db.fetch(`genelmodlog_${role.guild.id}`);
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Rol Silme")
    .addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)
    .addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)
    .setTimestamp()
    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )
    .setColor("RANDOM")
    .setThumbnail(role.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("roleUpdate", async (oldRole, newRole) => {
  let modlog = await db.fetch(`genelmodlog_${oldRole.guild.id}`);
  const entry = await oldRole.guild
    .fetchAuditLogs({ type: "ROLE_UPDATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Rol Güncelleme")
    .addField("**Rolü güncelleyen kişi**", `<@${entry.executor.id}>`)
    .addField("**Güncellenen rol**", `<@&${oldRole.id}>`)
    .addField("**Güncellenmeden önceki rol ismi**", `\`${oldRole.name}\``)
    .addField("**Güncellendikten sonraki rol ismi**", `\`${newRole.name}\``)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(
      `Sunucu: ${oldRole.guild.name} - ${oldRole.guild.id}`,
      oldRole.guild.iconURL
    )
    .setThumbnail(oldRole.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("emojiCreate", async emoji => {
  let modlog = await db.fetch(`genelmodlog_${emoji.guild.id}`);
  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Emoji Oluşturma")
    .addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)
    .addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )
    .setThumbnail(emoji.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});
client.on("emojiDelete", async emoji => {
  let modlog = await db.fetch(`genelmodlog_${emoji.guild.id}`);
  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_DELETE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Emoji Silme")
    .addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)
    .addField("**Silinen emoji**", `${emoji}`)
    .setTimestamp()
    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )
    .setColor("RANDOM")
    .setThumbnail(emoji.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let modlog = await db.fetch(`genelmodlog_${oldEmoji.guild.id}`);
  const entry = await oldEmoji.guild
    .fetchAuditLogs({ type: "EMOJI_UPDATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Emoji Güncelleme")
    .addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)
    .addField(
      "**Güncellenmeden önceki emoji**",
      `${oldEmoji} - İsmi: \`${oldEmoji.name}\``
    )
    .addField(
      "**Güncellendikten sonraki emoji**",
      `${newEmoji} - İsmi: \`${newEmoji.name}\``
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`,
      oldEmoji.guild.iconURL
    )
    .setThumbnail(oldEmoji.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("guildUpdate", async (oldGuild, newGuild) => {
  let modlog = await db.fetch(`genelmodlog_${oldGuild.id}`);
  const entry = await oldGuild
    .fetchAuditLogs({ type: "GUILD_UPDATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL)
    .addField("**Eylem**", "Sunucu Güncelleme")
    .addField("**Sunucuyu güncelleyen kişi**", `<@${entry.executor.id}>`)
    .addField(
      "**Güncellenmeden önceki sunucu özellikleri**",
      `**İsim:** \`${
        oldGuild.name
      }\`\n**Bölge:** \`${oldGuild.region.toUpperCase()}\`\n**Güvenlik seviyesi:** \`${
        oldGuild.verificationLevel
      }\``
    )
    .addField(
      "**Güncellendikten sonraki sunucu özellikleri**",
      `**İsim:** \`${
        newGuild.name
      }\`\n**Bölge:** \`${newGuild.region.toUpperCase()}\`\n**Güvenlik seviyesi:** \`${
        newGuild.verificationLevel
      }\``
    )
    .setTimestamp()
    .setFooter(`Sunucu: ${oldGuild.name} - ${oldGuild.id}`, oldGuild.iconURL)
    .setColor("RANDOM")
    .setThumbnail(oldGuild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
});

client.on("voiceStateUpdate", async (oldMember, newMember) => {
  let modlog = await db.fetch(`genelmodlog_${oldMember.guild.id}`);
  let embed = new Discord.RichEmbed()
    .setAuthor(oldMember.user.username, oldMember.user.avatarURL)
    .addField("**Eylem**", "Ses kanalına girme/değiştirme")
    .addField("**Kanal değiştiren kişi**", `<@${oldMember.id}>`)
    .addField(
      "**Şu anki bulunduğu kanal**",
      `${newMember.voiceChannel.name} - ${newMember.voiceChannel.id}`
    )
    .setTimestamp()
    .setFooter(
      `Sunucu: ${oldMember.guild.name} - ${oldMember.guild.id}`,
      oldMember.guild.iconURL
    )
    .setColor("RANDOM")
    .setThumbnail(oldMember.guild.iconURL);
  client.channels.get(modlog).sendEmbed(embed);
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

client.on("userUpdate", async function(oldUser, newUser) {
  if (oldUser.username === newUser.username) return;
  if (!client.guilds.get(client.ayar.SunucuID).members.has(newUser.id)) return;

  // Rol vermesi
  if (
    newUser.username.includes(client.ayar.SunucuTAG) &&
    !client.guilds
      .get(client.ayar.SunucuID)
      .member(newUser)
      .roles.has(client.ayar.EkipRolü)
  ) {
    if (
      client.guilds
        .get(client.ayar.SunucuID)
        .member(newUser)
        .roles.has(client.ayar.TeyitsizRolü) ||
      client.guilds
        .get(client.ayar.SunucuID)
        .member(newUser)
        .roles.has(client.ayar.TehlikeliHesapRolü)
    )
      return;
    client.guilds
      .get(client.ayar.SunucuID)
      .member(newUser)
      .addRole(client.ayar.EkipRolü); // KİŞİ TAGI ALINCA BELİRLENEN ROLÜ VERECEK
    if (
      client.guilds
        .get(client.ayar.SunucuID)
        .channels.has(client.ayar.EkipMesajKanalı)
    ) {
      client.guilds
        .get(client.ayar.SunucuID)
        .channels.get(client.ayar.EkipMesajKanalı)
        .send(
          `**<a:mor:695305049114542102> Ailemize ${newUser},katıldı! Herkes bi Ailemize Katılanı Selamlasın <a:siyah:694927370292822090>**!`
        );
      newUser.send(
        `**<a:mor:695305049114542102> Selam Kanka Ailemize Hoşgeldin. Şuandan itibaren invite yapmaya başlarsan yetkili olabilirsin ee ne duruyorsun başlasana <a:siyah:694927370292822090>**`
      );
    }
  }

  // Rol Alması
  if (
    !newUser.username.includes(client.ayar.SunucuTAG) &&
    client.guilds
      .get(client.ayar.SunucuID)
      .member(newUser)
      .roles.has(client.ayar.EkipRolü)
  ) {
    client.guilds
      .get(client.ayar.SunucuID)
      .member(newUser)
      .removeRole(client.ayar.EkipRolü); // KİŞİ TAGI BIRAKINCA BELİRLENEN ROLÜ ALACAK
    if (
      client.guilds
        .get(client.ayar.SunucuID)
        .channels.has(client.ayar.EkipMesajKanalı)
    ) {
      client.guilds
        .get(client.ayar.SunucuID)
        .channels.get(client.ayar.EkipMesajKanalı)
        .send(`<a:mor:695305049114542102>**Ailemizden ${newUser},Ayrıldı. Bu Bizi Çok Üzdü <a:mor:695305049114542102>** `);
      newUser.send(
        `**<a:mor:695305049114542102> Kanka Ailemizden Ayrıldın bizi Çok Üzdün :( Ama İstersen Gene Gelebilirsin **√** Görüşürüz <3 **`
      );
    }
  }
});

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

const { RichEmbed } = require("discord.js");
client.on("message", async message => {
  if (!message.guild) return;
  if (message.member.hasPermission("MANAGE_GUILD")) return;
  if (message.mentions.users.size >= 3) {
    if (message.deletable) message.delete();
    message.channel.send(
      `Hey ${message.author}, sürekli birilerini etiketlemek kötüdür. ${message.author} bir daha devam etme. ${message.author} ${message.author} ${message.author}`
    );
    message.author.send(
      `Hey ${message.author}, sürekli birilerini etiketlemek kötüdür. ${message.author} bir daha devam etme. ${message.author} ${message.author} ${message.author}`
    );
  }
});

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

client.on("guildMemberAdd", member => {
  member.setNickname("√ • İsim  ");
});

client.on("guildMemberAdd", member => {
  member.send(
    `**<a:mor:695305049114542102> √alerian'a hoşgeldin.'** ${member} 
**<a:mor:695305049114542102> Umarım keyifli vakit geçirirsin.** 
**<a:mor:695305049114542102> Tagımızı alarak ailemize katılabilirsin.** 
**<a:mor:695305049114542102> Tagımızı öğrenmek için herhangi bir metin kanalına v!tag yazarak ulaşabilirsin.** 
**<a:mor:695305049114542102> İyi eğlenceler...**`
  );
});

client.login(ayarlar.token);



 
////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd', async member => {
  let user = client.users.get(member.id);
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  let halil = client.channels.get('696823548081340456')//kanal id
  
 const mapping = {
  " ": "   ",
 "0": "<a:zero:695241570428911630>",
  "1": "<a:one:695241567803277322>",
  "2": "<a:two:695241570626043998>",
  "3": "<a:three:695241570626306068>",
  "4": "<a:four:695241569846034433>",
  "5": "<a:five:695241572077404201>",
  "6": "<a:six:695241572551360572>",
  "7": "<a:seven:695241572450697216>",
  "8": "<a:eight:695241575415939132>",
  "9": "<a:nine:695241576061861969>",
  "!": "grey_exclamation",
  "?": "grey_question",
  "#": "hash",
  "*": "asterisk"
};

let afa = member.guild.memberCount

let ab =  
    `${afa}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
  
  
let a = moment.utc(member.guild.members.get(user.id).user.createdAt).format('**YYYY** [Yılında] MMMM [Ayında] dddd [Gününde] (**DD/MM/YYYY**)')
        .replace("Monday", `**Pazartesi**`)
        .replace("Tuesday", `**Salı**`)
        .replace("Wednesday", `**Çarşamba**`)
        .replace("Thursday", `**Perşembe**`)
        .replace("Friday", `**Cuma**`)
        .replace("Saturday", `**Cumartesi**`)
        .replace("Sunday", `**Pazar**`)
        .replace("January", `**Ocak**`)
        .replace("February", `**Şubat**`)
        .replace("March", `**Mart**`)
        .replace("April", `**Nisan**`)
        .replace("May", `**Mayıs**`)
        .replace("June", `**Haziran**`)
        .replace("July", `**Temmuz**`)
        .replace("August", `**Ağustos**`)
        .replace("September", `**Eylül**`)
        .replace("October", `**Ekim**`)
        .replace("November", `**Kasım**`)
        .replace("December", `**Aralık**`)
  
    var kontrol;
    if (kurulus < 2629800000) kontrol = ' '
    if (kurulus > 2629800000) kontrol = ` ** <a:siyah:694927370292822090> Hoşgeldin <@!${member.id}> Seninle birlikte** **${ab}** **kişiyiz.**\n\n**<a:siyah:694927370292822090>  Sunucuya Kayıt Olmak için Ses Teyit odasına geçebilirsin.** \n\n** <a:siyah:694927370292822090> <@&693660564173357116>   Rolündekilerini Etiketleyip Kayıt Olabilirsin. \n\n ** **<a:siyah:694927370292822090> Ses Odalarına Girmeden Kayıt İşlemin Olmaz.** \n\n **<a:siyah:694927370292822090> Tagımızı Alarak Destek Olabilirsin. **`  
  halil.send(`${kontrol}`)

  
  client.on('message', message => {
    if (message.content === prefix + "sunucubilgi") {
        const embed = new Discord.RichEmbed()
            .addField ("<a:mor:695305049114542102> Sunucu Adı", message.guild.name, true)
        
        
            
                               .addField ("<a:mor:695305049114542102> Sunucu ID <a:mor:695305049114542102>", message.guild.id, true)
        
        
        
                       .addField ("<a:mor:695305049114542102> Sunucu Sahibi <a:mor:695305049114542102>", message.guild.owner)
        
        
        
                           .addField ("<a:mor:695305049114542102> Toplam Üye Sayısı <a:mor:695305049114542102>", message.guild.memberCount)
        
        
        
              .addField ("<a:yangn:695305024179273738> Olusturma Tarihi <a:yangn:695305024179273738>", message.guild.createdAt)
        
        
            .setColor(0x000001)
        return message.channel.sendEmbed(embed)
    }   
});

})
 ;