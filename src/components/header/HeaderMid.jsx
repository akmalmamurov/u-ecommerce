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
  InputRightElement,
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
  ProductModalCloseIcon,
  SearchIcon,
  UserIcon,
} from "../../assets/icons";
import { useModal } from "../../hooks/useModal";
import { LoginModal } from "../modal/login/LoginModal";
import { useGetSearchProductsQuery } from "../../redux/services/productAllServices";
import Loading from "../loading/Loading";
import theme from "../../theme";
import { hideMenu, toggleMenu } from "../../redux/slices/menuSlices";
import { CatalogMenu } from "../catalog-menu";
import "./Header.scss";
import HeaderMenu from "./header-menu/HeaderMenu";
import { useGetSearchCategoryQuery } from "../../redux/services/categoryServices";

const HeaderMid = memo(() => {
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [debouncedSearch] = useDebounce(search, 1000);
  const { data: productsData, isLoading: isLoadingProducts } =
    useGetSearchProductsQuery(debouncedSearch);
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetSearchCategoryQuery(debouncedSearch);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const products = useSelector((state) => state.product.products);
  const favourites = useSelector((state) => state.favourit.favourites);
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  const { isOpen, open, close } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const goProductDetails = useCallback(
    (id) => {
      navigate(`/products/${id}`);
      setSearch("");
    },
    [navigate]
  );

  const goCategoryDetails = useCallback(
    (id, name) => {
      navigate(`/category/${encodeURIComponent(name)}/${id}`);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
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
            <Link to={"/"} style={{ width: "40px", height: "40px" }}>
              <img src={logo} alt="logo" className="logo-img" />
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
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={"16px"}
                    className="header-menu_container"
                  >
                    {menuOpen ? (
                      <div className="menu-icon open">
                        <MenuCloseIcon />
                      </div>
                    ) : (
                      <div className="menu-icon closed">
                        <img src={menuImg} alt="Menu" />
                      </div>
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
                {search && (
                  <InputRightElement top={"0"} right={1} cursor="pointer">
                    <ProductModalCloseIcon onClick={handleClearSearch} />
                  </InputRightElement>
                )}
              </InputGroup>
              <Box>
                {search &&
                (productsData?.length || categoriesData?.data?.length) ? (
                  <Box
                    className={`search-results `}
                    bg={theme.colors.cascadWhite}
                    color={theme.colors.black}
                  >
                    {isLoadingProducts || isLoadingCategories ? (
                      <Loading />
                    ) : (
                      <>
                        {categoriesData?.data?.length ? (
                          categoriesData.data.map((category) => (
                            <div
                              key={category.id}
                              className="search-result_content"
                            >
                              <Box
                                color={theme.colors.black}
                                onClick={() =>
                                  goCategoryDetails(
                                    category.id,
                                    category.name_ru
                                  )
                                }
                                className="search-result_link"
                              >
                                {category.name_ru}
                              </Box>
                            </div>
                          ))
                        ) : null}

                        {productsData?.length ? (
                          productsData.map((product) => (
                            <div
                              key={product.id}
                              className="search-result_content"
                            >
                              <img src={product.main_image} alt="" />
                              <Box
                                color={theme.colors.black}
                                onClick={() => goProductDetails(product.id)}
                                className="search-result_link"
                              >
                                {product.name_ru}
                              </Box>
                            </div>
                          ))
                        ) : null}
                      </>
                    )}
                  </Box>
                ) : null}
              </Box>
            </Box>
            {/* auth favourit cart page here */}
            <Box className="header-mid_right-container">
              <Box display={"flex"} alignItems={"center"} gap={"12px"}>
                {isAuth ? (
                  <HeaderMenu />
                ) : (
                  <Link className="header-mid_right" onClick={open}>
                    <UserIcon cursor={"pointer"} />
                    <Text className="header-mid_right-link">Войти</Text>
                  </Link>
                )}
              </Box>

              <Box>
                <Link to={"/favourites"} className="header-mid_right">
                  <Box className="header-mid_right-favourit">
                    <HeartIcon />
                    {favourites.length > 0 && (
                      <Badge
                        className="header-mid_right-badge"
                        bg={theme.colors.skyBlue}
                        color={theme.colors.cascadWhite}
                      >
                        {favourites.length}
                      </Badge>
                    )}
                  </Box>
                  <Text className="header-mid_right-link">Избранное</Text>
                </Link>
              </Box>
              <Box>
                <Link to={"/cart"} className="header-mid_right">
                  <Box className="header-mid_right-cart">
                    <CartIcon className="cart-icon" />
                    {products.length > 0 && (
                      <Badge
                        className="header-mid_right-badge"
                        bg={theme.colors.skyBlue}
                        color={theme.colors.cascadWhite}
                      >
                        {products.length}
                      </Badge>
                    )}
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
