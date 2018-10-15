module.exports = {
  name: 'help',
  description: 'Help commands',
  aliases: ['h'],
  usage: '[help]',
  cooldown: 5,
  execute (message, args) {
    const fs = require('fs');

    // Read from file
    fs.readFile('commands.json','utf8', function (err, data) {
      if (err) throw err;
      
      // Parse file information
      const jsonFile =  JSON.parse(data);
      
      // New Array
      let commandList = [];

      /*  Fill array with json commands
        {commands: ['a', 'b']}
      */
      commandList = jsonFile.commands;

      // Output info
      message.channel.send('Discord Commands');
      message.channel.send(commandList.join(" "));
    });
  }
}
