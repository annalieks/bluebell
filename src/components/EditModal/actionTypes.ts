export const EDIT_MESSAGE = 'EDIT_MESSAGE';
export const CANCEL_MESSAGE = 'CANCEL_MESSAGE';

interface EditMessageAction {
    type: typeof EDIT_MESSAGE,
    payload: {id: string, text: string}
}

interface CancelMessageAction {
    type: typeof CANCEL_MESSAGE
}