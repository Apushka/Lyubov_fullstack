import { contactsAPI } from "../api/api";

const MESSAGE_SENT = 'MESSAGE_SENT';

let initialState = {
    contacts: {
        sent: false
    }
}

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {

        case MESSAGE_SENT: {
            return {
                ...state,
                contacts: {...state.contacts, sent: action.value}
            }
        }
        default:
            return state
    }
}

export const sendMessageAC = (value) => ({ type: MESSAGE_SENT, value })

export const sendMessage = (message) => (dispatch) => {
    contactsAPI.sendMessage(message)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(sendMessageAC(true));
                setTimeout(() => {
                    dispatch(sendMessageAC(false))
                }, 5000);
            }
        })
}

export default contactsReducer;