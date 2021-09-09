import { Avatar, Box, CircularProgress, Grid, List, ListItem } from "@material-ui/core"
import { Alert } from "@material-ui/lab";
import { useContext, useEffect } from "react";
import { listCategories } from "../actions";
import Logo from "../components/Logo";
import { Store } from "../store";
import { useStyles } from "../styles";

export const OrderScreen = () => {
    
    const styles = useStyles();
    const { state, dispatch } = useContext(Store);
    const { categories, loading, error } = state.categoryList;
    useEffect(() => {
        listCategories(dispatch);
    }, [dispatch])
    return(
        <Box className={styles.root}>
            <Box className={styles.main}>
                <Grid container>
                    <Grid item md={2}>
                        <List>
                            <ListItem button>
                                <Logo size={styles.logo}/>
                            </ListItem>
                            {
                                loading ? (
                                    <CircularProgress />
                                ) : error ? (
                                    <Alert severity="error">{error}</Alert>
                                ) : (
                                    <div>
                                        {
                                            categories.map((category) => (
                                                <ListItem button key={category.name}>
                                                    <Avatar alt={category.name} src={category.image} />
                                                </ListItem>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </List>
                    </Grid>
                    <Grid item md={10}></Grid>
                </Grid>
            </Box>
        </Box>
    );
}