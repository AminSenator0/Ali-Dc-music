const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  handlemsg
} = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    let user = message.mentions.users.first() || client.user;
    if (user) {
      if (!user.bot) return interaction.reply({
        ephemeral: true,
        content: "<:20:1070256826903445524> You can't Invite a Normal user! **IT MUST BE A BOT**"
      })
      let button_public_invite = new MessageButton().setStyle('LINK').setLabel(handlemsg(client.la[ls].cmds.info.invite.buttons.public)).setURL("https://discord.gg/bht")
      let button_support_dc = new MessageButton().setStyle('LINK').setLabel(handlemsg(client.la[ls].cmds.info.invite.buttons.server)).setURL("https://discord.gg/bht")
      let button_invite = new MessageButton().setStyle('LINK').setLabel("Invite " + user.username).setURL(`https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot%20applications.commands`)
      //array of all buttons
      const allbuttons = [new MessageActionRow().addComponents([button_public_invite, button_support_dc, button_invite])]
      message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`Invite: __**${user.tag}**__`)
          .setDescription(`||[*Click here for an Invitelink without Slash Commands*](https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot)||`)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot%20applications.commands`)
          .setFooter(client.getFooter(`${user.username} | powered by amin_mp3`))
        ],
        components: allbuttons
      });
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
