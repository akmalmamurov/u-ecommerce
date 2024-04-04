import { Box, Container, Text } from "@chakra-ui/react";
import theme from "../../theme";
import { RuFlagIcon } from "../../assets/icons";
import "./Header.scss";
const HeaderTop = () => {
  return (
    <div>
      <Box bg={"#F2F4F8"} py={"16px"}>
        <Container maxW={"1200px"}>
          <Box
            className=""
            fontFamily={theme.fonts.fSF}
            fontSize={{ base: "11", md: "13", lg: "15px", xl: "16px" }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display="flex" alignItems={"center"} gap="24px">
              <button>
                <svg
                  width={18}
                  height={22}
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 21C13 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 5 17 9 21Z"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <Box className="header-top_left" gap={"2px"}>
                <Text>Город:</Text>
                <Text cursor={"pointer"}>Ташкент</Text>
              </Box>
              <Text>Пунтк выдачи</Text>
            </Box>
            <Box display={{ base: "none", md: "block" }}>
              <Text color={" #8B8E99"}>
                Доставим ваш товар бесплатно - всего за 1 день
              </Text>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"16px"}>
              <Text cursor={"pointer"}>Вопрос-ответ</Text>
              <Text cursor={"pointer"}>Мои заказы</Text>
              <Box
                cursor={"pointer"}
                display={"flex"}
                alignItems={"center"}
                gap={"2px"}
              >
                <Box display={{ base: "none", md: "block" }}>
                  <RuFlagIcon />
                </Box>
                <Text>Русский</Text>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default HeaderTop;
