import { CONSTANTS } from "../actions";

export const addList = (title) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title
    };
};

export const deleteList = (id) => {
    return {
        type: CONSTANTS.DELETE_LIST,
        payload: id
    };
};

export const deleteCard = (cardId) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: cardId
    };
};

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: CONSTANTS.ON_DRAG,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    };
};