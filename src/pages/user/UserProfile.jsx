import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlices";
import "./UserProfile.scss";
import { Box, Container } from "@chakra-ui/react";
import theme from "../../theme";
import { useGetClientQuery } from "../../redux/services/clientServices";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const { data, isLoading } = useGetClientQuery();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: data?.name || "",
      lastName: data?.lastName || "",
      phone_number: data?.phone_number || "",
    },
  });
  console.log(data);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
  };
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label htmlFor="firstName">Name</label>
                  <input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                  />
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Container>

      <button onClick={() => dispatch(logoutUser())}>chiqish</button>
    </div>
  );
};

export default UserProfile;
