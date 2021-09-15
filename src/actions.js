import axios from "axios";
import { CATEGORY_LIST_FAILURE, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, ORDER_ADD_ITEM, ORDER_CLEAR, ORDER_CREATE_FAILURE, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_LIST_FAILURE, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_REMOVE_ITEM, ORDER_SET_TYPE, PAYMENT_SET_TYPE, PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, SCREEN_SET_WIDTH, } from "./constants";

export const setPaymentType = (dispatch, paymentType) => {
    return dispatch({
        type: PAYMENT_SET_TYPE,
        payload: paymentType
    })
};


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
        return dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }catch(error){
        return dispatch({type: PRODUCT_LIST_FAILURE, payload: error.message});
    }
};

export const addToOrder = (dispatch, item) => {
    return dispatch({type: ORDER_ADD_ITEM, payload: item});
};

export const removeFromOrder = (dispatch, item) => {
    return dispatch({type: ORDER_REMOVE_ITEM, payload: item});
};


export const clearOrder = (dispatch) => {
    return dispatch({ type: ORDER_CLEAR });
};

export const createOrder = async (dispatch, order) => {
    dispatch({ type: ORDER_CREATE_REQUEST });
    try{
        // axios.post('/api/orders', order)
        //     .then((data) => dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })); 
        // dispatch({ type: ORDER_CLEAR });
        const { data } = await axios.post('/api/orders', order);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: ORDER_CLEAR });
    }catch(error){
        console.log(error);
        dispatch({ type: ORDER_CREATE_FAILURE, payload: error.message });
    }
};

export const listOrders = async (dispatch) => {
    dispatch({ type: SCREEN_SET_WIDTH })
    dispatch({ type: ORDER_LIST_REQUEST });
    try{
        const { data } = await axios.get('/api/orders');
        return dispatch({ type: ORDER_LIST_SUCCESS, payload: data});
    }catch(error){
        return dispatch({ type: ORDER_LIST_FAILURE, payload: error.message });
    }
};
