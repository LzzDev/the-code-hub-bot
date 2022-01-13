const client = require("../index");

client.once("ready", () => {
    if (client.config.sendSystemMessagesOnReady.howToVerify) {
        client.channels.cache.get(client.config.howToVerifyChannel).send({
            embeds: [{
                color: "#8a2be2",
                title: "How To Verify",
                thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                fields: [
                    {
                        name: "Open your DMs",
                        value: "Your DMs are required to be open for the verification process so that I can DM you a verification code. If your DMs are open and you are still experiencing DM errors from me when verifying, make sure I am not blocked."
                    },
                    {
                        name: "Get a verification code",
                        value: `Go to the <#${client.config.verifyChannel}> channel and type \`${client.config.botPrefix}verify\`. I will then DM you a message containing a verification code, if you did not receive a DM from me follow **step 1**.`
                    },
                    {
                        name: "Gain access",
                        value: `Using the verification code you received from me go to the <#${client.config.verifyChannel}> channel and type \`${client.config.botPrefix}verify <code>\`. If your code was correct you will be verified and will gain access to the rest of the server.`
                    }
                ].map((step, i) => Object.assign(step, {
                    name: `**${i + 1}. ${step.name}**`
                }))
            }]
        })
    }
    
    if (client.config.sendSystemMessagesOnReady.rules) {
        client.channels.cache.get(client.config.rulesChannel).send({
            embeds: [{
                color: "#8a2be2",
                title: "Rules",
                thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                fields: [
                    {
                        name: "Be civil and respectful",
                        value: "Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism or hate speech will be tolerated."
                    },
                    {
                        name: "No spam or self-promotion",
                        value: "No spam or self-promotion (server invites, advertisements etc) without permission from a staff member. This includes DMing fellow members."
                    },
                    {
                        name: "No NSFW or obscene content",
                        value: "No NSFW or obscene content. This includes text, images or links featuring nudity, sex, hard violence or other graphically disturbing content."
                    },
                    {
                        name: "Help keep things safe",
                        value: "If you see something against the rules or something that makes you feel unsafe, let staff know. We want this server to be a welcoming space!"
                    }
                ].map((rule, i) => Object.assign(rule, {
                    name: `**${i + 1}. ${rule.name}**`
                }))
            }]
        })
    }
    
    if (client.config.sendSystemMessagesOnReady.aboutTCH) {
        client.channels.cache.get(client.config.aboutChannel).send({
            embeds: [{
                color: "#8a2be2",
                title: "About",
                thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                description: "The Code Hub is a community server targeted at developers of all levels and backgrounds, we offer a place to hang out with other developers alike, a place to share almost anything including your programming projects and of course code support.",
            }]
        })
    }
    
    if (client.config.sendSystemMessagesOnReady.botCommands) {
        client.channels.cache.get(client.config.botCommandsChannel).send({
            embeds: [{
                color: "#8a2be2",
                title: "Bot Commands",
                thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                description: "This channel is for messages that are to directly command bots.",
            }]
        }).then(m => m.pin())
    }
    
    if (client.config.sendSystemMessagesOnReady.media) {
        client.channels.cache.get(client.config.mediaChannel).send({
            embeds: [{
                color: "#8a2be2",
                title: "Media",
                thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                description: "This channel is for messages that contain any media like images or videos.",
            }]
        }).then(m => m.pin())
    }
    
    if (client.config.sendSystemMessagesOnReady.suggestions) {
        client.channels.cache.get(client.config.suggestionsChannel).send({
            embeds: [{
                color: "#8a2be2",
                title: "Suggestions",
                thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                description: "This channel is for messages that contain any feedback on how or where we can improve, constructive criticism is welcomed.",
            }]
        }).then(m => m.pin())
    }
    
    if (client.config.sendSystemMessagesOnReady.staffInformation) {
        client.channels.cache.get(client.config.staffInformationChannel).send({
            embeds: [{
                color: "#8a2be2",
                title: "Staff Information",
                thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat lacus ut orci aliquam mattis. Phasellus sem neque, mattis non blandit eget, congue vel lectus. Nunc pharetra tortor leo, vitae pellentesque lacus pretium malesuada. Integer bibendum felis nec sem commodo hendrerit. Phasellus sagittis id felis dictum euismod. Nullam non sem elit. Phasellus lorem dolor, lobortis placerat eleifend in, suscipit et purus. Donec tempor commodo mi, eget cursus felis lacinia dignissim. Nam aliquet nulla ut nunc convallis, id dictum arcu aliquam. Quisque lorem risus, sagittis at lorem fermentum, sagittis suscipit leo. Fusce tincidunt quis nisi nec elementum. Maecenas sollicitudin, neque at pulvinar sagittis, odio enim vestibulum nunc, at efficitur magna augue ac orci. Sed sagittis laoreet metus, cursus congue massa elementum non. Vestibulum tempor scelerisque feugiat. Phasellus laoreet bibendum venenatis.",
            }]
        })
    }
    
    if (client.config.sendSystemMessagesOnReady.websiteProjects) {
        client.config.tchWebsites.map(website => client.channels.cache.get(client.config.websiteProjectsChannel).send({
            embeds: [{
                color: "#8a2be2",
                title: website.name,
                url: website.url,
                thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                description: website.description,
            }]
        }))
    }
    
    if (client.config.sendSystemMessagesOnReady.discordBotProjects) {
        client.config.tchDiscordBots.map(bot => client.channels.cache.get(client.config.discordBotProjectsChannel).send({
            embeds: [{
                color: "#8a2be2",
                title: bot.name,
                url: bot.clientID ? `https://discord.com/oauth2/authorize?client_id=${bot.clientID}&permissions=8&scope=bot` : bot.url,
                thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                description: bot.description,
            }]
        }))
    }
    
    if (client.config.sendSystemMessagesOnReady.discordServerProjects) {
        client.config.tchDiscordServers.map(server => client.channels.cache.get(client.config.discordServerProjectsChannel).send({
            embeds: [{
                color: "#8a2be2",
                title: server.name,
                url: server.invite,
                thumbnail: { url: client.guilds.cache.get(client.config.mainGuild).iconURL() },
                description: server.description,
            }]
        }))
    }
});
