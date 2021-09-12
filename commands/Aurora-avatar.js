const Discord = require('discord.js');
module.exports = {
    name: "avatar",
    run: async(client, message, args) => {
        message.react(client.config.tik)
let member = message.mentions.users.first() ||  message.guild.members.cache.get() || message.author;
message.channel.send(member.displayAvatarURL({ dynamic: true }));
 }
}