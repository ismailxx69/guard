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
  SunucuID: "700144704506953829",
  SunucuTAG: "ㄨ",
  SahipRolüID: "305943092056293376",
  EkipRolü: "700144704569999516",
  EkipMesajKanalı: "700144705710719023"
};


// EDİT AT JOSTMAN

client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply(" **Aleyküm Selam Hoşgeldin**. <a:ruby:700178986399039579>");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "a!tag") {
    msg.channel.send("**<a:kng:700179035367669781>           ㄨ           <a:kng:700179035367669781>**");
  
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
          `**<a:kawai:700187908094689320> Ailemize ${newUser},katıldı! Hoş geldin dostum, umarım ayrılmazsın. <a:kawai:700187908094689320>**`
        );
      newUser.send(
        `**<a:sonsuzluk:700188245555937311> Selam Kanka Ailemize Hoşgeldin. Şuandan itibaren invite yapmaya başlarsan yetkili olabilirsin ee ne duruyorsun başlasana <a:sonsuzluk:700188245555937311>**`
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
        .send(`**Ailemizden ${newUser},Ayrıldı. Olsun, yine de seni seviyoruz. ** `);
      newUser.send(
        `** Kanka Ailemizden Ayrıldın bizi Çok Üzdün  Ama İstersen Gene Gelebilirsin **ㄨ** Görüşürüz  **`
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
  member.setNickname("ㄨ • İsminizi Belirtin Lütfen  ");
});

client.on("guildMemberAdd", member => {
 const embed = new Discord.RichEmbed()


  member.send(
    `**<a:sonsuzluk:700188245555937311> ㄨΛURORΛ'a hoşgeldin.'** ${member} 
**<a:sonsuzluk:700188245555937311> ㄨ Çok eğleneceğinden hiç şüphem yok.** 
**<a:sonsuzluk:700188245555937311> ㄨ Tagımızı alarak bize destek olabilirsin.** 
**<a:sonsuzluk:700188245555937311> ㄨ Yetkili alımlarımız kısa süreliğine açık. ** 
**<a:adsads:700178941008412672> ㄨΛURORΛ Ekibi. <a:adsads:700178941008412672>**`
     )
    
  ;
});

client.login(ayarlar.token);



 
////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd', member => { 
 let aylartoplam = {
        "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs",
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",
        "09": "Eylül",
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
  }
 let aylar = aylartoplam 
  let yetkilirol = "700144704578125920"
let user = client.users.get(member.id);
require("moment-duration-format");

    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")
    var kontrol;
    if (gün < 7) kontrol = 'Güvenilir Değil!'//Bu Kısımları İstediğiniz Gibi Değişebilirsiniz
    if (gün > 7) kontrol = 'Güvenilir Gözüküyor!' // Bu Kısımları İstediğiniz Gibi Değişebilirsiniz
  let kanal = "700648241691361290"  ////Mesajın Gönderilicek Kanal id
  const baran = new baran('https://im3.ezgif.com/tmp/ezgif-3-ee1e001bc457.gif'); ///// Buraya Fotoğraf Linki Koyabilirsiniz 
        member.guild.channels.get(kanal).send(baran)
  if(!kanal) return
  //`${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}`)
 member.guild.channels.get(kanal).send(`**Hoşgeldin ${member} seninle ${member.guild.memberCount || "DiscordAPI Hatası."} kişiyiz!\n Kaydının yapılması için sesli odaya gelip ses vermen gerekli.\n Hesap Kuruluş Zamanı: ${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')} \n Bu Kullanıcı: ${kontrol}\n <&${yetkilirol}> Rolündeki yetkililer seninle ilgilenecektir.`)
})


         
         
         
         
  
 
   
      
;


 ;

client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let arole = otorole[member.guild.id].sayi;
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("Otorol Sistemi")
    .setDescription(
      `  @${member.user.tag}'a Otorol Verildi `
    )
    .setColor("GREEN")
    .setFooter("Harmony ", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      ` Hoşgeldin ``${member.user.tag}`` Rolün Başarıyla Verildi.`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
 
    
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
 
     if(!client.guilds.get(newRole.guild.id).channels.has("698061827191603221")) return newRole.guild.owner.send(`Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi** Alındı. \Rol: **${newRole.name}**`)//bu id ye sahip kanal yoksa sunucu sahibine yaz

  client.channels.get("305943092056293376").send(`Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi Alındı**. \Rol: **${newRole.name}**`)// belirtilen id ye sahip kanala yaz
 }
      }, 1000)
  });
client.on('channelDelete', channel => {
  if (channel.guild.id == '693604724221542472') {
    let rol = channel.guild.roles.get('697395844571201686')
    let rol2 = channel.guild.roles.get('693658509190889484')
    let rol3 = channel.guild.roles.get('693615821083246603')
    let rol4 = channel.guild.roles.get('695066275688480788')
    let rol5 = channel.guild.roles.get('693615822559641671')
    let rol6 = channel.guild.roles.get('695809278123966514')
    let rol7 = channel.guild.roles.get('693615822551253126')
    let rol8 = channel.guild.roles.get('693615821490094100')
    let rol9 = channel.guild.roles.get('693615823713206313')
    let rol10 = channel.guild.roles.get('693660564173357116')
    
channel.guild.members.map(m => {
    m.removeRole(rol)
    m.removeRole(rol2)
    m.removeRole(rol3)
    m.removeRole(rol4)
    m.removeRole(rol5)
    m.removeRole(rol6)
    m.removeRole(rol7)
    m.removeRole(rol8)
    m.removeRole(rol9)
    m.removeRole(rol10)  
})
}
})
  
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = async role => {
  const kanal = role.guild.channels.get("698061827191603221").id;
  if (!kanal) return;
  const guild = role.guild;
  const audit = await guild.fetchAuditLogs({ limit: 1 });
    const entry = await audit.entries.first();
let bot = '[Bot]';
    if (!entry.executor.bot) bot = '';
  const embed = await new Discord.RichEmbed()
        .setTitle('**Role Deleted**')
        .addField('Role', `@${role.name}\n\`${role.id}\``, true)
        .addField('Deleted by', `\`\`${entry.executor.tag} ${bot}\`\`\n\`${entry.executor.id}\``, true)
        .setFooter('Time of Action')
        .setTimestamp(Date.now())
        .setColor("RANDOM");
 let log = role.guild.channels.find( channel => channel.name === "modd-log");
 log.send("<@"+entry.executor.id+"> isimli kullanici bir rolü sildi ve yetkilerini aldim.")
role.guild.members.get(entry.executor.id).roles.forEach(r => {
role.guild.members.get(entry.executor.id).removeRole(r)
console.log("rolleralindi")

})
};  }
client.on('ready', ()=>{
client.channels.get('696823598244954112').join()
});
client.on('message', message => {
     if(!message.channel.guild) return;
                if(message.content.startsWith('!say')) {


    if (message.author.bot) return;
    let i = 1;
  var tagdakiler = 0;
  let tag = "√";
  message.guild.members.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler+1
    }
  })
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');             
      let count = 0;
for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      const emoji = client.emojis.find(emoji => emoji.name === "tik");
  const kawinembed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor('Bilgi', `${message.author.displayAvatarURL}`)
        .addField(`Ses kanallarında;`, `**${count}** kişi bulunmaktadır. :heart:`)
        .addField(`Sunucuda ise;`, `**${message.guild.memberCount}** kişi bulunmaktadır. :heart:`)
        .addField(`Tag da ise;`, "**" + tagdakiler + "** kişi bulunmaktadır. :heart:")
        .setThumbnail("https://media.giphy.com/media/WQCZOWThKC8mlgx31G/giphy.gif")
        .setTimestamp()
        .setImage(``)
 
  message.channel.sendEmbed(kawinembed)
  message.react(emoji)
        
}

});
client.on('message', async message => {
 
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
 
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
 
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`:x: **${message.author.tag}** adlı kullanıcı artık AFK degil...`)
      db.delete(`afk_${message.author.id}`)
    }
    if (afkkullanıcı) return message.channel.send(`:x: **${kullanıcı.tag}** şu anda AFK.\n Sebep : **${sebep}**`)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`:x: **${message.author.tag}** adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
  }
  
});


client.login(ayarlar.token);
 //küfürebgel
 client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
    let i = await db.fetch(`küfürE_${msg.channel.id}`)
      //
    if (i == 'aktif') {
        const kufur = ["abaza","abazan","aq","ağzınasıçayım","ahmak","am","amarım","ambiti","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","amcıkhoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoy","amınakoyarım","amınakoyayım","amınakoyim","amınakoyyim","amınas","amınasikem","amınasokam","amınferyadı","amını","amınıs","amınoglu","amınoğlu","amınoğli","amısına","amısını","amina","aminakoyarim","aminakoyayım","aminakoyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","aminoglu","amiyum","amk","amkafa","amkçocuğu","amlarnzn","amlı","amm","amna","amnda","amndaki","amngtn","amnn","amq","amsız","amsiz","amuna","ana","anaaann","anal","anan","anana","anandan","ananı","ananı","ananın","ananınam","ananınamı","ananındölü","ananınki","ananısikerim","ananısikerim","ananısikeyim","ananısikeyim","ananızın","ananızınam","anani","ananin","ananisikerim","ananisikerim","ananisikeyim","ananisikeyim","anann","ananz","anas","anasını","anasınınam","anasıorospu","anasi","anasinin","angut","anneni","annenin","annesiz","aptal","aq","a.q","a.q.","aq.","atkafası","atmık","avrat","babaannesikaşar","babanı","babanın","babani","babasıpezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bitch","bok","boka","bokbok","bokça","bokkkumu","boklar","boktan","boku","bokubokuna","bokum","bombok","boner","bosalmak","boşalmak","çük","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dölü","eben","ebeni","ebenin","ebeninki","ecdadını","ecdadini","embesil","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","geber","geberik","gebermek","gebermiş","gebertir","gerızekalı","gerizekalı","gerizekali","gerzek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","göt","götdeliği","götherif","götlalesi","götlek","götoğlanı","götoğlanı","götoş","götten","götü","götün","götüne","götünekoyim","götünekoyim","götünü","götveren","götveren","götverir","gtveren","hasiktir","hassikome","hassiktir","hassiktir","hassittir","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnesi","ipne","itoğluit","kahpe","kahpenin","kaka","kaltak","kancık","kancik","kappe","kavat","kavatn","kocagöt","koduğmunun","kodumun","kodumunun","koduumun","mal","malafat","malak","manyak","meme","memelerini","oc","ocuu","ocuun","0Ç","o.çocuğu","orosbucocuu","orospu","orospucocugu","orospuçoc","orospuçocuğu","orospuçocuğudur","orospuçocukları","orospudur","orospular","orospunun","orospununevladı","orospuydu","orospuyuz","orrospu","oruspu","oruspuçocuğu","oruspuçocuğu","osbir","öküz","penis","pezevek","pezeven","pezeveng","pezevengi","pezevenginevladı","pezevenk","pezo","pic","pici","picler","piç","piçinoğlu","piçkurusu","piçler","pipi","pisliktir","porno","pussy","puşt","puşttur","s1kerim","s1kerm","s1krm","sakso","salaak","salak","serefsiz","sexs","sıçarım","sıçtığım","sıkecem","sicarsin","sie","sik","sikdi","sikdiğim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinler","siksiz","siksok","siksz","sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktir","siktiret","siktirgit","siktirgit","siktirir","siktiririm","siktiriyor","siktirlan","siktirolgit","sittimin","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülalenizi","tasak","tassak","taşak","taşşak","s.k","s.keyim","vajina","vajinanı","xikeyim","yaaraaa","yalarım","yalarun","orospi","orospinin","orospının","orospı","yaraaam","yarak","yaraksız","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yrrak","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiin","ağzına","am","mk","amcık","amcıkağız","amcıkları","amık","amın","amına","amınakoyim","amınoğlu","amina","amini","amk","amq","anan","ananı","ananızı","ananizi","aminizi","aminii","avradını","avradini","anasını","b.k","bok","boktan","boşluk","dalyarak","dasak","dassak","daşak","daşşak","daşşaksız","durum","ensest","erotik","fahişe","fuck","g*t","g*tü","g*tün","g*tüne","g.t","gavat","gay","gerızekalıdır","gerizekalı","gerizekalıdır","got","gotunu","gotuze","göt","götü","götüne","götünü","götünüze","götüyle","götveren","götvern","guat","hasiktir","hasiktr","hastir","i.ne","ibne","ibneler","ibneliği","ipne","ipneler","it","iti","itler","kavat","kıç","kıro","kromusunuz","kromusunuz","lezle","lezler","nah","o.ç","oç.","okuz","orosbu","orospu","orospucocugu","orospular","otusbir","otuzbir","öküz","penis","pezevenk","pezevenkler","pezo","pic","piç","piçi","piçinin","piçler","pis","pok","pokunu","porn","porno","puşt","sex","s.tir","sakso","salak","sanane","sanane","sçkik","seks","serefsiz","serefsz","serefszler","sex","sıçmak","sıkerım","sıkm","sıktır","si.çmak","sicmak","sicti","sik","sikenin","siker","sikerim","sikerler","sikert","sikertirler","sikertmek","sikeyim","sikicem","sikiim","sikik","sikim","sikime","sikimi","sikiş","sikişken","sikişmek","sikm","sikmeyi","siksinler","siktiğim","siktimin","siktin","siktirgit","siktir","siktirgit","siktirsin","siqem","skiym","skm","skrm","sktim","sktir","sktirsin","sktr","sktroradan","sktrsn","snane","sokacak","sokarim","sokayım","sülaleni","şerefsiz","şerefsizler","şerefsizlerin","şerefsizlik","tasak","tassak","taşak","taşşak","travesti","yarak","yark","yarrağım","yarrak","yarramın","yarrk","yavşak","yrak","yrk","ebenin","ezik","o.ç.","orospu","öküz","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sperm","bok","aq","a.q.","amk","am","amına","ebenin","ezik","fahişe","gavat","gavurundölü","gerizekalı","göte","götü","götüne","götünü","lan","mal","o.ç.","orospu","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikilmiş","siktir","sperm","taşak","totoş","yarak","yarrak","bok","aq","a.q.","amk","am","ebenin","fahişe","gavat","gerizakalı","gerizekalı","göt","göte","götü","götüne","götsün","piçsin","götsünüz","piçsiniz","götünüze","kıçınız","kıçınıza","götünü","hayvan","ibne","ipne","kahpe","kaltak","lan","mal","o.c","oc","manyak","o.ç.","oç","orospu","öküz","pezevenk","piç","puşt","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikiim","siktim","siki","sikilmiş","siktir","siktir","sperm","şerefsiz","taşak","totoş","yarak","yarrak","yosma","aq","a.q.","amk","amına","amınakoyim","amina","ammına","amna","sikim","sikiym","sikeyim","siktr","kodumun","amık","sikem","sikim","sikiym","s.iktm","s.ikerim","s.ktir","amg","am.k","a.mk","amık","rakı","rak","oruspu","oc","ananın","ananınki","bacının","bacını","babanın","sike","skim","skem","amcık","şerefsiz","piç","piçinoğlu","amcıkhoşafı","amınasokam","amkçocuğu","amınferyadı","amınoglu","piçler","sikerim","sikeyim","siktiğim","siktiğimin","amını","amına","amınoğlu","amk","ipne","ibne","serefsiz","şerefsiz","piç","piçkurusu","götün","götoş","yarrak","amcik","sıçarım","sıçtığım","aq","a.q","a.q.","aq.","a.g.","ag.","amınak","aminak","amınag","aminag","amınıs","amınas","ananı","babanı","anani","babani","bacını","bacini","ecdadını","ecdadini","sikeyim","sulaleni","sülaleni","dallama","dangalak","aptal","salak","gerızekalı","gerizekali","öküz","angut","dalyarak","sikiyim","sikeyim","götüne","götünü","siktirgit","siktirgit","siktirolgit","siktirolgit","siktir","hasiktir","hassiktir","hassiktir","dalyarak","dalyarrak","kancık","kancik","kaltak","orospu","oruspu","fahişe","fahise","pezevenk","pezo","kocagöt","ambiti","götünekoyim","götünekoyim","amınakoyim","aminakoyim","amınak","aminakoyayım","aminakoyayim","amınakoyarım","aminakoyarim","aminakoyarim","ananısikeyim","ananisikeyim","ananısikeyim","ananisikeyim","ananisikerim","ananısikerim","ananisikerim","ananısikerim","orospucocugu","oruspucocu","amk","amq","sikik","götveren","götveren","amınoğlu","aminoglu","amınoglu","gavat","kavat","anneni","annenin","ananın","ananin","dalyarak","sikik","amcık","siktir","piç","pic","sie","yarram","göt","meme","dildo","skcem","skerm","skerim","skecem","orrospu","annesiz","kahpe","kappe","yarak","yaram","dalaksız","yaraksız","amlı","s1kerim","s1kerm","s1krm","sikim","orospuçocukları", "oç"]
        
        if (kufur.some(word => msg.content.toLowerCase().startsWith(word))) {
            try {
              if (!msg.member.hasPermission("BAN_MEMBERS")) {
              msg.delete();  
  const embed1 = new Discord.RichEmbed()
          .setColor("BLUE")
          .setDescription(`${msg.author} Küfür Etmemelisin**!** ${client.emojis.get("685520965798723598")}`)
                    return msg.channel.send(embed1).then(msg => msg.delete(3000));           
              }              
            } catch(err) {
              console.log(err);
            }
          }
           
      }
      
      if (!i) return;
      });
  
  client.on("message", async msg => {
    
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
    let i = await db.fetch(`küfürE_${msg.channel.id}`)
      //if (kufur.some(word => msg.content.startWith(word))) {}
    if (i == 'aktif') {
        const kufur = ["abaza","abazan","aq","ağzınasıçayım","ahmak","am","amarım","ambiti","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","amcıkhoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoy","amınakoyarım","amınakoyayım","amınakoyim","amınakoyyim","amınas","amınasikem","amınasokam","amınferyadı","amını","amınıs","amınoglu","amınoğlu","amınoğli","amısına","amısını","amina","aminakoyarim","aminakoyayım","aminakoyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","aminoglu","amiyum","amk","amkafa","amkçocuğu","amlarnzn","amlı","amm","amna","amnda","amndaki","amngtn","amnn","amq","amsız","amsiz","amuna","ana","anaaann","anal","anan","anana","anandan","ananı","ananı","ananın","ananınam","ananınamı","ananındölü","ananınki","ananısikerim","ananısikerim","ananısikeyim","ananısikeyim","ananızın","ananızınam","anani","ananin","ananisikerim","ananisikerim","ananisikeyim","ananisikeyim","anann","ananz","anas","anasını","anasınınam","anasıorospu","anasi","anasinin","angut","anneni","annenin","annesiz","aptal","aq","a.q","a.q.","aq.","atkafası","atmık","avrat","babaannesikaşar","babanı","babanın","babani","babasıpezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bitch","bok","boka","bokbok","bokça","bokkkumu","boklar","boktan","boku","bokubokuna","bokum","bombok","boner","bosalmak","boşalmak","çük","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dölü","eben","ebeni","ebenin","ebeninki","ecdadını","ecdadini","embesil","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","geber","geberik","gebermek","gebermiş","gebertir","gerızekalı","gerizekalı","gerizekali","gerzek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","göt","götdeliği","götherif","götlalesi","götlek","götoğlanı","götoğlanı","götoş","götten","götü","götün","götüne","götünekoyim","götünekoyim","götünü","götveren","götveren","götverir","gtveren","hasiktir","hassikome","hassiktir","hassiktir","hassittir","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnesi","ipne","itoğluit","kahpe","kahpenin","kaka","kaltak","kancık","kancik","kappe","kavat","kavatn","kocagöt","koduğmunun","kodumun","kodumunun","koduumun","mal","malafat","malak","manyak","meme","memelerini","oc","ocuu","ocuun","0Ç","o.çocuğu","orosbucocuu","orospu","orospucocugu","orospuçoc","orospuçocuğu","orospuçocuğudur","orospuçocukları","orospudur","orospular","orospunun","orospununevladı","orospuydu","orospuyuz","orrospu","oruspu","oruspuçocuğu","oruspuçocuğu","osbir","öküz","penis","pezevek","pezeven","pezeveng","pezevengi","pezevenginevladı","pezevenk","pezo","pic","pici","picler","piç","piçinoğlu","piçkurusu","piçler","pipi","pisliktir","porno","pussy","puşt","puşttur","s1kerim","s1kerm","s1krm","sakso","salaak","salak","serefsiz","sexs","sıçarım","sıçtığım","sıkecem","sicarsin","sie","sik","sikdi","sikdiğim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinler","siksiz","siksok","siksz","sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktir","siktiret","siktirgit","siktirgit","siktirir","siktiririm","siktiriyor","siktirlan","siktirolgit","sittimin","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülalenizi","tasak","tassak","taşak","taşşak","s.k","s.keyim","vajina","vajinanı","xikeyim","yaaraaa","yalarım","yalarun","orospi","orospinin","orospının","orospı","yaraaam","yarak","yaraksız","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yrrak","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiin","ağzına","am","mk","amcık","amcıkağız","amcıkları","amık","amın","amına","amınakoyim","amınoğlu","amina","amini","amk","amq","anan","ananı","ananızı","ananizi","aminizi","aminii","avradını","avradini","anasını","b.k","bok","boktan","boşluk","dalyarak","dasak","dassak","daşak","daşşak","daşşaksız","durum","ensest","erotik","fahişe","fuck","g*t","g*tü","g*tün","g*tüne","g.t","gavat","gay","gerızekalıdır","gerizekalı","gerizekalıdır","got","gotunu","gotuze","göt","götü","götüne","götünü","götünüze","götüyle","götveren","götvern","guat","hasiktir","hasiktr","hastir","i.ne","ibne","ibneler","ibneliği","ipne","ipneler","it","iti","itler","kavat","kıç","kıro","kromusunuz","kromusunuz","lezle","lezler","nah","o.ç","oç.","okuz","orosbu","orospu","orospucocugu","orospular","otusbir","otuzbir","öküz","penis","pezevenk","pezevenkler","pezo","pic","piç","piçi","piçinin","piçler","pis","pok","pokunu","porn","porno","puşt","sex","s.tir","sakso","salak","sanane","sanane","sçkik","seks","serefsiz","serefsz","serefszler","sex","sıçmak","sıkerım","sıkm","sıktır","si.çmak","sicmak","sicti","sik","sikenin","siker","sikerim","sikerler","sikert","sikertirler","sikertmek","sikeyim","sikicem","sikiim","sikik","sikim","sikime","sikimi","sikiş","sikişken","sikişmek","sikm","sikmeyi","siksinler","siktiğim","siktimin","siktin","siktirgit","siktir","siktirgit","siktirsin","siqem","skiym","skm","skrm","sktim","sktir","sktirsin","sktr","sktroradan","sktrsn","snane","sokacak","sokarim","sokayım","sülaleni","şerefsiz","şerefsizler","şerefsizlerin","şerefsizlik","tasak","tassak","taşak","taşşak","travesti","yarak","yark","yarrağım","yarrak","yarramın","yarrk","yavşak","yrak","yrk","ebenin","ezik","o.ç.","orospu","öküz","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sperm","bok","aq","a.q.","amk","am","amına","ebenin","ezik","fahişe","gavat","gavurundölü","gerizekalı","göte","götü","götüne","götünü","lan","mal","o.ç.","orospu","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikilmiş","siktir","sperm","taşak","totoş","yarak","yarrak","bok","aq","a.q.","amk","am","ebenin","fahişe","gavat","gerizakalı","gerizekalı","göt","göte","götü","götüne","götsün","piçsin","götsünüz","piçsiniz","götünüze","kıçınız","kıçınıza","götünü","hayvan","ibne","ipne","kahpe","kaltak","lan","mal","o.c","oc","manyak","o.ç.","oç","orospu","öküz","pezevenk","piç","puşt","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikiim","siktim","siki","sikilmiş","siktir","siktir","sperm","şerefsiz","taşak","totoş","yarak","yarrak","yosma","aq","a.q.","amk","amına","amınakoyim","amina","ammına","amna","sikim","sikiym","sikeyim","siktr","kodumun","amık","sikem","sikim","sikiym","s.iktm","s.ikerim","s.ktir","amg","am.k","a.mk","amık","rakı","rak","oruspu","oc","ananın","ananınki","bacının","bacını","babanın","sike","skim","skem","amcık","şerefsiz","piç","piçinoğlu","amcıkhoşafı","amınasokam","amkçocuğu","amınferyadı","amınoglu","piçler","sikerim","sikeyim","siktiğim","siktiğimin","amını","amına","amınoğlu","amk","ipne","ibne","serefsiz","şerefsiz","piç","piçkurusu","götün","götoş","yarrak","amcik","sıçarım","sıçtığım","aq","a.q","a.q.","aq.","a.g.","ag.","amınak","aminak","amınag","aminag","amınıs","amınas","ananı","babanı","anani","babani","bacını","bacini","ecdadını","ecdadini","sikeyim","sulaleni","sülaleni","dallama","dangalak","aptal","salak","gerızekalı","gerizekali","öküz","angut","dalyarak","sikiyim","sikeyim","götüne","götünü","siktirgit","siktirgit","siktirolgit","siktirolgit","siktir","hasiktir","hassiktir","hassiktir","dalyarak","dalyarrak","kancık","kancik","kaltak","orospu","oruspu","fahişe","fahise","pezevenk","pezo","kocagöt","ambiti","götünekoyim","götünekoyim","amınakoyim","aminakoyim","amınak","aminakoyayım","aminakoyayim","amınakoyarım","aminakoyarim","aminakoyarim","ananısikeyim","ananisikeyim","ananısikeyim","ananisikeyim","ananisikerim","ananısikerim","ananisikerim","ananısikerim","orospucocugu","oruspucocu","amk","amq","sikik","götveren","götveren","amınoğlu","aminoglu","amınoglu","gavat","kavat","anneni","annenin","ananın","ananin","dalyarak","sikik","amcık","siktir","piç","pic","sie","yarram","göt","meme","dildo","skcem","skerm","skerim","skecem","orrospu","annesiz","kahpe","kappe","yarak","yaram","dalaksız","yaraksız","amlı","s1kerim","s1kerm","s1krm","sikim","orospuçocukları", "oç"]
        if (msg.content.includes(" ")) {
        if (kufur.some(word => msg.content.toLowerCase().includes(" " + word))) {
            try {
              if (!msg.member.hasPermission("BAN_MEMBERS")) {
              msg.delete();  
  const embed1 = new Discord.RichEmbed()
          .setColor("BLUE")
          .setDescription(`${msg.author} Küfür Etmemelisin**!** ${client.emojis.get("693615832776835162")}`)
                    return msg.channel.send(embed1).then(msg => msg.delete(3000));           
              }              
            } catch(err) {
              console.log(err);
            }
          }
          } else {
           if (kufur.some(word => msg.content == word)) {
            try {
              if (!msg.member.hasPermission("BAN_MEMBERS")) {
                    msg.delete();  
  const embed1 = new Discord.RichEmbed()
          .setColor("BLUE")
          .setDescription(`${msg.author} Küfür Etmemelisin**!** ${client.emojis.get("693615832776835162")}`)
                    return msg.channel.send(embed1).then(msg => msg.delete(3000));           
              }              
            } catch(err) {
              console.log(err);
            }
          } 
        
          
          
          }
      }
      if (!i) return;
    });

  client.on('message', async message => {
 
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
 
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
 
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`:x: **${message.author.tag}** adlı kullanıcı artık AFK degil...`)
      db.delete(`afk_${message.author.id}`)
    }
    if (afkkullanıcı) return message.channel.send(` **${kullanıcı.tag}** **şu anda AFK.**\n **Sebep** : **${sebep}** <a:siyah:694927370292822090>`)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`:x: **${message.author.tag}** adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
  }
  }

       
           
           );
  client.on('ready', ()=>{
client.channels.get('700144705710719023').join()
});

client.on("message", async msg => {
let timeout = 1440000
let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
let i = db.fetch(`gold_${msg.author.id}`)
          if (i == 'gold') {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 1) {
db.set(`goldzzz_${msg.author.id}`, Date.now());
    const gold = new Discord.RichEmbed()
    .setAuthor(client.user.username + " || Gold Üye")
    .setThumbnail(msg.author.avatarURL)
    .addField("**:700144704565673993:Açılın Gold Üye Geldi**", msg.author.username)
    .setTimestamp()
   msg.channel.send(gold).then(msg => msg.delete(3000))
  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});





});
