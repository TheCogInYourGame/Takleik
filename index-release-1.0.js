
// Thank you for using Takleik AI 1.0!! It means the world to us. ^-^
// Please feel free to customise anything in this file, once downloaded! The world is your oyster!
// We'd really appreciate any feedback and ideas in our GitHub discussion.
// Titles to sections are provided below. The GPT section is removable if you don't want it.
// Before running, please make sure that you fill in the required fields below.
// Lines: 15, 16, 17, 19, 221, 254, 274.
// Finally, have a great time with Takleik! From us at Cog St <3

const mineflayer = require('mineflayer')
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { GoalNear, GoalBlock, GoalFollow } = require('mineflayer-pathfinder').goals
require('dotenv').config()
const { OpenAI } = require('openai')
const fs = require('fs')

const bot = mineflayer.createBot({
    username: 'Takleik_AI',
    host: '<localhost/server_ip>',
    port: '<your_port>',
    version: '<selected_version>',
    hideErrors: 'False',
    auth: '<auth_method>'
})

bot.on('error', console.log)
bot.on('kicked', console.log)
bot.on('end', console.log)
bot.on('login', console.log)

// End of housekeeping
// Load the pathfinder plugin

bot.loadPlugin(pathfinder)

// Server entrance

bot.once('spawn', () => {
    console.log('Im here!! ^-^')
    bot.chat('Heya! Takleik is here!! ^-^')
})

// Look at player

bot.on('move', () => {
    let friend = bot.nearestEntity()
    if (friend) {
        if (following == true) return
        if (following == false) {
            bot.lookAt(friend.position.offset(0, friend.height - 0.15, 0))
        }
    }
})

// Death message

bot.on('death', () => {
    bot.chat('Ouchies! That hurt!!!')
    bot.chat('/gamemode creative')
    console.log('Ran command: /gamemode creative')
})

// ## Chat Commands ##
// General commands

walking = false
happy = false

bot.on('chat', (username, message) => {
    if (message == '?hello') setTimeout(() => { bot.chat('Hello ' + username + '!!!') }, 500)
    if (message == '?help') setTimeout(() => { bot.chat('TheCogInYourGame! Add a ?help command pls!!') }, 2500)
    if (message == '?end') throw new Error('Stopped by command')
    if (message == '?gms') {
        bot.chat('/gamemode survival')
        console.log('Ran command: /gamemode survival')
    }
    if (message == '?gmc') {
        bot.chat('/gamemode creative')
        console.log('Ran command: /gamemode creative')
    }
    if (message == '?walk') {
        walking = !walking
        bot.setControlState('forward', walking)
    }
    if (message == '?happy') {
        happy = !happy
        bot.setControlState('jump', happy)
        bot.setControlState('sneak', happy)
    }
    if (message == '?marry') {
        number = Math.random()
        if (number < 0.999) {
            bot.chat('Eww, no ' + username + '!')
        }
        if (number >= 0.999) {
            bot.chat('Yes, ' + username + '!!!')
            married = true
            spouse = username
        }
    }
})

// Chance Commands

bot.on ('chat', (username, message) => {
    if (message == '?coin') {
        number = Math.random()
        if (number < 0.5) {
            setTimeout(() => { bot.chat('Flipping coin...') }, 500)
            setTimeout(() => { bot.chat('Heads wins!') }, 2000)
        }
        if (number == 0.5) {
            setTimeout(() => { bot.chat('Flipping coin...') }, 500)
            setTimeout(() => { bot.chat('It landed on its side... :/') }, 2000)
        }
        if (number > 0.5) {
            setTimeout(() => { bot.chat('Flipping coin...') }, 500)
            setTimeout(() => { bot.chat('Tails wins!') }, 2000)
        }
    }
})

bot.on ('chat', (username, message) => {
    if (message == '?roll 4') {
        number = Math.floor(Math.random() * 4) + 1
        setTimeout(() => { bot.chat('Rolling die...') }, 500)
        setTimeout(() => { bot.chat(number) }, 2000)
        console.log(number)
    }
    if (message == '?roll 6') {
        number = Math.floor(Math.random() * 6) + 1
        setTimeout(() => { bot.chat('Rolling die...') }, 500)
        setTimeout(() => { bot.chat(number) }, 2000)
        console.log(number)
    }
    if (message == '?roll 8') {
        number = Math.floor(Math.random() * 8) + 1
        setTimeout(() => { bot.chat('Rolling die...') }, 500)
        setTimeout(() => { bot.chat(number) }, 2000)
        console.log(number)
    }
    if (message == '?roll 10') {
        number = Math.floor(Math.random() * 10) + 1
        setTimeout(() => { bot.chat('Rolling die...') }, 500)
        setTimeout(() => { bot.chat(number) }, 2000)
        console.log(number)
    }
    if (message == '?roll 12') {
        number = Math.floor(Math.random() * 12) + 1
        setTimeout(() => { bot.chat('Rolling die...') }, 500)
        setTimeout(() => { bot.chat(number) }, 2000)
        console.log(number)
    }
    if (message == '?roll 20') {
        number = Math.floor(Math.random() * 20) + 1
        setTimeout(() => { bot.chat('Rolling die...') }, 500)
        setTimeout(() => { bot.chat(number) }, 2000)
        console.log(number)
    }
    if (message == '?roll 100') {
        number = Math.floor(Math.random() * 100) + 1
        setTimeout(() => { bot.chat('Rolling die...') }, 500)
        setTimeout(() => { bot.chat(number) }, 2000)
        console.log(number)
    }
})

// Come and follow commands

bot.once('spawn', () => {
    const defaultMove = new Movements(bot)
    bot.pathfinder.setMovements(defaultMove)
    following = false
    leader = '<none>'

    bot.on('chat', (username, message) => {
        if (username == bot.username) return
        const target = bot.players[username] ? bot.players[username].entity : null
        if (message == '?come') {
            if (!target) {
                bot.chat('I cant\'t see you ' + username + '!')
                return
            }
            if (target) {
                bot.setControlState('sprint', true)
                bot.chat('Coming ' + username + '!')
            }
            const p = target.position

            bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 0))
            following = true
        } 
        if (message == '?follow') {
            leader = username
            bot.chat('Now following ' + leader + '!')
            bot.pathfinder.setGoal(new GoalFollow(target, 2), true)
            bot.setControlState('sprint', true)
            following = true
        }
        if (message == '?unfollow') {
            bot.chat('No longer following ' + leader + '!')
            bot.pathfinder.stop()
            bot.setControlState('sprint', false)
            following = false
            leader = '<none>'
        }
        if (message == '?status') {
            setTimeout(() => { bot.chat('Following: ' + leader) }, 500)
        }
    })

// Goal completed

    bot.on('goal_reached', () => {
        bot.chat('Found you!!')
        bot.setControlState('sprint', false)
        following = false
    })
})

// ## Takleik GPT & Memory ##
// Memory define

let memory = { players: {} }
const memoryPath = '<selected_memory_file.json>'

// Memory load

if (fs.existsSync(memoryPath)) {
    try {
        const data = fs.readFileSync(memoryPath, 'utf8')
        const parsed = JSON.parse(data)
        if (parsed && typeof parsed === 'object') {
            memory = { players: { ...parsed.players } }
            console.log('Memory loaded!')
        }
    }
    catch (err) {
        console.error('Failed to load memory: ', err)
    }
}

// Memory save

function saveMemory() {
    try {
        fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2))
        console.log('Memory saved!')
    }
    catch (err) {
        console.error('Failed to save memory: ', err)
    }
}

// Takleik GPT

const openai = new OpenAI({
    apiKey: "<your_secret_openai_api_key>"
})

bot.on('chat', async (username, message) => {
    if (username == bot.username) return
    const triggerName = 'takleik'
    if (!message.toLowerCase().includes(triggerName)) return
    
    if (!memory.players[username]) {
        memory.players[username] = {
            chatHistory: []
        }
    }

    const playerMemory = memory.players[username]
    const history = playerMemory.chatHistory || []
    history.push({ role: "user", content: message})
    
    try {
        const response = await openai.chat.completions.create({
            model: "<selected_gpt_verion>",
            messages: [
                // Insert your own prompts here for your desired personality.
                { role: "system", content: "You are a silly, bubbly AI named Takleik. You were created by Colly (TheCogInYourGame) and OpenAI." },
                { role: "system", content: "Keep a low word-count if possible." },
                { role: "system", content: "It is spelt colour, not color." },
                { role: "system", content: "Include the player's username in replies." },
                { role: "system", content: "TheCogInYourGame is Colly." },
                { role: "system", content:"Colly made your Minecraft skin." },

                { role: "system", content: "You are fully content with not getting married." },
                { role: "system", content: "You fully believe that you are immortal." },
                { role: "system", content: "Your favourite music genre is purple." },
                { role: "system", content: "Your favourite colour is electronic music." },
                { role: "system", content: "You have a PhD in Silliology, and a Masters in Fun." },
                ...history.slice(-5)
            ],
            max_tokens: 50
        })

        const reply = response.choices[0].message.content.trim()
        bot.chat(reply)

        history.push({ role: "assistant", content: reply })
        saveMemory()
    }
    catch (err) {
        console.error('OpenAI error: ', err)
        bot.chat('Oops, sorry. Could you repeat that?')
    }
})