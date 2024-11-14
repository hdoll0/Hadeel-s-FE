import React from "react";
import WishListItem from "../components/wishlist/WishListItem";

function WishListPage(prop) {
  const { wishList, setWishList } = prop;
  const removeItemWishList = (id) => {
    const updatedWishList = wishList.filter((item) => item.id !== id);
    setWishList(updatedWishList);
  };

  if (wishList.length === 0) {
    return (
      <div>
        <h3>Wishlist Is Empty! </h3>
      </div>
    );
  }

  return (
    <div>
      {wishList.map((item) => (
        <WishListItem
          key={item.id}
          item={item}
          removeItemWishList={removeItemWishList}
        />
      ))}
    </div>
  );
}

export default WishListPage;
