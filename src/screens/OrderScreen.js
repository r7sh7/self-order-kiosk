import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, List, ListItem, Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab";
import { useContext, useEffect, useState } from "react";
import { listCategories, listProducts } from "../actions";
import Logo from "../components/Logo";
import { Store } from "../store";
import { useStyles } from "../styles";

export const OrderScreen = () => {
    
    
    const styles = useStyles();
    const[ categoryName, setCategoryName ] = useState('');

    const { state, dispatch } = useContext(Store);
    const { categories, loading, error } = state.categoryList;
    const { products, loading:loadingProducts, error:errorProducts } = state.productList;
    

    useEffect(() => {
        if(!categories){
            listCategories(dispatch);
        }else{
            listProducts(dispatch, categoryName);
        }
    }, [dispatch, categories, categoryName]);

    const categoryClickHandler = (name) => {
        setCategoryName(name);
        listProducts(dispatch, categoryName);
    };

    return(
        <Box className={styles.root}>
            <Box className={styles.main}>
                <Grid container>
                    <Grid item md={2}>
                        <List>
                            <ListItem button onClick={() => setCategoryName('')}>
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
                                                <ListItem button key={category.name} onClick={() => categoryClickHandler(category.name)}>
                                                    <Avatar alt={category.name} src={category.image} />
                                                </ListItem>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </List>
                    </Grid>
                    <Grid item md={10}>
                        <Typography gutterBottom component="h2" variant="h2" className={styles.title}>
                            {categoryName || 'Main Menu'}
                        </Typography>
                        <Grid container spacing={1}>
                            {
                                loadingProducts ? ( <CircularProgress />) : errorProducts ?
                                 ( <Alert severity="error">{errorProducts}</Alert>) : ( 
                                    products.map(product => ( <Grid item md={6} key={product.name}>
                                        <Card className={styles.card}>
                                            <CardActionArea>
                                                <CardMedia 
                                                    component="img"
                                                    image={product.image}
                                                    alt={product.name}
                                                    className={styles.media}
                                                />
                                            </CardActionArea>
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    component="p"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    {product.name}
                                                </Typography>
                                                <Box className={styles.cardFooter}>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="p"
                                                    >
                                                        {product.calorie} Cal
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textPrimary"
                                                        component="p"
                                                    >
                                                        ${product.price}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>))
                                ) 
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}