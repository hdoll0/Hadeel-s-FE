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
import "./CouponsDashBoard.css";

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
    <div className="coupon-dashboard">
      <h1>Coupons Dashboard</h1>
      <Button
        variant="contained"
        onClick={handleClick}
        className="create-button"
      >
        Create New Coupon
      </Button>
      <h2>List of Coupons</h2>
      <List className="coupon-list">
        {coupons.map((coupon) => (
          <ListItem key={coupon.couponId} className="coupon-item">
            <FormControl fullWidth>
              <p>Code: {coupon.code}</p>
              <p>Discount: {coupon.discountPercentage}%</p>
              <Button onClick={() => deleteCoupon(coupon.couponId)}>
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
        <FormControl fullWidth className="popover-content">
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
