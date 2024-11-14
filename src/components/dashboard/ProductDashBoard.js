import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Popover,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { LinearProgress } from "@mui/material";
import NotFoundPage from "../../pages/NotFoundPage";
import ProductItem from "./ProductItem";
import ProductUpdate from "./ProductUpdate";
import "./ProductDashBoard.css";

export default function ProductDashBoard() {
  const [productResponse, setProductResponse] = useState({
    products: [],
    totalCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch products
  function fetchData() {
    axios
      .get(
        "http://localhost:5125/api/v1/products?limit=1000&offset=0&search=&minprice&maxprice=1000"
      )
      .then((response) => {
        setProductResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Fetching Data Failed");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);
  console.log(productResponse.products);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // fetch categories
  const [categoryList, setCategoryList] = useState([]);

  function fetchCategory() {
    let url = "http://localhost:5125/api/v1/category";
    axios
      .get(url)
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0,
    imageUrl: "",
    description: "",
    categoryId: "",
  });

  function onChangeHandler(event) {
    console.log(event, "event");
    setProductInfo({
      ...productInfo,
      [event.target.name]: event.target.value,
    });
  }
  console.log(productInfo, "infor");

  function createProduct() {
    const token = localStorage.getItem("token");
    const url = "http://localhost:5125/api/v1/products";
    axios
      .post(url, productInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("Product Is Created Successfully!");
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
    <div className="product-dashboard">
      <h1>Products Dashboard</h1>
      <Button
        aria-describedby={id}
        variant="contained"
        className="create-button"
        onClick={handleClick}
      >
        Create new product
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <div className="popover-content">
          <TextField
            name="name"
            label="Name"
            variant="standard"
            helperText="please Enter The Product Name"
            onChange={onChangeHandler}
          />
          <TextField
            name="price"
            label="Price"
            variant="standard"
            helperText="please Enter The Product Price"
            onChange={onChangeHandler}
          />
          <TextField
            name="imageUrl"
            label="Image link"
            variant="standard"
            helperText="please Enter The Product Image URL"
            onChange={onChangeHandler}
          />
          <TextField
            name="description"
            label="Description"
            variant="standard"
            helperText="please Enter The Product Description"
            onChange={onChangeHandler}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              labelId="categoryId"
              name="categoryId"
              value={productInfo.categoryId}
              onChange={onChangeHandler}
            >
              {categoryList.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={createProduct}>Add Product</Button>
        </div>
      </Popover>

      <h1>List of Products</h1>
      <div className="product-list">
        {productResponse.products.map((product) => (
          <div key={product.id} className="product-item">
            <ProductItem product={product} fetchData={fetchData} />
            <ProductUpdate
              product={product}
              fetchData={fetchData}
              categoryList={categoryList}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
