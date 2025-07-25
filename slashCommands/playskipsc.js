const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
const { handlemsg } = require(`${process.cwd()}/handlers/functions`);
    module.exports = {
  name: `playskipsc`,
  category: `🎶 Music`,
  aliases: [`pssc`, `playskipsoundcloud`],
  description: `Plays a song instantly from soundcloud, which means skips current track and plays next song`,
  usage: `playskipsc <Song / URL>`,
  parameters: {
    "type": "music",
    "activeplayer": false,
    "check_dj": true,
    "previoussong": false
  },
  options: [ 
		{"String": { name: "what_song", description: "What Song/Playlist do you want to play? <LINK/SEARCH-QUERY>", required: true }}, 
	],
  run: async (client, interaction, cmduser, es, ls, prefix, player, message) => {
    
    //
    // if (!client.settings.get(message.guild.id, "MUSIC")) {
    //   return message.reply({embeds : [new MessageEmbed()
    //     .setColor(es.wrongcolor)
    //     .setFooter(client.getFooter(es))
    //     .setTitle(client.la[ls].common.disabled.title)
    //     .setDescription(handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
    //   ]});
    // }
    try {
      let args = [interaction.options.getString("what_song")]
      if(!args[0]) args = [interaction.options.getString("song")]
      //if no args return error
      if (!args[0])
        return interaction.reply({embeds :[new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["playskipsc"]["variable1"]))
        ]});
      interaction.reply({content: `⏭️ Searching and attempting to play: **${args[0]}** from \`Soundcloud\`!`})
        //play the SONG from YOUTUBE
      playermanager(client, message, args, `skiptrack:soundcloud`, interaction);
    } catch (e) {
      console.log(String(e.stack).dim.bgRed)
      return interaction.reply({embeds :[new MessageEmbed()
        .setColor(es.wrongcolor)

        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["music"]["playskipsc"]["variable2"]))
      ]});
    }
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
