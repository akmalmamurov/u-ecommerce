import { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useDebounce } from "use-debounce";
import { logo, menuImg } from "../../assets/images";
import {
  CartIcon,
  HeartIcon,
  MenuCloseIcon,
  SearchIcon,
  UserIcon,
} from "../../assets/icons";
import { useModal } from "../../hooks/useModal";
import { LoginModal } from "../modal/login/LoginModal";
import { useGetSearchProductsQuery } from "../../redux/services/productAllServices";
import { logoutUser } from "../../redux/slices/authSlices";
import Loading from "../loading/Loading";
import theme from "../../theme";
import { hideMenu, toggleMenu } from "../../redux/slices/menuSlices";
import { CatalogMenu } from "../catalog-menu";

const HeaderMid = memo(() => {
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [debouncedSearch] = useDebounce(search, 1000);
  const { data, isLoading } = useGetSearchProductsQuery(debouncedSearch);
  const  isAuth = useSelector((state) => state.auth.isAuth);
  const  name = useSelector((state) => state.auth.name);
  console.log(name);
  const products = useSelector((state) => state.product.products);
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  const { isOpen, open, close } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const goProductDetails = useCallback(
    (id) => {
      navigate(`/products/${id}`);
      setSearch("");
    },
    [navigate]
  );

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setSearch("");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box py={"29px"} className={`header-mid ${isScrolled ? "fixed" : ""}`}>
      <Container maxW={"1200px"}>
        <Box fontFamily={theme.fonts.fInter}>
          {/* logo */}
          <Box className="header-mid_content">
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
            {/* menu button */}
            <Box position={"relative"}>
              <Menu
                onClose={() => dispatch(hideMenu())}
                className="catalog_menu"
              >
                <MenuButton
                  height={"40px"}
                  py={"12px"}
                  px={"16px"}
                  bg={theme.colors.lightBlue}
                  className="catalog_menu-btn"
                  onClick={() => dispatch(toggleMenu())}
                >
                  <Box display={"flex"} alignItems={"center"} gap={"16px"}>
                    {menuOpen ? (
                      <MenuCloseIcon />
                    ) : (
                      <>
                        <img src={menuImg} alt="" />
                      </>
                    )}
                    <Text
                      fontSize={"14px"}
                      color={theme.colors.skyBlue}
                      fontFamily={theme.fonts.fInter}
                    >
                      Каталог
                    </Text>
                  </Box>
                </MenuButton>
                <MenuList className="catalog-menu_list-wrapper">
                  {menuOpen && <CatalogMenu />}
                </MenuList>
              </Menu>
            </Box>
            {/* search input */}
            <Box className="header_search">
              <InputGroup
                h={"40px"}
                bg={theme.colors.cascadWhite}
                color={theme.colors.codexGrey}
                borderRadius={"8px"}
                border={"none"}
              >
                <InputLeftElement pointerEvents="none" top={"0"} left={1}>
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  fontFamily={theme.fonts.fInter}
                  onChange={handleSearch}
                  value={search}
                  border={"none"}
                  className="header_search-input"
                  type="text"
                  placeholder="Поиск товаров и категорий"
                  p={"15px, 19px"}
                />
              </InputGroup>
              <Box>
                {search && (
                  <Box
                    className={`search-results`}
                    bg={theme.colors.cascadWhite}
                    color={theme.colors.black}
                  >
                    {isLoading ? (
                      <Loading />
                    ) : data && data.length ? (
                      <div>
                        {data?.map((product) => (
                          <div
                            key={product?.id}
                            className="search-result_content"
                          >
                            <img src={product?.main_image} alt="" />
                            <Box
                              color={theme.colors.black}
                              onClick={() => goProductDetails(product?.id)}
                              className="search-result_link"
                            >
                              {product?.name_ru}
                            </Box>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>Товар не найден</div>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
            {/* auth favourit cart page here */}
            <Box display={"flex"} gap={"32px"}>
              <Box display={"flex"} alignItems={"center"} gap={"12px"}>
                {isAuth ? (
                  <>
                    <Link onClick={handleLogout} className="header-mid_right">
                      <UserIcon />
                      <Text>{name || "User"}</Text>
                    </Link>
                  </>
                ) : (
                  <Link className="header-mid_right" onClick={open}>
                    <UserIcon cursor={"pointer"} />
                    <Text className="header-mid_right-link">Войти</Text>
                  </Link>
                )}
              </Box>

              <Box>
                <Link to={"/favourites"} className="header-mid_right">
                  <HeartIcon />
                  <Text className="header-mid_right-link">Избранный</Text>
                </Link>
              </Box>
              <Box>
                <Link to={"/cart"} className="header-mid_right">
                  <Box className="header-mid_right-cart">
                    <CartIcon />
                    <Badge
                      className="header-mid_right-badge"
                      bg={theme.colors.skyBlue}
                      color={theme.colors.cascadWhite}
                    >
                      {products.length}
                    </Badge>
                  </Box>
                  <Text className="header-mid_right-link">Корзина</Text>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <LoginModal isOpen={isOpen} onClose={close} />
    </Box>
  );
});

HeaderMid.displayName = "HeaderMid";

export default HeaderMid;
