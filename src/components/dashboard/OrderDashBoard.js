import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import NotFoundPage from "../../pages/NotFoundPage";

export default function OrderDashBoard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    fetchOrdersForUser();
  }, []);

  function fetchOrdersForUser() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5125/api/v1/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Fetching Faild");
        setLoading(false);
      });
  }

  const toggleExpand = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  if (error) {
    return <NotFoundPage message={error} />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="orders table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Original Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Estimated Arrival</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <TableRow>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => toggleExpand(order.id)}
                  >
                    {openOrderId === order.id ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userID}</TableCell>
                <TableCell>${order.originalPrice.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(order.estimatedArrival).toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={7}
                >
                  <Collapse
                    in={openOrderId === order.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box margin={2}>
                      <Typography variant="h6" gutterBottom component="div">
                        Order Details
                      </Typography>
                      <Table size="small" aria-label="order details">
                        <TableHead>
                          <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.orderDetails.map((detail) => (
                            <TableRow key={detail.product.id}>
                              <TableCell>{detail.product.id}</TableCell>
                              <TableCell>{detail.product.name}</TableCell>
                              <TableCell>{detail.quantity}</TableCell>
                              <TableCell>
                                ${detail.product.price.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
