import { CONSTANTS } from '../actions';

let listID = 2;
let cardID = 5;

const initialState = [
    {
        id: `list-${0}`,
        title: "Monday plan",
        cards: [
            {
                id: `card-${0}`,
                text: "Grocery shopping"
            },
            {
                id: `card-${1}`,
                text: "Go out for picnic"
            }
        ]
    },
    {
        id: `list-${1}`,
        title: "Todos",
        cards: [
            {
                id: `card-${2}`,
                text: "Workout"
            },
            {
                id: `card-${3}`,
                text: "File ITR"
            },
            {
                id: `card-${4}`,
                text: "This is a test description for long texts in the card."
            }
        ]
    }
]

const listReducer = (state=initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                id: `list-${listID}`,
                title: action.payload,
                cards: []
            }
            listID += 1
            return [...state, newList];
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                id: `card-${cardID}`,
                text: action.payload.text,
            }
            cardID += 1
            const newState = state.map(list => {
                if(list.id === action.payload.listID){
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                }else{
                    return list
                }
            })

            return newState;
        }

        case CONSTANTS.DELETE_LIST: {
            const newState = state.filter((item) => item.id !== action.payload);
            return newState;
            }

        case CONSTANTS.DELETE_CARD: {
            const newState = state.map((element) => {
            return {...element, cards: element.cards.filter((card) => card.id !== action.payload)}
            })
            return newState;
            }

        case CONSTANTS.ON_DRAG:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;
            const newState = [...state];

            if(type==='list'){
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            if(droppableIdStart === droppableIdEnd){
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }

            if(droppableIdStart !== droppableIdEnd){
                const listStart = state.find(list => droppableIdStart===list.id)
                const card = listStart.cards.splice(droppableIndexStart, 1)
                const listEnd = state.find(list => droppableIdEnd===list.id)
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }

            return newState;

        default:
            return state;
    }
};

export default listReducer;