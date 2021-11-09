const TelegramBot = require("node-telegram-bot-api")
const { TOKEN } = require("./config")
const express = require("express")
const app = express()

app.get("/", (req, res)=>{
    res.status(200).json({
        ok: true,
        message: "Server ishlayapti-ku"
    })
})

const bot = new TelegramBot(TOKEN, {
    polling: true
})

bot.on("message", async (data) => {
    let keyboard = {
        keyboard: [
            [
                { text: "🎲" },
                { text: "🎯" },
                { text: "🎳" },
            ],
            [
                { text: "⚽️" },
                { text: "🏀" },
                { text: "🎰" }
            ]
        ],
        resize_keyboard: true
    }
    if (data.text?.match(/(salom)/gi)) {
        bot.sendMessage(data.from.id, `Salom, ${data.from.first_name}. 👋`, {
            reply_markup: keyboard
        })
    } else if (data.dice) {
        try {
            let user_id = data.from.id;
            let user_score = data.dice.value;
            let user_emoji = data.dice.emoji;
            let myTurn = await bot.sendDice(user_id, { emoji: `${user_emoji}` });
            let myScore = myTurn.dice.value;
            // console.log(myScore);
            let winMessage = user_score === myScore ? "Durrang" : (user_score > myScore ? "Siz g'olib, yana urinib ko'raylik :|" : "Men yutdim. Hehe :)");

            setTimeout(() => {
                bot.sendMessage(data.from.id, winMessage, {
                    reply_markup: keyboard,
                })
            }, 3500)

        } catch (error) {
            console.log(error);
        }
    } else{
        bot.sendMessage(data.from.id, "Men bilan omadingizni sinab ko'ring. Birorta tugmani tanlang 👇🏻", {
            reply_markup: keyboard
        })
    }
    // console.log(data);
})

app.listen(8080, ()=>console.log("server started"))