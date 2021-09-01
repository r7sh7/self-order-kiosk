import { Box, Card, CardActionArea, CardContent, CardMedia, Fade, Typography } from "@material-ui/core";
import { useContext } from "react";
import { setOrderType } from "../actions";
import Logo from "../components/Logo";
import { Store } from "../store";
import { useStyles } from "../styles";




const ChooseOrderType = (props) => {
    const styles = useStyles();

    const {dispatch} = useContext(Store);
    const chooseHandler = (orderType) => {
        setOrderType(dispatch, orderType);
        props.history.push('/order');
    }

    return (  
        <Fade in={true}>
            <Box className={`${styles.root} ${styles.navy}`}>
                <Box className={`${styles.main} ${styles.center}`}>
                    <Logo className={styles.largeLogo}/>
                    <Typography variant="h3" component="h3" gutterBottom>
                        Where will you be eating today?
                    </Typography>
                    <Box className={styles.cards}>
                        <Card className={`${styles.card} ${styles.space}`}>
                            <CardActionArea onClick={() => chooseHandler('eat in')}>
                                <CardMedia 
                                    component='img'
                                    alt='Eat In'
                                    image='/images/eatin.png'
                                    className={styles.media}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h4"
                                        color="textPrimary"
                                        component="p"
                                    >
                                        Eat In
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className={`${styles.card} ${styles.space}`}>
                            <CardActionArea onClick={() => chooseHandler('take out')}>
                                <CardMedia 
                                    component='img'
                                    alt='Take Out'
                                    image='/images/takeout.png'
                                    className={styles.media}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h4"
                                        color="textPrimary"
                                        component="p"
                                    >
                                        Take Out
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
 
export default ChooseOrderType;