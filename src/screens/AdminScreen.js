import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useContext, useEffect } from "react";
import { listOrders } from "../actions";
import request from "../api";
import { Store } from "../store";
import { useStyles } from "../styles";

const AdminScreen = () => {
  const styles = useStyles();

  const { state, dispatch } = useContext(Store);
  const { orders, error, loading } = state.orderList;

  useEffect(() => {
    listOrders(dispatch);
  }, [dispatch]);

  const setOrderStateHandler = async (order, action) => {
    try {
      await request.put("/api/orders/" + order._id, {
        status: action,
      });
      listOrders(dispatch);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.main}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="Orders">
              <TableHead>
                <TableRow>
                  <TableCell>Order Number</TableCell>
                  <TableCell align="right">Price&nbsp;($)</TableCell>
                  <TableCell align="right">Count</TableCell>
                  <TableCell align="right">Items</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell align="right">State</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.number}>
                    <TableCell component="th" scope="row">
                      {order.number}
                    </TableCell>
                    <TableCell align="right">{order.total}</TableCell>
                    <TableCell align="right">
                      {order.orderItems.length}
                    </TableCell>
                    <TableCell align="right">
                      {order.orderItems.map((item) => (
                        <Box key={item.name}>
                          {item.name} x {item.quantity}
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell align="right">{order.orderType}</TableCell>
                    <TableCell align="right">{order.paymentType}</TableCell>
                    <TableCell align="right">
                      {order.inProgress
                        ? "In Progress"
                        : order.isReady
                        ? "Ready"
                        : order.isDelivered
                        ? "Delivered"
                        : "Unknown"}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOrderStateHandler(order, "ready")}
                      >
                        Ready
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOrderStateHandler(order, "cancel")}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOrderStateHandler(order, "delivered")}
                      >
                        Deliver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default AdminScreen;
