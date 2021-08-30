import { Box, Card, CardActionArea, CardContent, CardMedia, Fade, Typography } from "@material-ui/core";
import Logo from "../components/Logo";
import { useStyles } from "../styles";

const ChooseOrderType = () => {
    const styles = useStyles();
    return (  
        <Fade in={true}>
            <Box className={[styles.root, styles.navy]}>
                <Box className={[styles.main, styles.center]}>
                    <Logo large />
                    <Typography variant="h3" component="h3" gutterBottom>
                        Where will you be eating today?
                    </Typography>
                    <Box className={styles.cards}>
                        <Card className={[styles.card, styles.space]}>
                            <CardActionArea>
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
                        <Card className={[styles.card, styles.space]}>
                            <CardActionArea>
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