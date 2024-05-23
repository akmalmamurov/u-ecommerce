import { Link } from "react-router-dom";
import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import "./Footer.scss";
import theme from "../../theme";
import {
  AppStoreIcon,
  FacebookIcon,
  GooglePlayIcon,
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
} from "../../assets/icons";
export const Footer = () => {
  return (
    <footer className="footer">
      <Container maxW={"1200px"}>
        <Box fontFamily={theme.fonts.fInter}>
          <Grid templateColumns={"repeat(4, 1fr)"} gap={6} mb={"48px"}>
            <GridItem>
              <Box className="footer-list">
                <Link className="footer-title">О нас</Link>
                <Link className="footer-link">Вакансии</Link>
              </Box>
            </GridItem>
            <GridItem>
              <Box className="footer-list">
                <Link className="footer-title">Пользователям</Link>
                <Link className="footer-link">Связаться с нами</Link>
                <Link to={"/faq"} className="footer-link">Вопрос-Ответ</Link>
              </Box>
            </GridItem>
            <GridItem>
              <Box className="footer-list">
                <Link className="footer-title">Для предпринимателей</Link>
                <Link className="footer-link">Продавайте на VOLTIFY</Link>
                <Link className="footer-link">Вход для продавцов</Link>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Link className="footer-title">Скачать приложение</Link>
                <Box display={"flex"} gap={"11px"} mt={"24px"} mb={"48px"}>
                  <Link>
                    <AppStoreIcon />
                  </Link>
                  <Link>
                    <GooglePlayIcon />
                  </Link>
                </Box>
                <Box mb={"8px"}>
                  <Text className="footer-title">VOLTIFY в соцсетях</Text>
                </Box>
                <Box display={"flex"} gap={"8px"}>
                  <Link>
                    <FacebookIcon />
                  </Link>
                  <Link>
                    <YoutubeIcon />
                  </Link>
                  <Link>
                    <TelegramIcon />
                  </Link>
                  <Link>
                    <InstagramIcon />
                  </Link>
                </Box>
              </Box>
            </GridItem>
          </Grid>
          <hr />
          <Box
            py={"24px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box display={"flex"} gap={"24px"}>
              <Text className="footer-title">
                Соглащение о конфиденциальности
              </Text>
              <Text className="footer-title">Пользовательское соглашение</Text>
            </Box>
            <Text className="footer-bottom-text">
            «2024© ООО VOLTIFY. ИНН 309376127. Все права защищены»
            </Text>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
