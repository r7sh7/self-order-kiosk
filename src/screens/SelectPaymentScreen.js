import { Box, Card, CardActionArea, CardMedia, CardContent, Fade, Typography } from "@material-ui/core";
import Logo from "../components/Logo";
import { useStyles } from "../styles";
import { useContext } from "react"
import { Store } from "../store";
import { setPaymentType } from "../actions";

const SelectPaymentScreen = (props) => {

    const styles = useStyles();
    const {dispatch} = useContext(Store);

    const selectHandler = (paymentType) => {
        setPaymentType(dispatch, paymentType);
        if(paymentType === 'Pay here'){
            props.history.push('/payment');
        }else{
            props.history.push('/complete');
        }
    };

    return (
        <Fade in={true}>
            <Box className={[styles.root, styles.navy]}>
                <Box className={[styles.main, styles.center]}>
                    <Logo size={styles.largeLogo} />
                    <Typography
                        gutterBottom
                        className={styles.title}
                        variant="h3"
                        component="h3"
                    >
                        Select Payment Type
                    </Typography>
                    <Box className={styles.cards}>
                        <Card className={[styles.card, styles.space]}>
                            <CardActionArea onClick={() => selectHandler('Pay here')}>
                                <CardMedia 
                                component="img"
                                alt="Pay here"
                                image="/images/payhere.png"
                                className={styles.media}
                                />
                                <CardContent>
                                    <Typography
                                    gutterBottom
                                    variant="h4"
                                    color="textPrimary"
                                    component="p"
                                    >
                                        PAY HERE 
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className={[styles.card, styles.space]}>
                            <CardActionArea onClick={() => selectHandler('At Counter')}>
                                <CardMedia 
                                component="img"
                                alt="At Counter"
                                image="/images/atcounter.png"
                                className={styles.media}
                                />
                                <CardContent>
                                    <Typography
                                    gutterBottom
                                    variant="h4"
                                    color="textPrimary"
                                    component="p"
                                    >
                                       AT COUNTER
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Fade>
    );
}
 

export default SelectPaymentScreen;