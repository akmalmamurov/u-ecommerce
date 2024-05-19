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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeaderMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const name = useSelector((state) => state.auth.user);

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
              <MenuItem className="header-menu_hover-link">
                <Link to="/profile">Личный кабинет</Link>
              </MenuItem>
              <MenuItem className="header-menu_hover-link">
                <Link to={"/orders"}>Мои заказы</Link>
              </MenuItem>
            </MenuGroup>
            <MenuGroup>
              <MenuItem className="header-menu_hover-link">FAQ</MenuItem>
            </MenuGroup>
            <MenuItem className="header-menu_hover-link">
              <Link>Выйти</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </div>
  );
};

export default HeaderMenu;
