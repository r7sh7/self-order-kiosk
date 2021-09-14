import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import Logo from "../components/Logo";
import { useStyles } from "../styles";

const PaymentScreen = (props) => {
    const styles = useStyles();
    return (  
        <Box className={[styles.root, styles.navy]}>
            <Box className={[styles.main, styles.center]}>
                <Box>
                    <Logo size={styles.largeLogo}/>
                    <Typography
                        gutterBottom
                        variant="h3"
                        component="h3"
                        className={styles.title}
                    >
                        Payment Screen 
                    </Typography>
                    <CircularProgress />
                </Box>
            </Box>
            <Box className={[styles.center, styles.space]}>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.largeButton}
                    onClick={() => props.history.push('/complete')}
                >
                    Done
                </Button>
            </Box>
        </Box>
    );
}
 
export default PaymentScreen;