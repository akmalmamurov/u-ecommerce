import React from "react";
import { useSelector } from "react-redux";
import "./Cart.scss";
const CartPage = () => {
  const products = useSelector((state) => state.product.products);

  return (
    <div>
      <h2>Cart</h2>
      {products.map((item) => (
        <div key={item.id}>
          <img src={item.main_image} alt={item.name_ru} />
          <h2>{item.name_ru}</h2>
          <p>{item.description_ru}</p>
          <p>{item.price} сум</p>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
