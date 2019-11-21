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