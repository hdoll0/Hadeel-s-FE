import React from "react";
import WishListItem from "../components/wishlist/WishListItem";

function WishListPage(prop) {
  const { wishList, setWishList } = prop;
  const removeItemWishList = (id) => {
    const updatedWishList = wishList.filter((item) => item.id !== id);
    setWishList(updatedWishList);
  };

  if (wishList.length === 0) {
    return <p>Wishlist Is Empty</p>;
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
