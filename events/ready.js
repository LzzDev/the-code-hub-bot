const client = require("../index");

client.once("ready", () => {
    client.user.setActivity("over The Code Hub", {
        type: "WATCHING",
    });

    console.log(`[LOG] ${client.user.tag} is now online!`)
    console.log(`[LOG] Bot serving on Ready to serve in ${client.guilds.cache.size} servers`)
    console.log(`[LOG] Bot serving ${client.users.cache.size} users`)
});