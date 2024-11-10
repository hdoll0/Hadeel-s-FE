import { React, useEffect, useState } from "react";
import {
  Button,
  Popover,
  TextField,
  List,
  ListItem,
  FormControl,
} from "@mui/material";
import axios from "axios";

export default function CouponsDashBoard() {
  const [coupons, setCoupons] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [couponInfo, setCouponInfo] = useState({
    code: "",
    discountPercentage: 0,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Fetch all coupons
  const fetchCoupons = () => {
    axios
      .get("http://localhost:5125/api/v1/coupons")
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.log("Error fetching coupons:", error);
      });
  };

  // Open the popover for creating a new coupon
  const handleClick = (event) => {
    setCouponInfo({ code: "", discountPercentage: 0 });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "coupon-popover" : undefined;

  // Handle form changes
  const onChangeHandler = (event) => {
    setCouponInfo({ ...couponInfo, [event.target.name]: event.target.value });
  };

  // Create Coupon
  const createCoupon = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:5125/api/v1/coupons",
        {
          ...couponInfo,
          expire: new Date(new Date().setDate(new Date().getDate() + 7)),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Coupon Created Successfully!");
        fetchCoupons();
        handleClose();
      })
      .catch((error) => console.log("Error creating coupon:", error));
  };

  // Delete Coupon
  const deleteCoupon = (couponId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5125/api/v1/coupons/${couponId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Coupon Deleted Successfully!");
        fetchCoupons(); // Refresh the coupon list
      })
      .catch((error) => console.log("Error deleting coupon:", error));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>Coupon Dashboard</h1>
      <Button variant="contained" onClick={handleClick}>
        Create New Coupon
      </Button>
      <h2>List of Coupons</h2>
      <List style={{ width: "100%", maxWidth: "400px" }}>
        {coupons.map((coupon) => (
          <ListItem
            key={coupon.couponId}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            <FormControl fullWidth>
              <p>Code: {coupon.code}</p>
              <p>Discount: {coupon.discountPercentage}%</p>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteCoupon(coupon.couponId)}
                style={{ marginTop: "8px" }}
              >
                Delete
              </Button>
            </FormControl>
          </ListItem>
        ))}
      </List>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <FormControl fullWidth style={{ padding: "16px" }}>
          <TextField
            name="code"
            label="Coupon Code"
            variant="standard"
            value={couponInfo.code}
            helperText="Please enter the coupon code"
            onChange={onChangeHandler}
            fullWidth
          />
          <TextField
            name="discountPercentage"
            label="Discount Percentage"
            variant="standard"
            type="number"
            value={couponInfo.discountPercentage}
            helperText="Please enter the discount percentage"
            onChange={onChangeHandler}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={createCoupon}
            style={{ marginTop: "16px" }}
          >
            Create Coupon
          </Button>
        </FormControl>
      </Popover>
    </div>
  );
}
