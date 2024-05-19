import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlices";

const User = () => {
  const dispatch = useDispatch();
  return (
    <div>
      User
      <button onClick={() => dispatch(logoutUser())}>chiqish</button>
    </div>
  );
};

export default User;
