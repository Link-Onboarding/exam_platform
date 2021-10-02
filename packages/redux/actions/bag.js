export const SET_BAG = 'SET_BAG';
export const ADD_ITEM_BAG = 'ADD_ITEM_BAG';
export const REMOVE_ITEM_BAG = 'REMOVE_ITEM_BAG';

export function setBag(payload) {
    return {
        type: SET_BAG,
        payload: payload
    };
}

export function addItem(item) {
    return {
        type: ADD_ITEM_BAG,
        item: item
    };
}

export function removeItem(item) {
    return {
        type: REMOVE_ITEM_BAG,
        idItem: item,
    };
}