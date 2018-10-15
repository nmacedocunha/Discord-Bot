/* File that contains classified information that is usefull
for the the performance of this software. */
require('dotenv').load()

// Variables
const path = require('path')
const utils = require('./libs/utils.js')
const Discord = require('discord.js')

const client = new Discord.Client()
const commandsDir = path.join(__dirname, 'commands')
const botChannel = process.env.BOT_CHANNEL
const prefix = process.env.PREFIX

// Methods
client.on('ready', () => {
  client.commands = utils.loadCommands(commandsDir)
  console.log(`Ready ${client.user.tag}`)
})

// Event
// Reads every message on discord
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) { return }

  if (message.channel.type === 'text' && message.channel.name !== botChannel) {
    message.delete()
    message.author.send(`Please use the correct channel for bot commands. (#${botChannel})`)
  } else {
    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || utils.noopCommand

    command.execute(message, args)
  }
})

// Event
// Triggers on member joining discord
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === process.env.WELCOME_CHANNEL)

  if (!channel) { return }

  channel.send(`Welcome to this discord ${member}`)
  member.send('recebeu isto? say fuckin yay on chat')
})

// Event
// Triggers on member leaving discord
client.on('guildMemberRemove', member => {
  member.send('we didnt like you any way.. ')
})

client.login(process.env.BOT_TOKEN)
