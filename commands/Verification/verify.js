const crypto = require("crypto");

module.exports = {
    name: "verify",
    aliases: [],
    category: "Verification",
    description: "Verify yourself to gain access to the rest of the guild",
    run: async (client, message, args) => {
        if (message.member.roles.cache.has(client.config.failedVerificationRole)) {
            return message.reply({
                content: `**${client.config.crossEmoji} - We cannot process your verification right now.**`,
                allowedMentions: { repliedUser: false }
            }).then(msg => setTimeout(() => {
                msg.delete();
                message.delete();
            }, 60_000));
        }


        if (args.length) {
            if (!client.verification.has(message.author.id)) {
                return message.reply({
                    content: `**${client.config.crossEmoji} - You have not yet requested verification, use \`${client.config.botPrefix}verify\` first.**`,
                    allowedMentions: { repliedUser: false }
                }).then(msg => setTimeout(() => {
                    msg.delete();
                    message.delete();
                }, 60_000));
            }


            const code = args[0];
            if (code.length != 4 || isNaN(parseFloat(code))) return message.reply({
                content: `**${client.config.crossEmoji} - Your verification code needs to be a 4 digit number.**`,
                allowedMentions: { repliedUser: false }
            }).then(msg => setTimeout(() => {
                msg.delete();
                message.delete();
            }, 60_000));

            const userCode = client.verification.get(message.author.id);
            if (code != userCode) {
                client.verificationFailures.set(message.author.id, (client.verificationFailures.has(message.author.id) ? client.verificationFailures.get(message.author.id) : 0) + 1);
                if (client.verificationFailures.get(message.author.id) >= client.config.verificationFailuresLockout) {
                    message.member.roles.add(client.config.failedVerificationRole);
                    message.member.roles.remove(client.config.unverifiedRole);

                    client.channels.cache.get(client.config.verificationFailuresChannel).send({
                        embeds: [{
                            color: "#8a2be2",
                            title: "Verification Failure",
                            thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                            description: `Ensure this user is not a bot and clear the users failure mark by using \`${client.config.botPrefix}clearfailure @user\`. This will allow them to use \`${client.config.botPrefix}verify\` again.`,
                            fields: [
                                {
                                    name: "User",
                                    value: message.author.toString(),
                                    inline: true
                                },
                                {
                                    name: "User Code",
                                    value: client.verification.get(message.author.id).toString(),
                                    inline: true
                                },
                                {
                                    name: "Last code entered",
                                    value: code.toString(),
                                    inline: true
                                }
                            ].map(x => Object.assign(x, { name: `**${x.name}**` }))
                        }],
                        content: "@everyone"
                    });

                    client.channels.cache.get(client.config.verificationFailedChannel).send(`**${client.config.crossEmoji} - ${message.author}, you are seeing this channel because you have failed my verification screening. You will now have to be manually verified by a member of The Code Hub staff.**`);
                    return;
                }

                return message.reply({
                    content: `**${client.config.crossEmoji} - The verification code you entered was incorrect.**`,
                    allowedMentions: { repliedUser: false }
                }).then(msg => setTimeout(() => {
                    msg.delete();
                    message.delete();
                }, 60_000));
            }

            client.verificationFailures.delete(message.author.id, 0);
            client.verification.delete(message.author.id);

            message.member.roles.add(client.config.memberRole);
            message.member.roles.remove(client.config.unverifiedRole);

            return message.reply({
                content: `**${client.config.verifiedEmoji} - ${message.author}, you have been verified.**`,
                allowedMentions: { repliedUser: false }
            }).then(msg => setTimeout(() => {
                msg.delete();
                message.delete();
            }, 60_000));
        }

        if (message.channel.id != client.config.verifyChannel) {
            return message.reply({
                content: `**${client.config.crossEmoji} - This command can only be used in <#${client.config.verifyChannel}>.**`,
                allowedMentions: { repliedUser: false }
            }).then(msg => setTimeout(() => {
                msg.delete();
                message.delete();
            }, 60_000));
        }

        if (client.verification.has(message.author.id)) {
            return message.reply({
                content: `**${client.config.crossEmoji} - You have already requested verification, check your DMs for your verification code. If you are stuck read <#${client.config.howToVerifyChannel}> on how to verify.**`,
                allowedMentions: { repliedUser: false }
            }).then(msg => setTimeout(() => {
                msg.delete();
                message.delete();
            }, 60_000));
        }

        const verificationCode = crypto.randomInt(client.config.minVerificationCode, client.config.maxVerificationCode);
        client.verification.set(message.author.id, verificationCode);

        try {
            message.author.send({
                content: `**The Code Hub - Verification\nYour verification code is \`${verificationCode}\`.\n\nIf you are stuck read <#${client.config.howToVerifyChannel}> on how to verify.**`,
                components: [
                    new client.discord.MessageActionRow()
                        .addComponents(
                            new client.discord.MessageButton()
                                .setLabel("The Code Hub")
                                .setStyle("LINK")
                                .setURL(client.config.mainGuildInvite)
                        )
                ]
            })

            message.reply({ content: `**Check your DMs for your verifiction code. If you are stuck read <#${client.config.howToVerifyChannel}> on how to verify.**` })
            .then(msg => setTimeout(() => {
                msg.delete();
                message.delete();
            }, 60_000));
        } catch (err) {
            client.verification.delete(message.author.id);

            return message.reply({
                content: `**${client.config.crossEmoji} - I was unable to DM you. Make sure your DMs are open and re-run \`${client.config.botPrefix}verify\`. If you are stuck read <#${client.config.howToVerifyChannel}> on how to verify.**`,
                allowedMentions: { repliedUser: false }
            }).then(msg => setTimeout(() => {
                msg.delete();
                message.delete();
            }, 60_000));
        }
    },
}
