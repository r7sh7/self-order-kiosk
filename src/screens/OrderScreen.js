import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, List, ListItem, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useContext, useEffect, useState } from "react";
import { clearOrder, listCategories, listProducts } from "../actions";
import { DialogPopup } from "../components/DialogPopup";
import Logo from "../components/Logo";
import { Store } from "../store";
import { useStyles } from "../styles";

export const OrderScreen = (props) => {
    
    
    const styles = useStyles();
    const[ categoryName, setCategoryName ] = useState('');
    const [ product, setProduct ] = useState({});
    const [ isOpen, setIsOpen ] = useState(false);
    

    
    const categoryClickHandler = (name) => {
        setCategoryName(name);
        listProducts(dispatch, categoryName);
    };


    const productClickHandler = (p) => {
        setProduct(p);
        setIsOpen(true);
    };

    

    const previewOrderHandler = () => {
        props.history.push('/review');
    };

    const { state, dispatch } = useContext(Store);
    const { categories, loading, error } = state.categoryList;
    const { products, loading:loadingProducts, error:errorProducts } = state.productList;
    const { orderType, orderItems, tax, total, itemsCount } = state.order;
    

    useEffect(() => {
        if(!categories){
            listCategories(dispatch);
        }else{
            listProducts(dispatch, categoryName);
        }
    }, [dispatch, categories, categoryName]);


    return(
        <Box className={styles.root}>
            <DialogPopup 
                product={product}
                orderItems={orderItems}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dispatch={dispatch}
            />
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
                                loadingProducts ? ( <CircularProgress />) : (errorProducts ?
                                 (<Alert severity="error">{errorProducts}</Alert>) : ( 
                                    products.map((product) => (<Grid item md={6} key={product.name}>
                                        <Card className={styles.card} onClick={() => productClickHandler(product)}>
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
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box>
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
                                    clearOrder(dispatch);
                                    props.history.push('/');
                                }}
                            >
                                Cancel Order
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={styles.largeButton}
                                onClick={previewOrderHandler}
                            >
                                Done
                            </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}