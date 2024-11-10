import React from "react";

export default function OrderDetail(prop) {
  const { item } = prop;

  return (
    <div>
      <img src={item.product.imageUrl} alt={item.product.name} />
      <p> Name: {item.product.name}</p>
      <p> Quantity: {item.quantity} </p>
      <p> Price: ${item.product.price} </p>
    </div>
  );
}
