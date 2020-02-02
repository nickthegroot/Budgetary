import { ConversationFlow } from "./types"

const messages: ConversationFlow = {
    100: {
        message: "Well that's what I'm here for!",
        flags: {
            BANK_NOT_LINKED: {
                next: 111
            }
        },
        next: 120,
    },


    // --- START LINK SEQUENCE
    111: {
        message: "But first, I need to know what we're working with.",
        next: 112,
    },
    112: {
        message: "Link your bank account by clicking the button below.",
        action: "LINK_BANK",
        action_blocks: true,
        next: 113,
    },
    113: {
        message: "Sweet! We're all linked up.",
        next: 114,
    },
    114: {
        message: "Let's begin.",
        next: 120,
    },
    // --- END LINK SEQUENCE


    // --- START BUDGETING SEQUENCE
    120: {
        message: "Is there something you're currently saving for?",
        responses: [{
            message: "Yes",
            next: 121,
        }]
    },
    121: {
        message: "What is it?",
        responses: [{
            id: 'BUDGET_TITLE',
            input: 'string',
            next: 122,
        }]
    },
    122: {
        message: "How much does that go for these days?",
        responses: [{
            id: 'BUDGET_GOAL',
            input: 'number',
            next: 123,
        }]
    },
    123: {
        message: "Gotcha.",
        action: "GENERATE_BUDGET",
        next: 124,
        error: 130,
    },
    124: {
        message: "Well, according to my calculations, that could work!",
        next: 125,
    },
    125: {
        message: "Here's the budget I came up with (hover over a sector to get the category).",
        action: 'SHOW_BUDGET',
        next: 126
    },
    126: {
        message: "Is there anything else I can help you with?",
        responses: [{
            message: "Yes",
            next: 5,
        }]
    },



    130: {
        message: "Well, according to my calculations, that can't be done.",
        next: 131,
    },
    131: {
        message: "You simply don't have enough money that can be shifted around.",
        next: 132,
    },
    132: {
        message: "Is there something more reasonable you're saving for?",
        responses: [{
            message: "Yes",
            next: 121,
        }]
    }
}

export default messages
