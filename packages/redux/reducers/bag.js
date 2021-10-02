import {
    SET_BAG,
    ADD_ITEM_BAG,
    REMOVE_ITEM_BAG
} from '../actions/bag';

const initialState = [];

export function setBag(state, action) {
    return action.payload;
}

export function addItem(state, action) {
    let exists = false;

    if (state) {
        for (const obj of state) {
            if (obj.id === action.item) {
                obj.amount++;
                exists = true;
            }
        }
    }

    if (!exists) {
        state.push({id: action.item, amount: 1});
    }

    localStorage.setItem("bag", JSON.stringify(state));
    window.dispatchEvent( new Event('storage') );
    return state;
}

export function RemoveItem(state, action) {
    for (const obj of state) {
        if (obj.id === action.idItem) {
            obj.amount--;

            if (obj.amount == 0) {
                state = state.filter(elm => elm.id !== action.idItem);
            }
        }
    }

    localStorage.setItem("bag", JSON.stringify(state));
    window.dispatchEvent( new Event('storage') );
    return state;
}

export function bagReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BAG: return setBag(state, action);
        case ADD_ITEM_BAG: return addItem(state, action);
        case REMOVE_ITEM_BAG: return RemoveItem(state, action);
        default: return state;
    }
}