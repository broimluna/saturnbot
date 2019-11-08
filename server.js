// Load up the discord.js library
const Discord = require("discord.js");
var bot = new Discord.Client();
const http = require('http');
const ms = require('ms');
const express = require('express');
const randomPuppy = require('random-puppy');
const app = express();
app.get("/", (request, response) => {
 
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 2750);




//----------------------------------------- Discord.js code -------------------------------------------------

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.
// config.ownerID contains the Owner's id



 client.on("ready", () => {
    console.log(`Saturn a demarré, avec ${client.users.size} personne(s), dans ${client.channels.size} channel(s) de ${client.guilds.size} discord(s).`);
   let statuses = [
    `s!help || Sur ${client.guilds.size} serveurs.`, 
    `s!help || ${client.users.size} personnes utilisent Saturn.`,
    `s!help || s!invite pour inviter le bot.`
   ];
   setInterval(function() {
     
     let status = statuses[Math.floor(Math.random()*statuses.length)];
     
     client.user.setPresence({ game : { name: status }, status: "online"})
   }, 60000)
 });


	
                      

//client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
//  console.log(`Saturn a demarré, avec ${client.users.size} personnes, dans ${client.channels.size} channels de ${client.guilds.size} discord.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
 // client.user.setActivity(`s!help | Sur ${client.guilds.size} serveurs`);
//});


client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`Nouveau discord: ${guild.name} (id: ${guild.id}). Ce discord a ${guild.memberCount} membres!`);
  client.user.setActivity(`s!help | Sur ${client.guilds.size} serveurs`);
   var found = false;
  guild.channels.forEach(function(channel, id) {
      if(found == true || channel.type != "text") {
        return;
      }
      if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
        found = true;
        return channel.send("Hey, je suis Saturn, Merci de m'avoir invité dans le serveur! Voir mes commandes est facile, faites s!help.")
        console.log("Server joined")
      }
  })
});


client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`J'ai été retiré de: ${guild.name} et l'ID est :(id: ${guild.id})`);
  client.user.setActivity(`s!help | Sur ${client.guilds.size} serveurs`);
});
client.on("guildMemberAdd", (member) => { // Check out previous chapter for information about this event
let guild = member.guild; 
let memberTag = member.user.tag; 
if(guild.systemChannel){
	guild.systemChannel.send(new Discord.RichEmbed() // Creating instance of Discord.RichEmbed
  .setColor("RANDOM")
	.setTitle("Un nouvel utilisateur nous a rejoint!") // Calling method setTitle on constructor. 
	.setDescription(memberTag + ` a rejoint ${guild.name}!`) // Setting embed description
	.setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
	.addField(`${guild.name} compte maintenant ce nombre d'utilisateur:`, member.guild.memberCount,) // Adds a field; First parameter is the title and the second is the value.
	.setTimestamp() // Sets a timestamp at the end of the embed
	);
}
});
client.on("guildMemberRemove", (member) => { // Check out previous chapter for information about this event
let guild = member.guild; 
let memberTag = member.user.tag; 
if(guild.systemChannel){
	guild.systemChannel.send(new Discord.RichEmbed() // Creating instance of Discord.RichEmbed
  .setColor("RANDOM")
	.setTitle("Un utilisateur nous a quitté...") // Calling method setTitle on constructor. 
	.setDescription(memberTag + ` a quitté ${guild.name}...`) // Setting embed description
	.setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
	.addField(`${guild.name} compte maintenant ce nombre d'utilisateur:`, member.guild.memberCount,) // Adds a field; First parameter is the title and the second is the value.
	.setTimestamp() // Sets a timestamp at the end of the embed
	);
}
});




client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Attends une seconde...");
    m.edit(`Pong! :ping_pong: La latence est de ${m.createdTimestamp - message.createdTimestamp}ms. La latence de l'API est de ${Math.round(client.ping)}ms`);
  }
  if(command === "meme") {
            const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const memeembed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`Meme du subreddit /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
            .setFooter(`Si l'image n'apparait pas immédiatement, veuillez attendre quelque secondes pour que l'image charge :)`)

        message.channel.send(memeembed);
  }
  if(command === "annonce") {
    if(message.author.id !== config.ownerID) return message.reply("Desolé, mais tu n'a pas accès à cette commande!");
     const annonceMessage = args.join(" ");
client.channels.get("639994872689983518").send(annonceMessage)
     message.delete().catch(O_o=>{}); 
};
  if(command === "eval"){
    if(message.author.id !== config.ownerID) return message.reply("Desolé, mais tu n'a pas accès à cette commande!");
                    let args = message.content.split(' ').slice(1)
                    let code = args.join(' ')
                    try {

                        let evaled = eval(code);
                        let str = require("util").inspect(evaled, {
                            depth: 1
                        })
                        message.react("☑")
            message.channel.send(`${str.substr(0, 1800)}`, {code:"js"})

                    } catch (err) {
                            message.react("❌")
            message.channel.send(`${err}`, {code:"js"})
                    }
            }
 
 
  
  if(command === 'reporterror') {
	if (!args.length) {
		return message.channel.send(`Tu n'as pas fournie d'erreur!, ${message.author}!`)
	}
	else if (args[0] === `${message}`) {
		return message.channel.send();
	}
   var reportEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')//mec pk ta retirer C koi cette couleur Blue Ok
    .setDescription(`**Report de problème / bug de ${message.author.tag}**`)//tu peUx maider avec le clear? oui Mrc
    .addField("Personne qui a reporté un bug / problème:", `${message.author.tag}`, true)
   .addField("Erreur / bug:", `${args.join(' ')}`, true)
     .addField("Type d'erreur", "Erreur sur le Discord.")
    .setFooter("Avis de report - Saturn")
  client.channels.get("639997214403592192").send(reportEmbed)
   
    message.reply("Merci de ton soutien! Je vais regarder ca de plus près.")
  }
  
	 
  
    if(command === 'errormp') {
	if (!args.length) {
		return message.channel.send(`Tu n'as pas fournie d'erreur!, ${message.author}!`)
	}
	else if (args[0] === `${message}`) {
		return message.channel.send();
	}

	    client.fetchUser("524668745520644117",false).then(user => {
        var errormpEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')//mec pk ta retirer C koi cette couleur Blue Ok
    .setDescription(`**Report de problème / bug de ${message.author.tag}**`)//tu peUx maider avec le clear? oui Mrc
    .addField("Personne qui a reporté un bug / problème:", `${message.author.tag}`, true)
   .addField("Erreur / bug:", `${args.join(' ')}`, true)
     .addField("Type d'erreur", "Erreur en message privé")
    .setFooter("Avis de report - Saturn")
        user.send(errormpEmbed) 
     
})
	   
    message.reply("Merci de ton soutien! Je vais regarder ton erreur.")
    
};
   
 

   
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    
    const sayMessage = args.join(" ");
    
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
 
   
      
    }
  




  
 

    if (command === "8ball") {
     
      var sayings = ["Oui", "Non", "Peut-etre", "Peut-etre pas", "Certainement", "Certainement pas", "Bien sur!", "Pas-sur...",]
  const ballText = args.join(" ");
			var result = Math.floor((Math.random() * sayings.length) + 0);
      if(!ballText)
      return message.reply("Veuillez demander une question pour utiliser 8ball :8ball: ")
			const embed = new Discord.RichEmbed()
     .setColor("RANDOM")
    .setTitle(":8ball:ball")
    .addField(ballText, sayings[result])
    message.channel.send({embed:embed})
    }

  


  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
       if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Desolé! Tu n'as pas les permissions!");
  
     
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let kickmember = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!kickmember)
      return message.reply("Mentionnez une personne dans le serveur");
    if(!kickmember.kickable) 
      return message.reply("Je ne peut pas le kick! L'utilisateur a t-il un role plus haut? Est-ce que j'ai les permissions de kick?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Pas de raison fournie";
    
    // Now, time for a swift kick in the nuts!
    await kickmember.send(`Vous avez été kick du Discord "${message.guild.name}". La raison est: ${reason}. `)
    await kickmember.kick(reason)
      .catch(error => message.reply(`Desolé ${message.author}, Je n'ai pas pu kick la personne a cause de : ${error}`));

    
    var kick_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`Kickement de ${kickmember.user.tag}`)
    .addField("Nom de la personne kické:", `${kickmember.user.tag}`, true)
    .addField("Kické  par", `${message.author.tag}`, true)
    .addField("Raison du kick:", `${reason}`)
  
    .setFooter("Avis de kickement - Saturn")
    message.channel.send(kick_embed)
       

  }

if(command === 'mute') {
   if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("Désolé, mais tu n'as pas la permission!");
  if(!message.guild.me.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.channel.send("Désolé, mais tu n'as pas la permission!");
  
  let tomute = message.mentions.members.first() || message.guild.members.get(args[0])
  if(!tomute) return message.reply("Mentionnez une personne dans le serveur.\nUtilisation de la commande: s!mute [utilisateur] [temps] [raison]")
  
   let reason = args.slice(1).join(' de mute a cause de: ');
    if(!reason) reason = "Pas de raison fournie";
  
  let muterole = message.guild.roles.find(r => r.name === "Mute")
  if(!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Mute",
        color: "#3e3c3c",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
  }
  let mutetime =  args[1];
    if(!reason) return message.reply
  if(!mutetime) return message.reply("Tu n'a pas spécifier le temps avant l'unmute et de raison de mute!");
  if(!reason) return message.reply("test")
   let mutedembed = new Discord.RichEmbed()
        .setDescription(`Avis de mute de ${tomute}`)
        .setColor("RANDOM")
        .addField("Muté sur", message.guild.name)
        .addField("Muté durant", ms(ms(mutetime)))
        .addField("Raison du mute:", reason);
  
      tomute.addRole(muterole.id).then(() => {
        message.delete()
        tomute.send(mutedembed)
        message.channel.send(`${tomute.user.username} a été muté pendant ${ms(ms(mutetime))}!`)
      })
    setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> a été unmuté!`);
  }, ms(mutetime));
}
 // if(command === "unmute") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
   //   if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("Désolé, mais tu n'as pas la permission!");
 // if(!message.guild.me.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.channel.send("Désolé, mais tu n'as pas la permission!");
  
 // let mute = message.mentions.members.first() || message.guild.members.get(args[0])
 // if(!mute) return message.reply("Mentionnez une personne dans le serveur")
  
   //let reason = args.slice(1).join(' ');
    //if(!reason) reason = "Pas de raison fournie";
    // let muterole = message.guild.roles.find(r => r.name === "Mute")
     
   // mute.removeRole(muterole.id).then(() => {
    //    message.delete()
    
       // message.channel.send(`${mute.user.username} a été unmute!`)
     // })
  //}
    
  
 if(command === "serverlist") {
    if(message.author.id !== config.ownerID) return message.reply("Desolé, mais tu n'a pas accès à cette commande!");
      var serverlist_embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("**Nombre de Discord que Saturn est sur**")
  .addField("Serveurs:",`${client.guilds.array().sort()}`)
  .setFooter("Serverlist - Saturn")
      message.channel.send(serverlist_embed)
};
 
  

  if(command === 'warn') {
   var warnEmbedColor = 'RANDOM' // Change this to change the color of the embeds!
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions

        .setColor(warnEmbedColor)

        .setAuthor(message.author.username, message.author.avatarURL)

        .setTitle("Désolé, mais tu n'a pas les permissions!")

        .setDescription(`Désolé ${message.author.tag}, mais tu n'as pas les permissions!`)

        .setTimestamp();

    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right

        .setColor(warnEmbedColor)

        .setAuthor(message.author.username, message.author.avatarURL)

        .setTitle("Mauvaise utilisation de la commande.")

        .setDescription("Veuillez mentionner quelqu'un a warn, puis donner la raison du warn.")

        .setTimestamp();

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission

    let mentioned = message.mentions.users.first(); // Gets the user mentioned! message.guild.channels.find(x => x.name === d-logs)

    if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message

    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word

    if(!reason) return message.channel.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!

        .setColor(warnEmbedColor)

        .setAuthor(message.author.username, message.author.avatarURL)

        .setTitle(`Vous avez été warn dans le Discord: ${message.guild.name}.`)

        .addField('Warn par', message.author.tag)

        .addField('Raison:', reason)

        .setTimestamp();

  mentioned.send(warningEmbed); // DMs the user the above embed!

    var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.

        .setColor(warnEmbedColor)

        .setTitle(mentioned + ` a été warn!`);

    message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed

    message.delete(); // Deletes the command

}
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
   if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Desolé! Tu n'as pas les permissions!");
    
    let banmember = message.mentions.members.first();
    if(!banmember)  
      return message.reply("Mentionnez une personne dans le serveur");
    if(!banmember.bannable) 
      return message.reply("Je ne peut pas le ban! L'utilisateur a t-il un role plus haut? Est-ce que j'ai les permissions de ban?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Pas de raison fournie";
    await banmember.send(`Vous avez été banni du Discord "${message.guild.name}". La raison est: ${reason}. `)
    await banmember.ban(reason)
      .catch(error => message.reply(`Desolé ${message.author}, Je n'ai pas pu ban la personne a cause de : ${error}`));
 
      var ban_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`Bannisement de ${banmember.user.tag}`)
    .addField("Nom du banni:", `${banmember.user.tag}`, true)
    .addField("Banni par", `${message.author.tag}`, true)
    .addField("Raison du ban", `${reason}`)
  
    .setFooter("Avis de bannisement - Saturn")
    message.channel.send(ban_embed)
   
  
  }
  
  
    
      
if(command === "help"){
  
   
  var help_embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("**Commandes de Saturn**")
  .addField("Commandes d'administration :tools:","s!kick | s!ban | s!warn | s!clear | s!mute")
  .addField("Commandes amusantes :video_game:","s!8ball | s!say | s!meme")
  .addField("Commandes de report :pencil:","s!errormp | s!reporterror")
  .addField("Commandes d'informations :information_source:","s!serverinfo | s!info | s!userinfo")
  .addField("Autres commandes :speech_balloon: ","s!help | s!invite | s!ping | s!avatar")
  .setFooter("Help - Saturn")

  message.channel.send(help_embed)
  console.log("Un utilisateur a demandé de l'aide")
}
  if(command === "invite"){
  var inv_embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Commande d'invitation du bot.")
  .addField("Invitez le bot sur votre serveur!", "https://discordapp.com/oauth2/authorize?client_id=639248385794113563&scope=bot&permissions=805314622")
  .setFooter("Invite - Saturn")
  message.channel.send(inv_embed);
  }
  
 
     if(command === "info") {
    var inf_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription("**Info sur moi**")
    .addField("Nom:", "Saturn", true)
    .addField("Créateur:", "LunatiikXD", true)
    .addField("Version de discord.js:", `${require('discord.js').version}`)
    .addField("Version du bot:","1.0.1")
    .addField(`Serveurs:`, `${client.guilds.size} serveur(s)`, false) 
    .addField(`Utilisateurs:`, `${client.users.size} personnes utilisent Saturn`, false)
    .addField("Serveur Discord:", "https://discord.gg/7T6vyVV")
    .setThumbnail(client.user.avatarURL)
    .setFooter("Info - Saturn")
    message.channel.send(inf_embed)
    
  //message.member.send(`:eyes:Info sur moi:eyes:\nNom: Mars\nCreateur: LunatiikXD\nCreer avec discord.js 11.4.0\nJe suis sur ${client.guilds.size} serveurs !`)
 
     }
    let user = message.mentions.users.first() || message.author;
if(command === "userinfo") {
   var userEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')//mec pk ta retirer C koi cette couleur Blue Ok
    .setDescription(`**Info de ${message.author.tag}**`)//tu peUx maider avec le clear? oui Mrc
   .setThumbnail(message.author.displayAvatarURL) 
     .addField("Nom de l'utilisateur", message.author.tag, false)
    .addField('Compte crée le:', `${user.createdAt}`, true)
    .addField("ID de l'utilisateur", user.id, true)
     .addField("Tu a rejoins ce discord le", message.member.joinedAt, true)
   .setFooter("Userinfo - Saturn")
    message.channel.send(userEmbed)
  }
  if(command === "serverinfo") {
    var servEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')//mec pk ta retirer C koi cette couleur Blue Ok
    .setDescription("**Info du serveur Discord**")//tu peUx maider avec le clear? oui Mrc
    .setThumbnail(message.guild.iconURL)
    .addField("Nom du serveur", message.guild.name, false)
    .addField("Crée le", message.guild.createdAt, true)
    .addField("Tu a rejoins le", message.member.joinedAt, true)
    .addField("Membres sur le serveur", message.guild.memberCount, false)
    .addField("Propriétaire du Discord:", message.guild.owner.user.tag, false)
    
    .setFooter("Serverinfo - Saturn")
    message.channel.send(servEmbed)
  }
  if(command === "avatar") {
    var avatar_embed = new Discord.RichEmbed()
	  .setColor("RANDOM")
	  .setTitle("Avatar")
	  .setImage(message.author.avatarURL)
	  .setFooter("Avatar - Saturn")
	  message.channel.send(avatar_embed);
  }


	
	


          
  
  if(command === "clear") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Mettez un nombre entre 2 et 100 pour effacer les messages");
 if(!message.member.roles.some(r=>["Administrator", "Administrateur", "Moderator", "Moderateur", "Admin", "Modo", "Createur", "Créateur", "Fondateur",].includes(r.name)) )
      return message.reply("Desolé! Tu n'as pas les permissions!");
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Je n'ai pas reussi a effacer les messages a cause de: ${error}`));
    message.reply("J'ai supprimé ce nombre de message: " + deleteCount) 
    setTimeout(function(){ 
      message.channel.bulkDelete(1)
}, 2000);
   
    
    
  }
});

  


client.login(config.token);



  
