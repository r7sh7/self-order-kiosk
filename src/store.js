import { createContext, useReducer } from "react";
import { SET_ORDER_TYPE } from "./constants"

//initial state
const initialState = {
    order:{
        orderType: 'eat in',
    },
}

//reducer function
const Reducer = (state, action) => {
    switch(action.type){
        case SET_ORDER_TYPE:
            return {
                ...state, order:{ ...state.order, orderType:action.payload }
            };
        default: 
            return state;
    }
}

//store provider - creating the context
export const Store = createContext();
export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return(
        <Store.Provider value={{state, dispatch}}>
            {props.children}
        </Store.Provider>
    );
}