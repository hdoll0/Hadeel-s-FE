import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

export default function DashBoard() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      padding={4}
    >
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        maxWidth="300px"
      >
        <Button
          component={Link}
          to="/product-dashboard"
          variant="contained"
          color="primary"
          fullWidth
        >
          Products
        </Button>
        <Button
          component={Link}
          to="/user-dashboard"
          variant="contained"
          color="primary"
          fullWidth
        >
          Users
        </Button>
        <Button
          component={Link}
          to="/category-dashboard"
          variant="contained"
          color="primary"
          fullWidth
        >
          Categories
        </Button>
        <Button
          component={Link}
          to="/coupon-dashboard"
          variant="contained"
          color="primary"
          fullWidth
        >
          Coupons
        </Button>
        <Button
          component={Link}
          to="/order-dashboard"
          variant="contained"
          color="primary"
          fullWidth
        >
          Orders
        </Button>
      </Box>
    </Box>
  );
}
