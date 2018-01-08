const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "Mzk5MTg4NjM5NjA4OTk1ODQx.DTLKsw.5Ve6rY4bYAV-BZwrBvlHGHWvT28";
const PREFIX = "t?";

var fortunes = [
    "Yes",
    "No",
    "Maybe",
    "Stop, please",
    "you know it",
    "Check the link on the description",
    "That's very dangerous, do not ask it again",
    "You are the Answer",
]

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.platStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunestitle = [
    "The Sun Say",
    "The Moon Say",
    "The Cards Say",
    "My Cat Say",
    "PewDiePie Say",
    "YOU from the future Say",
    "The Devil Say"
]

var Storys = [
    "Once upon a time a chick that breathed in the butt, sat on a chair and died, end.(Made by Josue#4589)",
    "Long time ago, a bird sing a song, but the bird are a dinosaur, and the bird-saur see the pig destroy the world, the bird-saur say 'this pig is big' and he help the pig to destroy the world, end.",
    "Long, long time ago, in a distant universe, a boy called 'peter' save two robots and save the universe from a evil king ",
    "[Insert Interesting Story Here]",
    "In a Town, a spider who lives with his uncles, went to a laboratory with the rest of his class, but he was bitten by a humanand since that day, he was 'Man-Spider'' ",
]

var Doggos = [
    "https://i.pinimg.com/736x/6a/4a/06/6a4a0600830c698a0dbca20aeac5f220--cute-little-animals-baby-animals.jpg",
    "https://pbs.twimg.com/profile_images/835487869716189184/Iwz7XWri.jpg",
    "http://borkborkiamdoggo.com/wp-content/uploads/2016/12/pls-no-cook-fren-1.jpg",
    "http://www.dingit.tv/blog/wp-content/uploads/2017/08/Capture.png",
    "https://critcola.com/community/uploads/default/original/1X/09521d44cbac50cd95948f2675438606be2b699a.jpg",
    "https://pbs.twimg.com/media/Ci8x4WYVEAIkGi7.jpg",
    "https://pbs.twimg.com/profile_images/828073361397932032/eKTigt-2.jpg",
    "https://buzzanything.com/wp-content/uploads/tumblr_otoj3pp2uX1qzfsnio1_500.jpg",
    "https://assets.rbl.ms/10883498/980x.jpg",
    "https://cdn.discordapp.com/attachments/399616169423667210/399707713094811648/unknown.png",
    "https://thumbs.gfycat.com/SphericalHopefulCornsnake-max-1mb.gif",
    "https://media.giphy.com/media/Rg37eyIbRUTgk/giphy.gif",
    "https://i.pinimg.com/736x/7d/8d/88/7d8d8858a2093edfbfe4dc7323f48a64--happy-baby-happy-puppy.jpg",
]

var servers = {};

var bot = new Discord.Client();

bot.on ("ready", function() {
   console.log("Ready for Fight"); 
   bot.user.setGame("Type t?help to help")
});
//Text Reader
bot.on("message", (message) => {
    if(message.content == "<@399188639608995841>") {
        message.channel.sendMessage("Are you asking for me?");
    }
    if(message.content == "<@399188639608995841>, you are a bot?") {
        message.channel.sendMessage("No.....");
        message.channel.sendMessage("Or Yes?");
        message.channel.sendMessage("**Adding existential question system**");
    }
});
//Command Reader
bot.on ("message", function(message) {
    console.log(message.content);
    if(message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLocaleLowerCase()) {
        case "ping":
            message.channel.sendMessage("pong");   
            message.channel.sendMessage(new Date().getTime() - message.createdTimestamp + " ms")
            break;
 
        case "origins":
            message.channel.sendMessage("[Insert a dramatic story here]");
            break;

        case "dice":
            var randNum = Math.floor((Math.random() * 100) + 1);
            message.channel.sendMessage(randNum);
            break;
        
        case "8ball":
            if(args[1]) {
                var embed = new Discord.RichEmbed()
                    .addField(fortunestitle[Math.floor(Math.random() * fortunestitle.length)], fortunes[Math.floor(Math.random() * fortunes.length)])
                    .setColor([68, 226, 0])
                    .setFooter("Try Again")
                    .setThumbnail(message.author.avatarURL);
                message.channel.sendEmbed(embed);
            } else {
                message.channel.sendMessage("What is your point?");
            }
            break;         

        case "info-me":
            var embed = new Discord.RichEmbed()
                .addField("Username: " + message.author.username,"created at: " + message.author.createdAt) 
                .setFooter("ID: " + message.author.id)
                .setThumbnail(message.author.avatarURL)
                .setColor([0, 255, 236])
            message.channel.sendEmbed(embed);
            break;

        case "army":
            var embed = new Discord.RichEmbed()
                .setTitle("*the Skeleton army attack " + message.author.username+"*") 
                .setImage("https://cdn.discordapp.com/attachments/397064390223986698/399614970012106765/unknown.png")
                .setColor([0, 255, 236])
            message.channel.sendEmbed(embed);
            break;            
        
        //music :)
       
        case "play":
            if(!args[1]) {
                message.channel.sendMessage("You can not reproduce the NOTHING...");
                return;
            }
            
            if(!message.member.voiceChannel) {
            message.channel.sendMessage("I don't see you...");
            return;
            }

            if(!servers[message.guild.id]) server = servers[message.guild.id] = {
                queue: []
            }
            
            var server = servers[message.guild.id];

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });

            break;
        case "skip":
            var server = servers[message.guild.id];
            
            if(server.dispatcher) server.dispatcher.end();
            break;
        
        case "stop":
            var server = servers[message.guild.id];

            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;    

        //Not Music
       
        case "help":
            var embed = new Discord.RichEmbed()
                .addField("Commands without senses:", "origins, army, tell-a-story, say, doggos")
                .addField("Possible Role-Playing Commands", "kill, heal")
                .addField("'Useful' Commands", "dice, 8ball, info-me, ping")
                .addField("DANGER Unsafe/on Testing Commands", "play, skip, stop, wanted")
                .setFooter("Prefix = t? - Help request by " + message.author.username)
                .setColor([0, 255, 33])
            message.channel.sendEmbed(embed);
            break;
            
        case "tell-a-story":
            message.channel.sendMessage(Storys[Math.floor(Math.random() * Storys.length)]);
            break;  
        
        case "kill": 
            let UserToKill = args[1];
            message.channel.sendMessage(message.author.username  + " kill " + UserToKill);
            break;
        
        case "heal":
            let UserToHeal = args[1];
            message.channel.sendMessage(message.author.username + " Heal " + UserToHeal);
            break;

        case "say":
            let text = args.slice(1).join(" ");
            message.delete();
            message.channel.send(text);
            break;  
           
        case "doggos":
            var embed = new Discord.RichEmbed()
                .setImage(Doggos[Math.floor(Math.random() * Doggos.length)])
                .setTitle("Take this Doggo")
                .setColor([196, 90, 19])
                .setFooter("request by " + message.author.username)
            message.channel.sendEmbed(embed);
            break;
    
        case "wanted":
            let wantedRason = args[1]; 
            let wantedMoney = args[2];
            var embed = new Discord.RichEmbed()
                .setImage(message.author.avatarURL)
                .addField("         Wanted "+message.author.username, "         "+wantedRason)
                .setColor([198, 151, 55])
                .setFooter("         Reward: " + wantedMoney)
            message.channel.sendEmbed(embed);            
            break;

        default:
            message.channel.sendMessage("This command does not exist");
    }
});

bot.login(TOKEN);
