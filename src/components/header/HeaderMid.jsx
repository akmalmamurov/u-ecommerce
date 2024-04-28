import { useState, useEffect, useCallback, memo } from "react";
import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  theme,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../assets/images";
import { CartIcon, HeartIcon, SearchIcon, UserIcon } from "../../assets/icons";
import { useModal } from "../../hooks/useModal";
import { LoginModal } from "../modal/login/LoginModal";
import { useGetSearchProductsQuery } from "../../redux/services/productAllServices";
import { useDebounce } from "use-debounce";
import { CatalogMenu } from "../catalog-menu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlices";

const HeaderMid = memo(() => {
  const { isOpen, open, close } = useModal();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [debouncedSearch] = useDebounce(search, 1000);

  const { data, isLoading } = useGetSearchProductsQuery(debouncedSearch);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  console.log(isAuth);

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

  console.log("HEADERMID");
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
            <Box position={"relative"}>
              <CatalogMenu />
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
                  onChange={handleSearch}
                  value={search}
                  border={"none"}
                  fontSize={"18px"}
                  fontWeight={"400"}
                  className="header_search-input"
                  type="text"
                  placeholder="Поиск товаров и категорий"
                  p={"12px, 16px"}
                />
              </InputGroup>
              <Box>
                {search && (
                  <div className="search-results">
                    {isLoading ? (
                      <div>Loading...</div>
                    ) : data && data.length ? (
                      <div>
                        {data?.map((product) => (
                          <div
                            key={product?.id}
                            className="search-result_content"
                          >
                            <img src={product?.main_image} alt="" />
                            <div
                              onClick={() => goProductDetails(product?.id)}
                              className="search-result_link"
                            >
                              {product?.name_ru}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>Товар не найден</div>
                    )}
                  </div>
                )}
              </Box>
            </Box>
            {/* auth favourit cart page here */}
            <Box display={"flex"} gap={"32px"} fontSize={"16px"}>
              <Box display={"flex"} alignItems={"center"} gap={"12px"}>
                {isAuth ? (
                  <>
                    <div onClick={handleLogout}>
                      <UserIcon cursor={"pointer"} />
                    </div>
                    <Text>User</Text>
                  </>
                ) : (
                  <Link className="header-mid_right" onClick={open}>
                    <UserIcon cursor={"pointer"} />
                    <Text>Войти</Text>
                  </Link>
                )}
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
      <LoginModal isOpen={isOpen} onClose={close} />
    </Box>
  );
});
HeaderMid.displayName = "HeaderMid";
export default HeaderMid;
