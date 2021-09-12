import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Box, Button, Dialog, DialogTitle, TextField } from '@material-ui/core';
import { addToOrder, removeFromOrder } from '../actions';
import { useStyles } from '../styles';
import { useState } from 'react';

export const DialogPopup = ({product, isOpen, setIsOpen, orderItems, dispatch}) => {

    const styles = useStyles();

    const [ quantity, setQuantity ] = useState(1);

    
    const closeHandler = () => setIsOpen(false);

    const removeOrCancelOrder = () => {
        removeFromOrder(dispatch, product);
        setIsOpen(false);
    };

    const addToOrderHandler = () => {
        addToOrder(dispatch, {...product, quantity});
        setIsOpen(false);
    };

    return(
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
    );
};