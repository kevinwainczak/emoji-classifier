export default class Emoji {
    constructor() {
        this.allEmojis = ['😍','💩','👻','🧠','💁‍','🌙','☀️','🍆','💰','💯'];
        this.unseenEmojis = this.allEmojis.slice();
        this.seenEmojis = [];
    }

    getRandomEmoji = () => {
        let min = Math.ceil(0);
        let max = Math.floor(this.unseenEmojis.length - 1);
        let index = Math.floor(Math.random() * (max - min + 1)) + min;
        const emoji = this.unseenEmojis.pop(index);
        this.seenEmojis.push(emoji);
        return emoji;
    }

    getAllEmojis = () => {
        return this.allEmojis.slice();
    }
}