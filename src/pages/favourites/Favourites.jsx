import { useSelector } from "react-redux";

const FavouritesPage = () => {
  const favourites = useSelector((state) => state.favourit.favourites);
  return (
    <div>
      <h2>Favourites</h2>
      {favourites.map((product) => (
        <div key={product.id}>
          <img src={product.main_image} alt="" />
          <p>{product.name_ru}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default FavouritesPage;
