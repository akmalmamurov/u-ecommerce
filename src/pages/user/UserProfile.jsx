import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlices";
import "./UserProfile.scss";
import { Box, Container } from "@chakra-ui/react";
import theme from "../../theme";
import { useGetClientQuery } from "../../redux/services/clientServices";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const { data, isLoading } = useGetClientQuery();
  const { register, handleSubmit, reset } = useForm();
  console.log(data);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        surname: data.surname || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
      });
    }
  }, [data, reset]);

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    console.log(formData);
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
                <div className="profile-control_group">
                  <div className="profile-control">
                    <label className="profile-label" htmlFor="surname">
                      Фамилия
                    </label>
                    <input
                      className="profile-input"
                      id="surname"
                      type="text"
                      {...register("surname")}
                    />
                  </div>
                  <div className="profile-control">
                    <label className="profile-label" htmlFor="name">
                      Имя
                    </label>
                    <input
                      className="profile-input"
                      id="name"
                      type="text"
                      {...register("name")}
                    />
                  </div>
                </div>
                <div className="profile-divider" />
                <div className="profile-control_group">
                  <div className="profile-control">
                    <label className="profile-label" htmlFor="email">
                      Электронная почта
                    </label>
                    <input
                      className="profile-input"
                      id="email"
                      type="text"
                      {...register("email")}
                    />
                  </div>
                  <div className="profile-control">
                    <label className="profile-label" htmlFor="phone_number">
                      Номер телефона
                    </label>
                    <input
                      className="profile-input"
                      id="phone_number"
                      type="text"
                      {...register("phone_number")}
                    />
                  </div>
                </div>
                <button type="submit">Сохранить</button>
              </form>
            </div>
          </div>
        </Box>
      </Container>

    </div>
  );
};

export default UserProfile;
