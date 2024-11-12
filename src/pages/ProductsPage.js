import React from "react";

import Products from "../components/products/Products";
import Form from "../components/form/Form";
import PriceRangeForm from "../components/products/PriceRangeForm";
import "../components/products/Product.css";

function ProductsPage(prop) {
  const {
    productList,
    setUserInput,
    userInput,
    wishList,
    setWishList,
    totalCount,
    page,
    handleChange,
    setMinPrice,
    setMaxPrice,
    cartList,
    setCartList,
  } = prop;

  return (
    <div className="products-page">
      <div className="filter-section">
        <Form setUserInput={setUserInput} />
        <PriceRangeForm setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      </div>
      <Products
        productList={productList}
        userInput={userInput}
        wishList={wishList}
        setWishList={setWishList}
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
        cartList={cartList}
        setCartList={setCartList}
      />
    </div>
  );
}

export default ProductsPage;
