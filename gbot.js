const mineflayer = require('mineflayer')
const mcData=require("minecraft-data")("1.8.8")
const autoeat = require("mineflayer-auto-eat")

if (process.argv.length < 4 || process.argv.length > 6) {
  console.log('Usage : node gbot.js <host> <port> [<name>]')
  process.exit(1)
}

const bot = mineflayer.createBot({
  host: process.argv[2],
  port: parseInt(process.argv[3]),
  username: process.argv[4] ? process.argv[4] : 'echo',
  password: process.argv[5],
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
})

bot.once('spawn', function () {
  
  bot.loadPlugin(autoeat)
  bot.chat('/speedrun');
  bot.on("windowOpen", function(window) {
    console.log('Window:', window);
    bot.clickWindow(11, 0, 0)
  })});

bot.on('spawn', function() {
  bot.loadPlugin(require('mineflayer-autoclicker'))
  bot.autoclicker.start();
});

// Stop clicking..
bot.on('death', function() {
  bot.autoclicker.stop()
})

bot.once("spawn", () => {
  bot.autoEat.options.priority = "foodPoints"
  bot.autoEat.options.bannedFood = []
  bot.autoEat.options.eatingTimeout = 3
})

// The bot eats food automatically and emits these events when it starts eating and stops eating.

bot.on("autoeat_started", () => {
  console.log("Auto Eat started!")
})

bot.on("autoeat_stopped", () => {
  console.log("Auto Eat stopped!")
})

bot.on("health", () => {
  if (bot.food === 20) bot.autoEat.disable()
  // Disable the plugin if the bot is at 20 food points
  else bot.autoEat.enable() // Else enable the plugin again
})

bot.on('kicked', console.log);
bot.on('error', console.log);