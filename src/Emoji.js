export default class Emoji {
    constructor() {
        this.allEmojis = ['❤️','💩','👻','❌','🙃','🌙','🙂','⭐️','💰','💯'];
        this.unseenEmojis = this.allEmojis.slice();
        this.seenEmojis = [];
    }

    getRandomEmoji = () => {
        let min = Math.ceil(0);
        let max = Math.floor(this.unseenEmojis.length - 1);
        let index = Math.floor(Math.random() * (max - min + 1)) + min;
        const emoji = this.unseenEmojis.splice(index, 1);
        return emoji;
    }

    addSeenEmoji = (e) => {
        this.seenEmojis.push(e);
    }

    getAllEmojis = () => {
        return this.allEmojis.slice();
    }

    getSeenEmojis = () => {
        return this.seenEmojis.slice();
    }
}