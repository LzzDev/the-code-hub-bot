const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    aliases: ["h", "commands"],
    usage: 'help <command>',
    category: "Bot",
    description: "Return all commands, or one specific command!",
    run: async (client, message, args) => {
        const row = new client.discord.MessageActionRow()
            .addComponents(
                new client.discord.MessageButton()
                    .setLabel("The Code Hub")
                    .setStyle("LINK")
                    .setURL(client.config.mainGuildInvite)
            );

        if (!args[0]) {
            const botCommandsList = [];
            readdirSync(`./commands/Bot`).forEach((file) => {
                const filen = require(`../../commands/Bot/${file}`);
                const name = `\`${filen.name}\``
                botCommandsList.push(name);
            });

            const utilityCommandsList = [];
            readdirSync(`./commands/Utility`).forEach((file) => {
                const filen = require(`../../commands/Utility/${file}`);
                const name = `\`${filen.name}\``
                utilityCommandsList.push(name);
            });
            
            const verificationCommandsList = [];
            readdirSync(`./commands/Verification`).forEach((file) => {
                const filen = require(`../../commands/Verification/${file}`);
                const name = `\`${filen.name}\``
                verificationCommandsList.push(name);
            });

            const helpEmbed = new client.discord.MessageEmbed()
                .setTitle(`${client.user.username} Help`)
                .setDescription(`You can use \`${client.config.botPrefix}help <command>\` to see more info about the commands!`)
                .addField("🤖 - Bot Commands", botCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("🛠 - Utility Commands", utilityCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("🛡️ - Verification Commands", verificationCommandsList.map((data) => `${data}`).join(", "), true)
                .setColor(client.config.embedColor)
                .setFooter({
                    text: client.config.embedfooterText,
                    iconURL: client.user.avatarURL()
                });

            message.reply({ embeds: [helpEmbed], allowedMentions: { repliedUser: false }, components: [row] });
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

            if (!command) {
                message.reply({ content: `There isn't any command named "${args[0]}"`, allowedMentions: { repliedUser: false } });
            } else {
                let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage ? `${client.config.botPrefix}${command.usage}` : "No usage provided"
                let aliases = command.aliases || "No aliases provided"
                let category = command.category || "No category provided!"

                let helpCmdEmbed = new client.discord.MessageEmbed()
                    .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` Command`)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` },
                        { name: "Aliases", value: `${aliases}` },
                        { name: 'Category', value: `${category}` })
                    .setColor(client.config.embedColor)
                    .setFooter({
                        text: client.config.embedfooterText,
                        iconURL: client.user.avatarURL()
                    })

                message.reply({ embeds: [helpCmdEmbed], allowedMentions: { repliedUser: false } });
            }
        }
    },
}
