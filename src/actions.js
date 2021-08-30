export const setOrderType = (dispatch, orderType) => {
       return dispatch({
            type:'SET_ORDER_TYPE',
            payload: orderType
        });
};