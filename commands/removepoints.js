exports.run = (client, message, args) => {
    const dab = message.guild.emojis.cache.find(emoji => emoji.name === 'girls_last_dab');
    const distressed = message.guild.emojis.cache.find(emoji => emoji.name === 'distressed_roger');
    if (message.author.id != client.auth.bennett) {
        message.reply(`You aren't Bennett lmao ${dab}`)
        return;
    }
    if(!args[0]) {
        client.points.add(message.author.id, -5);
        let img = client.getpointimages(-5);
        console.log(img);
        message.channel.send(`Removed 5 Anime Club Points from ${message.author} ${distressed}`);
        message.channel.send({files: [img]});
    }
    else if(args[0] < 0) {
        message.reply(`Please use ${client.auth.prefix}addpoints instead.`);
        return;
    }
    else if(!args[1]) {
        client.points.add(message.author.id, 0-parseInt(args[0]));
        let img = client.getpointimages(0-parseInt(args[0]));
        console.log(img);
        let s="s"
        if (args[0]==1)
            s="";
        message.channel.send(`Removed ${args[0]} Anime Club Point${s} from ${message.author} ${distressed}`);
        if (img!="")
            message.channel.send({files: [img]});
    }
    else {
        let user = client.getUserFromMention(args[1]);
        client.points.add(user.id, 0-parseInt(args[0]));
        let img = client.getpointimages(0-parseInt(args[0]));
        console.log(img);
        let s="s"
        if (args[0]==1)
            s="";
        message.channel.send(`Removed ${args[0]} Anime Club Point${s} from ${user} ${distressed}`);
        if (img!="")
            message.channel.send({files: [img]});
    }
    
};
