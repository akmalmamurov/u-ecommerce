import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const { products, totalPrice } = location.state
    ? location.state
    : { products: [], totalPrice: 0 };

  console.log(products);

  return (
    <div>
      {products.length > 0 ? (
        <>
          {products.map((product, index) => (
            <div key={index}>
              <p>{product.name}</p>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))}
          <p>Total Price: {totalPrice}</p>
        </>
      ) : (
        <p>No products in the cart</p>
      )}
    </div>
  );
};

export default CheckoutPage;
