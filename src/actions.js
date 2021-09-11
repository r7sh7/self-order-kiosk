import axios from "axios";
import { CATEGORY_LIST_FAILURE, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, ORDER_ADD_ITEM, ORDER_CLEAR, ORDER_REMOVE_ITEM, ORDER_SET_TYPE, PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, } from "./constants";

export const setOrderType = (dispatch, orderType) => {
       return dispatch({
            type: ORDER_SET_TYPE,
            payload: orderType
        });
};

export const listCategories = async (dispatch) => {
    dispatch({type: CATEGORY_LIST_REQUEST});
    try{
        const { data } = await axios.get('/api/categories');
        dispatch({type: CATEGORY_LIST_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: CATEGORY_LIST_FAILURE, payload: error.message});
    }
};

export const listProducts = async(dispatch, category) => {
    dispatch({type: PRODUCT_LIST_REQUEST});
    try{
        const { data } = await axios.get(`/api/products?category=${category}`);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: PRODUCT_LIST_FAILURE, payload: error.message});
    }
};

export const addToOrder = (dispatch, item) => {
    return dispatch({type: ORDER_ADD_ITEM, payload: item})
};

export const removeFromOrder = (dispatch, item) => {
    return dispatch({type: ORDER_REMOVE_ITEM, payload: item});
};


export const clearOrder = (dispatch) => {
    return dispatch({type: ORDER_CLEAR})
};
