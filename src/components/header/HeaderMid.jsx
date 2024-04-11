import {
  Box,
  Container,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  theme,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { logo } from "../../assets/images";
import {
  CartIcon,
  DropdownIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
} from "../../assets/icons";
import { useModal } from "../../hooks/useModal";
import { LoginModal } from "../modal/login/LoginModal";

const HeaderMid = () => {
  const {
    isopen: isRegisterOpen,
    open: onRegisterOpen,
    close: onRegisterClose,
  } = useModal();

  return (
    <Box py={"29px"} className="header-mid">
      <Container maxW={"1200px"}>
        <Box fontFamily={theme.fonts.fSF}>
          {/* logo */}
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
            {/* menu button */}
            <Box>
              <Menu>
                <MenuButton
                  height={"48px"}
                  bg={"#0074EB33"}
                  _hover={"#0074EB33"}
                  _active={"#0074EB33"}
                  py={"12px"}
                  px={"16px"}
                  className="category-toggle_btn"
                  as={IconButton}
                  aria-label="Options"
                  variant="outline"
                >
                  <Box display={"flex"} gap={"16px"}>
                    <DropdownIcon />
                    <Text fontSize={"18px"} color={"#9C9C9C"}>
                      Каталог
                    </Text>
                  </Box>
                </MenuButton>
                <MenuList>
                  <MenuItem command="⌘T">New Tab</MenuItem>
                </MenuList>
              </Menu>
            </Box>
            {/* search input */}
            <Box className="header_search" ml={{ base: 0, lg: 3 }}>
              <InputGroup
                w={"383px"}
                bg={"#F6F6F6"}
                color={"#9C9C9C"}
                borderRadius={"8px"}
                border={"none"}
                py={"4px"}
                px={"16px"}
              >
                <InputLeftElement pointerEvents="none" top={"1"}>
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  _focus={{ border: "none", outline: "none" }}
                  border={"none"}
                  fontSize={"18px"}
                  fontWeight={"400"}
                  className="header_search-input"
                  type="text"
                  placeholder="Поиск товаров и категорий"
                  p={"12px, 16px"}
                />
              </InputGroup>
            </Box>
            {/* auth favourit cart page here */}
            <Box display={"flex"} gap={"32px"} fontSize={"16px"}>
              <Box display={"flex"} alignItems={"center"} gap={"12px"}>
                <Link className="header-mid_right" onClick={onRegisterOpen}>
                  <UserIcon cursor={"pointer"} />
                  <Text>Выход</Text>
                </Link>
              </Box>
              <Box>
                <Link to={"/favourites"} className="header-mid_right">
                  <HeartIcon />
                  <Text>Избранный</Text>
                </Link>
              </Box>
              <Box>
                <Link to={"/cart"} className="header-mid_right">
                  <CartIcon />
                  <Text>Корзина</Text>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <LoginModal isOpen={isRegisterOpen} onClose={onRegisterClose} />
    </Box>
  );
};

export default HeaderMid;
