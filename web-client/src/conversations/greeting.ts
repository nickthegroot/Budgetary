import { ConversationFlow } from "./types"

const messages: ConversationFlow = {
    1: {
        message: "Hey! I'm Budgetary.",
        next: 2
    },
    2: {
        message: "I'm your new budget assistant. How are you doing?",
        responses: [{
            message: 'Good',
            next: 3,
        }, {
            message: 'Great!',
            next: 3,
        }, {
            message: 'Okay',
            next: 4,
        }]
    },
    3: {
        message: "Great to hear!",
        next: 5,
    },
    4: {
        message: "Well I'm here to change that!",
        next: 5,
    },
    5: {
        message: "What can I do for you today?",
        responses: [{
            message: "I'd like to create a budget",
            next: 100,
        }]
    }
}

export default messages
