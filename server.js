// Load up the discord.js library
const Discord = require("discord.js");
var bot = new Discord.Client();
const ms = require("ms");
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 10000);


// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.



 


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Saturn a demarré, avec ${client.users.size} personnes, dans ${client.channels.size} channels de ${client.guilds.size} discord.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`s!help | Sur ${client.guilds.size} serveurs`);
});

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
	.setTitle("Un nouvel utilisateur nous a rejoins!") // Calling method setTitle on constructor. 
	.setDescription(memberTag + ` a rejoins ${guild.name}!`) // Setting embed description
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

	    client.channels.get("639997214403592192").send(`${message.author.tag} a signalé une erreur. L'erreur est: ${args.join(' ')}`)
    message.reply("Merci de ton soutien! Je vais regarder ca de plus près.")
};
  
    if(command === 'errormp') {
	if (!args.length) {
		return message.channel.send(`Tu n'as pas fournie d'erreur!, ${message.author}!`)
	}
	else if (args[0] === `${message}`) {
		return message.channel.send();
	}

	    

      client.fetchUser("524668745520644117",false).then(user => {
        user.send(`${message.author.tag} a signalé une erreur. L'erreur est: ${args.join(' ')}`,) 
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
			const embed = new Discord.RichEmbed()
     .setColor("000000")
    .setTitle("8ball")
    .addField(ballText, sayings[result])
    message.channel.send({embed:embed})
    }

  


  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
  if(!message.member.roles.some(r=>["Administrator", "Administrateur", "Moderator", "Moderateur", "Admin", "Modo", "Createur","Créateur", "Fondateur",].includes(r.name)) )
      return message.reply("Desolé! Tu n'as pas les permissions!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Mentionnez une personne dans le serveur");
    if(!member.kickable) 
      return message.reply("Je ne peut pas le kick! Ont-il un role plus haut? Est-ce que j'ai les permissions de kick?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Pas de raison fournie";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Desolé ${message.author}, Je n'ai pas pu kick la personne a cause de : ${error}`));
    
    var inf_embed = new Discord.RichEmbed()
    .setColor('00cbff')
    .setDescription(`Kickement de ${member.user.tag}`)
    .addField("Nom de la personne kické:", `${member.user.tag}`, true)
    .addField("Kické  par", `${message.author.tag}`, true)
    .addField("Raison du kick:", `${reason}`)
  
    .setFooter("Avis de kickement - Saturn")
    message.reply(inf_embed)

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
   if(!message.member.roles.some(r=>["Administrator", "Administrateur", "Moderator", "Moderateur", "Admin", "Modo", "Createur","Créateur", "Fondateur",].includes(r.name)) )
      return message.reply("Desolé! Tu n'as pas les permissions!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Mentionnez une personne dans le serveur");
    if(!member.bannable) 
      return message.reply("Je ne peut pas le ban! Ont-il un role plus haut? Est-ce que j'ai les permissions de ban?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Pas de raison fournie";
    
    await member.ban(reason)
      .catch(error => message.reply(`Desolé ${message.author}, Je n'ai pas pu ban la personne a cause de : ${error}`));
 
      var inf_embed = new Discord.RichEmbed()
    .setColor('00cbff')
    .setDescription(`Bannisement de ${member.user.tag}`)
    .addField("Nom du banni:", `${member.user.tag}`, true)
    .addField("Banni par", `${message.author.tag}`, true)
    .addField("Raison du ban", `${reason}`)
  
    .setFooter("Avis de bannisement - Saturn")
    message.reply(inf_embed)
  }
if(command === "help"){
  var help_embed = new Discord.RichEmbed()
  .setColor("000000")
  .setTitle("**Commandes de Saturn**")
  .addField("Commandes d'administration","s!kick | s!ban | s!clear")
  .addField("Commandes amusantes","s!8ball | s!say")
  .addField("Commandes de report","s!errormp | s!reporterror")
  .addField("Commandes d'informations","s!serverinfo | s!info")
  .addField("Autres commandes ","s!help | s!invitation | s!ping | s!avatar")
  .setFooter("Help - Saturn")

  message.channel.send(help_embed)
  console.log("Un utilisateur a demandé de l'aide")
}
  if(command === "invitation"){
  var help_embed = new Discord.RichEmbed()
  .setColor("000000")
  .setTitle("Invitation")
  .addField("Invitez le bot sur votre serveur!", "https://discordapp.com/oauth2/authorize?client_id=639248385794113563&scope=bot&permissions=805314622")
  .setFooter("Invitation - Saturn")
  message.channel.send(help_embed);
  }
  
 
     if(command === "info") {
    var inf_embed = new Discord.RichEmbed()
    .setColor('00cbff')
    .setDescription("**Info sur moi**")
    .addField("Nom:", "Saturn", true)
    .addField("Créateur:", "LunatiikXD", true)
    .addField("Version de discord.js:", `${require('discord.js').version}`)
    .addField("Version du bot:","Beta 0.6.0")
    .addField(`Serveurs:`, `${client.guilds.size} serveur(s)`, false)
    .addField(`Utilisateurs:`, `${client.users.size} personnes utilisent Saturn`, false)
    .addField("Serveur Discord:", "https://discord.gg/7T6vyVV")
    .setThumbnail(client.user.avatarURL)
    .setFooter("Info - Saturn")
    message.channel.sendEmbed(inf_embed)
    
  //message.member.send(`:eyes:Info sur moi:eyes:\nNom: Mars\nCreateur: LunatiikXD\nCreer avec discord.js 11.4.0\nJe suis sur ${client.guilds.size} serveurs !`)
 
  }

  if(command === "serverinfo") {
    var embed = new Discord.RichEmbed()
    .setColor('00cbff')//mec pk ta retirer C koi cette couleur Blue Ok
    .setDescription("**Info du serveur Discord**")//tu peUx maider avec le clear? oui Mrc
    .addField("Nom du serveur", message.guild.name, false)
    .addField("Crée le", message.guild.createdAt, true)
    .addField("Tu a rejoins le", message.member.joinedAt, true)
    .addField("Membres sur le serveur", message.guild.memberCount, false)
    .setFooter("ServerInfo - Saturn")
    message.channel.sendEmbed(embed)
  }
  if(command === "avatar") {
    var help_embed = new Discord.RichEmbed()
	  .setColor("000000")
	  .setTitle("Avatar")
	  .setImage(message.author.avatarURL)
	  .setFooter("Avatar - Saturn")
	  message.channel.sendEmbed(help_embed);
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
      .catch(error => message.reply(`Je n'ai pas reussi a effacer les message a cause de: ${error}`));
  }
});

  


client.login(config.token);



  
