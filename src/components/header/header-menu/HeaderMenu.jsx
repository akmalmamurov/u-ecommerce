import {
  Box,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { UserIcon } from "../../../assets/icons";
import "./HeaderMenu.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/slices/authSlices";

const HeaderMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const name = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const enterProfile = ()=>{
    navigate("/profile")
  };
  const enterOrder = ()=>{
    navigate("/orders")
  }
  return (
    <div className="header-menu_container">
      <Box className="header-menu_right" onMouseLeave={onClose}>
        <Menu isOpen={isOpen} closeOnBlur={false}>
          <MenuButton
            className="header-mid_right-btn"
            onMouseEnter={onOpen}
            as={Box}
          >
            <Box className="header-menu_link">
              <UserIcon />
              <Text className="">{name || "User"}</Text>
            </Box>
          </MenuButton>
          <MenuList
            className="header-menu_list"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          >
            <MenuGroup>
              <MenuItem
                onClick={enterProfile}
                className="header-menu_hover-link"
              >
                <Link>Личный кабинет</Link>
              </MenuItem>
              <MenuItem
                onClick={enterOrder}
                className="header-menu_hover-link"
              >
                <Link>Мои заказы</Link>
              </MenuItem>
              <MenuItem
                onClick={() => dispatch(logoutUser())}
                className="header-menu_hover-link"
              >
                <Link>Выйти</Link>
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
    </div>
  );
};

export default HeaderMenu;
