
let setMesagesRef = null;
let messages = [];

export const setMessagesState = (stateSetter) => {
    setMesagesRef = stateSetter;
}

export const unSetMessagesState = () => {
    setMesagesRef = null;
}

export const clearMessages = () => {
    messages = [];
}

export const setMessages = (message, userType) => {
    if (setMesagesRef === null)
        return;

    //create new value for new hash value
    messages = [
        ...messages,
        { message, userType }
    ];
    setMesagesRef(messages);
}