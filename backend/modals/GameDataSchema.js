import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameData = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    gameType: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    score: {
        type: String,
        default: false
    },
    timeTaken: {
        type: String,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const gameDataSchema = mongoose.model('gameData', gameData);
export default gameDataSchema;
