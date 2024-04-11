// Assuming this is your Navbar component

import { useDispatch, useSelector } from "react-redux";
import request from "../../server";
import { useEffect } from "react";
import { setCategories } from "../../redux/slices/navbarSlice"; 

const Navbar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.navbar);

  const getCategories = async () => {
    try {
      const {data} = await request.get("/api/category");
      dispatch(setCategories(data)); 
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, [dispatch]);

  return (
    <div>
      {categories && categories.map((el) => {
        return <div key={el?.id}>{el?.name}</div>;
      })}
      asd
    </div>
  );
};

export default Navbar;
