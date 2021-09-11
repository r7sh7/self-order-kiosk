import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Dialog, DialogTitle, Grid, List, ListItem, TextField, Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useContext, useEffect, useState } from "react";
import { addToOrder, clearOrder, listCategories, listProducts, removeFromOrder } from "../actions";
import Logo from "../components/Logo";
import { Store } from "../store";
import { useStyles } from "../styles";

export const OrderScreen = (props) => {
    
    
    const styles = useStyles();
    const[ categoryName, setCategoryName ] = useState('');
    const [ product, setProduct ] = useState({});
    const [ quantity, setQuantity ] = useState(1);
    const [ isOpen, setIsOpen ] = useState(false);

    
    const categoryClickHandler = (name) => {
        setCategoryName(name);
        listProducts(dispatch, categoryName);
    };


    const productClickHandler = (p) => {
        setProduct(p);
        setIsOpen(true);
    };

    const closeHandler = () => setIsOpen(false);

    const removeOrCancelOrder = () => {
        removeFromOrder(dispatch, product);
        setIsOpen(false);
    };

    const addToOrderHandler = () => {
        addToOrder(dispatch, {...product, quantity});
        setIsOpen(false);
    };

    const previewOrderHandler = () => {
        
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
            <Dialog maxWidth="sm" fullWidth={true} open={isOpen} onClose={closeHandler}>
                <DialogTitle className={styles.center}>
                    Add {product.name}
                </DialogTitle>
                <Box className={[styles.row, styles.center]}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={ quantity === 1 }
                        onClick={(e) => quantity > 1 && setQuantity(quantity-1)}
                    >
                        <RemoveIcon />
                    </Button>
                    <TextField 
                        inputProps={{className: styles.largeInput}}
                        InputProps={{
                            bar:"true",
                            inputProps: {
                                className: styles.largeInput
                            }
                        }}
                        className={styles.largeNumber}
                        type="number"
                        variant="filled"
                        min={1}
                        value={quantity}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => setQuantity(quantity + 1)}
                    >
                        <AddIcon />
                    </Button>
                </Box>
                <Box className={[styles.row, styles.around]}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={styles.largeButton}
                        onClick={removeOrCancelOrder}
                    >
                        {orderItems.find((x) => x.name === product.name) ? 'Remove From Order' : 'Cancel' }
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={styles.largeButton}
                        onClick={addToOrderHandler}
                    >
                        ADD To Order
                    </Button>
                </Box>
            </Dialog>
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