type Action =
    | 'GENERATE_BUDGET'
    | 'SHOW_BUDGET'
    | 'LINK_BANK'

type Flag =
    | 'BANK_NOT_LINKED'

type ResponseIds =
    | 'BUDGET_TITLE'
    | 'BUDGET_GOAL'

export interface ConversationMessage {
    message: string;
    next?: number;
    error?: number;
    responses?: {
        message?: string;
        input?: 'string' | 'number';
        id?: ResponseIds;
        next: number;
    }[],
    action?: Action;
    action_blocks?: boolean;
    flags?: {
        [key: string]: {
            next: number;
        }
    }
}

export interface ConversationFlow {
    [id: number]: ConversationMessage
}
