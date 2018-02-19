const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    const embed1 = new Discord.RichEmbed();
    const embed2 = new Discord.RichEmbed();
    const embed3 = new Discord.RichEmbed();
    const embed4 = new Discord.RichEmbed();
    let member = message.mentions.members.first();
    let reason = args.join(" ").split(`<@${member.user.id}>`);
    if (!(message.member.roles.find(r => r.name == "Staff"))) {
        embed1.setDescription("You don't have permission to do this command!")
        .setColor("#8b0000")
        return message.channel.send({embed: embed1});
    }
    if (message.mentions.users.size == 0) {
        embed2.setDescription("You need to mention a user!")
        .setColor("#8b0000")
        return message.channel.send({embed: embed2});
    }
    if (reason.length == 0) {
        embed3.setDescription("You need to include a reason!")
        .setColor("#8b0000")
        return message.channel.send({embed: embed3});
    }
    embed4.setDescription(`${member} has been banned! 🔨`)
    .setColor("#00ff00")
    message.channel.send({embed: embed4});
    member.ban(reason);
}

module.exports.help = {
    name: "ban",
    usage: "ban [user] [reason]"
}