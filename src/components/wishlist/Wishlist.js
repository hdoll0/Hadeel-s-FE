import React from "react";
import WishListItem from "./WishListItem";

function WishList(prop) {
  const { wishList } = prop;

  if (wishList.length === 0) {
    return <p> Wishlist is empty! </p>;
  }
  return (
    <div className="wishlist">
      {wishList.map((item) => {
        return <WishListItem key={item.id} item={item} />;
      })}
    </div>
  );
}

export default WishList;
