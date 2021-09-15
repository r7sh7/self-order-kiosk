import { Box, CircularProgress, Grid, List, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useContext, useEffect } from "react";
import { listQueue } from "../actions";
import { Store } from "../store";
import { useStyles } from "../styles";


const QueueScreen = () => {
    const styles = useStyles();
    const { state, dispatch } = useContext(Store);
    const { queue, error, loading } = state.queueList;

    useEffect(() => {
        listQueue(dispatch);
    },[dispatch])
    
    return (  
        <Box className={styles.root}>
            <Box className={styles.main}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <Paper>
                                <Typography gutterBottom variant="h2" color="primary" >In Progress</Typography>
                                {queue.inProgressOrders.map((order) => (
                                    <List key={order.number}>
                                        <Typography variant="h2">{order.number}</Typography>
                                    </List>
                                ))}
                            </Paper>
                        </Grid>
                        <Grid item md={6}>
                            <Paper>
                                <Typography gutterBottom variant="h2" color="secondary" >Now Serving</Typography>
                                {queue.servingOrders.map((order) => (
                                    <List key={order.number}>
                                        <Typography variant="h2">{order.number}</Typography>
                                    </List>
                                ))}
                            </Paper>
                        </Grid>
                    </Grid>
                )
                }

            </Box>
        </Box>
    );
}
 
export default QueueScreen;