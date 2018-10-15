const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')

const noopCommand = {
  execute () {}
}

function loadCommands (commandsDir) {
  const commands = new Discord.Collection()
  const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'))

  for (const file of commandFiles) {
    const command = require(path.join(commandsDir, file))
    commands.set(command.name, command)
  }  
  
  saveCommands(commands);
  
  return commands
}

function saveCommands(commands){
  let commandList = {
    commands: []
  };

  let data = []; 

  for(const cmd of commands){
    data.push(process.env.PREFIX + cmd[1].name);
  }

  commandList.commands = data;

  fs.writeFile('commands.json', JSON.stringify(commandList), 'utf-8', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

function noop () {}


module.exports = { loadCommands, noopCommand, noop }