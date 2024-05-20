import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlices";
import { useGetMyOrderQuery } from "../../redux/services/orderServices";
import "./UserProfile.scss"
import { Box, Container } from "@chakra-ui/react";
import theme from "../../theme";

const UserProfile = () => {
  const { data, isLoading } = useGetMyOrderQuery();
  const dispatch = useDispatch();
  return (
    <div className="profile">
        <Container maxW={"1200px"}>
            <Box className="profile-content" fontFamily={theme.fonts.fInter}>
                <div className="profile-left">
                    <h1 className="profile-title">Профиль</h1>
                </div>
                <div className="profile-right">
                  <div className="profile-right_content">
                      <h1 className="profile-right_title">Мои данные</h1>
                      
                  </div>
                </div>
            </Box>


        </Container>


      <button onClick={() => dispatch(logoutUser())}>chiqish</button>
    </div>
  );
};

export default UserProfile;
