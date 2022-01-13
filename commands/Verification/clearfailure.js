module.exports = {
    name: "clearfailure",
    aliases: [],
    category: "Verification",
    description: "Clears the failed verification mark from a user so they can re-verify.",
    run: async (client, message, args) => {
        if (!args.length) return message.reply({
            content: `**${client.config.crossEmoji} - You need to provide a user.**`,
            allowedMentions: { repliedUser: false }
        }).then(msg => setTimeout(() => {
            msg.delete();
            message.delete();
        }, 60_000));

        const user = message.mentions.users.first() || message.guild.members.cache.find(member => (
            member.user.username.toLowerCase() == args.join(" ").toLowerCase() ||
            member.user.tag.toLowerCase() == args.join(" ").toLowerCase() ||
            member.user.id == args.join(" ") 
        ));
        if (!user) return message.reply({
            content: `**${client.config.crossEmoji} - I could not find that user.**`,
            allowedMentions: { repliedUser: false }
        }).then(msg => setTimeout(() => {
            msg.delete();
            message.delete();
        }, 60_000));


        client.verification.delete(user.id);
        client.verificationFailures.delete(user.id);

        message.reply({
            content: `**${client.config.tickEmoji} - ${user} can now re-verify.**`,
            allowedMentions: { repliedUser: false }
        }).then(msg => setTimeout(() => {
            msg.delete();
            message.delete();
        }, 60_000));
    },
}
