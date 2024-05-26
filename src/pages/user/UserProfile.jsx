import { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  useGetClientQuery,
  useUpdateClientMutation,
} from "../../redux/services/clientServices";
import theme from "../../theme";
import "./UserProfile.scss";

const UserProfile = () => {
  const { data } = useGetClientQuery();
  const { register, handleSubmit, reset } = useForm();
  console.log(data);
  const [updateClient] = useUpdateClientMutation();

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

  const onSubmit = (value) => {
    updateClient(value, {
      onSuccess: (data) => {
        console.log("Client updated successfully", data);
      },
      onError: (error) => {
        console.error("Error updating client:", error);
      },
    });
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
                <div className="profile-divider" />
                <button className="profile-btn" type="submit">
                  Сохранить
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default UserProfile;
