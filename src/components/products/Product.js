import React, { useState } from "react";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";

export default function Product(prop) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { product, wishList, setWishList, cartList, setCartList } = prop;

  function addToFav(product) {
    const isInclude = wishList.some((item) => item.id === product.id);
    if (!isInclude) {
      setWishList([...wishList, product]);
      setIsFavorited(true);
      setOpen(true);
    } else {
      setWishList(wishList.filter((item) => item.id !== product.id));
      setOpen(true);
      setIsFavorited(false);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function getRating(event, newValue) {
    setValue(newValue);
  }

  function addToCart(product) {
    const isInclude = cartList.some((item) => item.id === product.id);
    if (!isInclude) {
      setCartList([...cartList, { ...product, quantity: 1 }]);
    }
  }
  console.log(cartList, "cart");

  return (
    <div>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.price}$</p>

      <Button onClick={() => addToCart(product)}> ADD TO BAG</Button>

      <FavoriteIcon
        onClick={() => addToFav(product)}
        sx={{ color: isFavorited ? "red" : "black" }}
      />
      <Link to={`${product.id}`}>
        <ArrowForwardIosIcon />
      </Link>
      <br />
      <Rating name="simple-controlled" value={value} onChange={getRating} />
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={`A ${product.name} is add to wish list`}
      />
    </div>
  );
}
