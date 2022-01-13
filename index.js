process.on("unhandledRejection", event => {
    console.warn(`UNHANDLED PROMISE REJECTION: ${event}`);
});

process.on("uncaughtException", (err, origin) => {
    console.warn(`UNCAUGHT EXCEPTION: ${err}. Origin: ${origin}`);
})

const {
    Client,
    Collection
} = require("discord.js");

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ]
});

const Discord = require("discord.js");

require("dotenv").config()

module.exports = client;

client.discord = Discord;
client.commands = new Collection();
client.config = require("./config.json");
client.verification = new Collection();
client.verificationFailures = new Collection();

require("./handler")(client);

client.login(process.env.TOKEN);
