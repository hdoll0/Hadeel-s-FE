import React, { useState } from "react";
import {
  Button,
  Popover,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

export default function ProductUpdate(prop) {
  const { product, fetchData, categoryList } = prop;

  const [anchorEl, setAnchorEl] = useState(null);
  const [updatedProductInfo, setUpdatedProductInfo] = useState({
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
    categoryId: "",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "product-update-popover" : undefined;

  const onChangeHandler = (event) => {
    setUpdatedProductInfo({
      ...updatedProductInfo,
      [event.target.name]: event.target.value,
    });
  };

  const updateProduct = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5125/api/v1/products/${product.id}`,
        updatedProductInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Product Updated Successfully!");
        setAnchorEl(null);
        fetchData();
      })
      .catch((error) => {
        console.log("Update Failed:", error);
      });
  };

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        Edit
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <TextField
          name="name"
          label="Name"
          variant="standard"
          value={updatedProductInfo.name}
          helperText="Please enter the product name"
          onChange={onChangeHandler}
        />
        <br />
        <TextField
          name="price"
          label="Price"
          variant="standard"
          type="number"
          value={updatedProductInfo.price}
          helperText="Please enter the product price"
          onChange={onChangeHandler}
        />
        <br />
        <TextField
          name="imageUrl"
          label="Image URL"
          variant="standard"
          value={updatedProductInfo.imageUrl}
          helperText="Please enter the product image URL"
          onChange={onChangeHandler}
        />
        <br />
        <TextField
          name="description"
          label="Description"
          variant="standard"
          value={updatedProductInfo.description}
          helperText="Please enter the product description"
          onChange={onChangeHandler}
        />
        <br />
        <FormControl fullWidth variant="standard">
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryId"
            value={updatedProductInfo.categoryId}
            onChange={onChangeHandler}
          >
            {categoryList.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <Button onClick={updateProduct}>Update Product</Button>
      </Popover>
    </div>
  );
}
