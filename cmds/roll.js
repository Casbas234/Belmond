const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new discord.RichEmbed()
    .setTitle("Roll a dice!")
    .setColor("#0ba333")
    .setDescription(":game_die: The dice shows **" + Math.floor(Math.random() * 6) + "**")    



message.channel.send(embed)
}

module.exports.help = {
    name: "roll",
    usage: "roll"
}
