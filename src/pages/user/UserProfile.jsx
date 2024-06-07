import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Box, Button, Container, Input, useToast } from "@chakra-ui/react";

import { useGetClientQuery, useUpdateClientMutation, } from "../../redux/services/clientServices";
import theme from "theme";
import "./UserProfile.scss";

const UserProfile = () => {
  const { data } = useGetClientQuery();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [updateClient, { isLoading }] = useUpdateClientMutation();
  const toast = useToast();

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

  const handleAlphaOnlyChange = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z]/gi, "");
  };

  const onSubmit = async (value) => {
    try {
      await updateClient(value).unwrap();
      toast({
        title: "Success",
        description: "We've updated your profile.",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.error("Error updating client:", error);
    }
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
                    <Input
                      className="profile-input"
                      id="surname"
                      type="text"
                      {...register("surname", {
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Фамилия может содержать только буквы",
                        },
                        onChange: handleAlphaOnlyChange,
                      })}
                    />
                    {errors.surname && (
                      <span className="error-message">
                        {errors.surname.message}
                      </span>
                    )}
                  </div>
                  <div className="profile-control">
                    <label className="profile-label" htmlFor="name">
                      Имя
                    </label>
                    <Input
                      className="profile-input"
                      id="name"
                      type="text"
                      {...register("name", {
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Имя может содержать только буквы",
                        },
                        onChange: handleAlphaOnlyChange,
                      })}
                    />
                    {errors.name && (
                      <span className="error-message">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="profile-divider" />
                <div className="profile-control_group">
                  <div className="profile-control">
                    <label className="profile-label" htmlFor="phone_number">
                      Номер телефона
                    </label>
                    <Input
                      className="profile-input"
                      id="phone_number"
                      type="text"
                      {...register("phone_number", {
                        readOnly: true,
                      })}
                      readOnly={isAuth}
                    />
                  </div>
                </div>
                <div className="profile-divider" />
                <Button
                  isLoading={isLoading}
                  className="profile-btn"
                  type="submit"
                >
                  Сохранить
                </Button>
              </form>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default UserProfile;
