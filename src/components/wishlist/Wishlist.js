import React from "react";
import WishListItem from "./WishListItem";
import "./WishListStyle.css";

function WishList(prop) {
  const { wishList } = prop;

  return (
    <div className="wishlist-page-container">
      <div className="wishlist-grid">
        {wishList.map((item) => {
          return <WishListItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default WishList;
