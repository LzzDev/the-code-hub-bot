const client = require("../index");

client.on("guildMemberAdd", async (member) => {
    if (member.user.bot || !member.guild) return;

    member.roles.add(client.config.autoRoles);
});
