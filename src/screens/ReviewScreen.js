import { Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import { useContext, useState } from "react";
import { DialogPopup } from "../components/DialogPopup";
import Logo from "../components/Logo";
import OrderDetailsFooter from "../components/OrderDetailsFooter";
import { Store } from "../store";
import { useStyles } from "../styles";

export const ReviewScreen = (props) => {
    
    const styles = useStyles();
    const {state, dispatch} =  useContext(Store);
    const {orderItems, orderType} = state.order;

    const [ product, setProduct ] = useState({});
    const [ isOpen, setIsOpen ] = useState(false);

    const productClickHandler = (p) => {
        setProduct(p);
        setIsOpen(true);
    };

    const procedToCheckoutHandler = () => {
        props.history.push('/select-payment');
      };    

    return(
        <Box className={styles.root}>
            <Box className={[styles.main, styles.navy, styles.center]}>
            <DialogPopup 
                    product={product}
                    orderItems={orderItems}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    dispatch={dispatch}
                />
            <Box className={[styles.center, styles.column]}>
                <Logo size={styles.largeLogo}></Logo>
                    <Typography
                        gutterBottom
                        className={styles.title}
                        variant="h3"
                        component="h3"
                    >
                        Review my {orderType} order
                    </Typography>
                </Box>
                <Grid container>
                    {orderItems.map(orderItem => (
                        <Grid item md={12} key={orderItem.name}>
                            <Card
                                className={styles.card}
                                onClick={() => productClickHandler(orderItem)}
                            >
                                <CardActionArea>
                                    <CardContent>
                                        <Box className={[styles.row, styles.between]}>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                color="textPrimary"
                                                component="p"
                                            >
                                                {orderItem.name}
                                            </Typography>
                                            <Button variant="contained">Edit</Button>
                                        </Box>
                                        <Box className={[styles.row, styles.between]}>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                component="p"
                                            >
                                                {orderItem.calorie}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textPrimary"
                                                component="p"
                                            >
                                                ${orderItem.price} x {orderItem.quantity}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid> 
                    ))}
                </Grid>
            </Box>
            <OrderDetailsFooter 
                    btnLeft="Back"
                    btnLeftHandler={() => props.history.push('/order')}
                    btnRight="Proceed To Checkout"
                    btnRightHandler={procedToCheckoutHandler}
                />
        </Box>
    );
}