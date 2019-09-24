import * as actionTypes from "../actions";
const storageLists = JSON.parse(localStorage.getItem("aliShop"));
const initialState = {
    shoppingLists: { ...storageLists },
    selectedListId: ""
};

const reducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case actionTypes.LIST_CREATE:
            const newId = Math.random().toString() + action.listName;
            const newList = {
                name: action.listName,
                products: []
            };
            newState = {
                shoppingLists: {
                    ...state.shoppingLists,
                    [newId]: newList
                },
                selectedListId: newId
            }
            break;
        case actionTypes.LIST_DELETE:
            const lists = {...state.shoppingLists};
            delete lists[action.id];
            newState = {
                ...state,
                shoppingLists: {...lists}
            };
            break;
        case actionTypes.FETCH_LISTS:
            newState = {
                ...state,
                shoppingLists: {
                    ...action.lists
                }
            };
            break;
        case actionTypes.ITEM_ADD:
            newState = {
                ...state,
                shoppingLists: {
                    ...state.shoppingLists,
                    [action.listId]: {
                        ...state.shoppingLists[action.listId],
                        products: [
                            {
                                id: Math.random().toString(),
                                name: action.productName,
                                purchased: false
                            },
                            ...state.shoppingLists[action.listId].products
                        ]
                    }
                }
            };
            break;
        case actionTypes.ITEM_TOGGLE_PURCHASING: {
            const products = state.shoppingLists[state.selectedListId].products;
            const productIndex = products.findIndex(prd => prd.id === action.itemId);
            products[productIndex].purchased = !products[productIndex].purchased;
            newState = {
                ...state,
                shoppingLists: {
                    ...state.shoppingLists,
                    [state.selectedListId]: {
                        ...state.shoppingLists[state.selectedListId],
                        products: [...products]
                    }
                }
            };
        };
        break;
        case actionTypes.SELECT_LIST:
            newState = {
                ...state,
                selectedListId: action.id
            };
            break;
        default:
            newState = { ...state };
            break;
    };
    localStorage.setItem("aliShop", JSON.stringify({...newState.shoppingLists}));
    return {
        ...newState
    };
};

export default reducer;