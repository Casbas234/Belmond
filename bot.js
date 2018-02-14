const discord = require("discord.js");
const config = require("./config.json"); //Config.json contains the token and prefix
const fs = require('fs');

const message = "msg";

fs.readdir("./cmds/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) return console.log("No commands found.");

    console.log(`Loading ${jsfiles.length} commands...`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}. ${f} loaded.`);
        bot.commands.set(props.help.name, props);
    });
});

const bot = new discord.Client();
bot.commands = new discord.Collection();
 
bot.on("ready", async () => {
    console.log(`Token: ${config.token}`);
    console.log(`Prefix: ${config.prefix}`);
    console.log(`Ready! Logged in as ${bot.user.tag}.`);
    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }

    bot.user.setGame(require("./setgame.txt"))
    bot.user.setStatus("Online");
});
 
 
 
bot.on("message", async function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    if (message.channel.type === "dm") return message.reply("Commands not available via DM.");
 
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = bot.commands.get(command);
    if (cmd) cmd.run(bot, message, args);
})

bot.login(config.token)
