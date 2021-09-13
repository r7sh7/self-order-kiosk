import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useContext, useEffect } from "react";
import { createOrder } from "../actions";
import Logo from "../components/Logo";
import { Store } from "../store";
import { useStyles } from "../styles";

const CompletedOrderScreen = (props) => {
    const styles= useStyles();

    const { state, dispatch } = useContext(Store);
    const { order } = state;
    const { error, loading, newOrder } = state.orderCreate;

    useEffect(() => {
        if(order.orderItems.length > 0){
            createOrder(dispatch, order);
        }
    }, [dispatch, order]);

    return (  
        <Box className= {[styles.root, styles.navy]}>
            <Box className={[styles.main, styles.center]}>
                <Box>
                    <Logo size={styles.largeLogo} />
                    {loading ? (
                        <CircularProgress></CircularProgress>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (
                        <>
                            <Typography
                                gutterBottom
                                className={styles.title}
                                variant="h3"
                                component="h3"
                            >
                                Your order has been placed
                            </Typography>
                            <Typography
                                gutterBottom
                                className={styles.title}
                                variant="h1"
                                component="h1"
                            >
                                Thank You!
                            </Typography>
                            <Typography
                                gutterBottom
                                className={styles.title}
                                variant="h3"
                                component="h3"
                            >
                                Your order number is {newOrder.number}
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>
            <Box className={[styles.center, styles.space]}>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.largeButton}
                    onClick={() => props.history.push('/')}
                >
                    Order Again
                </Button>
            </Box>
        </Box>
    );
}
 
export default CompletedOrderScreen;