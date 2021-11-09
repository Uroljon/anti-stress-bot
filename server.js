const TelegramBot = require("node-telegram-bot-api")
const { TOKEN } = require("./config")

const bot = new TelegramBot(TOKEN, {
    polling: true
})

bot.on("message", async (data) => {
    let keyboard = {
        keyboard: [
            [
                { text: "🎲" },
                { text: "🎯" },
                { text: "🎳" }
            ]
        ],
        resize_keyboard: true
    }
    if (data.text?.match(/(salom)/gi)) {
        bot.sendMessage(data.from.id, `Salom, ${data.from.username}. Qanday o'yin o'ynaymiz?`, {
            reply_markup: keyboard
        })
    }
    if (data.dice) {
        try {
            let user_id = data.from.id;
            let user_score = data.dice.value;
            let user_emoji = data.dice.emoji;
            let myTurn = await bot.sendDice(user_id, { emoji: `${user_emoji}` });
            let myScore = myTurn.dice.value;
            let winMessage = user_score === myScore ? "Durrang" : (user_score > myScore ? "Siz g'olib, yana urinib ko'raylik :|" : "Men yutdim. Hehe :)");

            setTimeout(() => {
                bot.sendMessage(data.from.id, winMessage, {
                    reply_markup: keyboard,
                })
            }, 3000)

        } catch (error) {
            console.log(error);
        }
    }
    console.log(data);
})

