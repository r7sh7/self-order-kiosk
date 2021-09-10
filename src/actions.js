import axios from "axios";
import { CATEGORY_LIST_FAILURE, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, SET_ORDER_TYPE } from "./constants";

export const setOrderType = (dispatch, orderType) => {
       return dispatch({
            type: SET_ORDER_TYPE,
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