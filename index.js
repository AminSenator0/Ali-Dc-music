
/**********************************************************
 * @INFO  [TABLE OF CONTENTS]
 * 1  Import_Modules
   * 1.1 Validating script for advertisement
 * 2  CREATE_THE_DISCORD_BOT_CLIENT
 * 3  create_the_languages_objects
 * 4  Raise_the_Max_Listeners
 * 5  LOAD_the_BOT_Functions_and_events
 * 6  Login_to_the_Bot
 * 
 *   BOT CODED BY: TOMato6966 | https://milrato.dev
 *********************************************************/



/**********************************************************
 * @param {1} Import_Modules for this FIle
 *********************************************************/
const Discord = require("discord.js");
const colors = require("colors");
const enmap = require("enmap"); 
const fs = require("fs"); 
const config = require("./botconfig/config.json")

/**********************************************************
 * @param {2} CREATE_THE_DISCORD_BOT_CLIENT with some default settings
 *********************************************************/
const client = new Discord.Client({
  fetchAllMembers: false,
  failIfNotExists: false,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
  intents: [ 
    Discord.Intents.FLAGS.GUILDS,
     Discord.Intents.FLAGS.GUILD_MEMBERS, //shouldn't be needed so u can uncomment it
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_MESSAGES, //if u want to use slash commands u can uncomment this after deploying
  ],
  presence: {
    activities: [{
      name: `${config.status.text}`.replace("{prefix}", config.prefix), 
      type: config.status.type, url: config.status.url
    }],
    status: "online"
  }
});



/**********************************************************
 * @param {3} create_the_languages_objects to select via CODE
 *********************************************************/
client.la = { }
var langs = fs.readdirSync("./languages")
for(const lang of langs.filter(file => file.endsWith(".json"))){
  client.la[`${lang.split(".json").join("")}`] = require(`./languages/${lang}`)
}
Object.freeze(client.la)



/**********************************************************
 * @param {4} Raise_the_Max_Listeners to 25 (default 10)
 *********************************************************/
client.setMaxListeners(25);
require('events').defaultMaxListeners = 25;


const { Manager } = require('erela.js');


const nodes = [
  {
    "host": "lava-v3.ajieblogs.eu.org",
            "port": 80,
            "password": "https://dsc.gg/ajidevserver"
  },
];

client.manager = new Manager({
  nodes,
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.manager.init(client.user.id);
});

client.manager.on('nodeConnect', node => {
  console.log(`Node "${node.options.identifier}" connected`);
});

client.manager.on('nodeError', (node, error) => {
  console.error(`Node "${node.options.identifier}" error: ${error.message}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!playay')) {
    if (!message.member.voice.channel) {
      return message.reply("ابتدا باید وارد یک کانال صوتی شوی.");
    }

    const search = message.content.slice(6);
    let player = client.manager.players.get(message.guild.id);

    if (!player) {
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: true,
      });
    }

    if (player.state !== "CONNECTED") await player.connect();

    const result = await client.manager.search(search, message.author);

console.log("Search Result:", result);

if (!result || result.loadType === "NO_MATCHES") {
  return message.reply("هیچ نتیجه‌ای پیدا نشد.");
}


    if (result.loadType === "PLAYLIST_LOADED") {
      player.queue.add(result.tracks);
    } else {
      player.queue.add(result.tracks[0]);
    }

    if (!player.playing && !player.paused && player.queue.totalSize > 0) player.play();

    message.channel.send(`در حال پخش: **${result.tracks[0].title}**`);
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) return;

  // ساده‌ترین مثال دستور !play
  if (message.content.startsWith('!playy')) {
    const query = message.content.slice(6).trim();

    if (!message.member.voice.channel) {
      return message.channel.send('لطفا اول وارد یک کانال صوتی شو!');
    }

    try {
  const res = await client.manager.search(query, message.author);
  console.log('Search Result:', res);

  if (res.loadType === 'NO_MATCHES' || !res.tracks.length) {
    return message.channel.send('هیچ نتیجه‌ای پیدا نشد.');
  }

  const player = client.manager.create({
    guild: message.guild.id,
    voiceChannel: message.member.voice.channel.id,
    textChannel: message.channel.id,
    selfDeafen: true,
  });

  console.log('Player created:', player);

  if (!player.connected) await player.connect();
  console.log('Player connected');

  player.play(res.tracks[0]);
  console.log('Playback started');

  await message.channel.send(`در حال پخش: **${res.tracks[0].title}**`);

} catch (error) {
  console.error('Error in play:', error);
  message.channel.send('خطا در پخش موزیک');
}
  }
});


/**********************************************************
 * @param {5} LOAD_the_BOT_Functions_and_events 
*********************************************************/
Array("extraevents", "loaddb", "clientvariables", "command", "events", "erelahandler", "slashCommands").forEach(handler => {
  try{ require(`./handlers/${handler}`)(client); }catch (e){ console.warn(e) }
});


/**********************************************************
 * @param {6} Login_to_the_Bot
*********************************************************/
client.login(process.env.token || config.token);



/**********************************************************
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 *********************************************************/
