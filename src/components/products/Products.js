import React from "react";
import Product from "./Product";
import ProductsPagination from "./productsPagination";

export default function Products(prop) {
  const { productList, wishList, setWishList, totalCount, page, handleChange } =
    prop;

  return (
    <div>
      <div className="productList">
        {productList.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              wishList={wishList}
              setWishList={setWishList}
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
