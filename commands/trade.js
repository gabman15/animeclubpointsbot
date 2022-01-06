exports.run = (client, message, args) => {
    const dab = message.guild.emojis.cache.find(emoji => emoji.name === 'girls_last_dab');
    const ozu = message.guild.emojis.cache.find(emoji => emoji.name === 'ozu');
    let target = message.author;

    if(!args[0]) {
       message.reply('trade [value] [recipient]')
       return
    }
    else if(args[0] < 0) {
        message.reply(`Please use positive value to trade.`);
        return;
    }
    else if (args[0] > client.points.getPoints(target.id)){
       message.reply('You have too few acp, come back when you are a bit richer')
       return
    }
    else if(!args[1]) {
       message.reply('trade [value] [recipient]')
       return
    }
    else {
        client.points.add(message.author.id, 0-args[0]);
        let img = client.getpointimages(0-parseInt(args[0]));
        console.log(img);
        let s="s"
        if (args[0]==1)
            s="";
        message.channel.send(`Removed ${args[0]} Anime Club Point${s} from ${message.author} `);


        let user = client.getUserFromMention(args[1]);
        client.points.add(user.id, args[0]);
        img = client.getpointimages(parseInt(args[0]));
        console.log(img);
        s="s"
        if (args[0]==1)
            s="";
        message.channel.send(`Added ${args[0]} Anime Club Point${s} to the stash of ${user} ${ozu}`);

    }

};
