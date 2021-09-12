import { Box, Button } from "@material-ui/core";
import { useContext } from "react";
import { Store } from "../store";
import { useStyles } from "../styles";

const OrderDetailsFooter = ({btnLeft, btnLeftHandler, btnRight, btnRightHandler}) => {
    const styles = useStyles();
    const { state } = useContext(Store);
    const { orderType, tax, total, itemsCount } = state.order;
    return (  
        <Box>
                    <Box className={[styles.bordered, styles.space]}>
                            My Order - {orderType} | Tax: ${tax} | Total: ${total} | Items: {itemsCount}
                    </Box>
                    <Box className={[styles.row, styles.around]}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={styles.largeButton}
                                onClick={() => {
                                    btnLeftHandler();
                                }}
                            >
                                {btnLeft}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={styles.largeButton}
                                onClick={btnRightHandler}
                            >
                                {btnRight}
                            </Button>
                    </Box>
                </Box>
    );
}
 
export default OrderDetailsFooter;