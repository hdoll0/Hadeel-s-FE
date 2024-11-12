import React from "react";
import Product from "./Product";
import ProductsPagination from "./productsPagination";
import "./Product.css";

export default function Products(prop) {
  const {
    productList,
    wishList,
    setWishList,
    totalCount,
    page,
    handleChange,
    cartList,
    setCartList,
  } = prop;

  return (
    <div>
      <div className="product-list">
        {productList.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              wishList={wishList}
              setWishList={setWishList}
              cartList={cartList}
              setCartList={setCartList}
            />
          );
        })}
      </div>

      <ProductsPagination
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
      />
    </div>
  );
}
