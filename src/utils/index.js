export const kFormatter = (num) => {
  const formattedPrice = Math.abs(num)
    .toString()
    .split("")
    .reverse()
    .reduce((acc, digit, index) => {
      return digit + (index !== 0 && index % 3 === 0 ? " " : "") + acc;
    }, "");
  return (num < 0 ? "-" : "") + formattedPrice + " сум";
};

export const headingFormatter = (text) => {
  text.trim();
  return text.length > 38 ? text.slice(0, 45) + "..." : text;
};

export const calculateTotalPrice = (products, checkedItems) => {
  let totalPrice = 0;
  let totalAdditionalPrice = 0;

  if (products) {
    products.forEach((item, index) => {
      if (checkedItems[index]) {
        totalPrice += item.price * item.quantity;
        totalAdditionalPrice += item.price;
      }
    });
  }

  return { totalPrice: totalPrice.toFixed(2), totalAdditionalPrice };
};
