const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "!";

const ytdl = require('ytdl-core');

const queue = new Map();

var servers = {};

client.login(process.env.BOT_TOKEN);

function play(connection, message) {
  
    var server = servers[message.guild.id];
  
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
  
    server.queue.shift();
  
    server.dispatcher.on("end", function() { 
      if (server.queue[0]) play(connection, message);
  
      else connection.disconnect();
  
    });
  }

client.on("ready", () => {
    console.log("prêt")
    client.user.setGame("Finalisation")
});

client.on('message', message => {

    if (message.content === "Bonjour"){
        message.reply("Hey, salut comment ça va?");
        console.log('le bot dit bonjour');
    }
});

client.on('message', message => {

    if (message.content === "salut"){
        message.reply("Hey, salut comment ça va?");
        console.log('le bot dit bonjour');
    }
});

client.on('message', message => {

    if (message.content === "Salut"){
        message.reply("Hey, salut comment ça va?");
        console.log('le bot dit bonjour');
    }
});
+

client.on('message', message => {

    if (message.content === "ça va bien"){
        message.reply("Super cool ça!");
        console.log('le bot dit bonjour');
    }
});

client.on('message', message => {

    if (message.content === "sa va"){
        message.reply("Super cool ça!");
        console.log('le bot dit bonjour');
    }
});

client.on('message', message => {

    if (message.content === "bien et toi?"){
        message.reply("Super merci!");
        console.log('le bot dit bonjour');
    }
});

client.on('message', message => {

    if (message.content === "Yo"){
        message.reply("Hey salut comment ça va?!");
        console.log('le bot dit bonjour');
    }
});

client.on('message', message => {

    if (message.content === "avec plaisir"){
        message.reply("Hooo je vois que tu est poli");
        console.log('le bot dit bonjour');
    }
});

client.on('message', message => {

    if (message.content === "oui"){
        message.reply("ou non? mdr");
        console.log('le bot dit bonjour');
    }
});

client.on('message', message => {

    if (message.content === "ta mère la pute"){
        message.reply("Calme toi sur les insulte ok?!");
        console.log('le bot dit bonjour');
    }
});

client.on('message', message => {

    if (message.content === "trop bon codeur"){
        message.reply("Oui je sais merci <3");
        console.log('le bot dit bonjour');
    }
});

client.on('message', message => {

    if (message.content === "comment on participe au giveaway?"){
        message.reply("En gros tu va dans le channel #participation-giveaways et tu suit ce qui est indiqué :wink:");
        console.log('le bot dit bonjour');
    }
    
    if(message.content === prefix + "commande") {
        var aide_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:robot: Voici mes catégories d'aide !`)
        .setDescription(`Voici mes commandes disponible :`)
        .setThumbnail(message.author.avatarURL)
        .addField(":tools: Modération", "Fais `!admin` pour voir mes commandes de modération !")
        .addField(":tada: Textuel", "Fais `!textuel` pour voir mes commandes textuels!")
        .addField(":scroll:Tchat", "Fais `!tchat` pour voir les commande que vous pouvez intéragir avec!")
        .setFooter("Menu des commandes!")
        .setTimestamp()
        message.channel.send(aide_embed);
      }
    
      if(message.content === prefix + "admin") {
        var mod_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:tools: Voici mes commandes administrateurs !`)
        .setThumbnail(message.author.avatarURL)
        .addField("!kick <@user>", "Kick l'utilisateur !")
        .addField("!ban <@user>", "Ban l'utilisateur !")
        .addField("!clear nombre", "Supprime le nombre de messages indiqué")
        .addField("!mute <@user>", "Mute l'utilisateur mentionné")
        .addField("!unmute <@user>", "Unmute l'utilisateur mentionné")
        .setFooter("Commandes administrateurs!")
        .setTimestamp()
        message.channel.send(mod_embed);
      }
    
      if(message.content === prefix + "textuel") {
        var fun_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:tools: Voici mes commandes amusantes !`)
        .setThumbnail(message.author.avatarURL)
        .addField("!information", "Le bot vous dira les informations du serveur te de lui même !")
        .addField("!info", "Donne vos informations en message privée !")
        .setFooter("Menu des textuels")
        .setTimestamp()
        message.channel.send(fun_embed);
      }

      if(message.content === prefix + "tchat") {
        var tchat_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:scroll: Voici mes commandes oû vous pouvez chatter avec moi!`)
        .setThumbnail(message.author.avatarURL)
        .addField("Bonjour", "Le bot répond !")
        .addField("salut", "Le bot répond !")
        .addField("Salut", "Le bot répond !")
        .addField("ça va bien?", "Le bot répond")
        .addField("sa va", "pour les gens qui n'écrivent pas bien")
        .addField("Yo", "Le bot répond")
        .addField("comment on participe au giveaway?", "Le bot répond")
        .setFooter("Menu des commande dans le chat")
        .setTimestamp()
        message.channel.send(tchat_embed);
      }
      
    if(message.content === prefix + "information") {
        var info_embed = new Discord.RichEmbed()
        .setColor("#CCCC00")
        .setTitle("Informations du bot et du serveur")
        .addField(":robot: Nom du bot: ", `${client.user.tag}`, true)
        .addField("Le # du bot", `#${client.user.discriminator}`)
        .addField("ID du bot:", `${client.user.id}`)
        .addField("Nombre de participants:", message.guild.members.size)
        .addField("Nombre de Salons et catégorie", message.guild.channel.size)
        .setFooter("Informations sur le serveur et le Tommy's Bot")
        .setTimestamp()
        message.channel.sendMessage(info_embed)
        console.log("Quelqu'un à éffectué la commande d'information")
    }

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous ne pouvez pas kick!");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Tu ne peux pas kick l'air!")
        }
        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Il n'existe pas!")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je ne peux pas kick");
        }

        kick.kick().then(member => {
            message.channel.send(`${member.user.username} à bien été kick par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous ne pouvez ban");

        if(message.mentions.users === 0) {
            return message.channel.send("Tu ne peux pas ban l'air");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Il n'existe pas");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je ne peux pas ban!");
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} à bien été banni par ${message.author.username} !`)
        }

        )
    }

    if(message.content.startsWith(prefix + "clear")) {
    
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous ne pouvez pas clear");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Tu ne peux pas supprimer 0 messages!")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été supprimés !`);
        })
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux pas mute!");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Tu ne peux pas mute l'air!");
        }

        var mute = message.guild.member(message.mentions.user.first());
        if(!mute) {
            return message.channel.send("Il n'extsite pas");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je ne peux pas mute");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} à bien été mute!`);
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux pas mute!");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Tu ne peux pas mute l'air!");
        }

        var mute = message.guild.member(message.mentions.user.first());
        if(!mute) {
            return message.channel.send("Il n'extsite pas");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je ne peux pas mute");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} à bien été unmute!`);
        })
    }

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "info":
        
        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("#3300FF")
        .setTitle(`Vos information! : ${message.author.username}`)
        .addField(`Votre ID :`, msgauthor, true)
        .addField("Date de création de votre compte:", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Va voir le message privée que je t'ai envoyé, tes infos sont là")
        message.author.send({embed: stats_embed});
        break;
    }
});
