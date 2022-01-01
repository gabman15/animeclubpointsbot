//discord js imports
const { Op } = require('sequelize');
const { Collection, Client, Intents, MessageEmbed, MessageAttachment, Formatters } = require('discord.js');
const { Users } = require('./dbObjects.js');
const Enmap = require('enmap');
const fs = require('fs');
//const intents = new Intents(11280);
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Enmap();
const points = new Collection();


const auth = require("./auth.json");

client.auth=auth;
client.points=points;

client.getpointimages = function(num) {
    switch (num) {
    case 5:
        return "../images/plus5points.png";
    case 10:
        return "../images/plus10points.png";
    case 15:
        return "../images/plus15points.png";
    case -5:
        return "../images/minus5points.png";
    case -10:
        return "../images/minus10points.png";
    default:
        return "";
    }
}

client.getUserFromMention = function(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}



Reflect.defineProperty(points, 'add', {
	/* eslint-disable-next-line func-name-matching */
	value: async function add(id, amount) {
		const user = points.get(id);

		if (user) {
			user.points += Number(amount);
			return user.save();
		}

		const newUser = await Users.create({ user_id: id, points: amount });
		points.set(id, newUser);

		return newUser;
	},
});


Reflect.defineProperty(points, 'getPoints', {
	/* eslint-disable-next-line func-name-matching */
	value: function getPoints(id) {
		const user = points.get(id);
		return user ? user.points : 0;
	},
});



// When the client is ready, run this code (only once)
client.once('ready', async () => {
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => points.set(b.user_id, b));

	console.log('Ready!');
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    // If the file is not a JS file, ignore it (thanks, Apple)
    if (!file.endsWith(".js")) return;
    // Load the event file itself
    const event = require(`./events/${file}`);
    // Get just the event name from the file name
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    // without going into too many details, this means each event will be called with the client argument,
    // followed by its "normal" arguments, like message, member, etc etc.
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

// Login to Discord with your client's token
client.login(auth.token);

