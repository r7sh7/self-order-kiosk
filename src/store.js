import { createContext, useReducer } from "react";
import { CATEGORY_LIST_FAILURE, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, SET_ORDER_TYPE } from "./constants"

//initial state
const initialState = {
    categoryList: {
        loading: true
    },
    order:{
        orderType: 'eat in',
    },
    productList: {
        loading: true
    }
}

//reducer function
const reducer = (state, action) => {
    switch(action.type){
        case SET_ORDER_TYPE:
            return {
                ...state, order:{ ...state.order, orderType:action.payload }
            };
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