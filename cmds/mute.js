module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You do not have permission to do that.");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!toMute) return message.reply("You must mention a user or their ID!");

    if (toMute.id === bot.id) return message.channel.send("...");
    if (toMute.id === message.author.id) return message.reply("WHAT ARE YOU TRYING TO DO, MUTING YOURSELF?!");
    if (toMute.highestRole.position >= message.member.highestRole.position) return message.reply("WHAT ARE YOU TRYING TO DO, MUTING SOMEONE HIGHER THAN YOU?! THAT'S LIKE SUSPENDING YOUR BOSS!");

    let role = message.guild.roles.find(r => r.name === "Muted by LigTek");
    if (!role) {
        try {
            role = await message.guild.createRole({
                name: "Muted",
                color: "#000",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    if (toMute.roles.has(role.id)) return message.reply(`${toMute} is already muted!`);

    await toMute.addRole(role);
    message.reply(`${toMute} is muted.`);
}

module.exports.help = {
    name: "mute",
    usage: "mute <mention/ID>"
}
