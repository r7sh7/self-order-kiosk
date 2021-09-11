import { createContext, useReducer } from "react";
import { CATEGORY_LIST_FAILURE, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, ORDER_SET_TYPE, ORDER_ADD_ITEM, ORDER_REMOVE_ITEM, ORDER_CLEAR } from "./constants"

//initial state
const initialState = {
    categoryList: { loading: true },
    productList: { loading: true },
    order: {
        orderType: 'Eat in',
        orderItems: [],
    },
}

//reducer function
const reducer = (state, action) => {
    switch(action.type){
        case CATEGORY_LIST_REQUEST:
            return {
                ...state, categoryList:{ loading:true }
            };
        case CATEGORY_LIST_SUCCESS:
            return {
                ...state, categoryList:{ loading:false, categories:action.payload }
            };
        case CATEGORY_LIST_FAILURE: 
            return {
                ...state, categoryList:{ loading:false,  error:action.payload }
            };
        case PRODUCT_LIST_REQUEST:
                return {
                    ...state, productList:{ loading:true }
                };
        case PRODUCT_LIST_SUCCESS:
                return {
                    ...state, productList:{ loading:false, products:action.payload }
                };
        case PRODUCT_LIST_FAILURE: 
                return {
                    ...state, productList:{ loading:false,  error:action.payload }
                };
        case ORDER_SET_TYPE:
                return {
                    ...state, order:{ ...state.order, orderType:action.payload }
                };

        case ORDER_ADD_ITEM: {
            const item = action.payload;
            const existItem = state.order.orderItems.find(x => x.name === item.name);
            const orderItems = existItem ? state.order.orderItems.map(x => x.name === item.name ? item : x) : [...state.order.orderItems, item ];

            const itemsCount = orderItems.reduce((a, c) => a + c.quantity, 0);
            const itemsPrice = orderItems.reduce((a, c) => a + c.quantity * c.price, 0);

            const tax = Math.round(0.15 * itemsPrice);
            const total = Math.round(tax + itemsPrice);

            return{
                ...state, order: {...state.order, orderItems, itemsCount, tax, total }
            };
        }
        case ORDER_REMOVE_ITEM: {
            const item = action.payload
            const orderItems = state.order.orderItems.filter(x => x.name !== item.name);

            const itemsCount = orderItems.reduce((a, c) => a + c.quantity, 0);
            const itemsPrice = orderItems.reduce((a, c) => a + c.quantity * c.price, 0);

            const tax = Math.round(0.15 * itemsPrice);
            const total = Math.round(tax + itemsPrice);

            return{
                ...state, order: {...state.order, orderItems, itemsCount, tax, total}    
            };
        }   
        case ORDER_CLEAR: 
            return{
                ...state, order: { ...state.order, orderItems: [], tax: 0, total: 0, itemsCount: 0 },
            };

        default: 
            return state;
    }
}

//store provider - creating the context
export const Store = createContext();
export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <Store.Provider value={{state, dispatch}}>
            {props.children}
        </Store.Provider>
    );
}